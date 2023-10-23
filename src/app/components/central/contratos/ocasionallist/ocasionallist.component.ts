import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-ocasionallist',
  templateUrl: './ocasionallist.component.html',
  styleUrls: ['./ocasionallist.component.css']
})
export class OcasionallistComponent implements OnInit {

  res:any;
  maxpag:any;
  pagact:number;
  labels: any;

  constructor(private data: CentralService,private httpService: HttpClient) {
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

  download(nom:string){
    this.data.obtenerPdfCO(nom);
  }

  BuscarContrato (){
  }

  LimpiarContrato (){
  }

  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
  ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.numeracionContrato;
        var textB = b.numeracionContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.numeracionContrato;
        var textB = b.numeracionContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCliente;
        var textB = b.nitCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCliente;
        var textB = b.nitCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorContrato;
        var textB = b.valorContrato;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorContrato;
        var textB = b.valorContrato;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreResponsableContrato;
        var textB = b.nombreResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreResponsableContrato;
        var textB = b.nombreResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.cedulaResponsableContrato;
        var textB = b.cedulaResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.cedulaResponsableContrato;
        var textB = b.cedulaResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(8==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoResponsableContrato;
        var textB = b.telefonoResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      
    }else if(-8==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoResponsableContrato;
        var textB = b.telefonoResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }


}
