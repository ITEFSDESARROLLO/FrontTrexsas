import { Conductor } from './../../models/ModelosJ/conductor';
import { CentralService } from 'src/app/services/central.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  id:any;
  encuesta:any;
  nombreEncuesta:string;
  listaPreguntas:any;
  respuestasEncuesta:any[] = [];
  id2:any;
  ordenServicio:any;
  constructor(private activatedroute:ActivatedRoute,private data: CentralService) { }

  ngOnInit(): void {
    //console.log("id recibido es : ",cadena2);
    this.activatedroute.queryParams.subscribe(params => {
        console.log("parametros ",params['id']);
        this.id = params['id'];
        console.log("parametros ",params['id2']);
        this.id2 = params['id2'];
      }
    );
    let cadena = atob(this.id);
    let cadena2 = atob(this.id2);
    this.data.obtenerEncuestaUsuario(cadena,cadena2).then(respuesta =>
      {
        console.log("encuesta : ",respuesta);
        this.encuesta = respuesta;
        this.nombreEncuesta = this.encuesta.nombreEncuesta;
        this.listaPreguntas = this.encuesta.preguntasEncuesta;
        this.data.obtenerOrdenServicio(cadena2).then(respuesta =>
          {
            this.ordenServicio = respuesta;
            console.log("orden de servicio : ",this.ordenServicio.conductor)
          }).catch(error =>{
            console.log("error : ",error)
          })
      }).catch(error =>
        {
          console.log("error ",error);
        })
  }

  guardarRespuestaOpcion(pregunta:any,opcion:any)
  {
    console.log("pregunta : ",pregunta," opcion ",opcion );
    if(this.respuestasEncuesta.length == 0)
    {
      let respuesta = {
        pregunta:pregunta.id,
        opcion:opcion.id
      }
      this.respuestasEncuesta.push(respuesta);
    }else{
      let encontrado = false;
      for (const iterator of this.respuestasEncuesta)
      {
        if(iterator.pregunta == pregunta.id)
        {
          console.log("encontrado ",iterator);
          encontrado = true;
          iterator['opcion'] = opcion.id;
          break;
        }
      }
      if(encontrado == false)
      {
        let respuesta = {
          pregunta:pregunta.id,
          opcion:opcion.id
        }
        this.respuestasEncuesta.push(respuesta);
      }
    }
  }

  verRespuestas()
  {
    console.log("respuestas finales : ",this.respuestasEncuesta);
  }

  guardaraRespuestas()
  {
    let encuestaRespondida = {
      conductor:this.ordenServicio.conductor.idConductor,
      servicio:atob(this.id2),
      encuesta:atob(this.id),
      respuestaEncuesta:this.respuestasEncuesta
    }
    console.log("respuesta finales : ",encuestaRespondida);
    this.data.responderEncuesta(encuestaRespondida).then(respuesta =>{
      console.log("respuesta : ",respuesta);
    }).catch(error =>{

      console.log("error : ",error);

    })
  }


}
