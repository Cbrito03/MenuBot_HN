var pais = "HN", nomApp = "MenuBot_HN";

/*var OPEN_HOUR = 7;
var OPEN_MINUTE = 0;

var CLOSE_HOUR = 22;
var CLOSE_MINUTE = 0;*/

var OPEN_HOUR = 0;
var OPEN_MINUTE = 0;

var CLOSE_HOUR = 23;
var CLOSE_MINUTE = 59;

var offset = -6;

var dias = {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
};

var cola_opc1 = "HN_Wa_Movil";
var cola_opc1_FB = "HN_FB_MSS_SAC";
var cola_opc1_TW = "HN_TW_DM_SAC";

var mensaje_asesor = "*¡Bienvenido a CLARO Honduras! Estamos para servirle!* $cr ";
    mensaje_asesor += "*En un momento le estará atendiendo uno de nuestros ejecutivos.*";

var mjs_horario = "Estimado cliente, te informamos que nuestro horario de atención es de Lunes a Domingo de 7:00 - 22:00, Agradeceremos tu preferencia";

var contenedor = {
  "type": "",
  "accion" : "",
  "queue" : "",
  "mensaje" : "",
  "mediaURL" : ""
};

var palabras = {
  "club": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Si eres Claro 😉 eres parte del club con beneficios y descuentos. $cr ¡Descarga la App! 👇 $cr Android: http://bit.ly/ClaroClub-Android $cr iOS: http://bit.ly/ClaroClubiOS",
      "mediaURL" : ""
  },
  "recarga": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.com.hn/ 😎",
      "mediaURL" : ""
  },
  "Paquete": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.com.hn/",
      "mediaURL" : ""
  },
  "pagar": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y residencial, puedes ingresar al siguiente portal: https://hn.mipagoclaro.com/ 💳🧾",
      "mediaURL" : ""
  },
 /* "marcaciones": {
      "type": "image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Consulta la imagen para conocer los trámites que puedes realizar a través de marcaciones",
      "mediaURL" : "https://menubothn.mybluemix.net/tramitesCortos.png"
  },
  "configuracion": {
      "type": "image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Sigue los pasos detallados en la imagen, si el inconveniente persiste, favor escribe *asesor* para recibir asistencia técnica con uno de nuestros agentes.",
      "mediaURL" : "https://menubothn.mybluemix.net/APN.png"
  },*/
  "asesor": {
      "type": "text",
      "accion" : "transfer",
      "queue" : "",
      "mensaje" : mensaje_asesor,
      "mediaURL" : ""
  }
};

var mensaje_df = "¡Hola! $cr Soy tu asistente virtual 🤖 de Claro $cr Te puedo ayudar con las siguientes opciones: $cr $cr "
  mensaje_df +="➡️ Envía *recarga* para hacer una recarga. $cr $cr ";
  mensaje_df +="➡️ Envía *paquete* para comprar un paquete. $cr $cr ";
  mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr $cr ";
  //mensaje_df +="➡️ Envía *marcaciones* para conocer los pasos a seguir para los tramites a través de marcaciones 📱. $cr $cr ";
  //mensaje_df +="➡️ Envía *configuración* para conocer los pasos a seguir si tienes inconvenientes con tu navegación 📱. $cr $cr ";
  mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr $cr ";
  mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente. 👩💻👨💻 $cr $cr ";

var msj_default = {
  "type": "text",
  "accion": "continue",
  "mensaje" : mensaje_df
}

var fecha_actual = "";
var hora_actual = "";

obtener_fecha = function()
{
    var now = new Date();

    var anio = now.getFullYear();
    var mes = now.getMonth() + 1;
    var dia = now.getDate();

    var hora = now.getHours();
    var minutos = now.getMinutes();
    var segundos = now.getSeconds();

    if(mes < 10){ mes = '0' + mes }
    if(dia < 10){ dia = '0' + dia }
    if(hora < 10){ hora = '0' + hora }
    if(minutos < 10){ minutos = '0' + minutos }
    if(segundos < 10){ segundos = '0' + segundos }

    fecha_actual = dia + "-" + mes + "-" + anio;

    hora_actual = hora + ":" + minutos + ":" + segundos;
    exports.fecha_actual = fecha_actual;
    exports.hora_actual = hora_actual;
}

exports.palabras = palabras;

exports.msj_default = msj_default;

exports.obtener_fecha = obtener_fecha;

exports.OPEN_HOUR = OPEN_HOUR;
exports.OPEN_MINUTE = OPEN_MINUTE;

exports.CLOSE_HOUR = CLOSE_HOUR;
exports.CLOSE_MINUTE = CLOSE_MINUTE;
exports.offset = offset;

exports.dias = dias;

exports.mjs_horario = mjs_horario;

exports.contenedor = contenedor;

/*****************************************************/

exports.pais = pais;

exports.nomApp = nomApp;

exports.cola_opc1 = cola_opc1;
exports.cola_opc1_FB = cola_opc1_FB;
exports.cola_opc1_TW = cola_opc1_TW;
