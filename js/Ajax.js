const GET_HOTELES = 'http://test_api.com/web/';


/**
 * Metodo que permite realizar la ejecución de la funcion ajax
 * @param {type} donde
 * @param {type} que
 * @param {type} hacer
 * @returns {undefined}
 */
function ajax (donde,hacer,datos = null,tipo = null)
{
   

if(datos == null){

    $.ajax({
    // la URL para la petición
    url : donde,
    // la información a enviar
    // (también es posible utilizar una cadena de datos)
    data : datos,
    // especifica si será una petición POST o GET
    type : tipo,

    // el tipo de información que se espera de respuesta
    dataType : 'html',
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success : function(data) {
       hacer(data);
    },
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error : function(xhr, status) {

        alert('Disculpe, existió un problema'+status);
    }
});


}else{


var send = JSON.stringify(datos);



  $.ajax({
    // En data puedes utilizar un objeto JSON, un array o un query string


    data: {"json":send},
    //Cambiar a type: POST si necesario
    type: "POST",
    // Formato de datos que se espera en la respuesta
    dataType: "json",
    // URL a la que se enviará la solicitud Ajax
    url: donde
    //Content-Type: "application/json"
})
 .done(function( data, textStatus, jqXHR ) {


  if(data.status == "error"){

  var message = "";

   if (typeof data.message["nombre"] === "undefined")
     message = data.message;
   else
     message = data.message["nombre"][0];
     
   

     Swal.fire({
        title: 'Error!',
        text:  message,
        type: 'error',
        confirmButtonText: 'continuar'
      })
    
  setTimeout(function(){ $("body").css("overflow","auto"); }, 1000);
  
  }else{

    Swal.fire(
      'Accion Realizada!',
       message,
      'success'
    )


    setTimeout(function(){ $("body").css("overflow","auto"); }, 1000);

  }


 })
 .fail(function(data, jqXHR, textStatus, errorThrown ) {

    
     if ( console && console.log ) {

      Swal.fire({
        title: 'Error!',
        text:   textStatus+' : '+data,
        type: 'error',
        confirmButtonText: 'Bad'
      })

      console.log( "Respuesta erronea por parte del servidor " +  data);
     }


      setTimeout(function(){ $("body").css("overflow","auto"); }, 1000);
});


}





}

