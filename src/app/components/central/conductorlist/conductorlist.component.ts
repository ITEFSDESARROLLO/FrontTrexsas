import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-conductorlist',
  templateUrl: './conductorlist.component.html',
  styleUrls: ['./conductorlist.component.css']
})
export class ConductorlistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  conductorSeleccionado:any;
  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";

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
    this.ObtenerConductores(0);
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
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
elimin(id){
    var rescond:any={};
    rescond.idConductor=id;
    rescond.estadoConductor=2;
    this.data.EliminarCond(rescond).subscribe(
      (res:any)=>{
        this.ObtenerConductores(this.pagact);
      }
    );
  }

  /**
   * Obtiene los registros dependiendo de la pagina a consultar
   * @param pag Pagina a consultar
   */
  ObtenerConductores(pag:number): void {

      this.data
      .obtenerConductores(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.conductores;
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
        var textA = a.idConductor;
        var textB = b.idConductor;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idConductor;
        var textB = b.idConductor;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoPersona;
        var textB = b.documentoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoPersona;
        var textB = b.documentoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoPersona;
        var textB = b.telefonoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoPersona;
        var textB = b.telefonoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.correoPersona;
        var textB = b.correoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.correoPersona;
        var textB = b.correoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  fitrarVinculaciones()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    console.log("valor : ",this.valorCriterioSeleccionado);
    this.data.filtrarConductores(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.conductores;
    }).catch(error =>
      {
        console.log("error : ",error);
      });
  }

}
