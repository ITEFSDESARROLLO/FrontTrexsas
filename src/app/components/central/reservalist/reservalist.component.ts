import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { deepStrictEqual } from 'assert';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reservalist',
  templateUrl: './reservalist.component.html',
  styleUrls: ['./reservalist.component.css']
})
export class ReservalistComponent implements OnInit {




  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];



  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];


  criterioSeleccionado:string;
  valorCriterioSeleccionado:string;
  countries: any[];
  filteredCountries: string[];
  direcciones:string[]=[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  direccionesFiltradas: Observable<string[]>;
  filtradosServicios:any[] = [];
  verColumnaReservas:boolean = true;
  verColumnaObservaciones:boolean = true;
  verColumnaPasajero:boolean = true;
  verColumnaFechaSalida:boolean = true;
  verColumnaHora:boolean = true;
  verColumnaOrigen:boolean = true;
  verColumnaDestino:boolean = true;
  verColumnaEstado:boolean = true;
  verColumnaConductor:boolean = true;
  verColumnaVehiculo:boolean = true;
  verColumnaCliente:boolean = true;
  displayFiltroColumnas:boolean = false;
  displayFiltroDatosColumnas:boolean = false;

  nombrePasajeroFiltro:string = "";
  destinoFiltro:string = "";
  origenFiltro:string = "";
  observacionesFiltro:string = "";
  conductorFiltro:string = "";
  placaFiltro:string = "";
  clienteFiltro:string = "";
  inicioFiltro:Date;
  finFiltro:Date;
  estadoFiltro:string="0";
  displayReplicarServicio:boolean = false;
  fechasReplicados:any[] = [];
  idServicioReplicar:any;
  constructor(private data: CentralService,private router:Router, private httpService: HttpClient) {
    this.res=[];
    this.maxpag=[];
    this.pagact=0;
  }

  limpiar(){
    this.nombrePasajeroFiltro = "";
    this.destinoFiltro = "";
    this.origenFiltro = "";
    this.observacionesFiltro = "";
    this.conductorFiltro = "";
    this.placaFiltro= "";
    this.clienteFiltro = "";
    this.inicioFiltro = undefined;
    this.finFiltro = undefined;
    this.estadoFiltro="0";
    this.filtradosServicios = this.res;
    this.displayFiltroDatosColumnas = false;

  }

  ngOnInit(): void {
    this.direccionesFiltradas = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filtrarDirecciones(value))
      );
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.ObtenerReservas();
    this.mostrar();
  }

  mostrar(){

    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    //console.log(this.UrlTree);

    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        this.listperm=res;
        console.log("permisos en reservas : ",res);
      }
    )
  }

  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
   ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idReserva;
        var textB = b.idReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idReserva;
        var textB = b.idReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePasajero;
        var textB = b.nombrePasajero;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePasajero;
        var textB = b.nombrePasajero;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.fechaInicioReserva;
        var textB = b.fechaInicioReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioReserva);
        var textB = new Date(b.fechaInicioReserva);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.direccionOrigenReserva;
        var textB = b.direccionOrigenReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.direccionOrigenReserva;
        var textB = b.direccionOrigenReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.direccionDestinoReserva;
        var textB = b.direccionDestinoReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.direccionDestinoReserva;
        var textB = b.direccionDestinoReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.distanciaReserva;
        var textB = b.distanciaReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.distanciaReserva;
        var textB = b.distanciaReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.duracionReserva;
        var textB = b.duracionReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.duracionReserva;
        var textB = b.duracionReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(8==nom){
      this.res.sort(function(a, b) {
        var textA = a.estadoReserva;
        var textB = b.estadoReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-8==nom){
      this.res.sort(function(a, b) {
        var textA = a.estadoReserva;
        var textB = b.estadoReserva;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(9==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreConductor;
        var textB = b.nombreConductor;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-9==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreConductor;
        var textB = b.nombreConductor;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(10==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-10==nom){
      this.res.sort(function(a, b) {
        var textA = a.placaVehiculo;
        var textB = b.placaVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
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

  ObtenerReservas(): void {

    this.data
    .obtenerReservas()
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }

      console.log(this.pagact);
      console.log(res.reservas);
      this.res=res.reservas;
      this.filtradosServicios = res.reservas;
    });

  }
  /** pendiente
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */

  async estadoReserva(id,estado){
    var cj:any={};
    cj.idReserva=id;
    cj.estadoReserva=estado;
    console.log(cj);
    if(estado == 2)
    {
      const { value: url } = await Swal.fire({
        input: 'text',
        inputLabel: 'Motivo de Cancelación',
        inputPlaceholder: 'MOTIVO',
        showCancelButton:true
      })

      if (url) {
        this.data.cancelarReserva(id,url).then(respuesta =>
          {
          this.filtradosServicios.forEach(servicio => {
            if(servicio.idReserva == id)
            {
              servicio.estadoReserva = 2;
            }
          })
        })

      }else{

      }
    }else{
      this.data.estadoReserva(cj).subscribe(
        (res:any)=>{
          this.ObtenerReservas();
        }
      )
    }

  }

  filtrarReservasCriterioValor(pag:number)
  {
    console.log("criterio Seleccionado :",this.criterioSeleccionado);
    console.log("valor ingresado :",this.valorCriterioSeleccionado);
    this.data.filtrarReservas(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(reservasFiltradas =>
      {
        this.maxpag=[];
      for(var i=0;i<reservasFiltradas.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
        this.res = reservasFiltradas.reservas;
        console.log("reservas traidas",reservasFiltradas);
      })
  }

  buscarDireccionesOrigen()
  {
    this.data.buscarDireccionesOrigen().then(direccionesOrigen =>
      {
        console.log(direccionesOrigen)
        this.direcciones = direccionesOrigen;
      }).catch(error =>
        {
          console.log(error)
        })
  }

  buscarDireccionesDestino()
  {
    this.data.buscarDireccionesDestino().then(direccionesDestino =>
      {
        console.log(direccionesDestino)
        this.direcciones = direccionesDestino;
      }).catch(error =>
        {
          console.log(error)
        })
  }

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.direcciones.length; i++) {
        let country = this.direcciones[i];
        if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
  }

  filtrar(event:any)
  {
    console.log("pasajero : ",this.nombrePasajeroFiltro);
    console.log("origen : ",this.origenFiltro);
    console.log("destino : ",this.destinoFiltro);
    console.log("inicio : ",this.inicioFiltro);
    console.log("fin : ",this.finFiltro);
    console.log("estado : ",this.estadoFiltro);
    console.log("evento presiona : ",event.key);

    if(event.key =="Backspace")
    {
      this.filtradosServicios = this.res;
    }
    if(this.nombrePasajeroFiltro!="")
      {
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.nombrePasajero+" "+element.apellidoPasajero).toLowerCase().includes(this.nombrePasajeroFiltro.toLowerCase()));
      }

      if(this.origenFiltro!=""){
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.direccionOrigenReserva).toLowerCase().includes(this.origenFiltro.toLowerCase()));
      }

      if(this.destinoFiltro!=""){
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.direccionDestinoReserva).toLowerCase().includes(this.destinoFiltro.toLowerCase()));
      }

      if(this.conductorFiltro !="")
      {
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.nombreConductor+" "+element.apellidoConductor).toLowerCase().includes(this.conductorFiltro.toLowerCase()));
      }

      if(this.observacionesFiltro!="")
      {
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.observaciones).toLowerCase().includes(this.observacionesFiltro.toLowerCase()));
      }

      if(this.placaFiltro!="")
      {
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.placaVehiculo).toLowerCase().includes(this.placaFiltro.toLowerCase()));
      }

      if(this.inicioFiltro!=undefined && this.finFiltro!=undefined)
      {
          let fechaNueva = []
          let inicio = new Date(this.inicioFiltro);
          let inicio2 = new Date(this.generarFormatoFecha(inicio));
          let fin = new Date(this.finFiltro);
          let fin2 = new Date(this.generarFormatoFecha(fin));

          if(inicio2 == fin2)
          {
            for (let index = 0; index < this.filtradosServicios.length; index++)
            {
              let fecha:any = new Date(this.filtradosServicios[index].fechaInicioReserva.substr(0,10).replaceAll("-","/"));

              console.log("fecha : ",fecha," ",this.filtradosServicios[index].fechaInicioReserva.substr(0,10).replaceAll("-","/"));
              console.log("inicio : ",inicio);
              if(!(fecha.getTime()==inicio2.getTime()))
              {
                console.log("Sí : ",this.filtradosServicios[index]);
                this.filtradosServicios.slice(1,index);
              }else{
                console.log("En fecha : ",this.filtradosServicios[index]);
                fechaNueva.push(this.filtradosServicios[index]);
              }

            }
            this.filtradosServicios = fechaNueva
            console.log("filtros : ",this.filtradosServicios);
          }else{
            for (let index = 0; index < this.filtradosServicios.length; index++)
            {
              let fecha:any = new Date(this.filtradosServicios[index].fechaInicioReserva.substr(0,10).replaceAll("-","/"));

              console.log("fecha : ",fecha," ",this.filtradosServicios[index].fechaInicioReserva.substr(0,10).replaceAll("-","/"));
              console.log("inicio : ",inicio);
              if(!(fecha.getTime()>=inicio2.getTime() && fecha.getTime() <=fin2.getTime()))
              {
                console.log("Sí : ",this.filtradosServicios[index]);
                this.filtradosServicios.slice(1,index);
              }else{
                console.log("En fecha : ",this.filtradosServicios[index]);
                fechaNueva.push(this.filtradosServicios[index]);
              }

            }
            this.filtradosServicios = fechaNueva
            console.log("filtros : ",this.filtradosServicios);
          }



      }
      if(this.clienteFiltro!="")
      {
        this.filtradosServicios = this.filtradosServicios.filter((element:any) => JSON.stringify(element.cliente).toLowerCase().includes(this.clienteFiltro.toLowerCase()));
      }
    console.log(this.filtradosServicios);
  }

  generarFormatoFecha(fecha:Date)
  {
    let dia = fecha.getDate() + 1;
    let mes:any = fecha.getMonth();
    if(mes < 10)
    {
      mes = "0"+ JSON.stringify(fecha.getMonth()+1);
    }else{
      mes = JSON.stringify(fecha.getMonth()+1);
    }
    let año = fecha.getFullYear();
    return año+"/"+mes+"/"+dia;
  }

  filtrarFecha()
  {
    if(this.inicioFiltro!=undefined)
    {
      this.filtradosServicios = this.res;
      let fechaNueva = []
      let inicio = new Date(this.inicioFiltro);
      let inicio2 = new Date(this.generarFormatoFecha(inicio));
      console.log("fecha : ",inicio2)
      for (let index = 0; index < this.filtradosServicios.length; index++)
      {
        let fecha:any = new Date(this.filtradosServicios[index].fechaInicioReserva.substr(0,10).replaceAll("-","/"));
        if(!(fecha.getTime()==inicio2.getTime()))
        {
          this.filtradosServicios.slice(1,index);
        }else{
          fechaNueva.push(this.filtradosServicios[index]);
        }
      }
      this.filtradosServicios = fechaNueva
    }
  }

  filtrarPorFechaSalida(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.filtradosServicios = this.res.filter((element:any) => JSON.stringify(element.fechaInicioReserva).toLowerCase().includes(valor.toLowerCase()));
    this.res = this.res.filter((element:any) => JSON.stringify(element.fechaInicioReserva).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.filtradosServicios);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }

  filtrarPorEstado(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.filtradosServicios = this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
    this.res = this.res.filter((element:any) => JSON.stringify(element.observaciones).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.filtradosServicios);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }

  exportexcel()
  {
    let arregloFiltrados = this.filtradosServicios;
    let arregloIndices = [];
    for (const servicio of arregloFiltrados) {
      arregloIndices.push(servicio.idReserva);
    }

    let objetoPojoDatosExel = {
      datosServicios:arregloIndices
    }

    this.data.buscarDatosServiciosExcel(objetoPojoDatosExel).then(datosExcel =>
      {

        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel.servicios);
        const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
        const data: Blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth();
        let anho = fecha.getUTCFullYear();
        let hora = fecha.getUTCMilliseconds();
        fs.saveAs(data, "programacion" +dia+mes+anho+hora+ ".xlsx");
        //this.saveAsExcelFile(excelBffer, "archvo");
        /*console.log(datosExcel);
        let libroExcel = new Workbook();
        let hojaExcel = libroExcel.addWorksheet('servicios');
        let arreglo = datosExcel.servicios;
        let llaves = Object.keys(arreglo[0]);
        console.log(llaves);
        console.log(datosExcel.servicios);
        hojaExcel.addRow(llaves);
        arreglo.forEach((element:any) => {
          console.log("dato : ",element)
          hojaExcel.addRow(element);
        });

        libroExcel.xlsx.writeBuffer().then((data) => {
          console.log("datos : ",data);
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'CarData.xlsx');
        });*/

      }).catch(error =>
        {
          console.log(error)
        })

  }

  mostrarFiltroColumnas()
  {
    if(this.displayFiltroDatosColumnas == true)
    {
      this.displayFiltroDatosColumnas = false;
    }
    if(this.displayFiltroColumnas == true)
    {
      this.displayFiltroColumnas = false;
    }else{
      this.displayFiltroColumnas = true;
    }
  }

  mostrarDatosColumnasFiltrar()
  {
    if(this.displayFiltroColumnas ==true)
    {
      this.displayFiltroColumnas = false;
    }
    if(this.displayFiltroDatosColumnas == true)
    {
      this.displayFiltroDatosColumnas = false;
    }else{
      this.displayFiltroDatosColumnas = true;
    }

  }


    private filtrarDirecciones(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.direcciones.filter(option => option.toLowerCase().includes(filterValue));
    }

  dialogoReplicar(idServicio?:any)
  {
    if(this.displayReplicarServicio == false)
    {
      if(idServicio!=undefined)
      {
        this.displayReplicarServicio = true;
        this.idServicioReplicar = idServicio;
        console.log("identificador servicio : ",idServicio);
      }else{
        Swal.fire({
          title: 'CUIDADO',
          text: 'No ha seleccionado servicio',
          icon:'warning'
        })
      }
    }else{

      this.fechasReplicados = [];
      this.idServicioReplicar = undefined;
      this.displayReplicarServicio = false;
    }
  }

  agregarFecha()
  {
    let fechaNueva = {
      id:this.fechasReplicados.length,
      fecha:new Date()
    }
    this.fechasReplicados.push(fechaNueva);
  }

  modificarFecha(id:number,fechaNueva:any)
  {
    console.log("valor fecha : ",fechaNueva);
    console.log("id fecha : ",id);
    for (const iterator of this.fechasReplicados)
    {
      if(iterator.id == id)
      {
        iterator.fecha = fechaNueva;

        break;
      }
    }
  }

  borrarFecha(id:number)
  {

    let nuevaLista = []
    let encontrado = false;
    for (let i = 0;i<this.fechasReplicados.length;i++)
    {
      if(this.fechasReplicados[i].id != id)
      {
        console.log("encontrado : ",id);
        nuevaLista.push(this.fechasReplicados[i]);
        //this.fechasReplicados.slice(1,i);
      }
    }

    this.fechasReplicados = nuevaLista;
  }

  crearServiciosReplicados()
  {
    let nuevaLista = [];
    for (const iterator of this.fechasReplicados)
    {
      nuevaLista.push(iterator.fecha);
    }

    let pojoFechas = {
      fechas:nuevaLista
    }

    this.data.replicarServicio(pojoFechas,this.idServicioReplicar).then(respuesta =>{
      console.log("respuesta : ",respuesta);
        Swal.fire({
          title: 'ÉXITO',
          text: 'el servicio fue replicado',
          icon:'success',
          showConfirmButton:true
        }).then(selecciona =>{
          if(selecciona.isConfirmed)
          {
            this.fechasReplicados = [];
            this.idServicioReplicar = undefined;
             this.displayReplicarServicio = false;
            this.ObtenerReservas();
          }
        })
    }).catch(error =>
      {
        console.log("error : ",error);
      })

  }

}
