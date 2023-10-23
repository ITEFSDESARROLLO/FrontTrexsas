import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-propietariolist',
  templateUrl: './propietariolist.component.html',
  styleUrls: ['./propietariolist.component.css']
})
export class PropietariolistComponent implements OnInit {

  labels: any;

  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
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
    this.ObtenerPropietarios(0);
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

  ObtenerPropietarios(pag:number): void {
      
    this.data
    .obtenerPropietarios(pag)
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      this.res=res.propietarios;
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
      var textA = a.idPropietario;
      var textB = b.idPropietario;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
  }else if(-1==nom){
    this.res.sort(function(a, b) {
      var textA = a.idPropietario;
      var textB = b.idPropietario;
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
}
/**
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
elimin(id){
  var resveh:any={};
  resveh.idPropietario=id;
  resveh.estadoPropietario=2;
  console.log(resveh);
  this.data.EliminarProp(resveh).subscribe(
    (res:any)=>{
      this.ObtenerPropietarios(this.pagact);
    }
  )
}

fitrarVinculaciones()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    console.log("valor : ",this.valorCriterioSeleccionado);
    this.data.filtrarPropietario(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.propietarios;
    }).catch(error =>
      {
        console.log("error : ",error);
      });
  }

}
