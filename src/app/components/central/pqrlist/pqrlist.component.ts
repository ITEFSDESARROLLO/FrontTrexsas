import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pqrlist',
  templateUrl: './pqrlist.component.html',
  styleUrls: ['./pqrlist.component.css']
})
export class PQRListComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  criterioSeleccionado:string;
  valorCriterioSeleccionado:string;
  mostrarQueja:boolean;
  pqrSeleccionada:any ={};
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
    this.ObtenerPQRS(0);
    this.mostrar();
  }

  mostrar(){
    
    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    //console.log(this.UrlTree);
    
    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        this.listperm=res;
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
        var textA = a.numeroCuentaCobro;
        var textB = b.numeroCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.numeroCuentaCobro;
        var textB = b.numeroCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaCuentaCobro;
        var textB = b.fechaCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaCuentaCobro);
        var textB = new Date(b.fechaCuentaCobro);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreCuentaCobro;
        var textB = b.nombreCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreCuentaCobro;
        var textB = b.nombreCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCuentaCobro;
        var textB = b.nitCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCuentaCobro;
        var textB = b.nitCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.conceptoCuentaCobro;
        var textB = b.conceptoCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.conceptoCuentaCobro;
        var textB = b.conceptoCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorCuentaCobro;
        var textB = b.valorCuentaCobro;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorCuentaCobro;
        var textB = b.valorCuentaCobro;
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

  ObtenerPQRS(pag:number): void {
      
    this.data
    .obtenerPQRS(pag)
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      console.log("res :",res)
      this.res=res.pqr;
    });
  
  }
  /** pendiente
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */


  eliminarCuenta(id){
    this.data.eliminarCuentaCobro(id).subscribe(
      (res:any)=>{
        this.ObtenerPQRS(this.pagact);
      }
    )
  }

  
  download(nom:string){
    this.data.obtenerPdfCC(nom);
  }

  verQueja(descripcion:any,tipo:any,redactor:any)
  {
    this.pqrSeleccionada = {
      descripcion:descripcion,
      tipo:tipo,
      redactor:redactor
    }
    console.log("selected : ",this.pqrSeleccionada);
    this.mostrarQueja = true;
  }

}
