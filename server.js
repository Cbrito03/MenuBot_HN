// Modifico Carlos Brito 18-04-2020 12:37 AM
var express = require('express')
var http = require('http')
var app = express()
var request = require('request')
var async = require('async')
var bodyParser = require('body-parser');
var localStorage = require('localStorage')
let fs = require('fs');
var util = require('util');
var config = require('./config.js');
var horario = require('./controllers/validar_horario.js');
var port = 8080;
var log_file = "";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('img'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

if(config.bandera_log)
{
  config.obtener_fecha();

  fs.open(__dirname + '/logs/node_' + config.fecha_actual + '.log', 'a+', (err, fd) => { //wx verifica si existe el archivo
    if (err)
    {
      if (err.code === 'EEXIST')
      {
        log_file = fs.createWriteStream(__dirname + '/logs/node_'+config.fecha_actual+'.log', {flags : 'a'});
      }
      throw err;
      writeMyData(fd);
    }
    else
    {
      log_file = fs.createWriteStream(__dirname + '/logs/node_'+config.fecha_actual+'.log', {flags : 'a'});
    }
  });
}

var palabras = config.palabras;
var msj_dafault = config.msj_default;
var menu_opciones = config.menu_opciones;
var mjs_horario = config.mjs_horario;

app.post('/message', (req, res) => {
  config.obtener_fecha();

  console.log("Peticion POST HN /message [FECHA-HORA] : "+config.fecha_actual+" "+config.hora_actual);

  var horarios = horario.validarHorario(config.OPEN_HOUR, config.OPEN_MINUTE, config.CLOSE_HOUR, config.CLOSE_MINUTE);

  console.log(horarios);
  
  var result, resultado;
  var bandera = false , estatus = 200 , menu_dos = 0;
  var msj_buscar = "", msj_buscar_opcion = "";

  var apiVersion = req.body.apiVersion;
  var conversationID = req.body.conversationId;
  var authToken = req.body.authToken;
  //var RRSS = req.body.RRSS;
  var channel = req.body.channel;
  var user = req.body.user;
  var context = req.body.context;
  var cadena = req.body.message;
  var bandera_asesor = false;

  log_file.write(util.format('*********************************'+config.fecha_actual+' '+config.hora_actual+'*********************************')+'\n');

  if(apiVersion !== '' && typeof apiVersion !== "undefined")
  {
    if(authToken !== '' && typeof authToken !== "undefined")
    {
      if(channel !== '' && typeof channel !== "undefined")
      {
        if(user !== '' && typeof user !== "undefined")
        {
          if(context !== '' && typeof context !== "undefined")
          {
            if(cadena !== '' && typeof cadena !== "undefined")
            {
              cadena = cadena.text.toLowerCase(); // minusculas
              cadena = cadena.trim();
              msj_buscar_opcion = cadena;
              cadena = cadena.replace(/,/g,"").replace(/;/g,"").replace(/:/g,"").replace(/\./g,""); // borramos ,;.:
              cadena = cadena.split(" "); // lo convertimo en array mediante los espacios

              for(var i = 0; i < cadena.length; i++)
              {
                for(var atr in palabras)
                {
                  if(cadena[i] === "configuración"){ cadena[i] = 'configuracion'}

                  if(atr.toLowerCase() === cadena[i])
                  {
                    if(cadena[i] === "asesor")
                    {
                      if(horarios)
                      {
                        msj_buscar = cadena[i];
                        result = palabras[atr];
                        bandera_opc = true;                                              
                      }
                      else
                      {
                        msj_buscar = cadena[i];
                        palabras[atr].accion = "end";
                        palabras[atr].queue = "";
                        palabras[atr].mensaje = mjs_horario;
                        result = palabras[atr];
                      }
                    }
                    else
                    {
                      msj_buscar = cadena[i];
                      result = palabras[atr];
                    }

                    bandera = true;
                    break;
                  }
                }

                if(bandera){ break; }
              }

              console.log("[msj_buscar_opcion]"+msj_buscar_opcion);

              if(!bandera){ result = msj_dafault;}

              estatus = 200;

              resultado = {
                "context":{
                  "agent":false,
                  "callback":false,
                  "video":false
                },
                "action":{
                  "type": result.accion,// "type":"continue"
                  "queue": result.queue
                },
                "messages":[
                  {
                    "type": result.type,
                    "text": result.mensaje,
                    "mediaURL": result.mediaURL
                  }
                ],
                "additionalInfo": {
                  "key":"RUT",
                  "RUT":"1-9"
                }
              }

              if(result.mensaje === ""){  resultado.messages = [];  }
            }
            else
            {
              estatus = 400;
              resultado = {
                "estado": "El valor de mensaje es requerido"
              }
            }
          }
          else
          {
            estatus = 400;
            resultado = {
              "estado": "El valor de contexto es requerido"
            }
          }
        }
        else
        {
          estatus = 400;
          resultado = {
            "estado": "El valor de user es requerido"
          }
        }
      }
      else
      {
        estatus = 400;
        resultado = {
          "estado": "El valor de channel es requerido"
        }
      }
    }
    else
    {
      estatus = 400;
      resultado = {
        "estado": "El valor de authToken es requerido"
      }
    }
  }
  else
  {
    estatus = 400;
    resultado = {
      "estado": "El valor de apiVersion es requerido"
    }
  }

  log_file.write(util.format('[FECHA] : '+config.fecha_actual+' - [HORA] : '+config.hora_actual+' - [conversationID] : '+conversationID+' - [Accion] : /message \n [STATUS] : '+estatus+' - [Resultado] : ')+'\n');
  log_file.write(util.format(resultado));
  log_file.write('\n');
  log_file.write("****************************[DATOS DE ENTRADA]****************************");
  log_file.write('\n');
  log_file.write("[apiVersion] : " + apiVersion + " \t [conversationID] : " + conversationID + " \t [authToken] :  " + authToken + "\t [channel] : " + channel);
  log_file.write('\n \n');

  res.status(estatus).json(resultado);
})

app.post('/terminate', (req, res) => {
  var result, resultado;
  var bandera = false , estatus = 200;

  var conversationID = req.body.conversationId;
  var RRSS = req.body.RRSS;
  var canal = req.body.channel;
  var contexto = req.body.context;

  if(RRSS !== '' && typeof RRSS !== "undefined")
  {
    if(canal !== '' && typeof canal !== "undefined")
    {
      if(contexto !== '' && typeof contexto !== "undefined")
      {
        estatus = 200;
        resultado = {
          "estado": "OK"
        }
      }
      else
      {
        estatus = 400;
        resultado = {
          "estado": "El valor de contexto es requerido"
        }
      }
    }
    else
    {
      estatus = 400;
      resultado = {
        "estado": "El valor de canal es requerido"
      }
    }
  }
  else
  {
    estatus = 400;
    resultado = {
      "estado": "El valor de RRSS es requerido"
    }
  }

  res.status(estatus).json(resultado);
})

app.get('/:img', function(req, res){
    res.sendFile( `img/${img}` );
});

app.get('/', (req, res) => {
  const now = new Date();
  res.status(200).send("Bienvenido al menú Bot de Honduras, las opciones disponibles son: <br> /message<br> /terminate <br> "+now+" <br> Versión: 2.0.0")
})

http.createServer(app).listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
