import { LoginService } from './../../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
import { ChartType } from 'angular-google-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  etiquetasPapelesVehiculos:any[] = [];
  papelesVencidosVehiculo:any[] = [];
  papelesVigentesVehiculo:any[] = [];
  etiquetasCifras:any[] = [];
  cifrasConductores:any[] = [];
  cifrasEmpresa:any[] = [];
  cifrasGanancias:any[] = [];
  etiquetasEstadosServicios:any[] = [];
  serviciosEstadosSistema:any[] = [];
  barChartOptionsCifras:ChartConfiguration['options'];
  barChartOptions: ChartConfiguration['options'];
  barChartType: any = 'bar';
  barChartDataServicios: ChartData<'bar'>;
  barChartDataCifras: ChartData<'bar'>;
  barChartDataPapeles: ChartData<'bar'>;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private servicioLogeo:LoginService)
  {
    this.traerCifras();
    this.traerPapelesVencidoVehiculo();
  }

  ngOnInit(): void {

  }

  /*public barChartDataServicios: ChartData<'bar'> = {
    labels: this.etiquetasEstadosServicios,
    datasets: [
      { data: this.serviciosEstadosSistema}
    ]
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

  public barChartDataCifras: ChartData<'bar'> = {
    labels: this.etiquetasCifras,
    datasets: [
      { data: this.cifrasConductores,label:"conductores",backgroundColor:"#ffcf4b"},
      { data: this.cifrasEmpresa,label:"empresa"},
      { data: this.cifrasGanancias,label:"ganancia",backgroundColor:"#F75C4C"}
    ]
  };*/

  traerPapelesVencidoVehiculo()
  {
    this.servicioLogeo.traerEstadisticasVehiculos().then(respuesta =>{
      let vehiculos = respuesta.vehiculos;
      for (const vehiculo of vehiculos)
      {
        this.etiquetasPapelesVehiculos.push(vehiculo.dato);
        this.papelesVencidosVehiculo.push(vehiculo.vencido.total);
        this.papelesVigentesVehiculo.push(vehiculo.vigente.total);
      }
      this.barChartOptions = {
        responsive: true,
        scales: {
          x: {},
          y: {
            min: 0
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      };
      this.barChartDataPapeles= {
        labels: this.etiquetasPapelesVehiculos,
        datasets: [
          { data: this.papelesVencidosVehiculo,label:"vencidos",backgroundColor:"#F75C4C"},
          { data: this.papelesVigentesVehiculo,label:"vigentes",backgroundColor:"#1ebc61"}
        ]
      };
    })
  }

  traerCifras()
  {
    this.servicioLogeo.traerEstadisticasServicios().then(respuesta =>
      {
        console.log("respuesta : ",respuesta);
        let cifras = respuesta.cifra;
        let estados = respuesta.estadosServicios;
        for (const cifra of cifras)
        {
          this.etiquetasCifras.push(cifra.Mes);
          this.cifrasConductores.push(cifra.Pagado_Conductores);
          this.cifrasEmpresa.push(cifra.Total_Facturado);
          this.cifrasGanancias.push(cifra.Ganancia);
        }
        for (const estado of estados)
        {
          this.etiquetasEstadosServicios.push(estado.estado);
          this.serviciosEstadosSistema.push(estado.total);
        }

        this.barChartOptionsCifras = {
          responsive: true,
          scales: {
            x: {},
            y: {
              min: -1000000
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        };

        this.barChartDataCifras = {
          labels: this.etiquetasCifras,
          datasets: [
            { data: this.cifrasConductores,label:"conductores",backgroundColor:"#ffcf4b"},
            { data: this.cifrasEmpresa,label:"empresa"},
            { data: this.cifrasGanancias,label:"ganancia",backgroundColor:"#F75C4C"}
          ]
        };

        this.barChartDataServicios = {
          labels: this.etiquetasEstadosServicios,
          datasets: [
            { data: this.serviciosEstadosSistema}
          ]
        };

      })
  }

}
