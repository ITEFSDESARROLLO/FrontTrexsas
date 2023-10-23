import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fueclist',
  templateUrl: './fueclist.component.html',
  styleUrls: ['./fueclist.component.css']
})
export class FueclistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];

  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";
  ciudades:any[];
  ciudadOrigen:any;
  ciudadDestino:any;
  ciudadesFiltradas:any[];
  ciudadSeleccionada:any;
  fuecsFiltrados:any[] =[];
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
    this.mostrar();
    this.ObtenerFuecs(0);
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

  ObtenerFuecs(pag:number): void {

      this.data
      .obtenerFuecs(pag)
      .subscribe((res:any) => {
        console.log("fuecs : ",res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.fuecs;
        this.fuecsFiltrados = res.fuecs;
      });

  }
  download(nom:string){
    this.data.obtenerPdfF(nom);
  }
  async generarPdf(id:number)
  {
    let nombreArchivo:any = await this.data.generarPdf(id);
    console.log("ruta: ",nombreArchivo);
    this.ObtenerFuecs(0);
    this.download(nombreArchivo.mensaje);

  }

  anular(id:number)
  {
    this.data.anularFuec(id).then(respuesta =>
      {
        if(respuesta.mensaje==1)
        {
          Swal.fire({
            title: 'Éxito',
            text: 'FUEC ANULADO',
            icon:'success',
            showConfirmButton:true
          }).then(resp =>
            {
              if(resp.isConfirmed)
              {
                this.ObtenerFuecs(0);
              }
            })
        }
      }).catch(error =>
        {
          Swal.fire({
            title: 'ERROR',
            text: 'Error en el sistema : '+error.error,
            icon:'error',
          })
        })
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
        var textA = a.objetoContrato;
        var textB = b.objetoContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.objetoContrato;
        var textB = b.objetoContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoRuta;
        var textB = b.codigoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoRuta;
        var textB = b.codigoRuta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[0]?.nombrePersona + " " + a.conductorList[0]?.apellidoPersona;
        var textB = b.conductorList[0]?.nombrePersona + " " + b.conductorList[0]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[0]?.nombrePersona + " " + a.conductorList[0]?.apellidoPersona;
        var textB = b.conductorList[0]?.nombrePersona + " " + b.conductorList[0]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[1]?.nombrePersona + " " + a.conductorList[1]?.apellidoPersona;
        var textB = b.conductorList[1]?.nombrePersona + " " + b.conductorList[1]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[1]?.nombrePersona + " " + a.conductorList[1]?.apellidoPersona;
        var textB = b.conductorList[1]?.nombrePersona + " " + b.conductorList[1]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[2]?.nombrePersona + " " + a.conductorList[2]?.apellidoPersona;
        var textB = b.conductorList[2]?.nombrePersona + " " + b.conductorList[2]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.conductorList[2]?.nombrePersona + " " + a.conductorList[2]?.apellidoPersona;
        var textB = b.conductorList[2]?.nombrePersona + " " + b.conductorList[2]?.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(8==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioFuec);
        var textB = new Date(b.fechaInicioFuec);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-8==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioFuec);
        var textB = new Date(b.fechaInicioFuec);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(9==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaFinFuec;
        var textB = b.fechaFinFuec;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-9==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaFinFuec;
        var textB = b.fechaFinFuec;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(10==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoFuec;
        var textB = b.codigoFuec;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-10==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoFuec;
        var textB = b.codigoFuec;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  obtenerCiudades()
  {
    this.data
      .ObtenerCiudad()
      .subscribe((response:any) => {
        console.log("ciudades : ",response)
        this.ciudades = response;
        this.ciudadOrigen = response;
        this.ciudadDestino = response;
      });
  }

  fitrarVinculaciones()
  {
    if(this.criterioSeleccionado!="od")
    {
      console.log("criterio seleccionado : ",this.criterioSeleccionado);
      console.log("valor : ",this.valorCriterioSeleccionado);
      this.data.filtrarRutasFuec(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.fuecs;
      }).catch(error =>{
        console.log("error : ",error);
      });
    }else{
      console.log("criterio seleccionado : ",this.criterioSeleccionado);
      console.log("valor : ",this.ciudadSeleccionada);
      this.data.filtrarRutasFuecOrigenDestino(this.ciudadOrigen.ciudad,this.ciudadDestino.ciudad).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.fuecs;
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

    filtrar(valor:any)
    {
      console.log("valor  : ",valor);
      //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
      this.fuecsFiltrados = this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
      console.log(this.fuecsFiltrados);
      //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
    }
}
