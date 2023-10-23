import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clientelist',
  templateUrl: './clientelist.component.html',
  styleUrls: ['./clientelist.component.css']
})
export class ClientelistComponent implements OnInit {

  labels: any;
  res:any;
  maxpag:any;
  pagact:number;
  clientesCarga:any;
  listaRegistrosClientes:any;
  registros:any;
  clientesExcel:any[] = [];
  public listperm:Array<any>=[];

  criterioSeleccionado:string="";
  valorCriterioSeleccionado:string="";
  displaySubida:boolean = false;
  edit:boolean = false;

  clientes1: any[];

  clientes2: any[];

  estadoUso: any[] = [];

  filteredCountries: any[] = [];

  ciudades:any[] = [];
  ciudadesC:any[] = [];

  clonedProducts: { [s: string]: any; } = {};

  products1: any[];

  products2: any[];

  statuses: any[];

  clientesFiltrados:any[] = [];

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

    this.products1 = [
      {id:1,code:11,name:"putín"},
      {id:2,code:12,name:"putín2"},
      {id:3,code:13,name:"putín3"},
      {id:4,code:14,name:"putín4"},
      {id:5,code:15,name:"putín5"},
    ];
    this.products2 = [
      {id:1,code:11,name:"putín"},
      {id:2,code:12,name:"putín2"},
      {id:3,code:13,name:"putín3"},
      {id:4,code:14,name:"putín4"},
      {id:5,code:15,name:"putín5"},
    ]

