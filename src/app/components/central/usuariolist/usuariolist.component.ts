import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuariolist',
  templateUrl: './usuariolist.component.html',
  styleUrls: ['./usuariolist.component.css']
})
export class UsuariolistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  public listperm:Array<any>=[];
  UrlTree:any=[];
  criterioFiltro:string;
  valorFiltro:string;
  displayCargaMasiva:boolean = false;
  usuariosExcel:any;
  registrosUsuariosExcel:any;
  clonedProducts: { [s: string]: any; } = {};
  products1: any[];
  products2: any[];
  usuariosFiltrados: any[] = [];
  todosLosUsuarios:any[] = [];
  itemsUsuariosExport:any[] = [];
  constructor(private data: CentralService,private router:Router, private httpService: HttpClient) {
    this.res=[];
    this.maxpag=[];
    this.pagact=0;
    //this.obtenerTodosUsuarios();
   }

  ngOnInit(): void {
    this.itemsUsuariosExport = [
      {
        label: 'Conductores',
        command: () => {
          this.modificarList(2);
        }
      }]
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    //this.ObtenerUsuarios(0);
    this.obtenerTodosUsuarios();
    this.mostrar()
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

  modificarList(idCuenta:any)
  {

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

  ObtenerUsuarios(pag:number): void {

      this.data
      .obtenerUsuarios(pag)
      .subscribe((res:any) => {
        console.log(res);
        this.maxpag=[];
        for(var i=0;i<res.totalPaginas;i++){
          this.maxpag.push(i);
        }
        this.pagact=pag;
        console.log(this.pagact);
        this.res=res.usuarios;
        this.usuariosFiltrados = res.usuarios;
      });

  }

  obtenerTodosUsuarios(): void {

    this.data
    .obtenerUsuariosTotales()
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      console.log("todos los usuarios : ",res);
      this.todosLosUsuarios = res.usuarios;
      this.res = res.usuarios;
      this.usuariosFiltrados = res.usuarios;

    });

}
  /**
   * Ordena los registros dependiendo el caso
   * @param {number} nom  determina que espacio va evaluar y dependiendo del nuemro si es negativo es inverso y sino es normal
   */
  ordenar(nom:number){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    if(1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idCuenta;
        var textB = b.idCuenta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-1==nom){
      this.res.sort(function(a, b) {
        var textA = a.idCuenta;
        var textB = b.idCuenta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(2==nom){
      this.res.sort(function(a, b) {
        var textA = a.usuarioCuenta;
        var textB = b.usuarioCuenta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.usuarioCuenta;
        var textB = b.usuarioCuenta;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombrePersona;
        var textB = b.nombrePersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.apellidoPersona;
        var textB = b.apellidoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoPersona;
        var textB = b.documentoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.documentoPersona;
        var textB = b.documentoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.celularUnoPersona;
        var textB = b.celularUnoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.celularUnoPersona;
        var textB = b.celularUnoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.correoPersona;
        var textB = b.correoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.correoPersona;
        var textB = b.correoPersona;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  /**
 * Este metodo elimina el registro que se vaya a eliminar
 * @param id  recibe el id del registro a eliminar
 */
elimin(id){
    var resveh:any={};
    resveh.idCuenta=id;
    resveh.estadoCuenta=2;
    console.log(resveh);
    this.data.EliminarUsuario(resveh).subscribe(
      (res:any)=>{
        this.ObtenerUsuarios(this.pagact);
      }
    )
  }

  filtrarCuentasUsuario()
  {
    this.data.filtrarCuentas(this.criterioFiltro,this.valorFiltro).then(respuesta =>
      {
        console.log(respuesta)
        this.res = respuesta.usuarios;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  mostrarCargaMasiva()
  {
    this.displayCargaMasiva = true;
  }

  crearUsuariosCargaExcel()
  {
    let arreglo = this.usuariosExcel;
    let arregloSalida:any[] = [];
    for (const iterator of arreglo)
    {
      let persona = {
        nombrePersona:iterator.nombres,
        apellidoPersona:iterator.apellidos,
        tipoDocPersona:"CC",
        documentoPersona:iterator.numero_cedula,
        direccionPersona:iterator.direccion,
        celularUnoPersona:iterator.celular,
        telefonoPersona:iterator.telefono,
        tipoPersona:1,
      }
      let licenciaConductor = {
        fechaExpedicionLicencia:iterator.fecha_inicio_licencia,
        fechaVencimientoLicencia:iterator.fecha_fin_licencia,
        numeroLicencia:iterator.numero_licencia
      }
      let pojoCuenta = {
        persona:persona,
        licencia:licenciaConductor
      }
      arregloSalida.push(pojoCuenta)
    }
    let pjoArregloCuenta = {
      arreglo:arregloSalida
    }

    console.log(arregloSalida);

    this.data.crearUsuariosConductor(pjoArregloCuenta).then(respuesta=>
      {
        if(respuesta.mensaje == 1)
        {
          Swal.fire({
            title:'subida en proceso',
            text:'La carga de los conductores se puede demorar.\nLe llegará un correo confirmándole la carga de los datos al sistema',
            icon:'info',
            showConfirmButton:true
          }).then(respuesta =>
            {
              if(respuesta.isConfirmed)
              {
                this.usuariosExcel = [];
                this.displayCargaMasiva = false;
                window.location.href = "/central";
              }
            })
        }
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

  leerExcel(event:any)
  {
    this.usuariosExcel= event.target.files[0];
    let lector = new FileReader();
    lector.readAsArrayBuffer(this.usuariosExcel);

    lector.onload = (e) =>
    {
        this.registrosUsuariosExcel = lector.result;
        console.log("lista de carga : ",this.registrosUsuariosExcel);
        var data = new Uint8Array(this.registrosUsuariosExcel);
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
        this.usuariosExcel = arraylist;
        this.products1 = arraylist;
        this.products2 = arraylist;
        let contador = 0;
        let diccionarioKeysArreglo = [];
        console.log("contador : ",contador);
        console.log("registros ",arraylist[0]);
    }
  }

  filtrar(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.usuariosFiltrados = this.todosLosUsuarios.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.usuariosFiltrados);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }


}
