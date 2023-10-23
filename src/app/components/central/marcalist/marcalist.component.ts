import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-marcalist',
  templateUrl: './marcalist.component.html',
  styleUrls: ['./marcalist.component.css']
})
export class MarcalistComponent implements OnInit {

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
      .obtenerMarcas(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.marcas;
      });
    
  }

  /**
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
   eliminar(id){
    var Json:any={};
    Json.idMarca=id;
    Json.estadoMarca=2;
    console.log(Json);
    this.data.estadoMarca(Json).subscribe(
      (res:any)=>{
        this.Obtener(this.pagact);
      }
    )
  }

  filtrar()
  {
    this.data.filtrarMarcas(this.criterioFiltro,this.valorFiltro).then(respuesta =>
      {
        console.log(respuesta)
        this.res = respuesta.marcas;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }
}
