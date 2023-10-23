import {Component, Inject, OnInit} from '@angular/core';
import {CentralService} from '../../../services/central.service';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../../constants/app-constants';

@Component({
  selector: 'app-ocasional',
  templateUrl: './ocasional.component.html',
  styleUrls: ['./ocasional.component.css']
})
export class OcasionalComponent implements OnInit {
  
  res:any;
  maxpag:any;
  pagact:number;
  labels: any;
  showTable = false;
  crearContrato = false;
  continuar = false;

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
      .obtenerOcasionales(pag)
      .subscribe((res:any) => {-
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
    this.continuar = true;
  }

  BuscarContrato (){
    this.showTable = true;
    this.continuar = false;
  }

  LimpiarContrato (){
    this.showTable = false
    this.continuar = false;
  }

  CancelarContrato() {
    this.showTable = false;
    this.crearContrato = false;
    this.continuar = false;
  }

  GuardarContrato() {
    this.showTable = false;
    this.crearContrato = true;
    this.continuar = false;
  }

}
