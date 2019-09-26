

//PERSONALIZACION DE TIPO DE ERROR DE JQUERY VALIDATE

$.validator.setDefaults({
  errorClass: 'invalid',
  validClass: "valid"
});





/* INICIALIZAR EL SIDENAV */
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('.sidenav').sidenav('open');  
  });

  $('#alert_close').click(function(){
    $( "#alert_box" ).fadeOut( "slow", function() {
    });
  });





//FUNCION PARA MOSTRAR LOS HOTELES

function mostrar_hoteles(){

    var debo = function(data){

    var res = JSON.parse(data);

    var hotels = "";
    var modals ="";

    $(".collapsible").html("");

   if (typeof res.details === "undefined") {
        $(".message").html("<p>"+res.message+"</p>");

    }else{
       
       var hotelesArr = res.details;
       $(".collapsible").html(""); 
      
        Object.keys(hotelesArr).forEach((key, index) => {

            var id_hotel = hotelesArr[index]['id_hotel'];
            var nombre = hotelesArr[index]['nombre'];
            var direccion = hotelesArr[index]['direccion'];
            var num_habitaciones = hotelesArr[index]['num_habitaciones'];
            var nit = hotelesArr[index]['nit'];
            var ciudad = hotelesArr[index]['ciudad'];

            //FORMULARIO DE HOTELES CREAR-EDITAR:

            hotels += '<li><div class="collapsible-header"><strong>'+nombre+'</strong>  <span class="italic-letter">(clic para ver/editar)</span></div><div class="collapsible-body">'+
            '<form name="fm_update_hotel'+id_hotel+'" id="fm_update_hotel'+id_hotel+'" ><span> Nombre:</span> <input type ="text" name="nombre" id="nombre'+id_hotel+'" value="'+nombre+'" />'+
            '<br> Dirección: <input type ="text" name="direccion" id="direccion'+id_hotel+'" value="'+direccion+'" />'+
            '<br> Habitaciones: <input type ="text" name="num_habitaciones" id="num_habitaciones'+id_hotel+'" value="'+num_habitaciones+'" />'+
            '<br> Ciudad: <input type ="text" name="ciudad" id="ciudad'+id_hotel+'" value="'+ciudad+'" />'+
            '<br> Nit: <input type ="text" name="nit" id="nit'+id_hotel+'" value="'+nit+'" />'+
            '<br><div class= "row"> <div class="col s12 m6 l6"><button class="btn waves-effect down-top end-right waves-light" type="submit" name="action">Actualizar</button></div>'+
            '<div class="col s12 m6 l6"> <a  class="waves-effect down-top waves-light teal darken-4 btn modal-trigger" href="#modal'+id_hotel+'">Asignar</a></div>'+
            '</form></div></li>';
    
            //FORMULARIO DE ASIGNACIONES:

            modals += '<div id="modal'+id_hotel+'" class="modal bottom-sheet">'+
                      '<div class="modal-content"><h4 class="title-assign"> Asignaciones:</h4><strong> Nombre: '+nombre+'</strong>'+
                      '<br><mark>Disponibilidad:</mark> <mark>  <b> <span id="habitaciones_asignadas'+id_hotel+'"></span></b>  de <b><span id="numHabitaciones'+id_hotel+'"></span></b></mark>'+
                    
                    '<div class="container">'+
                '<form id="asignar'+id_hotel+'" class="col-lg-5 p-0 position-relative">'+
                    '<div class="row">'+

                        '<div class="col s6">'+
                         ' <label class="select-labels-custom">Selecciona una habitacion</label>'+
                            '<select class="browser-default" name="id_habitacion" id="id_habitacion'+id_hotel+'" >'+
                                '<option value="">Seleccionar</option>'+
                           ' </select>'+
                          
                        '</div>'+
                            '<div class="col s6">'+
                            '<label class="select-labels-custom">Selecciona una acomodación</label>'+
                               ' <select class="browser-default" name="id_acomodacion" id="id_acomodacion'+id_hotel+'" type="text"  disabled>'+
                                    '<option value="">Seleccionar</option>'+
                                '</select>'+
                                
                            '</div>'+

                           '</div>'+

                        '<div class="row">'+
                            '<div class="col s6">'+
                                '<label class="select-labels-custom">Número de habitaciones:</label>'+
                                '<input name="num_cantidad" id="num_cantidad'+id_hotel+'" type="text" class="form-control">'+
                            '</div>'+
                            '<button class="btn waves-effect waves-light" type="submit" name="action">Guardar</button>'+
                        '</div>'+

                    '</form>'+

                '</div>'+
                      '</div>'+
                      '<div class="modal-footer">'+
                      '<a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>'+
                      '</div>'+
                      '</div>';

        });

         //mostrar todos los hoteles en un collapsi   
        $(".collapsible").html(hotels);

        //cargar modales de asignaciones
        $("#mis_modales").html(modals);
        
         
         //generar modales de asignaciones
        $('.modal').modal();

        //activar selects
        


         //1. Activar validacion para formularios de editar Hotel.
         //2. Precargar selects para el paso siguiente
         //3. activar validacion para formularios de asignacion

         Object.keys(hotelesArr).forEach((key, index) => {
            var id_hotel = hotelesArr[index]['id_hotel'];
            var num_habitaciones = hotelesArr[index]['num_habitaciones'];
             $("#numHabitaciones"+id_hotel).text(num_habitaciones);

            fm_update_hotel(id_hotel);
            cargar_asignacion(id_hotel);
            asignar(id_hotel);
           
         });

         
        //habilitamos la accion collapse  
        $('.collapsible').collapsible();    
       
    }    
};

//llamada a ajax para mostrar la vista
    ajax(GET_HOTELES+'hoteles',debo,null,'GET');
}


