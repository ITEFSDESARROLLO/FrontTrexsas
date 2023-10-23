import { Vehiculo } from './../../../models/vehiculo';
import { LoginService } from './../../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import * as fs from 'file-saver';

@Component({
  selector: 'app-vehiculolist',
  templateUrl: './vehiculolist.component.html',
  styleUrls: ['./vehiculolist.component.css']
})
export class VehiculolistComponent implements OnInit {

  labels: any;
  res:Array<any>;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";
  arregloTipoVehiculoFiltro:any[]=[];
  displayCargaMasiva:boolean = false;
  tipocombustible:any[] = [];
  clasesVehiculo:any[] = [];

  vehiculosExcel:any[] = [];
  clonedProducts: { [s: string]: any; } = {};
  products1: any[];
  products2: any[];
  carroceriasFiltradas: any[] = [];
  statuses: any[];
  vehiculosCarga: any;
  listaRegistrosVehiculos: any;
  combustiblesFiltrados:any[] = [];
  editing:boolean = false;
  tiposCarrocerias:any[] = [];
  coloresVehiculo:any[] = [];
  coloresFiltrados:any[] = [];
  convenios:any[] = [];
  conveniosFiltrados:any[] = [];
  entidadesTransito:any[] = [];
  entidadesFiltradas:any[] = [];
  propietarios:any[] = [];
  propietariosFiltrados:any[]=[];
  aseguradoras:any[] = [];
  aseguradorasFiltradas:any[] =[];
  marcas:any[] = [];
  marcasFiltradas:any[] =[];
  vehiculosFiltrados:any[] = [];
  constructor(private data: CentralService, private servicio:LoginService,private router:Router, private httpService: HttpClient) {
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
    this.obtenerTiposCombustibles();
    this.obtenerClases();
    this.obtenerTiposCarroceria();
    this.obtenerColoresVehiculos();
    this.obtenerEntidades();
    this.obtenerConvenios();
    this.obtenerPropietarios();
    this.obtenerAseguradorasVehiculos();
    this.obtenerMarcas();
    console.log("vehiculos bien");
    this.ObtenerVehiculos(0);
    console.log("vehiculos bien");
    this.mostrar()
  }

