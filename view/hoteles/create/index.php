

<div class="row">
    <form class="col s12" id="formCrearHotel" name="formCrearHotel">
      <div class="row">
        <div class="input-field col s12 m6 l6">
       
          <input id="nombre" placeholder="Nombre del Hotel" type="text" name="nombre" class="validate">
         <!-- <label for="nombre">Nombre</label> !-->
        </div>
        <div class="input-field col s12 m6 l6">
          <i class="material-icons prefix">location_city</i>
          <input id="ciudad" type="text" placeholder="Ciudad" name="ciudad" class="validate">
         <!-- <label for="ciudad">Ciudad</label>-->
        </div>
      </div>
       

        <div class="row">
        <div class="input-field col s12">
            <i class="material-icons prefix">location_on</i>
          <input id="direccion" type="text" name="direccion" placeholder="Dirección" class="validate">
       <!--   <label for="direccion">direccion</label>-->
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12 m6 l6">
          <input placeholder="Nit" id="nit" name="nit" type="text" class="validate">
         <!-- <label for="nit">Nit</label>-->
        </div>
        <div class="input-field col s12 m6 l6">
          <input id="num_habitaciones"placeholder="# de Habitación" name="num_habitaciones" type="text" class="validate">
         <!-- <label for="num_habitacion">Número de habitaciones</label>-->
        </div>
      </div>

     
       <button class="btn waves-effect waves-light" type="submit" name="action">Crear
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