    this.ObtenerClientes(0);
    this.obtenerCiudades();
  }

  /**
   * Obtiene los clientes
   * @param pag Recibe la pagina a consultar
   */
  ObtenerClientes(pag:number): void {

    this.data
    .obtenerClientes(pag)
    .subscribe((res:any) => {
      console.log(res);
      this.maxpag=[];
      for(var i=0;i<res.totalPaginas;i++){
        this.maxpag.push(i);
      }
      this.pagact=pag;
      console.log(this.pagact);
      this.res=res.clientes;
      this.clientesFiltrados = res.clientes;
    });


}

    consult(nom:string,bac:string){
      var urip=this.listperm.findIndex(element=>element.uriPadre==nom && element.uriHija==bac);
      if(urip!=-1){
        return true
      }else{
        return false;
      }

    }

    mostrar(){
      this.data.obtenerAcceso().subscribe(
        (res:Array<any>)=>{
          this.listperm=res;
          console.log(res);
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
      var textA = a.direccionCliente;
      var textB = b.direccionCliente;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

  }else if(-4==nom){
    this.res.sort(function(a, b) {
      var textA = a.direccionCliente;
      var textB = b.direccionCliente;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.res.reverse()
  }
  if(5==nom){
    this.res.sort(function(a, b) {
      var textA = a.celularUnoCliente;
      var textB = b.celularUnoCliente;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

  }else if(-5==nom){
    this.res.sort(function(a, b) {
      var textA = a.celularUnoCliente;
      var textB = b.celularUnoCliente;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.res.reverse()
  }
  if(6==nom){
    this.res.sort(function(a, b) {
      var textA = a.finalizarServicioCliente;
      var textB = b.finalizarServicioCliente;
      return collator.compare(textA,textB);
      //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

  }else if(-6==nom){
    this.res.sort(function(a, b) {
      var textA = a.finalizarServicioCliente;
      var textB = b.finalizarServicioCliente;
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
  var rescond:any={};
  rescond.idCuenta=id;
  rescond.estadoCuenta=2;
  this.data.EliminarCli(rescond).subscribe(
    (res:any)=>{
      this.ObtenerClientes(this.pagact);
    }
  );
}

fitrarVinculaciones()
  {
    console.log("criterio seleccionado : ",this.criterioSeleccionado);
    console.log("valor : ",this.valorCriterioSeleccionado);
    this.data.filtrarClientes(this.criterioSeleccionado,this.valorCriterioSeleccionado).then(respuesta =>{
      console.log("respuesta : ",respuesta);
      this.res = respuesta.clientes;
    }).catch(error =>
      {
        console.log("error : ",error);
      });
  }

  addfile(event)
  {
      this.clientesCarga= event.target.files[0];
      let lector = new FileReader();
      lector.readAsArrayBuffer(this.clientesCarga);

      lector.onload = (e) =>
      {
          this.listaRegistrosClientes = lector.result;
          console.log("lista de carga : ",this.listaRegistrosClientes);
          var data = new Uint8Array(this.listaRegistrosClientes);
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
          this.clientesExcel = arraylist;
          this.products1 = arraylist;
          this.products2 = arraylist;
          for (const iterator of this.products2)
          {
            if(isNaN(iterator['Celular_1'])==false)
            {
              iterator['correcto'] = 1;
            }else{
              iterator['Celular_1'] = iterator['Celular_1']+'****'
              iterator['correcto'] = 0;
            }

            if(isNaN(iterator['Celular_2'])==false)
            {
              iterator['correcto'] = 1;
            }else{
              iterator['Celular_2'] = iterator['Celular_2']+'****'
              iterator['correcto'] = 0;
            }

            if(iterator['Celular_2']=='pendiente' && iterator['Celular_2']=='')
            {
              iterator['correcto'] = 1;
            }else{
              iterator['Celular_2'] = iterator['Celular_2']+'****'
              iterator['correcto'] = 0;
            }

          }
          console.log("registros ",arraylist[0]);
          this.registros = [];
          console.log("registros ",this.registros);
      }
  }

  obtenerCiudades(){
    this.data
      .ObtenerCiudad()
      .subscribe((ciudad:Array<any>) => {
        this.ciudades = ciudad;
        this.ciudadesC = ciudad;
        console.log("ciudades : ",this.ciudades);
      });
  }

  mostrarDialogoSubida()
  {
    this.displaySubida = true;
  }

onRowEditInit(product: any) {

  this.clonedProducts[product.id] = {...product};
}

onRowEditSave(product: any) {
  console.log("verificando");
  delete this.clonedProducts[product.id];
}

onRowEditCancel(product: any, index: number) {
  this.products2[index] = this.clonedProducts[product.id];
  delete this.clonedProducts[product.id];
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

      this.filteredCountries = filtered;
  }

  guardarClientes()
  {
    console.log("lista : ",this.clientesExcel);
    let valido = 0;
    for (const iterator of this.clientesExcel)
    {
      valido = valido * iterator.correcto;
    }


      console.log("todo correcto");
      let clienteMasivos = [];
      for (const iterator of this.clientesExcel)
      {
        let ciudadCliente = {
          idCiudad:iterator.Ciudad.idCiudad
        };
        let cliente = {
          idCliente:"",
          razonSocialCliente:iterator.RazonSocial,
          nitCliente:iterator.NIT,
          direccionCliente:iterator.Direccion,
          finalizarServicioCliente:1,
          envioProgramacionCliente:1,
          ciudadCliente: ciudadCliente,
          //ciudadCliente.idCiudad:iterator.Ciudad.ciudad.idCiudad,
          logoCliente:"pendiente",
          correoCliente:iterator.Email,
          celularUnoCliente:iterator.Celular_1,
          celularDosCliente:iterator.Celular_2
        };

        clienteMasivos.push(cliente);
      }
      console.log("lista de cliente : ",clienteMasivos);

      let pojoCliente = {
        clientes:clienteMasivos
      }
      this.data.crearClientesExcel(pojoCliente).then(respuesta =>{
        console.log("clientes estado : ",respuesta);

      }).catch(error =>
        {
          console.log("error : ",error);
          Swal.fire({
            title:'FATAL',
            text:'ERROR EN EL SERVIDOR',
            icon:'error'
          })
        })
  }

  filtrar(valor:any)
  {
    console.log("valor  : ",valor);
    //console.log("valore : ",this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor)));
    this.clientesFiltrados = this.res.filter((element:any) => JSON.stringify(element).toLowerCase().includes(valor.toLowerCase()));
    console.log(this.clientesFiltrados);
    //this.res.forEach((element:any) => JSON.stringify(element).toLowerCase().includes(valor));
  }

}
