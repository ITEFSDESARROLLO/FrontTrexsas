import { CentralService } from 'src/app/services/central.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';

@Component({
  selector: 'app-configuraciones-encuesta',
  templateUrl: './configuraciones-encuesta.component.html',
  styleUrls: ['./configuraciones-encuesta.component.css']
})

export class ConfiguracionesEncuestaComponent implements OnInit {

  encuestasParametrizadas:any[] = [];
  encuestas:any[] = [];
  encuestaSeleccionada:any;
  displayNuevoParametro:boolean = false;
  parametroSeleccionado:any;
  tiposParametro = [
    {id:1,parametro:"Calidad Conductor"},
    {id:2,parametro:"Ambiente Laboral"},
    {id:3,parametro:"Calidad Servicios"},
    {id:4,parametro:"Calidad Pasajeros"},
    {id:5,parametro:"otro"}
  ];
  constructor(private servicio:CentralService){

  }

  ngOnInit(): void {
    this.traerEncuestas();
    this.traerEncuestasParametrizadas();
  }

  traerEncuestasParametrizadas()
  {
    this.servicio.obtenerEncuestasParametrizadas().then(respuesta =>
      {
        console.log("respuesta : ",respuesta);
        this.encuestasParametrizadas = respuesta.parametros;
      }).catch(error =>{
        console.log("error : ",error);
      })
  }

  traerEncuestas()
  {
    this.servicio.traerEncuestas().then(respuesta =>
      {
        console.log("respuesta ",respuesta);
        this.encuestas = respuesta.encuestas;
      }).then(error =>
        {
          console.log("error : ",error);
        })
  }



  mostrarFormularioNuevoParametro()
  {
    this.displayNuevoParametro = true;
  }

  cancelarFormularioNuevoParametro()
  {
    this.displayNuevoParametro = false;
    this.encuestaSeleccionada = undefined;
    this.parametroSeleccionado = undefined;
  }

  capturar()
  {
    console.log("encuesta : ",this.encuestaSeleccionada);
  }

  guardarEncuesta()
  {
    let encuesta = this.encuestaSeleccionada.idEncuesta;
    let tipo = this.parametroSeleccionado.id;

    if(this.parametroSeleccionado == undefined || this.encuestaSeleccionada == undefined)
    {
      Swal.fire({
        title: 'CUIDADO',
        text: 'NO HA SELECCIONADO ENCUESTA O EL TIPO',
        icon:'warning'
      })
    }else if(this.parametroSeleccionado=="" || this.encuestaSeleccionada =="")
    {
      Swal.fire({
        title: 'CUIDADO',
        text: 'NO HA SELECCIONADO ENCUESTA O EL TIPO',
        icon:'warning'
      })
    }else{
      console.log(encuesta," ",tipo);
      this.servicio.crearEncuestaParametrizada(encuesta,tipo).then(respuesta =>{
        console.log("respuesta ",respuesta);
        Swal.fire({
          title: 'ÉXITO',
          text: 'ENCUESTA ASIGNADA',
          icon:'success',
          showConfirmButton:true
        }).then(resp =>{
          if(resp.isConfirmed)
          {
            this.displayNuevoParametro = false;
            this.traerEncuestasParametrizadas();
          }
        })
      }).catch(error =>{
        Swal.fire({
          title: 'FATAL',
          text: 'ERROR EN EL SERVIDOR '+error,
          icon:'error'
        })
      })
    }

  }

}
