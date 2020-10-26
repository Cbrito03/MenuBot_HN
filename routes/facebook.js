const horario = require('../controllers/validar_horario.js');
const moment_timezone = require('moment-timezone');
const msj_fb = require('../controllers/msj_FB.js');
const config = require('../controllers/config.js');
const localStorage = require('localStorage');
const express = require('express');
const moment = require('moment');
const axios = require('axios');
const async = require('async');

const router = express.Router();

router.post('/fb/message', async (req, res) => {
  console.log("[Brito] :: [Peticion POST /message]");

  var horarios = horario.validarHorario_FB();

  var resultado, result_messages, result_action;
  var bandera = false , estatus = 200;
  var opcion = "", msj_buscar = "", msj_buscar_opcion = "";

  var bandera_tranferido = false, bandera_fueraHorario = false, bandera_opt = true;

  var apiVersion = req.body.apiVersion;
  var conversationID = req.body.conversationId;
  var authToken = req.body.authToken;
  var channel = req.body.channel;
  var user = req.body.user;
  var context = req.body.context;
  var cadena = req.body.message;

  var bandera_TIMEOUT = false;

  var now = moment();
  var fechaStamp = moment(context.lastInteractionFinishTime).format("YYYY-MM-DD HH:mm:ss");
  var fecha_actual = now.tz("America/Costa_Rica").format("YYYY-MM-DD HH:mm:ss");
  var fecha2 = moment(fecha_actual, "YYYY-MM-DD HH:mm:ss");

  console.log("fechaStamp :: " + fechaStamp);

  var diff = fecha2.diff(fechaStamp, 'h'); 
  console.log("diff :: " + diff);
  console.log(typeof diff);

  var msj_fuera_horario =
  {
    "action" : {
      "type" : "transfer",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_fb.mjs_horario,
        "mediaURL" : ""
      }
    ]
  };

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
              if(context.lastInteractionFinishType !== "CLIENT_TIMEOUT")
              {             
                bandera_TIMEOUT = true;
              }             
              else if(context.lastInteractionFinishType == "CLIENT_TIMEOUT" && diff <= 24)
              {
                bandera_TIMEOUT = false;
              }
              else if(context.lastInteractionFinishType == "CLIENT_TIMEOUT" && diff > 24)
              {
                bandera_TIMEOUT = true;
              }

              if(bandera_TIMEOUT)
              {             
                cadena = cadena.text.toLowerCase(); // minusculas
                cadena = cadena.trim();
                msj_buscar_opcion = cadena;
                msj_buscar = cadena;
                cadena = cadena.replace(/,/g,"").replace(/;/g,"").replace(/:/g,"").replace(/\./g,""); // borramos ,;.:
                cadena = cadena.split(" "); // lo convertimo en array mediante los espacios                
                
                console.log("Entro a "+ channel.toLowerCase() +" - messenger");                

                for(var i = 0; i < cadena.length; i++)
                {
                  for(var atr in msj_fb.palabras)
                  {

                    if(atr.toLowerCase() === cadena[i])
                    {
                      opcion = cadena[i];

                      if(msj_fb.palabras[atr].action.queue === "" && msj_fb.palabras[atr].action.type !== "transfer")
                      {
                        result_action = msj_fb.palabras[atr].action;
                        result_messages = msj_fb.palabras[atr].messages;
                      }
                      else if(msj_fb.palabras[atr].action.queue !== "" && msj_fb.palabras[atr].action.type === "transfer")
                      {
                        if(horarios)
                        {
                          result_action = msj_fb.palabras[atr].action;
                          result_messages = msj_fb.palabras[atr].messages;                        
                          bandera_tranferido = true;                    
                        }
                        else
                        { 
                          console.log("[Brito] :: [No cumple horario] :: [horarios] :: " + horarios);

                          console.log("[Brito] :: [msj_fuera_horario] :: ", msj_fuera_horario.messages[0].text);                      
                          
                          msj_fuera_horario["action"].queue = msj_fb.colas[atr].fh;
                          //msj_fuera_horario.messages[0].text = msj_fb.mjs_horario;

                          result_messages = msj_fuera_horario.messages;
                          result_action = msj_fuera_horario.action;
                          bandera_fueraHorario = true;                                                                
                        }
                      }
                      
                      bandera = true;
                      bandera_opt = true;
                      break;
                    }
                    else
                    {
                      result_messages = msj_fb.msj_default.messages;
                      result_action = msj_fb.msj_default.action;
                    }
                  }

                  if(bandera){ break; }
                }

                if(localStorage.getItem("msj_"+conversationID) == null) // No existe localStorage
                {               
                  if(msj_buscar == "asistencia")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para asistencia] :: ', localStorage.getItem("msj_"+conversationID));
                  }
                  else if(!bandera)
                  {
                    result_messages = msj_fb.msj_default.messages;
                    result_action = msj_fb.msj_default.action;
                  }  
                }
                else // esite localStorage
                {                  
                  console.log('[Brito] :: [message] :: [Borra Storage] :: ' + localStorage.getItem("msj_"+conversationID));
                  
                  var y = parseInt(msj_buscar_opcion);
                  var msj_storage = localStorage.getItem("msj_"+conversationID);

                  console.log('[Brito] :: [message] :: [msj_storage] :: ' + msj_storage + ' :: [msj_buscar_opcion] :: ' + msj_buscar_opcion);
                 
                  if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "asistencia")
                  {
                    console.log("[Brito] :: [message] :: [Entro a asistencia] :: " + msj_buscar_opcion + " :: " + localStorage.getItem("msj_"+conversationID));
                    
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "asistencia - " + msj_buscar_opcion;

                    if(horarios)
                    {
                      result_messages = msj_fb.menu_opciones_asistencia[msj_buscar_opcion].messages;
                      result_action = msj_fb.menu_opciones_asistencia[msj_buscar_opcion].action;
                      bandera_tranferido = true;
                    }
                    else
                    { 
                      console.log("[Brito] :: [No cumple horario habil] :: [horarios] :: "+horarios);
                      
                      msj_fuera_horario["action"].queue = msj_fb.colas['asistencia_'+msj_buscar_opcion].fh;
                      msj_fuera_horario["messages"].text = msj_fb.mjs_horario;

                      result_messages = msj_fuera_horario.messages;
                      result_action = msj_fuera_horario.action;                                   
                      bandera_fueraHorario = true;                            
                    }

                    bandera = true;
                    bandera_opt = true;                               
                  }
                  else if (!isNaN(y) && localStorage.getItem("msj_"+conversationID) == "asistencia")
                  {
                    if(localStorage.getItem("msj_"+conversationID) == "asistencia")
                    {
                      console.log("[Brito] :: [No es el número correcto para el menu de asistencia] :: [Número de opción] :: " + y);
                      opcion = "asistencia";
                      result_action = msj_fb.palabras[opcion].action;
                      result_messages = msj_fb.palabras[opcion].messages;
                    }

                    bandera = true;
                    bandera_opt = false;
                  }
                  else
                  {
                    localStorage.removeItem("msj_"+conversationID);

                    if(!bandera)
                    {
                      result_messages = msj_fb.msj_default.messages;
                      result_action = msj_fb.msj_default.action;
                    }
                  }
                }                

                var options = {
                  method : 'post',
                  url : config.url_estd,
                  headers : { 'Content-Type': 'application/json'},
                  data: JSON.stringify({
                    "conversacion_id" : conversationID,
                    "pais" : config.info.pais,
                    "app" : config.info.nomApp,
                    "opcion" : opcion,
                    "rrss" : "FB",
                    "transferencia" : bandera_tranferido,
                    "fueraHorario" : bandera_fueraHorario,
                    "grupoACD" : result_action.queue        
                  })
                };          

                if(bandera == true)
                {
                  if(bandera_opt)
                  {
                    console.log(options);
                    var resultado_axios = await axios(options);
                    console.log("[Resultado AXIOS] :: ");
                    console.log(resultado_axios);
                  }                 
                }
                else
                {
                  result_messages = msj_fb.msj_default.messages;
                  result_action = msj_fb.msj_default.action;
                }

                console.log("[Brito] :: [channel] :: ", channel, " :: [opcion] :: ", opcion);
                                
                resultado = {
                  "context": context,
                  "action": result_action,
                  "messages": result_messages,
                  "additionalInfo": {
                    "key":"RUT",
                    "RUT":"1-9"
                  }
                }         
              }
              else
              {

                console.log("Entro a CLIENT_TIMEOUT FB");

                var timeout_acd = "";

                for (var key in msj_fb.colas)
                {
                  if(msj_fb.colas[key].acd == context.lastInteractionQueue)
                  {
                    console.log(msj_fb.colas[key].acd);
                    console.log(msj_fb.colas[key].timeout);
                    timeout_acd = msj_fb.colas[key].timeout;
                    break;
                  }
  
                }

                resultado = {
                  "context": context,
                  "action": {
                    "type" : "transfer",
                    "queue" : context.lastInteractionQueue,
                    "timeoutInactivity" : timeout_acd
                  },
                  "messages": [],
                  "additionalInfo": {
                    "key":"RUT",
                    "RUT":"1-9"
                  }
                }

              }

              console.log("[Brito] :: [RESULTADO] :: [resultado] :: ");
              console.log(resultado);
              console.log("[Brito] :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: [Brito]");
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

  res.status(estatus).json(resultado);
});

module.exports = router