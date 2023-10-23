import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CentralService } from '../../../services/central.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas-pasajero',
  templateUrl: './reservas-pasajero.component.html',
  styleUrls: ['./reservas-pasajero.component.css']
})
export class ReservasPasajeroComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];

  
  reservasPasajero:any;
  constructor(private data: CentralService,private router:Router, private httpService: HttpClient) { 
    this.res=[];
    this.maxpag=[];
    this.pagact=0;
  }

  ngOnInit(): void {
    this.traerReservas();
  }

  estadoReserva(id,estado){
    var cj:any={};
    cj.idReserva=id;
    cj.estadoReserva=estado;
    console.log(cj);
    this.data.estadoReserva(cj).subscribe(
      (res:any)=>{
        this.traerReservas();
      }
    )
  }

  traerReservas()
  {
    this.data.obtenerReservasPasajero().then((respuesta:any) =>
      {
        console.log("respuesta : ",respuesta);
        this.reservasPasajero = respuesta.reservas;
      }).catch(error =>{
        console.log("error : ",error);
      });
  }

  
}
