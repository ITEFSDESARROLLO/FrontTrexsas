import { CentralService } from 'src/app/services/central.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-conductores',
  templateUrl: './calificaciones-conductores.component.html',
  styleUrls: ['./calificaciones-conductores.component.css']
})
export class CalificacionesConductoresComponent implements OnInit {

  documentoConductor:string;
  calificaciones:any[];
  nombreConductor:string;
  constructor(private data:CentralService) { }

  ngOnInit(): void {
    this.calificaciones = [];
  }

  buscarCalificacionesConductor()
  {
    let documento = this.documentoConductor;
    this.data.obtenerCalificacionesConductor(documento).then(respuesta =>
      {
        console.log("respuesta : ",respuesta);
        this.calificaciones = respuesta.mensaje.calificaciones;
        this.nombreConductor = respuesta.mensaje.Conductor;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

}