  /**
   * Lista los accesos autorizados para restringir los accesos
   */
  mostrar(){
    console.log("ingresa aca");
    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    //console.log(this.UrlTree);

    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        this.listperm=res;
        console.log(res);
      }
    )
    console.log("vehivulos bien");
  }

  /**
   * Consulta si tiene acceso para saber si mostrarlo o no, o en determinado caso, inhabilitarlo
   * @param {string} nom Es la uri padre
   * @param {string} bac Es al uri hija
   * @returns true o false dependiendo de si tiene acceso o no
   */
  consult(nom:string,bac:string){
    var urip=this.listperm.findIndex(element=>element.uriPadre==nom && element.uriHija==bac);
    if(urip!=-1){
      return true
    }else{
      return false;
    }

  }

  ObtenerVehiculos(pag:number): void {

      this.data
      .obtenerVehiculos(pag)
      .subscribe((res:any) => {
        console.log("prueba",res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);

        }
        this.pagact=pag;
        console.log(this.pagact);
        console.log("pagina : ",res.vehiculos);
        this.res=res.vehiculos;
        this.vehiculosFiltrados = res.vehiculos;

      });

  }
  /**
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
  eliminar(id){
    var resveh:any={};
    resveh.idVehiculo=id;
    resveh.estadoVehiculo=2;
    console.log(resveh);
    this.data.estadoVehiculo(resveh).subscribe(
      (res:any)=>{
        this.ObtenerVehiculos(this.pagact);
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
        var textA = a.codigoInternoVehiculo;
        var textB = b.codigoInternoVehiculo;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.codigoInternoVehiculo;
        var textB = b.codigoInternoVehiculo;
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
        var textA = a.clase;
        var textB = b.clase;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.clase;
        var textB = b.clase;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  buscarTipoVehiculo()
  {
    this.data.obtenerTiposVehiculoFiltro().then(respuesta =>
      {
        console.log("respuesta ",respuesta);
        this.arregloTipoVehiculoFiltro = respuesta.tiposVehiculo;
      }).catch(error =>{
        console.log("error :",error);
      })
  }

  fitrarVinculaciones()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    console.log("valor : ",this.valorCriterioSeleccionado);
    this.data.filtrarVehiculo(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.vehiculos;
    }).catch(error =>
      {
        console.log("error : ",error);
      });
  }

  mostrarDialogoSubida()
  {
    this.displayCargaMasiva = true;
  }

  leerExcel(event:any)
  {
    this.vehiculosCarga= event.target.files[0];
    let lector = new FileReader();
    lector.readAsArrayBuffer(this.vehiculosCarga);

    lector.onload = (e) =>
    {
        this.listaRegistrosVehiculos = lector.result;
        console.log("lista de carga : ",this.listaRegistrosVehiculos);
        var data = new Uint8Array(this.listaRegistrosVehiculos);
        console.log("data : ",data);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i)
        {
          arr[i] = String.fromCharCode(data[i]);
        }
        var bstr = arr.join("");
        console.log("bstr : ",bstr);
        var workbook = XLSX.read(bstr, {type:"binary"});
        console.log("workbook : ",workbook);
        var first_sheet_name = workbook.SheetNames[0];
        console.log("primera hoja : ",first_sheet_name);
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log("worksheet : ",worksheet);
        console.log("registros : ",XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        this.vehiculosExcel = arraylist;
        this.products1 = arraylist;
        this.products2 = arraylist;
        let contador = 0;
        let diccionarioKeysArreglo = [];
        for (const iterator of this.products2)
        {
            if(iterator.tip_combustible.tipoCombustible==undefined)
            {
              console.log("pendiente el combustible , ",iterator.tip_combustible);
              iterator.correcto = 0;
            }else if(iterator.marca.marca == undefined)
            {
              console.log("pendiente la marca");
              iterator.correcto = 0;
            }else if(iterator.color.descripcionColor == undefined)
            {
              console.log("pendiente el color");
              iterator.correcto = 0;
            }else if(iterator.modelo == 'pendiente')
            {
              console.log("pendiente el modelo");
              iterator.correcto = 0;
            }else if(isNaN(iterator.cilindraje))
            {
              console.log("formato incorrecto del cilindraje : ",iterator.cilindraje);
              iterator.correcto = 0;
            }else if(iterator.propietario.nombrePersona == undefined)
            {
              console.log("pendiente el propietario");
              iterator.correcto = 0;
            }else if(isNaN(iterator.num_licencia_transito)==true || iterator.num_licencia_transito == 'pendiente')
            {
              console.log("formato de licencia incorrecto");
              iterator.correcto = 0;
            }else if(iterator.fecha_matricula == 'pendiente')
            {
              console.log("pendiente fecha de matricula");
              iterator.correcto = 0;
            }else if(iterator.num_motor == 'pendiente')
            {
              console.log("pendiente número de motor");
              iterator.correcto = 0;
            }else if(iterator.num_motor == 'pendiente')
            {
              console.log("pendiente número de chasis");
              iterator.correcto = 0;
            }else if(iterator.serie_motor == 'pendiente')
            {
              console.log("pendiente número de motor");
              iterator.correcto = 0;
            }else{
              iterator.correcto = 1;
            }
        }
        //console.log("diccionario : ",diccionarioKeysArreglo.length);
          //contador = contador + 1;
          console.log("contador : ",contador);
        console.log("registros ",arraylist[0]);
    }
  }

  obtenerTiposCombustibles(){
    this.servicio
      .ObtenerTipoCombustibles()
      .subscribe((tipocombustible: any) => {
        this.tipocombustible = tipocombustible;
        console.log("combustibles = revisar ",this.tipocombustible);
      });
  }

  obtenerClases(){
    this.servicio
      .ObtenerClases()
      .subscribe((clases:Array<any>) => {
        this.clasesVehiculo = clases;
        console.log("clases vehiculos : ",this.clasesVehiculo);
      });
  }

  obtenerTiposCarroceria()
  {
    this.data.obtenerTiposCarroceria().then(respuesta =>
      {
        this.tiposCarrocerias = respuesta.tiposCarroceria;
        console.log("carrocerias : ",respuesta);
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  obtenerMarcas():void{
    this.servicio.ObtenerMarcas()
      .subscribe((marcas: Array<any>) => {
        this.marcas = marcas;
        console.log("marcas : ",this.marcas)
      });
  }

  filtrarCombustible(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.tipocombustible.length; i++) {
        let country = this.tipocombustible[i];
        if (country.tipoCombustible.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.combustiblesFiltrados = filtered;
  }

  filtrarMarcas(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.marcas.length; i++) {
        let country = this.marcas[i];
        if (country.marca.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.marcasFiltradas = filtered;
  }

  onRowEditInit(product: any) {
    console.log("ready 1: ");
    console.log("combustible : ",product);
      this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: any) {
    console.log("ready 2: ");


        if(product.tip_combustible.tipoCombustible==undefined)
        {
          console.log("pendiente el combustible , ",product.tip_combustible);
          product.correcto = 0;
        }else if(product.marca.marca == undefined)
        {
          console.log("pendiente la marca");
          product.correcto = 0;
        }else if(product.color.descripcionColor == undefined)
        {
          console.log("pendiente el color");
          product.correcto = 0;
        }else if(product.modelo == 'pendiente')
        {
          console.log("pendiente el modelo");
          product.correcto = 0;
        }else if(isNaN(product.cilindraje))
        {
          console.log("formato incorrecto del cilindraje : ",product.cilindraje);
          product.correcto = 0;
        }else if(product.propietario.nombrePersona == undefined)
        {
          console.log("pendiente el propietario");
          product.correcto = 0;
        }else if(isNaN(product.num_licencia_transito)==true || product.num_licencia_transito == 'pendiente')
        {
          console.log("formato de licencia incorrecto");
          product.correcto = 0;
        }else if(product.fecha_matricula == 'pendiente')
        {
          console.log("pendiente fecha de matricula");
          product.correcto = 0;
        }else if(product.num_motor == 'pendiente')
        {
          console.log("pendiente número de motor");
          product.correcto = 0;
        }else if(product.num_motor == 'pendiente')
        {
          console.log("pendiente número de chasis");
          product.correcto = 0;
        }else if(product.serie_motor == 'pendiente')
        {
          console.log("pendiente número de motor");
          product.correcto = 0;
        }else{
          product.correcto = 1;
        }

    delete this.clonedProducts[product.id];
  }

  onRowEditCancel(product: any, index: number) {
      this.products2[index] = this.clonedProducts[product.id];
      delete this.clonedProducts[product.id];
  }

  obtenerColoresVehiculos()
  {
    this.data.obtenerColoresVehiculos().then(respuesta =>
      {
        this.coloresVehiculo = respuesta.colores;
        console.log("colores : ",respuesta);
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  filterCarroceria(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.tiposCarrocerias.length; i++) {
        let carroceria = this.tiposCarrocerias[i];
        if (carroceria.descripcionCarroceria.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(carroceria);
        }
    }

    this.carroceriasFiltradas = filtrados;
  }

  obtenerConvenios():void{
    this.servicio
      .ObtenerConvenios()
      .subscribe((convenios: Array<any>) => {
        this.convenios = convenios;
        console.log("convenios : ",this.convenios);
      });
  }

  obtenerEntidades()
  {
    this.data.obtenerEnitdadesTransito().then(respuesta =>
      {
        this.entidadesTransito = respuesta.entidadesTransito;
        console.log("entidades : ",respuesta);
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  filterColores(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;
    console.log("color");
    for(let i = 0; i < this.coloresVehiculo.length; i++) {
        let color = this.coloresVehiculo[i];
        if (color.descripcionColor.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(color);
        }
    }

    this.coloresFiltrados = filtrados;
  }

  filterConvenios(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;
    console.log("convenio");
    for(let i = 0; i < this.convenios.length; i++) {
        let convenios = this.convenios[i];
        if (convenios.nombreEmpresaConvenio.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(convenios);
        }
    }

    this.conveniosFiltrados = filtrados;
  }

  filterEntidades(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;
    console.log("entidad");
    for(let i = 0; i < this.entidadesTransito.length; i++) {
        let entidad = this.entidadesTransito[i];
        if (entidad.descripcionEntidad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(entidad);
        }
    }

    this.entidadesFiltradas = filtrados;
  }

  obtenerPropietarios():void{
    this.data.obtenerProp()
    .subscribe((propietarios:Array<any>) => {
      this.propietarios=propietarios
      console.log("propietarios :",this.propietarios)
    });
  }

  filterPropietarios(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;
    console.log("entidad");
    for(let i = 0; i < this.propietarios.length; i++) {
        let entidad = this.propietarios[i];
        if (entidad.nombrePersona.toLowerCase().indexOf(query.toLowerCase()) == 0 || entidad.apellidoPersona.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(entidad);
        }
    }

    this.propietariosFiltrados = filtrados;
  }

  filterAseguradoras(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;
    console.log("entidad");
    for(let i = 0; i < this.aseguradoras.length; i++) {
        let entidad = this.aseguradoras[i];
        if (entidad.nombreAseguradora.toLowerCase().indexOf(query.toLowerCase()) == 0 )
        {
          filtrados.push(entidad);
        }
    }

    this.aseguradorasFiltradas = filtrados;
  }

  obtenerAseguradorasVehiculos():void{
    this.servicio.ObtenerAseguradoras().subscribe((aseguradoravehiculo: Array<any>) => {
        this.aseguradoras = aseguradoravehiculo;
        console.log(" aseguradoras : ",this.aseguradoras);
      });
  }

  crearVehiculosCargaExcel()
  {
    let correcto = false;
    let arregloVehiculos:any[] = [];
    for(const iterator of this.vehiculosExcel)
    {
      if(iterator.correcto == 1)
      {
        correcto = true;
      }
    }
    if(correcto == true)
    {
      for (const iterator of this.vehiculosExcel)
      {
          let vehiculo = {};
          vehiculo['idVehiculo'] = undefined;
          vehiculo['codigoInternoVehiculo'] = iterator.cod_interno;
          vehiculo['placaVehiculo'] = iterator.placa;
          vehiculo['estadoVehiculo'] = 1;
          vehiculo['disponibilidad'] = 0;
          vehiculo['modelo'] = iterator.modelo;
          vehiculo['cilindraje'] = iterator.cilindraje;
          vehiculo['numeroPasajerosVehiculo'] = iterator.pasajeros;
          vehiculo['numeroMotorVehiculo'] = iterator.num_motor;
          vehiculo['serieMotorVehiculo'] = iterator.serie_Motor;
          vehiculo['chasisVehiculo'] = iterator.chasis;
          vehiculo['colorVehiculo'] = iterator.color.descripcionColor;
          vehiculo['marca'] =iterator.marca;
          vehiculo['tipoCombustible'] = iterator.tip_combustible;
          vehiculo['propietario'] = iterator.propietario;
          vehiculo['fechaMatricula'] = iterator.fecha_matricula;
          vehiculo['numeroLicenciaTransito'] = iterator.num_licencia_transito;
          arregloVehiculos.push(vehiculo);
      }
      console.log("arreglo : ",arregloVehiculos);
      let pojoVehiculos:any = {
        vehiculosExcel:arregloVehiculos
      }
      this.data.crearVehiculoExcel(pojoVehiculos).then(respuesta =>
        {
          console.log("respuesta : ",respuesta);
        }).catch(error =>
          {
            console.log("error : ",error);
          });
    }else{
      Swal.fire({
        title:'CAMPOS ERRÓNEOS',
        text:"HAY REGISTROS CON COLUMNAS MAL LLENADA",
        icon:"warning"
      })
    }
  }

  filtrar(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.vehiculosFiltrados = this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.vehiculosFiltrados);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }

  exportexcel()
  {
    let arregloFiltrados = this.vehiculosFiltrados;
    let arregloIndices = [];
    for (const vehiculo of arregloFiltrados) {
      arregloIndices.push(vehiculo.idVehiculo);
    }

    let objetoPojoDatosExel = {
      idsVehiculosExcel:arregloIndices
    }

    this.data.buscarDatosVehiculosExcel(objetoPojoDatosExel).then(datosExcel =>{
      const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel.vehiculos);
      console.log("datos excel",datosExcel);
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
      fs.saveAs(data, "vehiculos" +dia+mes+anho+hora+ ".xlsx");
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
    }).catch(error =>{

    });





  }

}
