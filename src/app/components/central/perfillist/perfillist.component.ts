import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { Constants } from 'src/app/constants/app-constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfillist',
  templateUrl: './perfillist.component.html',
  styleUrls: ['./perfillist.component.css']
})
export class PerfillistComponent implements OnInit {
  
  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  UrlTree:any=[];

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
    this.ObtenerPerfiles(0);
  }

  

  ObtenerPerfiles(pag:number): void {
      
      this.data
      .obtenerPerfiles(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.perfiles;
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
        var textA = a.idPerfil;
        var textB = b.idPerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idPerfil;
        var textB = b.idPerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePerfil;
        var textB = b.nombrePerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePerfil;
        var textB = b.nombrePerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.observacionesPerfil;
        var textB = b.observacionesPerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.observacionesPerfil;
        var textB = b.observacionesPerfil;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaRegistroPerfil);
        var textB = new Date(b.fechaRegistroPerfil);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA =  new Date(a.fechaRegistroPerfil);
        var textB = new Date(b.fechaRegistroPerfil);
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
    resveh.idPerfil=id;
    resveh.estadoPerfil=2;
    console.log(resveh);
    this.data.EliminarPerfil(resveh).subscribe(
      (res:any)=>{
        this.ObtenerPerfiles(this.pagact);
      }
    )
  }
}
