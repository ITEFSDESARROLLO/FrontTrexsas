import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-facturalist',
  templateUrl: './facturalist.component.html',
  styleUrls: ['./facturalist.component.css']
})
export class FacturalistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  criterioSeleccionado:string;
  fechaSeleccionada:Date;
  clientes:any;
  clienteSeleccionado:any;
  valorCriterioSeleccionado:string;
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
    this.ObtenerFacturas(0);
    this.mostrar();
  }

  mostrar(){
    
    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    //console.log(this.UrlTree);
    
    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        this.listperm=res;
        console.log(res);
      }
    )
  }

  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
   ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idFactura;
        var textB = b.idFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idFactura;
        var textB = b.idFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaFactura;
        var textB = b.fechaFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaFactura);
        var textB = new Date(b.fechaFactura);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaInicioFactura;
        var textB = b.fechaInicioFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioFactura);
        var textB = new Date(b.fechaInicioFactura);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaFinFactura;
        var textB = b.fechaFinFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaFinFactura);
        var textB = new Date(b.fechaFinFactura);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.totalFactura;
        var textB = b.totalFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.totalFactura;
        var textB = b.totalFactura;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
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

  ObtenerFacturas(pag:number): void {
      
    this.data
    .obtenerFacturas(pag)
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      this.res=res.facturas;
    });
  
  }
  /** pendiente
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */

  estadoFactura(id,estado){
    var cj:any={};
    cj.idFactura=id;
    cj.estadoFactura=estado;
    console.log(cj);
    this.data.estadoFactura(cj).subscribe(
      (res:any)=>{
        this.ObtenerFacturas(this.pagact);
      }
    )
  }

  buscarClientes()
  {
    this.data.obtenerClientesFiltro().then(cli =>
      {
        console.log("clientes : ",cli);
        this.clientes = cli;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  filtrarFacturas()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    switch (this.criterioSeleccionado) {
      case "es":
      case "cli":
        console.log("valor Criterio : ",this.valorCriterioSeleccionado);
        this.data.filtrarFacturas(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(facturasFiltradas =>
          {
            console.log("facturas filtradas",facturasFiltradas);
            this.res = facturasFiltradas.facturasFiltradas;
          }).catch(error =>
            {
              console.log("error",error)
            })
        break;
      case "fi":
      case "ff":
        console.log("valor Criterio : ",this.fechaSeleccionada);
        let dia = this.fechaSeleccionada.getDate();
        let mes = this.fechaSeleccionada.getMonth();
        let año = this.fechaSeleccionada.getFullYear();
        let mesSalida = mes<9?"0"+(mes+1):mes+1;
        let diasalida = dia<10?"0"+dia:dia;
        let fechaFiltro = año+"-"+mesSalida+"-"+diasalida
        console.log("fecha ingresada : ",fechaFiltro);
        this.data.filtrarFacturas(this.criterioSeleccionado,fechaFiltro).then(facturasFiltradas =>
          {
            console.log("facturas filtradas",facturasFiltradas);
            this.res = facturasFiltradas.facturasFiltradas;
          })
        break;
      
      default:
        break;
    }
    
    
    
    
  }

  
  download(nom:string){
    this.data.obtenerPdfFactura(nom);
  }
}
