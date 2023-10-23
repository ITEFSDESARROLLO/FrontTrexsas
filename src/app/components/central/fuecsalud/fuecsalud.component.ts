import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/app-constants';
import { Ciudad } from 'src/app/models/ModelosJ/ciudad';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fuecsalud',
  templateUrl: './fuecsalud.component.html',
  styleUrls: ['./fuecsalud.component.css']
})
export class FuecsaludComponent implements OnInit {
  fechaActual:Date = new Date();
  idPermanente:number;
  fechact:Date;
  fechaVenPrDoc:Date;
  fechaini:Date;
  fechafin:Date;
  dayfin:number;
  stract:string;
  strini:string;
  strfin:string;
  strinifin:string;
  labels: any;
  Formulario: FormGroup;
  FormularioVehiculoYContrato: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean=false;
  view:boolean=false;
  vehiculos:Array<any>;
  alertveh:boolean=false;
  idvehi:number;
  resveh:any;
  resvehdef:any;
  //ciudades:Array<Ciudad>;
  clientes:Array<any>;
  objcontratos:Array<any>;
  pasajeros:Array<any>;
  contratos:any[]=[];
  pas:Array<any>;
  selectpas:Array<any>;
  selectcontrato:Array<any>;
  responsable:Array<any>;
  cond:Array<any>;
  //conductores:Array<any>;
  conductores:any[] = [];
  selectcond:Array<any>;
  rutas:Array<any>;
  idres:number;
  pasajeroSContrato:any[]=[];
  contratoSeleccionado:any;
  vehiculosFuec:any[]=[];
  vehiculoSeleccionado:any;
  vehiculosFiltrados:any[] =[];
  contratosFiltrados:any[] =[];
  ciudades:any[]=[];
  ciudadesFiltradas:any[]=[];
  formularioFuec:FormGroup;
  conductorSeleccionado:any;
  pasajerosFiltrados:any[] = [];
  pasajeroSeleccionado:any;
  verVehiculos:boolean = false;
  vehiculoParaFuecs:any;

  constructor(private LoginService:LoginService,private data: CentralService,private router:Router, private fb: FormBuilder,private route:ActivatedRoute, private httpService: HttpClient) {
    this.fechact=new Date();
    this.stract=""+moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).format('YYYY-MM-DD');
    this.strinifin="";
    this.strini="";
    this.strfin="";
    this.dayfin=0;
    this.rutas=[];
    this.cond=[];
    this.conductores=[];
    this.selectcond=[];
    this.selectpas=[];
    this.selectcontrato=[];
    this.pas=[];
    this.pasajeros=[];
    this.contratos=[];
    this.idres=-1;
    this.clientes=[];
    this.edit=false;
    this.view=false;
    this.vehiculos=[];
    this.resvehdef={};
    this.idvehi=-1;
    this.idPermanente=-1;
    this.vehiculoParaFuecs = {};
    //console.log(this.resveh.placa);
    this.FormularioVehiculoYContrato = new FormGroup({
      pl:new FormControl('',[Validators.required,Validators.minLength(6)]),
      slcContrato:new FormControl( null,[Validators.required]),
    });
    this.Formulario = new FormGroup({
      fechaini:new FormControl(null,[Validators.required]),
      fechafin:new FormControl(null,[Validators.required]),
      txtCiudadOrigen:new FormControl('',Validators.required),
      txtCiudadDestino:new FormControl('',Validators.required),

    },{
      validators:[this.checkFechahas.bind(this)]
    });

