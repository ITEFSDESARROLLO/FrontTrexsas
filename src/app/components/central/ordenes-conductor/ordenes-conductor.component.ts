import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { CentralService } from './../../../services/central.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ordenes-conductor',
  templateUrl: './ordenes-conductor.component.html',
  styleUrls: ['./ordenes-conductor.component.css']
})
export class OrdenesConductorComponent implements OnInit {

  maxpag:any[];
  pagact:number;
  res:any;
  labels:any;
  reservasDisponibles:any;
  constructor(private data:CentralService,private httpService: HttpClient) {
    this.res=[];
    this.maxpag=[];
    this.pagact=0;
   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.ObtenerReservas(0);
    this.obtenerReservasDisponibles(0);
    this.validarOrdenServicio(0);


  }

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

  estadoReserva(id,estado){
    var cj:any={};
    cj.idReserva=id;
    cj.estadoReserva=estado;
    console.log(cj);
    this.data.estadoReserva(cj).subscribe(
      (res:any)=>{
        this.ObtenerReservas(this.pagact);
      }
    )
  }

  obtenerReservasDisponibles(pagina:number)
  {
    this.data.obtenerReservasDisponibles(pagina).then(respuesta =>
      {
        this.reservasDisponibles = respuesta.reservas;
        console.log("disponibles : ",respuesta.reservas);
      }).catch(error=>
        {
          console.log("error : ",error);
        })
  }

  ObtenerReservas(pag:number): void {

    this.data
    .obtenerReservasConductor(pag)
    .then(res => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      console.log("reservas recibidas : ",res.reservas);
      this.res=res.reservas;
      if(this.res.length == 0)
      {
        alert("usted todavía no tiene reservas asignadas");
      }
    }).catch(error =>
      {
        console.log("error : ",error)
      })

  }

  validarOrdenServicio(pagina:number){
    this.data
    .conductorOrdenesServicio();
  }

}