//MUESTRA VISTA PARA CREAR UN HOTEL
function vista_hotel(){
    var donde= "view/hoteles/create";

    var hacer = function(data){
        $(".crear-hotel").html(data);
        formHotel();
    };

    ajax(donde,hacer,null,'POST');
   
}

//MUESTRA EL HOME
function panel_principal(){
    var donde= "view/hoteles/";
    var hacer = function(data){
        $("#contenido").html(data);
    };
    ajax(donde,hacer,null,'POST');
    //lista los hoteles
    mostrar_hoteles();
}


//VALIDA EL FORMULARIO Y ENVIA PARA EDITAR HOTEL
function fm_update_hotel(id){

    var  url = GET_HOTELES+"hoteles/update?id="+id;

    $("#fm_update_hotel"+id).validate({

        rules:{

            ciudad:{
                required:true,
                rangelength:[3,300]
            },
            nombre:{
                required:true,
                rangelength:[2,80]
            },
            
            direccion: {
                required:true,
                rangelength:[3,80]
            },

            nit: {
                required:true,
                rangelength:[3,30]
            },

            num_habitaciones: {
                required:true,
                number: true
            }

            },

            submitHandler: function(){
                
                var hacer = function(data){
                    $("#body").html(data);
                };

                var datos = {"ciudad":$("#ciudad"+id).val(),"nombre":$("#nombre"+id).val(),"nit":$("#nit"+id).val(),"direccion":$("#direccion"+id).val(),"num_habitaciones":$("#num_habitaciones"+id).val(),"estado":"Activo"};

                ajax(url,hacer,datos,'POST');
                setTimeout(function(){  mostrar_hoteles();}, 1000);
                document.getElementById("formCrearHotel").reset();
                //lista los hoteles
            }
 
    });
}


//REALIZA UNA ASIGNACION DE HABITACIONES A UN HOTEL
function asignar(id){

  var url =GET_HOTELES+"habitacion/create?id="+id;

   $("#asignar"+id).validate({

        rules:{

                num_cantidad:{
                    required:true,
                },
                id_acomodacion:{
                    required:true
                },
                
                id_habitacion: {
                    required:true
                }

            },

            submitHandler: function(){
                var hacer = function(data){
                    $("#body").html(data);
                };
                var datos = {"id_acomodacion":$("#id_acomodacion"+id).val(),"id_habitacion":$("#id_habitacion"+id).val(),"cantidad":$("#num_cantidad"+id).val(),"direccion":$("#direccion"+id).val(),"estado":"Activo"};
                ajax(url,hacer,datos,'POST');
                setTimeout(function(){  mostrar_hoteles();}, 1000);
                document.getElementById("asignar"+id).reset();
             
            }
 
    });

}

