import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { Workbook } from 'exceljs';
//import * as Excel from 'exceljs/dist/exceljs.min.js'
//import { fstat } from 'node:fs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenserviciolist',
  templateUrl: './ordenserviciolist.component.html',
  styleUrls: ['./ordenserviciolist.component.css']
})
export class OrdenserviciolistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  UrlTree:any=[];
  fechaInicio:Date;
  fechaFin:Date;
  nombreConductor:any;
  criterioFiltro:string;
  valorFiltro:string;
  listaClientes:any;
  orden:any;
  displayOrdenServicio:boolean = false;
  ordenesFiltradas:any[] = [];
  public listperm:Array<any>=[];
  constructor(private data: CentralService,private router:Router, private httpService: HttpClient) {
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
    this.ObtenerOrdenesServicio(0);
    this.mostrar();
  }

  /**
   * Lista los accesos autorizados para restringir los accesos
   */
   mostrar(){
    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        this.listperm=res;
        console.log(res);
      }
    )
  }

  /**
   * Consulta si tiene acceso para saber si mostrarlo o no, o en determinado caso, inhabilitarlo
   * @param {string} nom Es la uri padre
   * @param {string} bac Es al uri hija
   * @returns true o false dependiendo de si tiene acceso o no
   */
  consult(nom:string,bac:string):boolean{
    var urip=this.listperm.findIndex(element=>element.uriPadre==nom && element.uriHija==bac);
    if(urip!=-1){
      return true
    }else{
      return false;
    }

  }

  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
   ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idOrdenServicio;
        var textB = b.idOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idOrdenServicio;
        var textB = b.idOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.numeroVoucher;
        var textB = b.numeroVoucher;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.numeroVoucher;
        var textB = b.numeroVoucher;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaInicioReserva;
        var textB = b.fechaInicioReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
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
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorConductorOrdenServicio;
        var textB = b.valorConductorOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorConductorOrdenServicio;
        var textB = b.valorConductorOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorFacturarOrdenServicio;
        var textB = b.valorFacturarOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorFacturarOrdenServicio;
        var textB = b.valorFacturarOrdenServicio;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  ObtenerOrdenesServicio(pag:number): void {

    this.data
    .obtenerOrdenesServicioLista()
    .subscribe((res:any) => {
      console.log("generar ordenes de servicio: ",res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      this.res=res.ordenesServicio;
      this.ordenesFiltradas = res.ordenesServicio;
    });

  }

  generarFormatoFecha(fecha:Date)
  {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return año+"-"+mes+"-"+dia;
  }

  filtrarOrdenesServicio(): void {

    let inicio = this.generarFormatoFecha(this.fechaInicio);
    let fin = this.generarFormatoFecha(this.fechaFin);
    this.data
    .filtrarOrdenesServicioLista(inicio,fin,this.nombreConductor)
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      console.log(this.pagact);
      this.res=res.ordenesServicio;
    });

  }

  download(nom:string){
    this.data.obtenerPdfOS(nom);
  }

  generarExcel()
  {
    let ordenesExportar = this.res;
    let libroTrabajoExcel = new Workbook();
    let hojaTrabajoExcel = libroTrabajoExcel.addWorksheet("Ordenes Servicio");
    //let nombresColumnas = Object.keys(ordenesExportar[0]);
    let nombresColumnas = ["id","Nombre","Apellido","Placa Vehículo","Fecha","Voucher","Valor Facturar","Valor Orden Servicio"];
    let filaNombresCabezeras = hojaTrabajoExcel.addRow(nombresColumnas);
    for (const iterator of ordenesExportar)
    {
      console.log("iterador: ",iterator)
      let llavesObjeto = Object.keys(iterator);
      console.log("llaves objeto: ",llavesObjeto);
      let temp = [];

      temp.push(iterator["idOrdenServicio"]);
      temp.push(iterator["nombrePersona"]);
      temp.push(iterator["apellidoPersona"]);
      temp.push(iterator["placaVehiculo"]);
      temp.push(iterator["fechaInicioReserva"]);
      temp.push(iterator["numeroVoucher"]);
      temp.push(iterator["valorFacturarOrdenServicio"]);
      temp.push(iterator["valorConductorOrdenServicio"]);
      /*for (const objeto  of llavesObjeto)
      {
        console.log("objeto: ",objeto)
        temp.push(iterator[objeto]);
      }*/
      console.log("temporal: ",temp);
      hojaTrabajoExcel.addRow(temp);
    }
    let fecha = new Date();
    let nombreArchivo = "ordenesGeneradas";
    libroTrabajoExcel.xlsx.writeBuffer().then((data)=>
    {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadheetml.sheet'});
      fs.saveAs(blob, nombreArchivo+"-"+fecha.valueOf+".xlsx");
    })
  }

  filtrar()
  {
    let inicio = this.generarFormatoFecha(this.fechaInicio);
    let fin = this.generarFormatoFecha(this.fechaFin);
    console.log(this.criterioFiltro);
    console.log(this.valorFiltro);
    this.data.filtrarOrdenesServicio(this.criterioFiltro,this.valorFiltro,inicio,fin).then(respuesta =>
      {
        console.log(respuesta)
        this.res = respuesta.ordenesServicio;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  buscarCliente()
  {
    this.data.obtenerClientesOrdenes().then(respuesta =>
      {
        this.listaClientes = respuesta.clientes;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  traerOrdenServicio(id:any)
  {
    this.data.obtenerOrdenServicio(id).then(respuesta =>
      {
        this.orden = respuesta;
        this.displayOrdenServicio = true;
        console.log("orden de servicio : ",respuesta);
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  filtrarO(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.ordenesFiltradas = this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.ordenesFiltradas);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }

  eliminarOrdenServicio(idOrdenServicio:any)
  {
    this.data.eliminarOrdenServicio(idOrdenServicio).then(respuesta=>{
      console.log("respuesta : ",respuesta);
      Swal.fire({
        title: 'ÉXITO',
        text: 'ORDEN DE SERVICIO ELIMINADA',
        icon:'success'
      })
      this.ObtenerOrdenesServicio(0);
    }).catch(error =>{
      console.log("error : ",error)
      Swal.fire({
        title: 'FATAL',
        text: 'Error en el servidor',
        icon:'error'
      })
    })
  }

}
