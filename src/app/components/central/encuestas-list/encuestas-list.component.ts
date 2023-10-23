import { CentralService } from './../../../services/central.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuestas-list',
  templateUrl: './encuestas-list.component.html',
  styleUrls: ['./encuestas-list.component.css']
})
export class EncuestasListComponent implements OnInit {

  viewPreguntasEncuesta:boolean = false;
  viewEdicionObjetoPregunta:boolean = false;
  viewEdicionObjetoOpcion:boolean = false;
  arregloEncuestas:any[] = [];
  preguntasEncuesta:any[] = [];
  encuestaSeleccionada:any;
  preguntaSeleccionada:any;
  opcionSeleccionada:any;
  descripcion:string;
  constructor(private data:CentralService){

  }


  ngOnInit(): void {
    this.traerEncuestas();
  }

  eliminarEncuesta(id:any)
  {
    this.data.eliminarEncuesta(id).then(respuesta =>
      {
        if(respuesta.mensaje == 1)
        {
          this.traerEncuestas();
        }
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  traerEncuestas()
  {
    this.data.obtenerEncuestas(0).then(respuesta =>
      {
        console.log(respuesta);
        this.arregloEncuestas = respuesta.encuestas;
      }).catch(error =>
        {
          console.log(error);
        })
  }

  traerPreguntasEncuesta(encuesta:any)
  {
    this.data.traerPreguntasEncuesta(encuesta.idEncuesta).then(respuesta =>
      {
        console.log("respuesta ",respuesta);
        this.preguntasEncuesta = respuesta;
        this.viewPreguntasEncuesta = true;
      }).catch(error =>
        {
          console.log("error ",error);
        })
  }

  editarObjetoPregunta(objeto:any)
  {
    console.log("pregunta :",objeto)
    this.descripcion = objeto.descripcion;
    this.viewEdicionObjetoPregunta = true;
  }

  editarObjetoOpcion(objeto:any)
  {
    console.log("opcion :",objeto)
    this.descripcion = objeto.descripcion;
    this.viewEdicionObjetoPregunta = true;
  }

  verPregunta(pregunta:any)
  {
    console.log("pregunta seleccionada : ",pregunta);
  }

  verOpcion(opcion:any)
  {
    console.log("opcion seleccionada : ",opcion);
  }

}
