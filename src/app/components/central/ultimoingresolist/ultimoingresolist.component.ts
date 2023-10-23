import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-ultimoingresolist',
  templateUrl: './ultimoingresolist.component.html',
  styleUrls: ['./ultimoingresolist.component.css']
})
export class UltimoingresolistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;

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
    this.ObtenerUltimosIngresos(0);
  }

  ObtenerUltimosIngresos(pag:number): void {
      
    this.data
    .obtenerUltimosIngresos(pag)
    .subscribe((res:any) => {
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      this.res=res.ultimosIngresos;
    });
  
  }
}