//VALIDACION Y ENVIO DE UN NUEVO HOTEL

function formHotel(){

    var   url = GET_HOTELES+"hoteles";
   
    $('.sidenav').sidenav('close');
    $("#formCrearHotel").validate({
        rules:{

            ciudad:{
                required:true,
                rangelength:[3,300]
            },
            nombre:{
                required:true,
                rangelength:[2,80]
            },
            
            direccion: {
                required:true,
                rangelength:[3,80]
            },

            nit: {
                required:true,
                rangelength:[3,30]
            },

            num_habitaciones: {
                required:true,
                number: true
            }

            },
            submitHandler: function(){
                var hacer = function(data){
                    $("#body").html(data);
                };
                var datos = {"ciudad":$("#ciudad").val(),"nombre":$("#nombre").val(),"nit":$("#nit").val(),"direccion":$("#direccion").val(),"num_habitaciones":$("#num_habitaciones").val(),"estado":"Activo"};

                ajax(url,hacer,datos,'POST');
                setTimeout(function(){  mostrar_hoteles();}, 1000);
                document.getElementById("formCrearHotel").reset();
                //lista los hoteles
               
            }
 
    });
}


 
 /*ASIGNACIONES*/


 function cargar_asignacion(id){
     cargar_habitaciones(id);
     habitaciones_asignadas(id);
}


//MOSTRAR LAS HABITACIONES QUE HAY DISPONIBLES
 function cargar_habitaciones(id){

    var  url = GET_HOTELES+"habitacion";
    var hacer = function(data){

        var datos = JSON.parse(data);
        var habitaciones = datos.habitaciones;

            for(key in habitaciones)
            {
                if(habitaciones.hasOwnProperty(key)){
                    $('#id_habitacion'+id).append(''+
                        '<option value="'+key+'">'+habitaciones[key]+'</option>'+
                    '');
                }
            }
        };

        ajax(url,hacer,null,'GET');
        $('#id_habitacion'+id).on('change', function() {
            precarga_acomodacion($(this).val(),id);
        });

}

//SEGUN LA HABITACION, MOSTRAR LA ACOMODACION
 function precarga_acomodacion(id_habitacion,id){

    var url = GET_HOTELES+"habitacion/view?id="+id_habitacion;
    
    $("#id_acomodacion"+id).html(''+
        '<option value="">Seleccionar</option>'+
    '');

    if(!id_habitacion){
        $("#id_acomodacion"+id).attr('disabled', true);
        return;
    }

    var hacer = function(data){
    var datos = JSON.parse(data);    
    var acomodaciones = datos.acomodaciones;
        
        for(key in acomodaciones)
        {
            if(acomodaciones.hasOwnProperty(key)){
                $("#id_acomodacion"+id).append(''+
                    '<option value="'+key+'">'+acomodaciones[key]+'</option>'+
                '');
            }
        }
        $('[name="id_acomodacion"]').attr('disabled', false);
    };
     ajax(url,hacer,null,'GET');
}


//CANTIDAD DE HABITACIONES QUE SE HAN ASIGNADO
 function habitaciones_asignadas(id){
    var url = GET_HOTELES+"habitacion/habitacionesdisponibles?id="+id;
     var hacer = function(data){
        var datos = JSON.parse(data);
         if (typeof datos.cantidad === "undefined") {
            $("#habitaciones_asignadas"+id).text("0");
         }else{
            if(datos.cantidad == "")
            $("#habitaciones_asignadas"+id).text("0");
            else
            $("#habitaciones_asignadas"+id).text(datos.cantidad);
         }
     };
     ajax(url,hacer,null,'GET');
}