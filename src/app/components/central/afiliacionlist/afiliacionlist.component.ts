import { CentralService } from './../../../services/central.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-afiliacionlist',
  templateUrl: './afiliacionlist.component.html',
  styleUrls: ['./afiliacionlist.component.css']
})
export class AfiliacionlistComponent implements OnInit {
  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";
  arregloTipoVehiculoFiltro:any[]=[];
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
    this.ObtenerAfiliaciones();
    this.mostrar()
  }


  /**
   * Lista los accesos autorizados para restringir los accesos
   */
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
   * Obtener los registros de las afiliaciones
   * @param pag pagina a consultar
   */
  ObtenerAfiliaciones(): void {
      console.log("llamando a afiliaciones");
      this.data
      .obtenerAfiliaciones()
      .subscribe((res:any) => {
        console.log("vinculo",res);
        /*this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);

        }
        //this.pagact=pag;*/
        console.log(this.pagact);
        this.res=res.afiliados;
      });

  }

  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
  ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idAfiliacion;
        var textB = b.idAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idAfiliacion;
        var textB = b.idAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaAfiliacion;
        var textB = b.placaAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaAfiliacion;
        var textB = b.placaAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.claseVehiculoAfiliacion;
        var textB = b.claseVehiculoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.claseVehiculoAfiliacion;
        var textB = b.claseVehiculoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoAfiliacion;
        var textB = b.documentoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoAfiliacion;
        var textB = b.documentoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreAfiliacion;
        var textB = b.nombreAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreAfiliacion;
        var textB = b.nombreAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoAfiliacion;
        var textB = b.apellidoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoAfiliacion;
        var textB = b.apellidoAfiliacion;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  buscarTipoVehiculo()
  {
    this.data.obtenerTiposVehiculoFiltro().then(respuesta =>
      {
        console.log("respuesta ",respuesta);
        this.arregloTipoVehiculoFiltro = respuesta.tiposVehiculo;
      }).catch(error =>{
        console.log("error :",error);
      })
  }

  fitrarVinculaciones()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    console.log("valor : ",this.valorCriterioSeleccionado);
    this.data.filtrarVinculaciones(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.afiliaciones;
    }).catch(error =>
      {
        console.log("error : ",error);
      });
  }

}
