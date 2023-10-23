import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CentralService } from './../../../services/central.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones-list',
  templateUrl: './notificaciones-list.component.html',
  styleUrls: ['./notificaciones-list.component.css']
})
export class NotificacionesListComponent implements OnInit 
{
  labels:any;
  res:any;
  maxpag:any;
  pagact:number;
  myControl = new FormControl();
  public listperm:Array<any>=[];
  UrlTree:any=[];

  constructor(private data:CentralService, private router:Router, private httpServer:HttpClient)
  {
    this.res = [];
    this.maxpag = [];
    this.pagact = 0;
  }

  ngOnInit(): void 
  {
    this.httpServer.get(Constants.URL_LABELS).subscribe(data =>{
      this.labels = data;
    });
    this.obtenerNotificaciones(0);
    this.mostrar();
  }

    /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
     ordenar(nom:number){
      var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
      if(1==nom){
        this.res.sort(function(a, b) {
          var textA = a.idReserva;
          var textB = b.idReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-1==nom){
        this.res.sort(function(a, b) {
          var textA = a.idReserva;
          var textB = b.idReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(2==nom){
        this.res.sort(function(a, b) {
          var textA = a.nombrePasajero;
          var textB = b.nombrePasajero;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-2==nom){
        this.res.sort(function(a, b) {
          var textA = a.nombrePasajero;
          var textB = b.nombrePasajero;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(3==nom){
        this.res.sort(function(a, b) {
          var textA = a.fechaInicioReserva;
          var textB = b.fechaInicioReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-3==nom){
        this.res.sort(function(a, b) {
          var textA = new Date(a.fechaInicioReserva);
          var textB = new Date(b.fechaInicioReserva);
          return textA > textB;
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(4==nom){
        this.res.sort(function(a, b) {
          var textA = a.direccionOrigenReserva;
          var textB = b.direccionOrigenReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-4==nom){
        this.res.sort(function(a, b) {
          var textA = a.direccionOrigenReserva;
          var textB = b.direccionOrigenReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(5==nom){
        this.res.sort(function(a, b) {
          var textA = a.direccionDestinoReserva;
          var textB = b.direccionDestinoReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-5==nom){
        this.res.sort(function(a, b) {
          var textA = a.direccionDestinoReserva;
          var textB = b.direccionDestinoReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(6==nom){
        this.res.sort(function(a, b) {
          var textA = a.distanciaReserva;
          var textB = b.distanciaReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-6==nom){
        this.res.sort(function(a, b) {
          var textA = a.distanciaReserva;
          var textB = b.distanciaReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(7==nom){
        this.res.sort(function(a, b) {
          var textA = a.duracionReserva;
          var textB = b.duracionReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-7==nom){
        this.res.sort(function(a, b) {
          var textA = a.duracionReserva;
          var textB = b.duracionReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(8==nom){
        this.res.sort(function(a, b) {
          var textA = a.estadoReserva;
          var textB = b.estadoReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-8==nom){
        this.res.sort(function(a, b) {
          var textA = a.estadoReserva;
          var textB = b.estadoReserva;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(9==nom){
        this.res.sort(function(a, b) {
          var textA = a.nombreConductor;
          var textB = b.nombreConductor;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-9==nom){
        this.res.sort(function(a, b) {
          var textA = a.nombreConductor;
          var textB = b.nombreConductor;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
      if(10==nom){
        this.res.sort(function(a, b) {
          var textA = a.placaVehiculo;
          var textB = b.placaVehiculo;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
      }else if(-10==nom){
        this.res.sort(function(a, b) {
          var textA = a.placaVehiculo;
          var textB = b.placaVehiculo;
          return collator.compare(textA,textB);
          //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.res.reverse()
      }
    }

    obtenerNotificaciones(pag:number):void{
      this.data.obtenerNotificaciones(0).then(res =>
        {
          console.log("lista de notificaciones : ",res.notificaciones);
          this.res = res.notificaciones;
          
        }).catch(error =>
          {
            console.log("error :",error);
          })
    }

    mostrar()
    {
      this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
      console.log("url tree : ",this.UrlTree)
      this.data.obtenerAcceso().subscribe(
        (res:Array<any>)=>{
          this.listperm = res;
          console.log("lo que se obtuvo : ",res);
        }
      )
    }

    borrarNotificacion(id:string)
    {
      this.data.eliminarNotificacion(id).subscribe(resp =>
        {
          console.log("res :",resp['mensaje'])
          if(resp['mensaje'] == 1)
          {
            this.data.obtenerNotificaciones(0).then(res =>
              {
                this.res = res.notificaciones;
              }).catch(error =>
                {
                  console.log("error : ",error)
                })
            console.log("bien");
          }else{
            console.log("mal");
          }
        })
    }

    enviarNotificacion(id:number)
    {

    }
}
