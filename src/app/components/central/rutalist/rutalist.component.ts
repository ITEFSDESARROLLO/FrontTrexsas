import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-rutalist',
  templateUrl: './rutalist.component.html',
  styleUrls: ['./rutalist.component.css']
})
export class RutalistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];

  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";
  ciudades:any[];
  ciudadesOrigen:any;
  ciudadesDestino:any;
  ciudadesFiltradas:any[];
  ciudadSeleccionada:any;

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

    this.ObtenerRutas(0);
    this.mostrar();
    this.obtenerCiudades();
    
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

  ObtenerRutas(pag:number): void {
      
      this.data
      .obtenerRutas(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.rutas;
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
        var textA = a.codigoRuta;
        var textB = b.codigoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoRuta;
        var textB = b.codigoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.ciudadOrigen;
        var textB = b.ciudadOrigen;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.ciudadOrigen;
        var textB = b.ciudadOrigen;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.ciudadDestino;
        var textB = b.ciudadDestino;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.ciudadDestino;
        var textB = b.ciudadDestino;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.regresoRuta;
        var textB = b.regresoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.regresoRuta;
        var textB = b.regresoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaRegistroRuta);
        var textB = new Date(b.fechaRegistroRuta);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA =  new Date(a.fechaRegistroRuta);
        var textB = new Date(b.fechaRegistroRuta);
        return textA > textB;
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
    resveh.idRuta=id;
    resveh.estadoRuta=2;
    console.log(resveh);
    this.data.EliminarRuta(resveh).subscribe(
      (res:any)=>{
        this.ObtenerRutas(this.pagact);
      }
    )
  }

  obtenerCiudades()
  {
    this.data
      .ObtenerCiudad()
      .subscribe((response:any) => {
        console.log("ciudades : ",response)
        this.ciudades = response;
        this.ciudadesOrigen = response;
        this.ciudadesDestino = response;
      });
  }

  fitrarVinculaciones()
  {
    if(this.criterioSeleccionado!="o" && this.criterioSeleccionado!="d")
    {
      console.log("criterio seleccionado : ",this.criterioSeleccionado);
      console.log("valor : ",this.valorCriterioSeleccionado);
      this.data.filtrarRutas(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.rutas;
      }).catch(error =>{
        console.log("error : ",error);
      });
    }else{
      console.log("criterio seleccionado : ",this.criterioSeleccionado);
      console.log("valor : ",this.ciudadSeleccionada);
      this.data.filtrarRutas(this.criterioSeleccionado,this.ciudadSeleccionada.ciudad).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.rutas;
      }).catch(error =>{
        console.log("error : ",error);
      });
    }
    
  }


  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.ciudades.length; i++) {
        let country = this.ciudades[i];
        if (country.ciudad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    
    this.ciudadesFiltradas = filtered;
}

}
