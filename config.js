//var cola_opc1 = "HN_Wa_Movil";

var cola_opc1 = "WhatsappTest";

//var msj_asesor = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 $cr $cr ";

var OPEN_HOUR = 7;
var OPEN_MINUTE = 0;

var CLOSE_HOUR = 20;
var CLOSE_MINUTE = 0;

var dias = {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
};

var mjs_horario = "Estamos en Horario no hábil";

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
  "marcaciones": {
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
  },
  "asesor": {
      "type": "text",
      "accion" : "transfer",
      "queue" : cola_opc1,
      "mensaje" : "",
      "mediaURL" : ""
  }
};

var palabras_buscar = [
  "club",
  "recarga",
  "paquete",
  "pagar",
  "marcaciones",
  "configuracion",
  "asesor",
];

var mensaje_df = "¡Hola! $cr Soy tu asistente virtual 🤖 de Claro $cr Te puedo ayudar con las siguientes opciones: $cr $cr "
  mensaje_df +="➡️ Envía *recarga* para hacer una recarga. $cr $cr ";
  mensaje_df +="➡️ Envía *paquete* para comprar un paquete. $cr $cr ";
  mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr $cr ";
  mensaje_df +="➡️ Envía *marcaciones* para conocer los pasos a seguir para los tramites a través de marcaciones 📱. $cr $cr ";
  mensaje_df +="➡️ Envía *configuración* para conocer los pasos a seguir si tienes inconvenientes con tu navegación 📱. $cr $cr ";
  mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr $cr ";
  mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 $cr $cr ";

var msj_default = {
  "accion": "continue",
  "mensaje" : mensaje_df
}

var msj_asesor = "";
var bandera_log = true;
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

exports.palabras_buscar = palabras_buscar;

exports.msj_default = msj_default;

exports.bandera_log = bandera_log;

exports.obtener_fecha = obtener_fecha;

exports.OPEN_HOUR = OPEN_HOUR;
exports.OPEN_MINUTE = OPEN_MINUTE;

exports.CLOSE_HOUR = CLOSE_HOUR;
exports.CLOSE_MINUTE = CLOSE_MINUTE;

exports.dias = dias;

exports.mjs_horario = mjs_horario;
