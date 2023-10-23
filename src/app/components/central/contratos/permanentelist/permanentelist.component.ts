import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-permanentelist',
  templateUrl: './permanentelist.component.html',
  styleUrls: ['./permanentelist.component.css']
})
export class PermanentelistComponent implements OnInit {

  res:any;
  maxpag:any;
  pagact:number;
  labels: any;
  showTable = true;
  displayCargaMasiva:boolean = false;
  contratosExcel:any;
  registrosContratosExcel:any;
  clonedProducts: { [s: string]: any; } = {};
  products1: any[];
  products2: any[];
  progreso:number = 0;

  public listperm:Array<any>=[];

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
    this.mostrar();
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
        console.log("contratos : ",this.res);
      });

  }

  inhabilitar(contrato:number)
  {
    this.data.inhabilitarContrato(contrato).then(respuesta =>
      {
        if(respuesta.mensaje==1)
        {
          Swal.fire({
            title: 'Éxito',
            text: 'Contrato Inhabilitado',
            icon:'success',
            showConfirmButton:true
          }).then(resp =>
            {
              if(resp.isConfirmed)
              {
                this.ObtenerContratos(0);
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
   * Lista los accesos autorizados para restringir los accesos
   */
   mostrar(){
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

  habilitar(contrato:number)
  {
    this.data.habilitarContrato(contrato).then(respuesta =>
      {
        if(respuesta.mensaje==1)
        {
          Swal.fire({
            title: 'Éxito',
            text: 'Contrato habilitado',
            icon:'success',
            showConfirmButton:true
          }).then(resp =>
            {
              if(resp.isConfirmed)
              {
                this.ObtenerContratos(0);
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

  BuscarContrato (){
    this.showTable = true;
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
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-2==nom){
      this.res.sort(function(a, b) {
        var textA = a.razonSocialCliente;
        var textB = b.razonSocialCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCliente;
        var textB = b.nitCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-3==nom){
      this.res.sort(function(a, b) {
        var textA = a.nitCliente;
        var textB = b.nitCliente;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(4==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorContrato;
        var textB = b.valorContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-4==nom){
      this.res.sort(function(a, b) {
        var textA = a.valorContrato;
        var textB = b.valorContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(5==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreResponsableContrato;
        var textB = b.nombreResponsableContrato;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-5==nom){
      this.res.sort(function(a, b) {
        var textA = a.nombreResponsableContrato;
        var textB = b.nombreResponsableContrato;
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(6==nom){
      this.res.sort(function(a, b) {
        var textA = a.cedulaResponsableContrato;
        var textB = b.cedulaResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-6==nom){
      this.res.sort(function(a, b) {
        var textA = a.cedulaResponsableContrato;
        var textB = b.cedulaResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(7==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoResponsableContrato;
        var textB = b.telefonoResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-7==nom){
      this.res.sort(function(a, b) {
        var textA = a.telefonoResponsableContrato;
        var textB = b.telefonoResponsableContrato;
        return collator.compare(textA,textB);
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
    if(8==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioContratoPermanente);
        var textB = new Date(b.fechaInicioContratoPermanente);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-8==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaInicioContratoPermanente);
        var textB = new Date(b.fechaInicioContratoPermanente);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }

    if(9==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaFinContratoPermanente);
        var textB = new Date(b.fechaFinContratoPermanente);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    }else if(-9==nom){
      this.res.sort(function(a, b) {
        var textA = new Date(a.fechaFinContratoPermanente);
        var textB = new Date(b.fechaFinContratoPermanente);
        return textA > textB;
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.res.reverse()
    }
  }

  onRowEditInit(product: any) {
    console.log("ready 1: ");
    console.log("combustible : ",product);
      this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: any)
  {
    console.log("ready 2: ");
        if(product.valor=="" || product.valor == "pendiente")
        {
          console.log("pendiente el combustible , ",product.tip_combustible);
          product.correcto = 0;
        }

    delete this.clonedProducts[product.id];
  }

  onRowEditCancel(product: any, index: number) {
      this.products2[index] = this.clonedProducts[product.id];
      delete this.clonedProducts[product.id];
  }

  cerrarLimpiar()
  {
    this.displayCargaMasiva = false;
    this.contratosExcel = [];
    this.progreso = 0;
  }

  leerExcel(event:any)
  {
    this.contratosExcel= event.target.files[0];
    let lector = new FileReader();
    lector.readAsArrayBuffer(this.contratosExcel);

    lector.onload = async (e) =>
    {
        this.registrosContratosExcel = lector.result;
        this.progreso = await this.progreso + 1;

        console.log("lista de carga : ",this.registrosContratosExcel);
        this.progreso = await this.progreso + 1;

        var data = new Uint8Array(this.registrosContratosExcel);
        this.progreso = await this.progreso + 1;


        console.log("data : ",data);
        this.progreso = await this.progreso + 1;

        var arr = new Array();
        this.progreso = await this.progreso + 1;


        for(var i = 0; i != data.length; ++i)
        {
          arr[i] = String.fromCharCode(data[i]);
        }
        this.progreso = await this.progreso + 1;
        var bstr = arr.join("");
        this.progreso = await this.progreso + 1;


        console.log("bstr : ",bstr);
        this.progreso = await this.progreso + 1;


        var workbook = XLSX.read(bstr, {type:"binary"});
        this.progreso = await this.progreso + 1;

        console.log("workbook : ",workbook);
        this.progreso = await this.progreso + 1;

        var first_sheet_name = workbook.SheetNames[0];
        this.progreso = await this.progreso + 1;

        console.log("primera hoja : ",first_sheet_name);
        this.progreso = await this.progreso + 1;

        var worksheet = workbook.Sheets[first_sheet_name];
        this.progreso = await this.progreso + 1;


        console.log("worksheet : ",worksheet);
        this.progreso = await this.progreso + 1;


        console.log("registros : ",XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        this.progreso = await this.progreso + 1;

        var arraylist:any = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        this.progreso = await this.progreso + 1;

        this.contratosExcel = arraylist;
        this.products1 = arraylist;
        this.products2 = arraylist;
        this.progreso = await this.progreso + 1;


        let contador = 0;
        let diccionarioKeysArreglo = [];
        console.log("contador : ",contador);
        console.log("registros ",arraylist[0]);
        console.log("contratos : ",this.contratosExcel[0]);
        this.progreso = await this.progreso + 1;


        for (const iterator of this.contratosExcel)
        {
          if(iterator.valor==0)
          {
            iterator.correcto = 0;
          }
        }
        let valor_restante = await 100 -this.progreso;
        this.progreso = await this.progreso + valor_restante;
    }


  }

  mostrarSubidadExcel()
  {
    this.displayCargaMasiva = true;
  }

  crearContratosExcel()
  {
    let arregloSalida = [];
    let pojoContrato:any = {};
    let arregloRegistros = this.contratosExcel;
    for (const iterator of arregloRegistros)
    {
      let contrato = {
        numeracionContrato:iterator.numero_contrato,
        valorContrato:iterator.valor,
        responsable:iterator.nombre_responsable,
        documentoResponsable:iterator.cedula_responsable,
        telefonoResponsable:iterator.telefono_responsable,
        direccionResponsable:iterator.direccion_responsable,
        objetoContrato:iterator.objeto_contrato
      }

      arregloSalida.push(contrato);
    }
    pojoContrato['contratos'] = arregloSalida;
    this.data.crearContratosMasivos(pojoContrato).then(respuesta=>
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
                this.contratosExcel = [];
                this.displayCargaMasiva = false;
                window.location.href = "/central/contratos";
              }
            })
        }
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }
}
