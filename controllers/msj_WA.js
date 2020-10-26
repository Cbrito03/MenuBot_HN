var colas = {
  "asesor" : {
    "timeout" : 900000,
    "acd" : "HN_Wa_Movil",
    "fh" : "HN_WA_Movil_NH"
  },
  "cotizar" : {
    "timeout" : 900000,
    "acd" : "HN_WA_Ventas",
    "fh" : "HN_WA_Ventas_NH"
  },
  "asistencia_1" : {
    "timeout" : 900000,
    "acd" : "HN_WA_Ventas",
    "fh" : "HN_WA_Ventas_NH"      
  },
  "asistencia_2" : {
    "timeout" : 900000,
    "acd" : "HN_Wa_Movil",
    "fh" : "HN_WA_Movil_NH"
  },
};

var mensaje_df = "¡Hola! \n Soy tu asistente virtual 🤖 de Claro \n Te puedo ayudar con las siguientes opciones: \n \n ";
    mensaje_df +="➡️ Envía *cotizar* para conocer nuestros planes móviles y residenciales si deseas renovar o contratar nuevos servicios. 😎 \n \n ";
    mensaje_df +="➡️ Envía *recarga* para hacer una recarga. \n \n ";
    mensaje_df +="➡️ Envía *paquete* para comprar un paquete. \n \n ";
    mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 \n \n ";
    mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 \n \n ";
    mensaje_df +="➡️ Envía *asistencia* si necesitas ayuda con tus servicios 📱📺💻. \n \n ";
    //mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente. 👩💻👨💻 \n \n ";

var mjs_horario = "Estimado cliente, te informamos que nuestro horario de atención es de Lunes a Domingo de 7:00 - 22:00, Agradeceremos tu preferencia";

var msj_pagar = "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y residencial, ";
    msj_pagar += "puedes ingresar al siguiente portal: https://hn.mipagoclaro.com/ 💳🧾";

var msj_asesor = "¡Bienvenido a CLARO Honduras! Estamos para servirle! \n ";
    msj_asesor += "En un momento le estará atendiendo uno de nuestros ejecutivos. \n \n ";
    msj_asesor += "Podrías compartirnos la siguiente información para apoyarte lo más pronto posible. \n \n ";
    msj_asesor += "Nombre: \n ";
    msj_asesor += "ID: \n ";
    msj_asesor += "Numero Móvil o Contrato: \n \n ";
    msj_asesor += "¿Cómo te podemos colaborar?";

var msj_club = "Si eres Claro 😉 eres parte del club con beneficios y descuentos. \n "; 
    msj_club += "¡Descarga la App! 👇 \n ";
    msj_club += "Android: http://bit.ly/ClaroClub-Android \n ";
    msj_club += "iOS: http://bit.ly/ClaroClubiOS ";

var msj_asistencia = "👋Gracias por comunicarte a Claro, por favor ingresa el número de la opción con la que necesitas apoyo 😊: \n \n ";
    msj_asistencia += "1. Adquirir servicio nuevo, información de promoción o renovar mi servicio. \n \n ";
    msj_asistencia += "2. Servicio al cliente. \n";
    
var msj_default = 
{
  "action" : {
    "type" : "continue",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mensaje_df,
      "mediaURL" : ""
    }
  ]
};

var palabras = {
  "cotizar": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["cotizar"].acd,
      "timeoutInactivity" : colas["cotizar"].timeout
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.*  En un momento uno de nuestros representantes te atenderá ",
        "mediaURL" : ""
      }
    ]
  },
  "recarga": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.com.hn/ 😎",
        "mediaURL" : ""
      }
    ]
  },
  "paquete": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.com.hn/",
        "mediaURL" : ""
      }
    ]
  },
  "pagar": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_pagar,
        "mediaURL" : ""
      }
    ]
  },  
  "club": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_club,
        "mediaURL" : ""
      }
    ]
  },
  "asistencia": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_asistencia,
        "mediaURL" : ""
      }
    ]
  }
  /*,"asesor": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor"].acd,
      "timeoutInactivity" : colas["asesor"].timeout

    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_asesor,
        "mediaURL" : ""
      }
    ]
  }*/
};

var menu_opciones_asistencia = 
{
  "1" : {
    "action" : {
      "type" : "transfer",
     "queue" : colas["asistencia_1"].acd,
      "timeoutInactivity" : colas["asistencia_1"].timeout
    },
    "messages" : []
  },
  "2" : {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asistencia_2"].acd,
      "timeoutInactivity" : colas["asistencia_2"].timeout
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_asesor,
        "mediaURL" : ""
      }
    ]
  }
}

var contenedor = {
  "action" : {
    "type" : "",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "",
      "text" :  "",
      "mediaURL" : ""
    }
  ]
};

var msj_fuera_horario = {
  "action" : {
    "type" : "continue", // transfer
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mjs_horario,
      "mediaURL" : ""
    }
  ]
}

exports.msj_default = msj_default;

exports.palabras = palabras;

exports.contenedor = contenedor;

exports.colas = colas;

exports.menu_opciones_asistencia = menu_opciones_asistencia;

exports.mjs_horario = mjs_horario;