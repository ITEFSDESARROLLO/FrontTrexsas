import { FondoPensiones } from './../../../models/ModelosJ/fondo-pensiones';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-fondopensioneslist',
  templateUrl: './fondopensioneslist.component.html',
  styleUrls: ['./fondopensioneslist.component.css']
})
export class FondopensioneslistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  valorFiltro:string;
  criterioFiltro:string;

  constructor(private data: CentralService, private httpService: HttpClient) {
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
    this.Obtener(0);
  }

  Obtener(pag:number): void {
      
      this.data
      .obtenerFondosPensiones(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.fondosPensiones;
      });
    
  }
  /**
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
   eliminar(id){
    var Json:any={};
    Json.idFondoPensiones=id;
    Json.estadoFondoPensiones=2;
    console.log(Json);
    this.data.estadoFondoPensiones(Json).subscribe(
      (res:any)=>{
        this.Obtener(this.pagact);
      }
    )
  }

  filtrar()
  {
    this.data.filtrarFondoPensiones(this.criterioFiltro,this.valorFiltro).then(respuesta =>
      {
        console.log(respuesta)
        this.res = respuesta.fondosPensiones;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

}
