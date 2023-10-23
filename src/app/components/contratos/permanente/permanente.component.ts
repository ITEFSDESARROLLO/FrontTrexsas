import { Component, OnInit } from '@angular/core';
import {CentralService} from '../../../services/central.service';
import {Constants} from '../../../constants/app-constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-permanente',
  templateUrl: './permanente.component.html',
  styleUrls: ['./permanente.component.css']
})
export class PermanenteComponent implements OnInit {

  res:any;
  maxpag:any;
  pagact:number;
  labels: any;
  crearContrato = false;
  showTable = true;

  constructor(
    private data: CentralService,
    private httpService: HttpClient
  ) {
    this.res=[];
    this.maxpag=[];
    this.pagact=0;
  }

  ngOnInit() {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.ObtenerContratos(0);
  }

  ObtenerContratos(pag:number): void {

    this.data
      .obtenerPermanentes(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);

        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.contratos;
      });

  }

  CrearContrato (){
    this.crearContrato = true;
    this.showTable = false;
  }

  BuscarContrato (){
    this.showTable = true;
  }

  LimpiarContrato (){
    this.showTable = false;
  }

  CancelarContrato() {
    this.showTable = false;
    this.crearContrato = false;
  }

    GuardarContrato() {
      this.showTable = false;
      this.crearContrato = false;
    }

}