    this.obtenerPl();
    this.obtenerPasajeros();
    this.obtenerConfig();
    this.obtenerPermanentesInfoBasica();

   }

  ngOnInit(): void {
    console.log("fecha actual : ",this.fechaActual)
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    var id=this.route.snapshot.params['id'];
     this.view = true;
    if(id.substr(0,3)==="ver"){
      var urlid=id.substr(3,id.length);
      this.FormularioVehiculoYContrato.get('pl').clearValidators();
      this.FormularioVehiculoYContrato.get('pl').updateValueAndValidity({emitEvent:false, onlySelf:true});
      this.data.obtenerOcasional(urlid).subscribe((res:any) => {
        console.log(res);
        this.Formulario.patchValue({
          pl:res.placaVehiculo,
          numcont:res.contrato.numeracionContrato,
          valcont:res.contrato.valorContrato,
          objc:res.contrato.objetoContrato.idObjetoContrato,
          cli:res.contrato.cliente.idCliente,
          ciudad:res.ciudadContrato.idCiudad,
          doc:res.contrato.responsableContrato.idResponsableContrato,
          nomres:res.contrato.responsableContrato.nombreResponsableContrato,
          telres:res.contrato.responsableContrato.telefonoResponsableContrato,
          dirres:res.contrato.responsableContrato.direccionResponsableContrato,
          //fechaini:res.,
          //fechafin:res.,
          //ruta:res.,
          //perten:res.,
          //nompert:res.,
          //valpert:res.,
        });
        for(var i=0;i<res.contrato.pasajeroList.length;i++){
          this.pas.push(res.contrato.pasajeroList[i].persona);
        }
        console.log(res);
        this.Formulario.disable();
        this.view=true;
        this.fijar();

      });

    }else if(id.substr(0,6)==="clonar")
    {
      this.edit = true;
      var urlid=id.substr(6,id.length);
      console.log("id : ",urlid);
      this.data.obtenerFuec(urlid).then(respuesta =>
        {
          console.log("fuec : ",respuesta);
          this.contratoSeleccionado = respuesta.contrato;
          this.vehiculoSeleccionado = respuesta.vehiculo;
          this.pasajeroSContrato = respuesta.pasajeroList;
          this.traerVehiculoPlaca();
          this.pas = respuesta.pasajeroList;
          this.selectcond = respuesta.vehiculo.conductorList;
          this.Formulario.patchValue({
            fechaini:respuesta.fechaInicioFuec,
            fechafin:respuesta.fechaFinFuec,
            txtCiudadOrigen:respuesta.ciudadOrigen,
            txtCiudadDestino:respuesta.ciudadDestino
          })
        }).catch(error =>
          {
            console.log("error: ",error);
          })
    }

    this.traerVehiculos();
    this.obtenerCiudades();

  }

  /**
   * Agregar un pasajero y vuelve el control nulo, al mismo tiempo rellena el select para mostrar la nueva lista
   */
  onagregarpas() {
    if(this.Formulario.get("pasaj")?.value!=null){

      var pos=this.pasajeros.find(element=>element.idPasajero==this.Formulario.get("pasaj")?.value);

      this.pas.push(pos);
      console.log(this.pas)
      this.Formulario.get("pasaj")?.setValue(null);
      this.selectpas=[];
      for(var i=0;i<this.pasajeros.length;i++){
        if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
          this.selectpas.push(this.pasajeros[i]);
        }

      }
    }
  }

  agregarPasajeroContrato() {
    for (let index = 0; index < this.pasajeroSContrato.length; index++)
    {
      if(this.pasajeroSContrato[index].idPasajero == this.pasajeroSeleccionado.idPasajero)
      {
        this.pas.push(this.pasajeroSeleccionado);
        this.pasajeroSContrato.splice(index,1);
        this.pasajeroSeleccionado = "";
        break;
      }
    }

    /*if(this.Formulario.get("pasaj")?.value!=null){

      var pos=this.pasajeros.find(element=>element.idPasajero==this.Formulario.get("pasaj")?.value);


      console.log(this.pas)
      this.Formulario.get("pasaj")?.setValue(null);
      this.selectpas=[];
      for(var i=0;i<this.pasajeros.length;i++){
        if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
          this.selectpas.push(this.pasajeros[i]);
        }

      }
    }*/
  }



  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:any) => {
        console.log("ciudad : ",ciudad);
        this.ciudades = ciudad;
        this.Formulario.updateValueAndValidity();
      });
  }

  filtrarCiudades(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.ciudades.length; i++) {
        let ciudad = this.ciudades[i];
        if(ciudad.ciudad.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(ciudad);
        }
    }

    this.ciudadesFiltradas = filtered;
  }

  filtrarVehiculos(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.vehiculosFuec.length; i++) {
        let vehiculo = this.vehiculosFuec[i];
        if (vehiculo.placaVehiculo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          console.log("placas",this.vehiculos)
          filtrados.push(vehiculo);
        }
    }

    this.vehiculosFiltrados = filtrados;
  }

  filtrarContratos(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.contratos.length; i++) {
        let contrato = this.contratos[i];
        if (contrato.razonSocialCliente.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(contrato);
        }
    }

    this.vehiculosFiltrados = filtrados;
  }

  filtrarPasajeros(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtrados : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.pasajeroSContrato.length; i++) {
        let pasajero = this.pasajeroSContrato[i];
        if (pasajero.nombrePasajero.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtrados.push(pasajero);
        }
    }

    this.pasajerosFiltrados = filtrados;
  }

  traerVehiculoPlaca()
  {
    if(this.vehiculoSeleccionado!=undefined)
    {
      console.log("placa vehiculo : ",this.vehiculoSeleccionado);
      this.selectcond = [];
      this.data.obtenerVehiculoPlacaFuec(this.vehiculoSeleccionado.idVehiculo).then(res=>
      {
        console.log("vehiculo : ",res);
            this.resvehdef={};
            //this.resveh=res;
            this.resvehdef=res;
            //console.log("conductores del vehiculo : 1000",res.conductorList);
            this.conductores=res.conductorList;
            this.resveh = res;
            /*this.vehiculoParaFuecs={
              placa:res.placaVehiculo,
              cilindraje:res.cilindraje,
              convenio:res.convenioList==undefined?res.convenioList.empresaConvenio.nombreEmpresaConvenio:"",
              tarjop:res.tarjetaOperacionList==undefined?res.tarjetaOperacionList.numeroTarjetaOperacion:"",
              //Vencimiento
              fechtarjop:res.tarjetaOperacionList==undefined?res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion:"",
              validto:res.tarjetaOperacionList==undefined?new Date(res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion)<new Date():true,
              fechrevtec:res.revisionTecnicomecanicaList==undefined?res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica:"",
              validrevtec :res.revisionTecnicomecanicaList==undefined?new Date(res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica)<new Date():true,
              fechSOAT:res.soatList==undefined?res.soatList.fechaVencimientoSoat:"",
              validSOAT :res.soatList==undefined?new Date(res.soatList.fechaVencimientoSoat)<new Date():true,
              fechpolcontr:res.polizaContractualList==undefined?res.polizaContractualList.fechaVencimientoPolizaContractual:"",
              validpolcontr :res.polizaContractualList==undefined?new Date(res.polizaContractualList.fechaVencimientoPolizaContractual)<new Date():true,
              fechpolex:res.polizaExtracontractualList==undefined?res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual:"",
              validpolex :res.polizaExtracontractualList==undefined?new Date(res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual)<new Date():true,
              fechconv:res.convenioList==undefined && res.enConvenioVehiculo?res.convenioList.fechaFinConvenio:"",
              validconv :res.convenioList==undefined && res.enConvenioVehiculo?new Date(res.convenioList.fechaFinConvenio)<new Date():false,
              fechrevprev:res.revisionPreventivaList==undefined?res.revisionPreventivaList.fechaVencimientoRevisionPreventiva:"",
              validrevprev :res.revisionPreventivaList==undefined?new Date(res.revisionPreventivaList.fechaVencimientoRevisionPreventiva)<new Date():true,
            };*/
            console.log("conductores del vehiculo : 147***** ",this.resveh);
            /*this.resveh={
              placa:res.placaVehiculo,
              cilindraje:res.cilindraje,
              convenio:res.convenioList.empresaConvenio.nombreEmpresaConvenio,
              tarjop:res.tarjetaOperacionList.numeroTarjetaOperacion// res.tarjetaOperacionList.numeroTarjetaOperacion,
            }*/
            console.log("conductores del vehiculo : 123",this.conductores.length);



            console.log("conductores de vehiculo : ",this.conductores);
            //this.conductores.forEach(conductor=>conductor.estadoConductor==0 || conductor.estadoConductor == "0");
            console.log("conductores de vehiculo : ",this.conductores);
            if(this.conductores.length == 0)
            {
              this.conductores = [];
              Swal.fire({
                title: 'CUIDADO',
                text: 'EL VEHÍCULO NO TIENE CONDUCTORES HABILITADOS O ASIGNADO \n NO SE PUEDE CREAR FUEC CON ESTE VEHÍCULO',
                icon:'warning'
              })
            }else{
              this.selectcond=[];
              this.selectcond = this.conductores;
            /*for(var i=0;i<res.conductorList.length;i++){
              this.selectcond.push(res.conductorList[i]);
            }*/
            //this.resveh = res;
            console.log("cargando los datos del vehiculo : ",res);
            /*this.resveh={
              placa:res.placaVehiculo,
              cilindraje:res.cilindraje,
              convenio:res.convenioList.empresaConvenio.nombreEmpresaConvenio,
              tarjop:res.tarjetaOperacionList.numeroTarjetaOperacion// res.tarjetaOperacionList.numeroTarjetaOperacion,
            }*/
            this.resveh={
              placa:res.placaVehiculo,
              cilindraje:res.cilindraje,
              convenio:res.convenioList==undefined?res.convenioList.empresaConvenio.nombreEmpresaConvenio:"",
              tarjop:res.tarjetaOperacionList==undefined?res.tarjetaOperacionList.numeroTarjetaOperacion:"",
              //Vencimiento
              fechtarjop:res.tarjetaOperacionList==undefined?res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion:"",
              validto:res.tarjetaOperacionList==undefined?new Date(res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion)<new Date():true,
              fechrevtec:res.revisionTecnicomecanicaList==undefined?res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica:"",
              validrevtec :res.revisionTecnicomecanicaList==undefined?new Date(res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica)<new Date():true,
              fechSOAT:res.soatList==undefined?res.soatList.fechaVencimientoSoat:"",
              validSOAT :res.soatList==undefined?new Date(res.soatList.fechaVencimientoSoat)<new Date():true,
              fechpolcontr:res.polizaContractualList==undefined?res.polizaContractualList.fechaVencimientoPolizaContractual:"",
              validpolcontr :res.polizaContractualList==undefined?new Date(res.polizaContractualList.fechaVencimientoPolizaContractual)<new Date():true,
              fechpolex:res.polizaExtracontractualList==undefined?res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual:"",
              validpolex :res.polizaExtracontractualList==undefined?new Date(res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual)<new Date():true,
              fechconv:res.convenioList==undefined && res.enConvenioVehiculo?res.convenioList.fechaFinConvenio:"",
              validconv :res.convenioList==undefined && res.enConvenioVehiculo?new Date(res.convenioList.fechaFinConvenio)<new Date():false,
              fechrevprev:res.revisionPreventivaList==undefined?res.revisionPreventivaList.fechaVencimientoRevisionPreventiva:"",
              validrevprev :res.revisionPreventivaList==undefined?new Date(res.revisionPreventivaList.fechaVencimientoRevisionPreventiva)<new Date():true,
            };

            let listaFechas:any[] = [];
            listaFechas.push(new Date(this.resveh.fechtarjop));
            listaFechas.push(new Date(this.resveh.fechrevtec));
            listaFechas.push(new Date(this.resveh.fechSOAT));
            listaFechas.push(new Date(this.resveh.fechpolcontr));
            listaFechas.push(new Date(this.resveh.fechpolex));
            listaFechas.push(new Date(this.resveh.fechconv));
            listaFechas.push(new Date(this.resveh.fechrevprev));
            this.resveh.cond=[];
            for(var i=0;i<res.conductorList.length;i++){
              this.resveh.cond.push({
                id:res.conductorList[i].idConductor,
                nom:(res.conductorList[i].persona.nombrePersona+" "+res.conductorList[i].persona.apellidoPersona).toUpperCase(),
                fecharl:res.conductorList[i].finArlConductor!=null?res.conductorList[i].finArlConductor:"",
                validarl :res.conductorList[i].finArlConductor!=null?new Date(res.conductorList[i].finArlConductor)<new Date():true,
                fecheps:res.conductorList[i].finEpsConductor!=null?res.conductorList[i].finEpsConductor:"",
                valideps :res.conductorList[i].finEpsConductor!=null?new Date(res.conductorList[i].finEpsConductor)<new Date():true,
              })
              listaFechas.push(new Date(res.conductorList[i].finEpsConductor));
              listaFechas.push(new Date(res.conductorList[i].finArlConductor));
              /*
              this.fechafin=this.fechafin>new Date(res.conductorList[i].finEpsConductor) && new Date(res.conductorList[i].finEpsConductor)>new Date()?new Date(res.conductorList[i].finEpsConductor):this.fechafin;
              this.fechafin=this.fechafin>new Date(res.conductorList[i].finArlConductor) && new Date(res.conductorList[i].finArlConductor)>new Date()?new Date(res.conductorList[i].finArlConductor):this.fechafin;
              */
            }
            for (const iterator of listaFechas)
            {
              console.log("fecha a evaluar : ",iterator)
              if(this.fechafin!=undefined)
              {
                if(this.fechafin>iterator && iterator>new Date())
                {
                  this.fechafin = iterator
                  console.log("fecha más cercana ",iterator);
                }
              }else{
                this.fechafin = iterator;
              }
            }
            this.strfin=moment({year :this.fechafin.getFullYear(), month :this.fechafin.getMonth(), date :this.fechafin.getDate()+1}).format('YYYY-MM-DD');
            this.strini=this.strfin;
            console.log("fecha fin : ",this.strfin);
            console.log(this.resveh);
            console.log(this.resvehdef);
            }


      }).catch(error =>
        {

        });
    }
  }

  /**private calcularFechaFin():Date
  {

  } */


  traerConductoresVehiculo()
  {

  }

  traerPasajerosContrato()
  {
    if(this.contratoSeleccionado!="")
    {
      this.verVehiculos = true;
      console.log("contrato : ",this.contratoSeleccionado);
      this.data.traerPasajerosContrato(this.contratoSeleccionado.idContrato).then(respuesta =>{
        this.pasajeroSContrato = respuesta.pasajeros;
        this.traerVehiculos();
        console.log("pasajeros contrato : ",this.pasajeroSContrato);
        }).catch(error =>{
          console.log("error : ",error);
        })
    }
  }



  /**
   * Remueve el pasajero por medio de la pocision, y vuelve  a rrellenar el select
   * @param i Pocision a eliminar
   */
   removerPasajero(pasajero:any) {
     for (let index = 0; index < this.pas.length; index++)
     {
       if(this.pas[index].idPasajero == pasajero.idPasajero)
       {
         this.pas.splice(index,1);
         this.pasajeroSContrato.push(pasajero);
         this.pasajeroSeleccionado = "";
         console.log("pasajero : ",this.pasajeroSContrato);
         break;
       }

     }

  }

  /**
   * Obtiene la configuracion para luego modificar los maximos y minimos y asi  limitarlo visualmente en el HTML
   */
  obtenerConfig(){
    this.data.obtenerConfiguracion(''+1).subscribe(
      (res:any)=>{
        console.log(res);
        var dini=moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).add(res.maximoInicioContrato, 'days');
        var dfin=moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).add(res.maximoDuracionContrato, 'days');
        this.fechaini=dini.toDate();
        this.fechafin=dfin.toDate();
        this.strini=""+dini.format('YYYY-MM-DD');
        this.strfin=""+dfin.format('YYYY-MM-DD');
        this.dayfin=res.maximoDuracionContrato;
      });
  }




  agregarConductor()
  {
    if(this.conductorSeleccionado!="" && this.conductorSeleccionado!=undefined)
    {
      if(this.conductorSeleccionado.estadoConductor ==1)
      {
        this.cond.push(this.conductorSeleccionado);
        console.log("conductor Seleccionado : ",this.conductorSeleccionado);

        for (let index = 0; index < this.selectcond.length; index++)
        {
          if(this.selectcond[index].idConductor == this.conductorSeleccionado.idConductor)
          {
            this.selectcond.splice(index,1);

            break;
          }
        }
      }else{
        Swal.fire({
          title:'NO PERMITIDO',
          text:'CONDUCTOR NO HABILITADO POR \n VENCIMIENTO DE PAPEPELES',
          icon:'warning'
        })
        this.conductorSeleccionado = "";
      }

    }
  }

  /**
   * Remueve el conductor por medio de la pocision, y vuelve  a rellenar el select
   * @param i Pocision a eliminar
   */
  removercond(i:number,conductor:any) {
    console.log("lista de disponibles : ",this.selectcond);
    console.log("lista de disponibles : ",this.cond);

    //this.selectcond=[];
    for(var i=0;i<this.cond.length;i++){
      if(this.cond[i].idConductor == conductor?.idConductor)
      {
        this.selectcond.push(this.cond[i]);
        this.cond.splice(i,1);
        this.conductorSeleccionado = "";
        console.log("Encontrado conductores : ",this.cond[i]);
      }
    }
    this.Formulario.get("conduc")?.setValue(null);
  }

  removerConductor(conductor:any)
  {
    if(conductor!="" && conductor!=undefined)
    {
      for (let index = 0; index < this.cond.length; index++)
      {
        if(this.cond[index].idConductor == conductor.idConductor)
        {
          this.conductorSeleccionado = "";
          this.cond.splice(index,1);
          this.selectcond.push(conductor);
          break;
        }
      }
    }

  }



  /**
   * Obtiene y rellena el select de pasajeros
   */
  obtenerPasajeros(){
    this.data
      .obtenerBasicPas()
      .subscribe((res:Array<any>) => {
        console.log(res);
        this.pasajeros = res;
        this.selectpas=[];
        for(var i=0;i<this.pasajeros.length;i++){
          if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
            this.selectpas.push(this.pasajeros[i]);
          }

        }
      });
  }

  /**
   * Obtiene y rellena el select de contratos
   */
  obtenerPermanentesInfoBasica(){
    this.data
      .obtenerInfoBasicaPermanentes()
      .then(res => {
        console.log("feucs : ",res);
        this.contratos = res.contratos;
      }).catch(error=>
        {
          console.log("error : ",error);
        });
  }



  /**
   * Obtener Placas, para asi obtener su ID y la informacion principal
   */
  obtenerPl(){
    this.data
      .obtenerPlacasSalud()
      .subscribe((res: Array<any>) => {
        console.log(res);
        this.vehiculos=res;
      });
  }



  /**
   * Busca la placa que se introdujo y luego si la encuentra rellena y muestra los datos del vehiculo, de lo contrario, muestra un alert arrojando que no se encontro la placa.
   * Tambien se encarga de validar los espacios del vehiculo y del conductor.
   */
  fijar(){
    this.FormularioVehiculoYContrato.markAllAsTouched();
    if(this.FormularioVehiculoYContrato.valid ){
      var found1 = this.vehiculos.find(element =>element.placaVehiculo==(this.FormularioVehiculoYContrato.get('pl')?.value).toUpperCase());
      this.rutas=this.FormularioVehiculoYContrato.get('slcContrato')?.value.rutaList;
      this.pasajeros = this.FormularioVehiculoYContrato.get('slcContrato')?.value.pasajeroList;
        this.selectpas=[];
        for(var i=0;i<this.pasajeros.length;i++){
          if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
            this.selectpas.push(this.pasajeros[i]);
          }

        }
      if(found1!==undefined){
        this.alertveh=false;
        this.data.obtenerVehiculo(found1.idVehiculo).then(
          (res:any)=>{
            console.log(res);
            this.resvehdef={};
            this.resveh={};
            this.resvehdef=res;
            this.conductores=res.conductorList;
            this.selectcond=[];
            for(var i=0;i<res.conductorList.length;i++){
              this.selectcond.push(res.conductorList[i]);
            }
            this.resveh={
              placa:res.placaVehiculo,
              cilindraje:res.cilindraje,
              convenio:res.convenioList.length!=0?res.convenioList.empresaConvenio.nombreEmpresaConvenio:"",
              tarjop:res.tarjetaOperacionList.length!=0?res.tarjetaOperacionList.numeroTarjetaOperacion:"",
              //Vencimiento
              fechtarjop:res.tarjetaOperacionList.length!=0?res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion:"",
              validto:res.tarjetaOperacionList.length!=0?new Date(res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion)<new Date():true,
              fechrevtec:res.revisionTecnicomecanicaList.length!=0?res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica:"",
              validrevtec :res.revisionTecnicomecanicaList.length!=0?new Date(res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica)<new Date():true,
              fechSOAT:res.soatList.length!=0?res.soatList[res.soatList.length-1].fechaVencimientoSoat:"",
              validSOAT :res.soatList.length!=0?new Date(res.soatList.fechaVencimientoSoat)<new Date():true,
              fechpolcontr:res.polizaContractualList.length!=0?res.polizaContractualList.fechaVencimientoPolizaContractual:"",
              validpolcontr :res.polizaContractualList.length!=0?new Date(res.polizaContractualList.fechaVencimientoPolizaContractual)<new Date():true,
              fechpolex:res.polizaExtracontractualList.length!=0?res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual:"",
              validpolex :res.polizaExtracontractualList.length!=0?new Date(res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual)<new Date():true,
              fechconv:res.convenioList.length!=0 && res.enConvenioVehiculo?res.convenioList.fechaFinConvenio:"",
              validconv :res.convenioList.length!=0 && res.enConvenioVehiculo?new Date(res.convenioList.fechaFinConvenio)<new Date():false,
              fechrevprev:res.revisionPreventivaList.length!=0?res.revisionPreventivaList.fechaVencimientoRevisionPreventiva:"",
              validrevprev :res.revisionPreventivaList.length!=0?new Date(res.revisionPreventivaList.fechaVencimientoRevisionPreventiva)<new Date():true,


            };
            this.fechafin=this.fechafin>new Date(this.resveh.fechtarjop) && new Date(this.resveh.fechtarjop)>new Date()?new Date(this.resveh.fechtarjop):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechrevtec) && new Date(this.resveh.fechrevtec)>new Date()?new Date(this.resveh.fechrevtec):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechSOAT) && new Date(this.resveh.fechSOAT)>new Date()?new Date(this.resveh.fechSOAT):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechpolcontr) && new Date(this.resveh.fechpolcontr)>new Date()?new Date(this.resveh.fechpolcontr):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechpolex) && new Date(this.resveh.fechpolex)>new Date()?new Date(this.resveh.fechpolex):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechconv) && new Date(this.resveh.fechconv)>new Date()?new Date(this.resveh.fechconv):this.fechafin;
            this.fechafin=this.fechafin>new Date(this.resveh.fechrevprev) && new Date(this.resveh.fechrevprev)>new Date()?new Date(this.resveh.fechrevprev):this.fechafin;
            this.resveh.cond=[];
            for(var i=0;i<res.conductorList.length;i++){
              this.resveh.cond.push({
                id:res.conductorList[i].idConductor,
                nom:(res.conductorList[i].persona.nombrePersona+" "+res.conductorList[i].persona.apellidoPersona).toUpperCase(),
                fecharl:res.conductorList[i].finArlConductor!=null?res.conductorList[i].finArlConductor:"",
                validarl :res.conductorList[i].finArlConductor!=null?new Date(res.conductorList[i].finArlConductor)<new Date():true,
                fecheps:res.conductorList[i].finEpsConductor!=null?res.conductorList[i].finEpsConductor:"",
                valideps :res.conductorList[i].finEpsConductor!=null?new Date(res.conductorList[i].finEpsConductor)<new Date():true,
              })
              this.fechafin=this.fechafin>new Date(res.conductorList[i].finEpsConductor) && new Date(res.conductorList[i].finEpsConductor)>new Date()?new Date(res.conductorList[i].finEpsConductor):this.fechafin;
              this.fechafin=this.fechafin>new Date(res.conductorList[i].finArlConductor) && new Date(res.conductorList[i].finArlConductor)>new Date()?new Date(res.conductorList[i].finArlConductor):this.fechafin;
            }
            this.strfin=moment({year :this.fechafin.getFullYear(), month :this.fechafin.getMonth(), date :this.fechafin.getDate()}).format('YYYY-MM-DD');
            this.strini=this.strfin;
            console.log(this.strfin);
            console.log(this.resveh);
          }
        )

      }else{
        this.alertveh=true;
      }

    }
  }

  /**
   * Vuelve el control Mayusculas
   * @param nom Nombre del control
   */
  mayus(nom:string):void{
    this.Formulario.get(nom)?.setValue((this.Formulario.get(nom)?.value).toUpperCase());
    this.FormularioVehiculoYContrato.get(nom)?.setValue((this.FormularioVehiculoYContrato.get(nom)?.value).toUpperCase());
  }

  regresar()
  {
    console.log("enviando : ");
    this.router.navigate['/central/fuecs/'];


  }


  /**
   * Guarda el Contrato ocasional, revisando primero si el Formulario es Valido, d elo contrario, no  lo permite crear
   */
  guardar(){
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid ){
      Swal.fire({
        title: 'ERROR',
        text: 'TODAVÍA FALTAN CAMPOS POR LLENAR',
        icon:'warning'
      })
      console.log("Campos Pendientes");
      console.log(this.Formulario.errors);
    }else{
      var JSON:any={};

      JSON.fechaInicioFuec=this.Formulario.get("fechaini")?.value;
      JSON.fechaFinFuec=this.Formulario.get("fechafin")?.value;
      //JSON.contrato={};
      JSON.contrato=this.contratoSeleccionado;
      //dJSON.vehiculo={};
      JSON.vehiculo=this.vehiculoSeleccionado;
      JSON.pasajeroList=this.pas;
      JSON.conductorList=this.cond;
      JSON.ciudadOrigen =this.Formulario.get('txtCiudadOrigen')?.value;
      JSON.ciudadDestino = this.Formulario.get('txtCiudadDestino')?.value;
      console.log("nuevo fuec :",JSON)
      this.data.crearFuecSalud(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          Swal.fire({
            title: 'Operación Exitosa',
            text: 'FUEC CREADO CON ÉXTIO',
            icon:'success'
          }).then(respuesta=>
                     {
                        if(respuesta.isConfirmed)
                        {
                        //window.location.href = "/central/reservas";
                        this.msm+=" "+"CREADO CON EXITO ";
                        }
                      })
          this.ocultar=true;
        }else{
          this.ocultar=false;
          Swal.fire({
            title: 'Error',
            text: 'Error en el sistema '+res.mensaje,
            icon:'success'
          })
        }
      });
    }

  }

  /**
   * Checkea las fechas para validar que no se pase de los limites de configuracion ni de inicio
   * @param group
   * @returns
   */
  checkFechahas: ValidationErrors = (group: FormGroup): ValidationErrors | null=> { // here we have the 'passwords' group
    var hasta = group.controls.fechafin.value;
    var desde =  group.controls.fechaini.value;
    var res=true;
    var fecdes=new Date(group.controls.fechaini.value+" 23:59:59");
    var fechast=new Date(group.controls.fechafin.value+" 23:59:59");
    //console.log(fecdes);
    this.strinifin=""+moment({year :fecdes.getFullYear(), month :fecdes.getMonth(), date :fecdes.getDate()}).format('YYYY-MM-DD');
    var dfin=moment({year :fecdes.getFullYear(), month :fecdes.getMonth(), date :fecdes.getDate()}).add(this.dayfin, 'days');
    this.strfin=fechast>=dfin.toDate()?""+dfin.format('YYYY-MM-DD'):this.strfin;

    if(new Date(desde)>new Date(hasta) || new Date(hasta)>new Date(this.strfin)){
      group.controls['fechafin'].setErrors({checkfech:true});
    }else{
      group.controls['fechafin'].setValidators([Validators.required]);
      group.controls['fechafin'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    if(new Date()>=new Date(fecdes)){
      group.controls['fechaini'].setErrors({checkfech:true});
    }

    return null
  }

  /**
   * Checkea que sea una placa contenida dentro de la lista de placas
   * @param group recibe el FormGroup
   * @returns retorna si es valida la placa, y muetra un alert
   */
  checkPL: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{

    var CO=group.controls.pl.value;
    var verf=this.vehiculos.findIndex(element =>element.placaVehiculo==(CO).toUpperCase());
    if(verf!=-1){
      return null;
    }else{
      return {validpl:true};
    }
  }


  traerVehiculos()
  {
    this.data.obtenerVehiculosFuec2().then(respuesta =>{
      this.vehiculosFuec = respuesta.vehiculos;
      console.log("vehiculos sistema : ",this.vehiculosFuec);
    }).catch(error =>
      {
        console.log("error : ",error);
      })
  }

  verificarFechas(fecha:any):boolean
  {
    let fechaComparar = new Date(fecha);
    if(this.fechaActual > fechaComparar)
    {
      return true;
    }else{
      return false;
    }
  }



}
