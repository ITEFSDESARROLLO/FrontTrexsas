import { PolizaTodoRiesgo } from './../../../models/PolizaTodoRiesgo';
import { RevisionTecnicoMecanica } from './../../../models/revision-tecnico-mecanica';
import { Propietario } from './../../../models/propietario';
import { Vehiculocreateinterface } from './../../../models/vehiculocreateinterface';
import { CentralService } from './../../../services/central.service';
import { Ciudad } from './../../../models/ciudad';
import { Component, OnInit } from '@angular/core';
import { AseguradorasVehiculoInterface } from './../../../models/aseguradoras-vehiculo-interface';
import { TipoVehiculoInterface } from './../../../models/tipo-vehiculo-interface';
import { ConveniosVehiculoInterface } from './../../../models/convenios-vehiculo-interface';
import { MarcaVehiculoInterface } from './../../../models/marca-vehiculo-interface';
import { ClaseVehiculoInterface } from './../../../models/clase-vehiculo';
import { LoginService } from './../../../services/login.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCombustibleInterface } from 'src/app/models/tipo-combustible';
import { Observacioninterface } from 'src/app/models/observacioninterface';
import { Vehiculo } from 'src/app/models/vehiculo';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  labels: any;
  notifi:number;
  porcentaje:number;
  idprop:number;
  propArray:Array<Propietario>;
  propbool:boolean;
  selectpropArray:Array<Propietario>;
  idedit:number;
  listobsv:any;
  resveh:any;
  resconv:any;
  resTO:any;
  resSOAT:any;
  resTM:any;
  resPC:any;
  resPE:any;
  resRP:any;
  nav:number;
  tipocom:Array<TipoCombustibleInterface>;
  tipoveh:Array<TipoVehiculoInterface>;
  aseguradoraveh:Array<AseguradorasVehiculoInterface>;
  claseveh:Array<ClaseVehiculoInterface>;
  marcaveh:Array<MarcaVehiculoInterface>;
  modeloveh:any;
  estadoa:any;
  convenios:Array<ConveniosVehiculoInterface>;
  tipodocs:any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  resVehEdit:any;
  NomimgeditVehArray:Array<string>=[];
  archnomeditvehconv="";
  archnomeditvehTO:Array<string>=[];
  archnomeditvehSOAT="";
  archnomeditvehTM="";
  archnomeditvehPC="";
  archnomeditvehPE="";
  archnomeditvehRP="";
  archnomeditvehTP:Array<string>=[];
  FileimgVehArray:Array<File>=[];
  NomimgVehArray:Array<string>=[];
  AlertimgVehArray:Array<boolean>=[];
  archalertvehconv=false;
  vehiculo:any;
  archnomvehconv="Selecciona un Archivo";
  vehiculoEditView:any;
  archfilevehconv=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archfilevehTO:Array<File>=[];
  archnomvehTO:Array<string>=[];
  archalertvehTO:Array<boolean>=[];
  archalertvehSOAT=false;
  archnomvehSOAT="Selecciona un Archivo";
  archfilevehSOAT=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archalertvehTM=false;
  archnomvehTM="Selecciona un Archivo";
  archfilevehTM=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archalertvehPC=false;
  archnomvehPC="Selecciona un Archivo";
  archfilevehPC=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archalertvehPE=false;
  archnomvehPE="Selecciona un Archivo";
  archfilevehPE=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archalertvehRP=false;
  archnomvehRP="Selecciona un Archivo";
  archfilevehRP=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
  archfilevehTP:Array<File>=[];
  archnomvehTP:Array<string>=[];
  archalertvehTP:Array<boolean>=[];
  param: string;
  conduct:Array<any>;
  conductselect:Array<any>;
  conductlist:Array<any>;
  coloresVehiculo:any[]=[];
  lineasMarcas:any[]=[];
  tiposServicios:any[]=[];
  tiposCarrocerias:any[]=[];
  entidadesTransito:any[]=[];
  entidadesFiltrada:any[] = [];
  coloresFiltrados:any[] = [];
  serviciosFiltrados:any[] = [];
  carroceriasFiltradas:any[] = [];
  lineasFiltradas:any[] = [];
  marcasFiltradas:any[] = [];
  marcaSeleccionada:any;

  fotoFrenteVehiculo:any;
  fotoTraseraVehiculo:any;
  fotoLateralVehiculo:any;
  archivoTarjetaOperacion:any;
  archivoSoat:any;
  archivoRevisionTecnicoMecanica:any;
  archivoPolizaContractural:any;
  archivoPolizaExtraContractural:any;
  archivoRevisionPreventica:any;
  archivoLicenciaTransito:any;
  archivoConvenio:any;
  archivoPolizaTodoRiesgo:any;



  nombreArchivoFrenteVehiculo:any = "pendiente";
  nombreArchivoLadoVehiculo:any = "pendiente";
  nombreArchivoParteTraseraVehiuclo:any = "pendiente";
  nombreArchivoTarjetaOperacion:any = "pendiente";
  nombreArchivoSoat:any = "pendiente";
  nombreArchivoRevisionTecnicoMecanica:any = "pendiente";
  nombreArchivoPolizaContractual:any = "pendiente";
  nombreArchivoPolizaExtraContractual:any = "pendiente";
  nombreArchivoRevisionPreventiva:any = "pendiente";
  nombreArchivoLicenciaTransito:any = "pendiente";
  nombreArchivoConvenio:any = "pendiente";
  nombreArchivoPolizaTodoRiesgo:any = "pendiente";
  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.conduct=[];
    this.conductselect=[];
    this.conductlist=[];
    this.resVehEdit={};
    this.propbool=false;
    this.porcentaje=0;
    this.idedit=-1;
    this.idprop=-1;
    this.notifi=0;
    this.listobsv=[];
    this.propArray=[];
    this.selectpropArray=[];
    this.idprop=-1;
    this.nav=1;
    this.edit=false;
    this.view=false;
    this.param="";
    this.FileimgVehArray.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.FileimgVehArray.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.FileimgVehArray.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.NomimgVehArray.push("Selecciona un Archivo");
    this.NomimgVehArray.push("Selecciona un Archivo");
    this.NomimgVehArray.push("Selecciona un Archivo");
    this.AlertimgVehArray.push(false);
    this.AlertimgVehArray.push(false);
    this.AlertimgVehArray.push(false);
    ///
    this.archfilevehTO.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfilevehTO.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archnomvehTO.push("Selecciona un Archivo");
    this.archnomvehTO.push("Selecciona un Archivo");
    this.archalertvehTO.push(false);
    this.archalertvehTO.push(false);
    ///
    this.archfilevehTP.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfilevehTP.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archnomvehTP.push("Selecciona un Archivo");
    this.archnomvehTP.push("Selecciona un Archivo");
    this.archalertvehTP.push(false);
    this.archalertvehTP.push(false);


    //Nom EDIT
    this.archnomeditvehTO.push("");
    this.archnomeditvehTO.push("");
    this.archnomeditvehTP.push("");
    this.archnomeditvehTP.push("");
    this.NomimgeditVehArray.push("");
    this.NomimgeditVehArray.push("");
    this.NomimgeditVehArray.push("");
    this.archnomeditvehconv="";
    this.archnomeditvehSOAT="";
    this.archnomeditvehTM="";
    this.archnomeditvehPC="";
    this.archnomeditvehPE="";
    this.archnomeditvehRP="";
    //
    this.estadoa=[];
    this.modeloveh=[];
    this.tipocom=[];
    this.tipoveh=[];
    this.aseguradoraveh=[];
    this.claseveh=[];
    this.marcaveh=[];
    this.convenios=[];
    this.tipodocs=[];
    this.obtenerModelo();
    this.obtenerClases();
    this.obtenerConvenios();
    this.obtenerMarcas();
    this.obtenerTiposCombustibles();
    this.obtenerTiposVehiculos();
    this.obtenerAseguradorasVehiculos();
    this.obtenerPropietarios();
    this.obtenerCond();
    this.Formulario = new FormGroup({
      codi:new FormControl( '',[Validators.required]),
      placa:new FormControl( '',{validators:[Validators.required,Validators.minLength(5),Validators.maxLength(6),Validators.pattern("([A-Z]{3}\[0-9]{3})|([A-Z]{1}\[0-9]{4})|([A-Z]{2}\[0-9]{4})|([A-Z]{1}\[0-9]{5})")],updateOn:'blur'}),
      modeloveh:new FormControl( null,[Validators.required]),
      cilindraje:new FormControl( '',[Validators.required]),
      numpas:new FormControl( '',[Validators.required]),
      color:new FormControl( '',[Validators.required]),
      tipocom:new FormControl( null,[Validators.required]),
      tipoveh:new FormControl( null,[Validators.required]),
      claseveh:new FormControl( null,[Validators.required]),
      marcaveh:new FormControl( null,[Validators.required]),
      swconv: new FormControl( false),
      swest: new FormControl( false),
      convenio:new FormControl( null),
      archveh:new FormControl( ''),
      archveh1:new FormControl( ''),
      archveh2:new FormControl( ''),
      licconv:new FormControl( ''),
      fechainiconv:new FormControl( ''),
      fechafinconv:new FormControl( ''),
      archconv:new FormControl( ''),
      numTO:new FormControl( ''),
      fechainiTO:new FormControl( ''),
      fechafinTO:new FormControl( ''),
      aseguradoraSOAT:new FormControl( null,[Validators.required]),
      numSOAT:new FormControl( '',[Validators.required]),
      fechainiSOAT:new FormControl( '',[Validators.required]),
      fechafinSOAT:new FormControl( '',[Validators.required]),
      fechainiTM:new FormControl( '',[Validators.required]),
      fechafinTM:new FormControl( '',[Validators.required]),
      aseguradoraPC:new FormControl( null,[Validators.required]),
      numPC:new FormControl( '',[Validators.required]),
      fechainiPC:new FormControl( '',[Validators.required]),
      fechafinPC:new FormControl( '',[Validators.required]),
      aseguradoraPE:new FormControl( null,[Validators.required]),
      numPE:new FormControl( '',[Validators.required]),
      fechainiPE:new FormControl( '',[Validators.required]),
      fechafinPE:new FormControl( '',[Validators.required]),
      fechainiRP:new FormControl( '',[Validators.required]),
      fechafinRP:new FormControl(''),
      numeroMotor:new FormControl( ''),
      numeroChasis:new FormControl( ''),
      numeroVin:new FormControl( ''),
      entidadTransito:new FormControl('',Validators.required),
      carroceria:new FormControl('',Validators.required),
      servicio:new FormControl('',Validators.required),
      linea:new FormControl('',Validators.required),
      filterprop:new FormControl( '',Validators.required),
      filtercond:new FormControl( ''),
      numeroLicenciaTransito:new FormControl('',Validators.required),
      fechaMatricula:new FormControl( '',[Validators.required]),
      fechaInicioPolizaTodoRiesgo:new FormControl(''),
      fechaFinPolizaTodoRiesgo:new FormControl(''),
      numeroPolizaTodoRiesgo:new FormControl(''),
      aseguradoraPolizaTodoRiesgo:new FormControl(''),
      numeroSerie:new FormControl(''),
      numeroRevisionTecnicoMecanica:new FormControl('',Validators.required)
    },this.checkFech);
    {

      //validators:[this.checkConv.bind(this),this.checkFech]
      //validators:[this.checkConv.bind(this),this.checkFech]
    }

    this.Formulario.get("placa")?.setAsyncValidators([this.validate.bind(this)]);
    this.Formulario.get("placa")?.updateValueAndValidity();
   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.obtenerColoresVehiculos();
    this.obtenerEntidades();
    this.obtenerTiposCarroceria();
    this.obtenerTiposServicio();
    this.param = this.route.snapshot.params['id'];

    if(this.param?.substr(0,6)==="editar"){
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerVehiculo(urlid).then(
        (res:any)=>{
          this.vehiculo = res;
          //Guarda los nombres de lso archivos.

          let llavesObjeto = Object.keys(res);
          for (const iterator of llavesObjeto)
          {
            if(res[iterator]==null)
            {
              console.log("llave : ",iterator," valor: ",res[iterator]);
              res[iterator] = undefined;
              console.log("llave : ",iterator," valor: ",res[iterator]);
            }
          }
          console.log("vehiculo a editar : ",res);
          this.idprop=res.propietario.idPersona;
          this.nombreArchivoTarjetaOperacion=""+res.tarjetaOperacionList.unoTarjetaOperacion;
          this.nombreArchivoLicenciaTransito=""+res.tarjetaPropiedadUnoVehiculo;
          this.nombreArchivoFrenteVehiculo=""+res.frenteVehiculo;
          this.nombreArchivoLadoVehiculo=""+res.ladoVehiculo;
          this.nombreArchivoParteTraseraVehiuclo=""+res.traseraVehiculo;


          this.nombreArchivoConvenio = ""+(res.convenioList!==undefined?res.convenioList.convenio:"");
          this.nombreArchivoSoat=""+res.soatList!==undefined?res.soatList.soat:"";
          this.nombreArchivoRevisionTecnicoMecanica=""+res.revisionTecnicomecanicaList.revisionTecnicomecanica;
          this.nombreArchivoPolizaContractual=""+res.polizaContractualList.polizaContractual;
          this.nombreArchivoPolizaExtraContractual=""+res.polizaExtracontractualList.polizaExtracontractual;
          this.nombreArchivoRevisionPreventiva=""+res.revisionPreventivaList.revisionPreventiva;
          this.resVehEdit=res;

          for(var i=0;i<res.conductorList.length;i++){
            var jsoncon:any={};
            jsoncon.apellidoPersona=res.conductorList[i].persona.apellidoPersona;
            jsoncon.documentoPersona=res.conductorList[i].persona.documentoPersona;
            jsoncon.idConductor=res.conductorList[i].idConductor;
            jsoncon.nombrePersona=res.conductorList[i].persona.nombrePersona;
            this.conductlist.push(jsoncon);
          }

          console.log("fecha de matrícula : ",res.fechaMatricula);
          console.log("fecha inicio : ",res.polizaTodoRiesgoList)
          //console.log("fecha inicio : ",res.polizaTodoRiesgoList?.fechaInicio.substr(0,10))
          this.Formulario.patchValue({
            codi:res.codigoInternoVehiculo,
            placa:res.placaVehiculo,
            numpas:res.numeroPasajerosVehiculo,
            swest:res.estadoVehiculo,
            tipocom:res.tipoCombustible.idTipoCombustible,
            tipoveh:res.tipoVehiculo==undefined?'':res.tipoVehiculo.idTipoVehiculo,
            claseveh:res.clase==undefined?'':res.clase.idClase,
            marcaveh:res.marca==undefined?'':res.marca.idMarca,
            color:res.colorVehiculo,
            modeloveh:res.modelo?.substr(0,4),
            cilindraje:res.cilindraje,
            swconv:res.enConvenioVehiculo==1?true: false,
            convenio:res.convenioList!=null?res.convenioList.empresaConvenio.idEmpresaConvenio: null,
            filterprop:res.propietario,
            fechainiconv:res.convenioList!==undefined?res.convenioList.fechaInicioConvenio?.substr(0,10):"",
            fechafinconv:res.convenioList!==undefined?res.convenioList.fechaFinConvenio?.substr(0,10):"",
            licconv:res.convenioList!==undefined?res.convenioList.licenciaConvenio?.substr(0,10):"",
            numTO:res.tarjetaOperacionList.numeroTarjetaOperacion,
            fechainiTO:res.tarjetaOperacionList.fechaExpedicionTarjetaOperacion?.substr(0,10),
            fechafinTO:res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion?.substr(0,10),
            aseguradoraSOAT:res.soatList.aseguradora==null?'':res.soatList.aseguradora.idAseguradora,
            numSOAT:res.soatList.numeroSoat,
            fechainiSOAT:res.soatList.fechaInicioSoat?.substr(0,10),
            fechafinSOAT:res.soatList.fechaVencimientoSoat?.substr(0,10),
            fechainiTM:res.revisionTecnicomecanicaList.fechaRevisionTecnicomecanica?.substr(0,10),
            fechafinTM:res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica?.substr(0,10),
            aseguradoraPC:res.polizaContractualList.aseguradora==null?'':res.polizaContractualList.aseguradora.idAseguradora,
            numPC:res.polizaContractualList.numeroPolizaContractual,
            fechainiPC:res.polizaContractualList.fechaInicioPolizaContractual?.substr(0,10),
            fechafinPC:res.polizaContractualList.fechaVencimientoPolizaContractual?.substr(0,10),
            aseguradoraPE:res.polizaExtracontractualList.aseguradora==null?'':res.polizaExtracontractualList.aseguradora.idAseguradora,
            numPE:res.polizaExtracontractualList.numeroPolizaExtracontractual,
            fechainiPE:res.polizaExtracontractualList.fechaInicioPolizaExtracontractual?.substr(0,10),
            fechafinPE:res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual?.substr(0,10),
            fechainiRP:res.revisionPreventivaList.fechaInicioRevisionPreventiva?.substr(0,10),
            fechafinRP:res.revisionPreventivaList.fechaVencimientoRevisionPreventiva?.substr(0,10),
            numeroMotor:res.numeroMotorVehiculo?.substr(0,10),
            numeroChasis:res.chasisVehiculo?.substr(0,10),
            numeroVin:res.numeroVin?.substr(0,10),
            entidadTransito:res.entidadTransito,
            carroceria:res.carroceriaVehiculo,
            servicio:res.tipoServicio,
            linea:res.linea,
            numeroLicenciaTransito:res.numeroLicenciaTransito,
            fechaMatricula:res.fechaMatricula?.substr(0,10),
            fechaInicioPolizaTodoRiesgo:res.polizaTodoRiesgoList?.fechaInicio==null||res.polizaTodoRiesgoList?.fechaInicio==undefined?'':res.polizaTodoRiesgoList?.fechaInicio?.substr(0,10),
            fechaFinPolizaTodoRiesgo:res.polizaTodoRiesgoList?.fechaFin==null||res.polizaTodoRiesgoList?.fechaFin==undefined?'':res.polizaTodoRiesgoList?.fechaFin?.substr(0,10),
            numeroPolizaTodoRiesgo:res.polizaTodoRiesgoList?.numeroPoliza==null||res.polizaTodoRiesgoList?.numeroPoliza==undefined?'':res.polizaTodoRiesgoList?.numeroPoliza,
            aseguradoraPolizaTodoRiesgo:res.polizaTodoRiesgoList?.aseguradora==null||res.polizaTodoRiesgoList?.aseguradora==undefined?'':res.polizaTodoRiesgoList?.aseguradora.idAseguradora,
            numeroSerie:res.numeroSerie,
            numeroRevisionTecnicoMecanica:res.revisionTecnicomecanicaList.numeroRevisionTecnicoMecanica==null?'':res.revisionTecnicomecanicaList?.numeroRevisionTecnicoMecanica
          });
          console.log("fecha de matrícula : ",res.fechaMatricula);
          //this.obtenerCond();
          this.Formulario.get("placa")?.markAsTouched();
          this.reestablecer();
        }
      )



    }else if(this.param?.substr(0,3)==="ver"){

      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerVehiculo(urlid).then(
        (res:any)=>{
          this.vehiculo = res;
          console.log(res);
          this.idprop=res.propietario.idPersona;
          this.archnomeditvehTO[0]=""+res.tarjetaOperacionList.unoTarjetaOperacion;
          this.archnomeditvehTO[1]=""+res.tarjetaOperacionList.dosTarjetaOperacion;
          this.archnomeditvehTP[0]=""+res.tarjetaPropiedadUnoVehiculo;
          this.archnomeditvehTP[1]=""+res.tarjetaPropiedadDosVehiculo;
          this.NomimgeditVehArray[0]=""+res.frenteVehiculo;
          this.NomimgeditVehArray[1]=""+res.ladoVehiculo;
          this.NomimgeditVehArray[2]=""+res.traseraVehiculo;


          this.nombreArchivoConvenio = ""+(res.convenioList!==undefined?res.convenioList.convenio:"");
          this.archnomeditvehSOAT=""+res.soatList.soat;
          this.archnomeditvehTM=""+res.revisionTecnicomecanicaList.revisionTecnicomecanica;
          this.archnomeditvehPC=""+res.polizaContractualList.polizaContractual;
          this.archnomeditvehPE=""+res.polizaExtracontractualList.polizaExtracontractual;
          this.archnomeditvehRP=""+res.revisionPreventivaList.revisionPreventiva;
          this.resVehEdit=res;
          this.Formulario.patchValue({

            codi:res.codigoInternoVehiculo,
            placa:res.placaVehiculo,
            numpas:res.numeroPasajerosVehiculo,
            swest:res.estadoVehiculo,
            tipocom:res.tipoCombustible.idTipoCombustible,
            tipoveh:res.tipoVehiculo.idTipoVehiculo==null?undefined:res.tipoVehiculo.idTipoVehiculo,
            claseveh:res.clase.idClase,
            marcaveh:res.marca.idMarca,
            color:res.colorVehiculo,
            modeloveh:res.modelo?.substr(0,4),
            cilindraje:res.cilindraje,
            swconv:res.enConvenioVehiculo==1?true: false,
            convenio:res.convenioList!=null?res.convenioList.empresaConvenio.idEmpresaConvenio: null,
            filterprop:res.propietario,

            fechainiconv:res.convenioList!==undefined?res.convenioList.fechaInicioConvenio?.substr(0,10):"",
            fechafinconv:res.convenioList!==undefined?res.convenioList.fechaFinConvenio?.substr(0,10):"",
            licconv:res.convenioList!==undefined?res.convenioList.licenciaConvenio?.substr(0,10):"",

            numTO:res.tarjetaOperacionList.numeroTarjetaOperacion,
            fechainiTO:res.tarjetaOperacionList.fechaExpedicionTarjetaOperacion?.substr(0,10),
            fechafinTO:res.tarjetaOperacionList.fechaVencimientoTarjetaOperacion?.substr(0,10),

            aseguradoraSOAT:res.soatList.aseguradora.idAseguradora,
            numSOAT:res.soatList.numeroSoat,
            fechainiSOAT:res.soatList.fechaInicioSoat?.substr(0,10),
            fechafinSOAT:res.soatList.fechaVencimientoSoat?.substr(0,10),

            fechainiTM:res.revisionTecnicomecanicaList.fechaRevisionTecnicomecanica?.substr(0,10),
            fechafinTM:res.revisionTecnicomecanicaList.fechaVencimientoRevisionTecnicomecanica?.substr(0,10),

            aseguradoraPC:res.polizaContractualList.aseguradora==null?'':res.polizaContractualList.aseguradora.idAseguradora,
            numPC:res.polizaContractualList.numeroPolizaContractual,
            fechainiPC:res.polizaContractualList.fechaInicioPolizaContractual?.substr(0,10),
            fechafinPC:res.polizaContractualList.fechaVencimientoPolizaContractual?.substr(0,10),

            aseguradoraPE:res.polizaExtracontractualList.aseguradora.idAseguradora,
            numPE:res.polizaExtracontractualList.numeroPolizaExtracontractual,
            fechainiPE:res.polizaExtracontractualList.fechaInicioPolizaExtracontractual?.substr(0,10),
            fechafinPE:res.polizaExtracontractualList.fechaVencimientoPolizaExtracontractual?.substr(0,10),

            fechainiRP:res.revisionPreventivaList.fechaInicioRevisionPreventiva?.substr(0,10),
            fechafinRP:res.revisionPreventivaList.fechaVencimientoRevisionPreventiva?.substr(0,10),

            numeroMotor:res.numeroMotorVehiculo?.substr(0,10),
            numeroChasis:res.chasisVehiculo?.substr(0,10),
            numeroVin:res.numeroVin?.substr(0,10),
            entidadTransito:res.entidadTransito,
            carroceria:res.carroceriaVehiculo,
            servicio:res.tipoServicio,
            linea:res.linea,
            numeroLicenciaTransito:res.numeroLicenciaTransito,
            fechaMatricula:res.fechaMatricula,
            fechaInicioPolizaTodoRiesgo:res.polizaTodoRiesgoList?.fechaInicio?.substr(0,10),
            fechaFinPolizaTodoRiesgo:res.polizaTodoRiesgoList?.fechaFin?.substr(0,10),
            numeroPolizaTodoRiesgo:res.polizaTodoRiesgoList?.numeroPoliza,
            aseguradoraPolizaTodoRiesgo:res.polizaTodoRiesgoList?.aseguradora.idAseguradora,
            numeroSerie:res.numeroSerie,
            numeroRevisionTecnicoMecanica:res.numeroRevisionTecnicoMecanica
          });
          this.reestablecer();
          this.Formulario.disable();
        }
      )

    }
  }

  /**
   * Obtiene los modelos
   */
  obtenerModelo():void{
    var fechaac=new Date();
    for(var i=fechaac.getFullYear();i>=1900;i--){
      this.modeloveh.push({value:""+i});
      //console.log(i);
    }
  }

  /**
   * Obtiene los propietarios
   */
  obtenerPropietarios():void{
    this.data.obtenerProp()
    .subscribe((propietarios:Array<Propietario>) => {
      this.propArray=propietarios
      console.log("propietarios :",this.propArray)
    });
  }


/**
 * Obtener Las clases de vehiculos
 */
  obtenerClases(){
    this.LoginService
      .ObtenerClases()
      .subscribe((clases:Array<ClaseVehiculoInterface>) => {
        this.claseveh = clases;
      });
  }

  /**
   * Obtener Conductores
   */
  obtenerCond():void{
    this.data
      .obtenerBasConductores()
      .subscribe((res:any) => {
        this.conduct = res;
        console.log("conductores en el sistema",res);
      });
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

  obtenerLineasMarcas()
  {
    this.lineasMarcas = [];
    if(this.marcaSeleccionada!=undefined)
    {
      this.data.obtenerLineas(this.marcaSeleccionada?.idMarca).then(respuesta =>
        {
          this.lineasMarcas = [];
          this.lineasMarcas = respuesta.lineas;
          console.log("lineas : ",respuesta);
        }).catch(error =>
          {
            console.log("error : ",error);
          })
    }
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

  obtenerTiposServicio()
  {
    this.data.obtenerTiposServiciosVehiculos().then(respuesta =>
      {
        this.tiposServicios = respuesta.tiposServicio;
        console.log("servicios : ",respuesta);
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }

/**
 * Obtener los Convenios
 */
  obtenerConvenios():void{
    this.LoginService
      .ObtenerConvenios()
      .subscribe((convenios: Array<ConveniosVehiculoInterface>) => {
        this.convenios = convenios;
        console.log("convenios : ",this.convenios);
      });
  }

  /**
   * Obtener las Marcas
   */
  obtenerMarcas():void{
    this.LoginService
      .ObtenerMarcas()
      .subscribe((marcas: Array<MarcaVehiculoInterface>) => {
        this.marcaveh = marcas;
      });
  }

  /**
   * Obtener los tipos de combustible
   */
  obtenerTiposCombustibles():void{
    this.LoginService
      .ObtenerTipoCombustibles()
      .subscribe((tipocombustible: Array<TipoCombustibleInterface>) => {
        this.tipocom = tipocombustible;
      });
  }

  /**
   * Obtneer los tipos de vehiculo.
   */
  obtenerTiposVehiculos():void{
    this.LoginService
      .ObtenerTipoVehiculos()
      .subscribe((tipovehiculo: Array<TipoVehiculoInterface>) => {
        this.tipoveh = tipovehiculo;
      });
  }

  /**
   * Obtener Aseguradoras
   */
  obtenerAseguradorasVehiculos():void{
    this.LoginService
      .ObtenerAseguradoras()
      .subscribe((aseguradoravehiculo: Array<AseguradorasVehiculoInterface>) => {
        this.aseguradoraveh = aseguradoravehiculo;
      });
  }

  /**
   * Filtra los propeitarios segun el control rellenado el select y luego volviendo a filtrar, para asi mostrar los propietarios filtrados no mayor a 6 resultados.
   */
  filtrarProp():void{
    this.selectpropArray=[];
    for(var i=0;i<this.propArray.length;i++){
      this.selectpropArray.push(this.propArray[i]);
    }
    var filtro=(""+this.Formulario.get("filterprop")?.value).toUpperCase();
    if(this.propArray.length>0){
      let prop = this.selectpropArray.filter(propietario=> propietario.documentoPersona.includes(filtro) || ((propietario.nombrePersona).toUpperCase()).includes(filtro) || ((propietario.apellidoPersona).toUpperCase()).includes(filtro ) || ((propietario.apellidoPersona).toUpperCase()+' '+(propietario.nombrePersona).toUpperCase()).includes(filtro ) || ((propietario.nombrePersona+' '+propietario.apellidoPersona).toUpperCase()).includes(filtro ));
      this.selectpropArray=prop;
      if(prop.length>6){
        this.selectpropArray.length=6;
      }
    }else{
      this.selectpropArray=[];
    }

  }

  /**
   * Elige el conductor a agregar  a determinado vehiculo y lo agrega a la lista, consumiendo de una vez el servicio de agregar conductor
   * @param id
   */
  elegirCond(id:any){
    console.log(id);
    this.conductlist.push(id);
    console.log(this.conductlist)
    this.Formulario.get("filtercond")?.setValue('');
    this.conductselect=[];
    var jsoncond:any={};
    jsoncond.idVehiculo=this.resVehEdit.idVehiculo;
    jsoncond.idConductor=id.idConductor
    this.data.agregarCond(jsoncond).subscribe();

  }

  /**
   * Filtra los conductores a mostrar, por cada vez que se oprime una tecla, rellenado el select y filtrando.
   */
  filtrarCond():void{
    this.conductselect=[];
    for(var i=0;i<this.conduct.length;i++){
      if( this.conductlist.findIndex(element=>element.idConductor==this.conduct[i].idConductor)==-1 ){
        this.conductselect.push(this.conduct[i]);
      }

    }
    //console.log(this.selectpropArray);
    //console.log(this.propArray);
    var filtro=(""+this.Formulario.get("filtercond")?.value).toUpperCase();
    if(this.conduct.length>0){
      let prop = this.conductselect.filter(cond=> cond.documentoPersona.includes(filtro) || ((cond.nombrePersona).toUpperCase()).includes(filtro) || ((cond.apellidoPersona).toUpperCase()).includes(filtro ) || ((cond.apellidoPersona).toUpperCase()+' '+(cond.nombrePersona).toUpperCase()).includes(filtro ) || ((cond.nombrePersona+' '+cond.apellidoPersona).toUpperCase()).includes(filtro ));
      this.conductselect=prop;
      if(prop.length>6){
        this.conductselect.length=6;
      }
    }else{
      this.conductselect=[];
    }

  }

  /**
   * Quita el conductro de la lista, consume el servicio de eliminar  y vuelve a cargar los conductores.
   * @param id Obtiene el id del conductor a eliminar
   */
  quitarCond(id:string){
    console.log("quitantdo :");
    console.log(id);
    console.log(this.resVehEdit);
    this.data.quitarCond(this.resVehEdit.idVehiculo,id).then(
      (res:any)=>{
        console.log("respuesta : ",res)
        this.conductlist.splice(this.conductlist.findIndex(element=>element.idConductor==id),1) ;
      }
    ).catch(error=>
      {
        console.log("error : ",error);
      });
    this.obtenerCond();

  }

  /**
   * Elige el propietario y autocompleta el propietario. para despues volver a filtrarlo.
   * @param id Id ddel propietario a formalizar
   */
  elegirProp(id:number){
    this.idprop=id;
    this.Formulario.get("filterprop")?.setValue((this.propArray.find(element =>element.idPersona==id))?.documentoPersona);
    console.log("propietario escogido : ",this.Formulario.get("filterprop").value);
    console.log("id propietario actual",this.idprop);
    this.filtrarProp();
  }

  /**
   * Reestablece el control dependdiendo del id que se haya determiando como propietario.
   */
  reestablecer(){
    console.log(this.Formulario.get("filterprop")?.value);
    console.log(this.idprop);
    this.Formulario.get("filterprop")?.setValue((this.propArray.find(element =>element.idPersona==this.idprop))?.documentoPersona);
    this.filtrarProp();
  }

  /**
   * Detecta el cambio de los archivos de Fotos del vehiculo, para luego guardar el archivo en su respectiva pocision, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   * @param nom Pocision de el array de Files a modificar.
   */
  cambioVehFoto(element:any,nom:number){
    if(element.target.files[0]!==undefined){
      this.FileimgVehArray[nom]=element.target.files[0];
      this.NomimgVehArray[nom]=element.target.files[0].name;

      this.AlertimgVehArray[nom]=false;

    }else{
      this.NomimgVehArray[nom]="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio del archivo de convenio, para luego guardar el archivo , para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehConv(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehconv=element.target.files[0];
        this.archnomvehconv=element.target.files[0].name;

        this.archalertvehconv=false;
    }else{
      this.archnomvehconv="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio de los archivos de la Tarjeta de Operacion, para luego guardar el archivo en su respectiva pocision, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   * @param nom Pocision de el array de Files a modificar.
   */
  cambioVehTarjOp(element:any,nom:number){
    if(element.target.files[0]!==undefined){


        this.archfilevehTO[nom]=element.target.files[0];
        this.archnomvehTO[nom]=element.target.files[0].name;
        this.archalertvehTO[nom]=false;
    }else{
      this.archnomvehTO[nom]="Selecciona un Archivo"
    }
  }

  /**
   * Detecta el cambio de los archivos de COAT, para luego guardar el archivo , para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehSOAT(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehSOAT=element.target.files[0];
        this.archnomvehSOAT=element.target.files[0].name;
        this.archalertvehSOAT=false;
    }else{
      this.archnomvehSOAT=="Selecciona un Archivo";

    }
  }

  /**
   * Detecta el cambio de los archivos de Tecnico Mecanica, para luego guardar el archivo, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehTM(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehTM=element.target.files[0];
        this.archnomvehTM=element.target.files[0].name;
        this.archalertvehTM=false;
    }else{
        this.archnomvehTM="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio del archivo de poliza contraactual, para luego guardar el archivo, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehPC(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehPC=element.target.files[0];
        this.archnomvehPC=element.target.files[0].name;

        this.archalertvehPC=false;
    }else{
      this.archnomvehPC="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio del archivo de poliza Extra contraactual, para luego guardar el archivo, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehPE(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehPE=element.target.files[0];
        this.archnomvehPE=element.target.files[0].name;

        this.archalertvehPE=false;
    }else{
      this.archnomvehPE="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio del archivo de Revision Prevnetiva, para luego guardar el archivo, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehRP(element:any){
    if(element.target.files[0]!==undefined){


        this.archfilevehRP=element.target.files[0];
        this.archnomvehRP=element.target.files[0].name;

        this.archalertvehRP=false;
    }else{
      this.archnomvehRP="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio del archivo de poliza Tarjeta de propiedad, para luego guardar el archivo, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   */
  cambioVehTP(element:any,nom:number){
    if(element.target.files[0]!==undefined){


        this.archfilevehTP[nom]=element.target.files[0];
        this.archnomvehTP[nom]=element.target.files[0].name;

        this.archalertvehTP[nom]=false;
    }else{
      this.archnomvehTP[nom]="Selecciona un Archivo";
    }
  }





  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVeh(nom:string)
  {
    this.data.obtenerImagenVeh(nom);
  }

  downloadVeh1()
  {
    this.data.obtenerImagenVeh(this.nombreArchivoFrenteVehiculo);
  }


  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadConv(nom:string){
    this.data.obtenerImagenVehconv(nom);
  }

  descargarArchivoConvenio(){
    this.data.obtenerImagenVehconv(this.nombreArchivoConvenio);
  }


  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehTO(nom:string){
    this.data.obtenerImagenVehTO(nom);
  }

  descargarArchivoTarjetaOperacion(){
    this.data.obtenerImagenVehTO(this.nombreArchivoTarjetaOperacion);
  }


  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehTP(nom:string){
    this.data.obtenerImagenVehTP(nom);
  }

  descargarArchivoLicenciaTransito()
  {
    this.data.obtenerImagenVehTP(this.nombreArchivoLicenciaTransito);
  }


  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehConv(nom:string){
    this.data.obtenerImagenVehconv(nom);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehSOAT(nom:string){
    this.data.obtenerImagenVehSOAT(nom);
  }

  descargarArchivoSoat()
  {
    this.data.obtenerImagenVehSOAT(this.nombreArchivoSoat);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehPC(nom:string){
    this.data.obtenerImagenVehPC(nom);
  }

  descargarArchivoPolizaContractual(){
    this.data.obtenerImagenVehPC(this.nombreArchivoPolizaContractual);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehTM(nom:string){
    this.data.obtenerImagenVehTM(nom);
  }

  descargarArchivoRevisionTecnicoMecanica()
  {
    this.data.obtenerImagenVehTM(this.nombreArchivoRevisionTecnicoMecanica);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehPE(nom:string){
    this.data.obtenerImagenVehPE(nom);
  }

  descargarArchivoPolizaExtraContractual()
  {
    this.data.obtenerImagenVehPE(this.nombreArchivoPolizaExtraContractual);
  }

  descargarArchivoPolizaTodoRiesgo()
  {
    this.data.obtenerArchivoPolizaTodoRiesgo(this.nombreArchivoPolizaTodoRiesgo);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehRP(nom:string){
    this.data.obtenerImagenVehRP(nom);
  }

  descargarArchivoRevisionPreventiva(){
    this.data.obtenerImagenVehRP(this.nombreArchivoRevisionPreventiva);
  }

  /**
   * Vuelve el control con letras mayusculas
   * @param nom Control a convertir.
   */
  mayus(nom:string):void{
    this.Formulario.get(nom)?.setValue((this.Formulario.get(nom)?.value).toUpperCase());
  }

  /**
   * Guarda el Formulario con el nombre de las imagenes ya generadas. SOLO CUANDO ACTUALIZA
   */
  completarSolicitud(){
    console.log("Entro Act");
    this.porcentaje = 100;
    if(this.porcentaje==100){
      let json:Vehiculocreateinterface={};
      console.log("editando : ",this.resVehEdit);
      console.log("editando : ",this.Formulario.value);
      if(this.Formulario.get('swconv')?.value){
        let veh:Vehiculo={}
        veh.idVehiculo=this.resVehEdit.idVehiculo;
        veh.codigoInternoVehiculo=this.Formulario.get("codi")?.value;
        veh.placaVehiculo=(this.Formulario.get("placa")?.value).toUpperCase();
        veh.enConvenioVehiculo=this.Formulario.get('swconv')?.value? 1 : 0;
        veh.disponibilidad=1;
        veh.modelo=this.Formulario.get("modeloveh")?.value;
        veh.cilindraje=this.Formulario.get("cilindraje")?.value;
        veh.numeroPasajerosVehiculo=this.Formulario.get("numpas")?.value;
        veh.colorVehiculo=this.Formulario.get("color")?.value.descripcionColor!=undefined?this.Formulario.get("color")?.value.descripcionColor:this.resVehEdit.colorVehiculo;
        veh.tarjetaPropiedadUnoVehiculo=this.nombreArchivoLicenciaTransito;
        veh.frenteVehiculo=this.nombreArchivoFrenteVehiculo;
        veh.traseraVehiculo=this.nombreArchivoParteTraseraVehiuclo;
        veh.ladoVehiculo=this.nombreArchivoLadoVehiculo;
        veh.numeroMotorVehiculo=this.Formulario.get("numeroMotor")?.value;
        veh.chasisVehiculo=this.Formulario.get("numeroChasis")?.value;
        veh.numeroVin=this.Formulario.get("numeroVin")?.value;

        veh.entidadTransito=this.Formulario.get("entidadTransito")?.value.descripcionEntidad!=undefined?this.Formulario.get("entidadTransito")?.value.descripcionEntidad:this.resVehEdit.entidadTransito;
        veh.carroceriaVehiculo=this.Formulario.get("carroceria")?.value.descripcionCarroceria=='undefined'?this.Formulario.get("carroceria")?.value.descripcionCarroceria:this.resVehEdit.carroceriaVehiculo;
        veh.tipoServicio=this.Formulario.get("servicio")?.value.descripcionServicio=='undefined'?this.Formulario.get("servicio")?.value.descripcionServicio:this.resVehEdit.tipoServicio;
        veh.linea = this.Formulario.get('linea')?.value.descripcion=='undefined'?this.Formulario.get('linea')?.value.descripcion:this.resVehEdit.linea;

        veh.numeroLicenciaTransito = this.Formulario.get('numeroLicenciaTransito')?.value;
        veh.fechaMatricula = this.Formulario.get('fechaMatricula')?.value;
        veh.numeroSerie = this.Formulario.get('numeroSerie')?.value;
        veh.clase={};
        veh.clase={};
        veh.clase.idClase=this.Formulario.get("claseveh")?.value;
        veh.marca={};
        veh.marca.idMarca=this.Formulario.get("marcaveh")?.value.idMarca!=undefined?this.Formulario.get("marcaveh")?.value.idMarca:this.resVehEdit.marca.idMarca;
        veh.tipoCombustible={};
        veh.tipoCombustible.idTipoCombustible=this.Formulario.get("tipocom")?.value;
        veh.tipoVehiculo={};
        veh.tipoVehiculo.idTipoVehiculo=this.Formulario.get("tipoveh")?.value;
        veh.propietario={};
        veh.propietario.idPersona=this.Formulario.get('filterprop')?.value.idPersona==undefined?this.vehiculo.propietario.idPersona:this.Formulario.get('filterprop')?.value.idPersona;
        veh.estadoVehiculo=this.Formulario.get("swest")?.value? 1 : 0;
        //veh.numeroRevisionTecnicoMecanica=this.Formulario.get('numeroRevisionTecnicoMecanica')?.value;
        json.revisionPreventiva={};
        json.revisionPreventiva.idRevisionPreventiva=this.resVehEdit.revisionPreventivaList.idRevisionPreventiva;
        json.revisionPreventiva.fechaVencimientoRevisionPreventiva=this.Formulario.get("fechafinRP")?.value;
        json.revisionPreventiva.fechaInicioRevisionPreventiva=this.Formulario.get("fechainiRP")?.value;
        json.revisionPreventiva.revisionPreventiva=this.nombreArchivoRevisionPreventiva;
        json.tarjetaOperacion={};
        json.tarjetaOperacion.idTarjetaOperacion=this.resVehEdit.tarjetaOperacionList.idTarjetaOperacion;
        json.tarjetaOperacion.numeroTarjetaOperacion=this.Formulario.get("numTO")?.value;
        json.tarjetaOperacion.fechaVencimientoTarjetaOperacion=this.Formulario.get("fechainiTO")?.value;
        json.tarjetaOperacion.fechaExpedicionTarjetaOperacion=this.Formulario.get("fechafinTO")?.value;
        json.tarjetaOperacion.unoTarjetaOperacion=this.nombreArchivoTarjetaOperacion;
        json.revisionTecnicomecanica={};
        json.revisionTecnicomecanica.idRevisionTecnicomecanica=this.resVehEdit.revisionTecnicomecanicaList.idRevisionTecnicomecanica;
        json.revisionTecnicomecanica.fechaRevisionTecnicomecanica=this.Formulario.get("fechainiTM")?.value;
        json.revisionTecnicomecanica.fechaVencimientoRevisionTecnicomecanica=this.Formulario.get("fechafinTM")?.value;
        json.revisionTecnicomecanica.revisionTecnicomecanica=this.nombreArchivoRevisionTecnicoMecanica;
        json.revisionTecnicomecanica.numeroRevisionTecnicoMecanica = this.Formulario.get("numeroRevisionTecnicoMecanica")?.value;

        json.polizaExtracontractual={};
        json.polizaExtracontractual.idPolizaExtracontractual=this.resVehEdit.polizaExtracontractualList.idPolizaExtracontractual;
        json.polizaExtracontractual.fechaInicioPolizaExtracontractual=this.Formulario.get("fechainiPE")?.value;
        json.polizaExtracontractual.fechaVencimientoPolizaExtracontractual=this.Formulario.get("fechafinPE")?.value;
        json.polizaExtracontractual.numeroPolizaExtracontractual=this.Formulario.get("numPE")?.value;
        json.polizaExtracontractual.polizaExtracontractual=this.nombreArchivoPolizaExtraContractual;
        json.polizaExtracontractual.aseguradora={};
        json.polizaExtracontractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPE")?.value;
        json.polizaContractual={}
        json.polizaContractual.idPolizaContractual=this.resVehEdit.polizaContractualList.idPolizaContractual;
        json.polizaContractual.fechaInicioPolizaContractual=this.Formulario.get("fechainiPC")?.value;
        json.polizaContractual.fechaVencimientoPolizaContractual=this.Formulario.get("fechafinPC")?.value;
        json.polizaContractual.numeroPolizaContractual=this.Formulario.get("numPC")?.value;
        json.polizaContractual.polizaContractual=this.nombreArchivoPolizaContractual;
        json.polizaTodoRiesgo={}
        json.polizaTodoRiesgo.id = this.resVehEdit.polizaTodoRiesgoList.id;
        json.polizaTodoRiesgo.fechaInicio=this.Formulario.get("fechaInicioPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.fechaFin=this.Formulario.get("fechaFinPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.numeroPoliza=this.Formulario.get("numeroPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.nombreArchivoPoliza=this.nombreArchivoPolizaTodoRiesgo;
        json.polizaTodoRiesgo.aseguradora={};
        json.polizaTodoRiesgo.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPolizaTodoRiesgo")?.value;
        json.polizaContractual.aseguradora={};
        json.polizaContractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPC")?.value;
        json.soat={}
        json.soat.idSoat=this.resVehEdit.soatList.idSoat;
        json.soat.fechaInicioSoat=this.Formulario.get("fechainiSOAT")?.value;
        json.soat.fechaVencimientoSoat=this.Formulario.get("fechafinSOAT")?.value;
        json.soat.numeroSoat=this.Formulario.get("numSOAT")?.value;
        json.soat.soat=this.nombreArchivoSoat;
        json.soat.aseguradora={};
        json.soat.aseguradora.idAseguradora=this.Formulario.get("aseguradoraSOAT")?.value;
        json.vehiculo=veh;
        if(this.resVehEdit.convenioList.length!=0){
          json.convenio={};
          json.convenio.idConvenio=this.resVehEdit.convenioList.idConvenio;
          json.convenio.fechaInicioConvenio=this.Formulario.get("fechainiconv")?.value;
          json.convenio.fechaFinConvenio=this.Formulario.get("fechafinconv")?.value;
          json.convenio.licenciaConvenio=this.Formulario.get("licconv")?.value

          json.convenio.convenio = this.nombreArchivoConvenio;
          json.convenio.empresaConvenio={}
          json.convenio.empresaConvenio.idEmpresaConvenio=this.Formulario.get("convenio")?.value.idEmpresaConvenio==undefined?this.vehiculo.convenioList.empresaConvenio.idEmpresaConvenio:this.Formulario.get("convenio")?.value.idEmpresaConvenio;
        }else{
          let jsonconv:any={};
          jsonconv.fechaInicioConvenio=this.Formulario.get("fechainiconv")?.value;
          jsonconv.fechaFinConvenio=this.Formulario.get("fechafinconv")?.value;
          jsonconv.licenciaConvenio=this.Formulario.get("licconv")?.value
          json.convenio.convenio = this.nombreArchivoConvenio;
          jsonconv.empresaConvenio={}
          jsonconv.empresaConvenio.idEmpresaConvenio=this.Formulario.get("convenio")?.value.idEmpresaConvenio==undefined?this.vehiculo.convenioList.empresaConvenio.idEmpresaConvenio:this.Formulario.get("convenio")?.value.idEmpresaConvenio;
          jsonconv.vehiculo={};
          jsonconv.vehiculo.idVehiculo=this.resVehEdit.idVehiculo;
          this.data.crearConvenio(jsonconv).subscribe(
            (res:any)=>{
              console.log(res);
            }
          );
        }

      }else{
        let veh:Vehiculo={}
        veh.idVehiculo=this.resVehEdit.idVehiculo;
        veh.codigoInternoVehiculo=this.Formulario.get("codi")?.value;
        veh.placaVehiculo=(this.Formulario.get("placa")?.value).toUpperCase();
        veh.enConvenioVehiculo=this.Formulario.get('swconv')?.value? 1 : 0;
        veh.disponibilidad=1;
        veh.modelo=this.Formulario.get("modeloveh")?.value;
        veh.cilindraje=this.Formulario.get("cilindraje")?.value;
        veh.numeroPasajerosVehiculo=this.Formulario.get("numpas")?.value;
        veh.colorVehiculo=this.Formulario.get("color")?.value.descripcionColor!=undefined?this.Formulario.get("color")?.value.descripcionColor:this.resVehEdit.colorVehiculo;
        veh.tarjetaPropiedadUnoVehiculo=this.nombreArchivoTarjetaOperacion;
        veh.frenteVehiculo=this.nombreArchivoFrenteVehiculo;
        veh.traseraVehiculo=this.nombreArchivoParteTraseraVehiuclo;
        veh.ladoVehiculo=this.nombreArchivoLadoVehiculo;
        veh.numeroMotorVehiculo=this.Formulario.get("numeroMotor")?.value;
        veh.chasisVehiculo=this.Formulario.get("numeroChasis")?.value;
        veh.numeroVin=this.Formulario.get("numeroVin")?.value;
        veh.entidadTransito=this.Formulario.get("entidadTransito")?.value.descripcionEntidad==undefined?this.resVehEdit.entidadTransito:this.Formulario.get("entidadTransito")?.value.descripcionEntidad;
        veh.carroceriaVehiculo=this.Formulario.get("carroceria")?.value.descripcionCarroceria==undefined?this.resVehEdit.carroceriaVehiculo:this.Formulario.get("carroceria")?.value.descripcionCarroceria;
        veh.tipoServicio=this.Formulario.get("servicio")?.value.descripcionServicio==undefined?this.resVehEdit.tipoServicio:this.Formulario.get("servicio")?.value.descripcionServicio;
        veh.linea = this.Formulario.get('linea')?.value.descripcion==undefined?this.resVehEdit.linea:this.Formulario.get('linea')?.value.descripcion;
        veh.clase={};
        veh.clase.idClase=this.Formulario.get("claseveh")?.value;
        veh.numeroLicenciaTransito = this.Formulario.get('numeroLicenciaTransito')?.value;
        veh.fechaMatricula = this.Formulario.get('fechaMatricula')?.value;
        veh.marca={};
        veh.marca.idMarca=this.Formulario.get("marcaveh")?.value.idMarca!=undefined?this.Formulario.get("marcaveh")?.value.idMarca:this.resVehEdit.marca.idMarca;
        veh.tipoCombustible={};
        veh.tipoCombustible.idTipoCombustible=this.Formulario.get("tipocom")?.value;
        veh.tipoVehiculo={};
        veh.tipoVehiculo.idTipoVehiculo=this.Formulario.get("tipoveh")?.value;
        veh.propietario={};
        veh.propietario.idPersona=this.Formulario.get('filterprop')?.value.idPersona==undefined?this.vehiculo.propietario.idPersona:this.Formulario.get('filterprop')?.value.idPersona;
        veh.estadoVehiculo=this.Formulario.get("swest")?.value? 1 : 0;
        veh.numeroSerie = this.Formulario.get('numeroSerie')?.value;
        //veh.numeroRevisionTecnicoMecanica=this.Formulario.get('numeroRevisionTecnicoMecanica')?.value;
        json.revisionPreventiva={};
        json.revisionPreventiva.idRevisionPreventiva=this.resVehEdit.revisionPreventivaList.idRevisionPreventiva;
        json.revisionPreventiva.fechaVencimientoRevisionPreventiva=this.Formulario.get("fechafinRP")?.value;
        json.revisionPreventiva.fechaInicioRevisionPreventiva=this.Formulario.get("fechainiRP")?.value;
        json.revisionPreventiva.revisionPreventiva=this.nombreArchivoRevisionPreventiva;
        json.tarjetaOperacion={};
        json.tarjetaOperacion.idTarjetaOperacion=this.resVehEdit.tarjetaOperacionList.idTarjetaOperacion;
        json.tarjetaOperacion.numeroTarjetaOperacion=this.Formulario.get("numTO")?.value;
        json.tarjetaOperacion.fechaVencimientoTarjetaOperacion=this.Formulario.get("fechafinTO")?.value;
        json.tarjetaOperacion.fechaExpedicionTarjetaOperacion=this.Formulario.get("fechainiTO")?.value;
        json.tarjetaOperacion.unoTarjetaOperacion=this.nombreArchivoTarjetaOperacion;
        json.revisionTecnicomecanica={};
        json.revisionTecnicomecanica.idRevisionTecnicomecanica=this.resVehEdit.revisionTecnicomecanicaList.idRevisionTecnicomecanica;
        json.revisionTecnicomecanica.fechaRevisionTecnicomecanica=this.Formulario.get("fechainiTM")?.value;
        json.revisionTecnicomecanica.fechaVencimientoRevisionTecnicomecanica=this.Formulario.get("fechafinTM")?.value;
        json.revisionTecnicomecanica.revisionTecnicomecanica=this.nombreArchivoRevisionTecnicoMecanica;
        json.revisionTecnicomecanica.numeroRevisionTecnicoMecanica = this.Formulario.get("numeroRevisionTecnicoMecanica")?.value;
        json.polizaExtracontractual={};
        json.polizaExtracontractual.idPolizaExtracontractual=this.resVehEdit.polizaExtracontractualList.idPolizaExtracontractual;
        json.polizaExtracontractual.fechaInicioPolizaExtracontractual=this.Formulario.get("fechainiPE")?.value;
        json.polizaExtracontractual.fechaVencimientoPolizaExtracontractual=this.Formulario.get("fechafinPE")?.value;
        json.polizaExtracontractual.numeroPolizaExtracontractual=this.Formulario.get("numPE")?.value;
        json.polizaExtracontractual.polizaExtracontractual=this.nombreArchivoPolizaExtraContractual;
        json.polizaExtracontractual.aseguradora={};
        json.polizaExtracontractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPE")?.value;
        json.polizaContractual={}
        json.polizaContractual.idPolizaContractual=this.resVehEdit.polizaContractualList.idPolizaContractual;
        json.polizaContractual.fechaInicioPolizaContractual=this.Formulario.get("fechainiPC")?.value;
        json.polizaContractual.fechaVencimientoPolizaContractual=this.Formulario.get("fechafinPC")?.value;
        json.polizaContractual.numeroPolizaContractual=this.Formulario.get("numPC")?.value;
        json.polizaContractual.polizaContractual=this.nombreArchivoPolizaContractual;
        json.polizaContractual.aseguradora={};
        json.polizaContractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPC")?.value;
        json.polizaTodoRiesgo={}
        json.polizaTodoRiesgo.id = this.resVehEdit.polizaTodoRiesgoList.id;
        json.polizaTodoRiesgo.fechaInicio=this.Formulario.get("fechaInicioPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.fechaFin=this.Formulario.get("fechaFinPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.numeroPoliza=this.Formulario.get("numeroPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.nombreArchivoPoliza=this.nombreArchivoPolizaTodoRiesgo;
        json.polizaTodoRiesgo.aseguradora={};
        json.polizaTodoRiesgo.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPolizaTodoRiesgo")?.value;
        json.soat={}
        json.soat.idSoat=this.resVehEdit.soatList.idSoat;
        json.soat.fechaInicioSoat=this.Formulario.get("fechainiSOAT")?.value;
        json.soat.fechaVencimientoSoat=this.Formulario.get("fechafinSOAT")?.value;
        json.soat.numeroSoat=this.Formulario.get("numSOAT")?.value;
        json.soat.soat=this.nombreArchivoSoat;
        json.soat.aseguradora={};
        json.soat.aseguradora.idAseguradora=this.Formulario.get("aseguradoraSOAT")?.value;
        json.vehiculo=veh;
      }
      console.log("para actualizar : ",json);

      this.data.actualizarVehiculo(json).subscribe(
        (res:any)=>{
          console.log("respuesta : ",res);
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
            Swal.fire({
              title:'ÉXITO',
              text:'ACTUALIZADO SATISFACTORIAMENTE',
              icon:'success'
            })
          }else{
            this.ocultar=false;
            Swal.fire({
              title:'Error',
              text:'ERROR EN EL SERVIDOR '+res.mensaje,
              icon:'error'
            })
            this.msm+=res.mensaje;
          }
        }
      );
    }

  }


  /**
   * Guarda el Formulario con el nombre de las imagenes ya generadas. SOLO CUANDO CREA
   */
  completarSolicitudCrear(){
    console.log("Entro : ",this.Formulario.value);
    console.log("Entro : creando vehiculo");
    this.porcentaje = 100;
    if(this.porcentaje==100){
      let json:Vehiculocreateinterface={};
      let objeto:any;
      if(this.Formulario.get('swconv')?.value)
      {
        console.log("Entro : creando vehiculo en convenio ");
        objeto = this.crearVehiculoConvenio(json);
        console.log("obejto : ",objeto);
        this.data.crearVehiculo(objeto).subscribe(
          (res:any)=>{
            console.log(res);
            if(res.mensaje==1){
              this.ocultar=true;
              Swal.fire({
                title:'ÉXITO',
                text:'CREADO SATISFACTORIAMENTE',
                icon:'success'
              })
              this.msm+=" "+"CREADO SATISFACTORIAMENTE";
            }else{
              this.ocultar=false;
              this.msm+=res.mensaje;
            }
          }
        );
      }else{
        console.log("Entro : creando vehiculo normal");
        objeto = this.crearVehiculoSinConvenio(json);
        console.log("obejto : ",objeto);
        this.data.crearVehiculo(objeto).subscribe(
          (res:any)=>{
            console.log(res);
            if(res.mensaje==1){
              this.ocultar=true;
              Swal.fire({
                title:'ÉXITO',
                text:'CREADO SATISFACTORIAMENTE',
                icon:'success',
                showConfirmButton:true
              })
              this.msm+=" "+"CREADO SATISFACTORIAMENTE";
            }else{
              this.ocultar=false;
              this.msm+=res.mensaje;
            }
          }
        );
      }
      console.log("vehiculo: ",objeto);
      console.log("vehiculo: ",objeto.convenio);
    }
  }

  crearVehiculoConvenio(json:any):any
  {
    let veh:Vehiculo={}
        veh.codigoInternoVehiculo=this.Formulario.get("codi")?.value;
        veh.placaVehiculo=(this.Formulario.get("placa")?.value).toUpperCase();
        veh.modelo=this.Formulario.get("modeloveh")?.value;
        veh.cilindraje=this.Formulario.get("cilindraje")?.value;
        veh.numeroPasajerosVehiculo=this.Formulario.get("numpas")?.value;
        veh.colorVehiculo=this.Formulario.get("color")?.value.descripcionColor;
        veh.tarjetaPropiedadUnoVehiculo=this.nombreArchivoLicenciaTransito;
        veh.frenteVehiculo=this.nombreArchivoFrenteVehiculo;
        veh.traseraVehiculo=this.nombreArchivoParteTraseraVehiuclo;
        veh.ladoVehiculo=this.nombreArchivoLadoVehiculo;
        veh.estadoVehiculo=1;
        veh.numeroMotorVehiculo=this.Formulario.get("numeroMotor")?.value;
        veh.chasisVehiculo=this.Formulario.get("numeroChasis")?.value;
        veh.numeroVin=this.Formulario.get("numeroVin")?.value;
        veh.entidadTransito=this.Formulario.get("entidadTransito")?.value.descripcionEntidad;
        veh.carroceriaVehiculo=this.Formulario.get("carroceria")?.value.descripcionCarroceria;
        veh.tipoServicio=this.Formulario.get("servicio")?.value.descripcionServicio;
        veh.linea = this.Formulario.get('linea')?.value.descripcion;
        console.log("tipo de servicio : ",this.Formulario.get('servicio')?.value.descripcionServicio);
        veh.clase={};
        veh.clase.idClase=this.Formulario.get("claseveh")?.value;
        veh.marca={};
        veh.marca.idMarca=this.Formulario.get("marcaveh")?.value.idMarca;
        veh.tipoCombustible={};
        veh.tipoCombustible.idTipoCombustible=this.Formulario.get("tipocom")?.value;
        veh.tipoVehiculo={};
        veh.tipoVehiculo.idTipoVehiculo=this.Formulario.get("tipoveh")?.value;
        veh.propietario={};
        veh.propietario.idPersona=this.Formulario.get('filterprop')?.value.idPersona;;
        veh.enConvenioVehiculo=this.Formulario.get('swconv')?.value? 1 : 0;
        veh.numeroLicenciaTransito = this.Formulario.get('numeroLicenciaTransito')?.value;
        veh.fechaMatricula = this.Formulario.get('fechaMatricula')?.value;
        veh.numeroSerie = this.Formulario.get('numeroSerie')?.value;
        //veh.numeroRevisionTecnicoMecanica=this.Formulario.get('numeroRevisionTecnicoMecanica')?.value;
        json.revisionPreventiva={};
        json.revisionPreventiva.fechaVencimientoRevisionPreventiva=this.Formulario.get("fechafinRP")?.value;
        json.revisionPreventiva.fechaInicioRevisionPreventiva=this.Formulario.get("fechainiRP")?.value;
        json.revisionPreventiva.revisionPreventiva=this.nombreArchivoRevisionPreventiva;
        json.tarjetaOperacion={};
        json.tarjetaOperacion.numeroTarjetaOperacion=this.Formulario.get("numTO")?.value;
        json.tarjetaOperacion.fechaVencimientoTarjetaOperacion=this.Formulario.get("fechafinTO")?.value;
        json.tarjetaOperacion.fechaExpedicionTarjetaOperacion=this.Formulario.get("fechainiTO")?.value;
        json.tarjetaOperacion.unoTarjetaOperacion=this.nombreArchivoTarjetaOperacion;
        json.revisionTecnicomecanica={};
        json.revisionTecnicomecanica.fechaRevisionTecnicomecanica=this.Formulario.get("fechainiTM")?.value;
        json.revisionTecnicomecanica.fechaVencimientoRevisionTecnicomecanica=this.Formulario.get("fechafinTM")?.value;
        json.revisionTecnicomecanica.revisionTecnicomecanica=this.nombreArchivoRevisionTecnicoMecanica;
        json.revisionTecnicomecanica.numeroRevisionTecnicoMecanica = this.Formulario.get("numeroRevisionTecnicoMecanica")?.value;
        json.polizaExtracontractual={};
        json.polizaExtracontractual.fechaInicioPolizaExtracontractual=this.Formulario.get("fechainiPE")?.value;
        json.polizaExtracontractual.fechaVencimientoPolizaExtracontractual=this.Formulario.get("fechafinPE")?.value;
        json.polizaExtracontractual.numeroPolizaExtracontractual=this.Formulario.get("numPE")?.value;
        json.polizaExtracontractual.polizaExtracontractual=this.nombreArchivoPolizaExtraContractual;
        json.polizaExtracontractual.aseguradora={};
        json.polizaExtracontractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPE")?.value;
        json.polizaContractual={}
        json.polizaContractual.fechaInicioPolizaContractual=this.Formulario.get("fechainiPC")?.value;
        json.polizaContractual.fechaVencimientoPolizaContractual=this.Formulario.get("fechafinPC")?.value;
        json.polizaContractual.numeroPolizaContractual=this.Formulario.get("numPC")?.value;
        json.polizaContractual.polizaContractual=this.nombreArchivoPolizaContractual;
        json.polizaContractual.aseguradora={};
        json.polizaContractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPC")?.value;
        json.polizaTodoRiesgo={}
        json.polizaTodoRiesgo.fechaInicio=this.Formulario.get("fechaInicioPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.fechaFin=this.Formulario.get("fechaFinPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.numeroPoliza=this.Formulario.get("numeroPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.nombreArchivoPoliza=this.nombreArchivoPolizaTodoRiesgo;
        json.polizaTodoRiesgo.aseguradora={};
        json.polizaTodoRiesgo.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPolizaTodoRiesgo")?.value;
        json.soat={}
        json.soat.fechaInicioSoat=this.Formulario.get("fechainiSOAT")?.value;
        json.soat.fechaVencimientoSoat=this.Formulario.get("fechafinSOAT")?.value;
        json.soat.numeroSoat=this.Formulario.get("numSOAT")?.value;
        json.soat.soat=this.nombreArchivoSoat;
        json.soat.aseguradora={};
        json.soat.aseguradora.idAseguradora=this.Formulario.get("aseguradoraSOAT")?.value;
        json.convenio={};
        json.convenio.fechaInicioConvenio=this.Formulario.get("fechainiconv")?.value;
        json.convenio.fechaFinConvenio=this.Formulario.get("fechafinconv")?.value;
        json.convenio.licenciaConvenio=this.Formulario.get("licconv")?.value
        json.convenio.convenio = this.nombreArchivoConvenio;
        json.convenio.empresaConvenio={}
        json.convenio.empresaConvenio.idEmpresaConvenio=this.Formulario.get("convenio")?.value.idEmpresaConvenio;
        json.vehiculo=veh;
        return json;
  }

  crearVehiculoSinConvenio(json:any):any
  {
    let veh:Vehiculo={}
        veh.codigoInternoVehiculo=this.Formulario.get("codi")?.value;
        veh.placaVehiculo=(this.Formulario.get("placa")?.value).toUpperCase();
        veh.modelo=this.Formulario.get("modeloveh")?.value;
        veh.cilindraje=this.Formulario.get("cilindraje")?.value;
        veh.numeroPasajerosVehiculo=this.Formulario.get("numpas")?.value;
        veh.colorVehiculo=this.Formulario.get("color")?.value.descripcionColor;
        veh.tarjetaPropiedadUnoVehiculo=this.nombreArchivoLicenciaTransito;
        veh.frenteVehiculo=this.nombreArchivoFrenteVehiculo;
        veh.traseraVehiculo=this.nombreArchivoParteTraseraVehiuclo;
        veh.ladoVehiculo=this.nombreArchivoLadoVehiculo;
        veh.numeroMotorVehiculo=this.Formulario.get("numeroMotor")?.value;
        veh.chasisVehiculo=this.Formulario.get("numeroChasis")?.value;
        veh.numeroVin=this.Formulario.get("numeroVin")?.value;
        veh.entidadTransito=this.Formulario.get("entidadTransito")?.value.descripcionEntidad;
        veh.carroceriaVehiculo=this.Formulario.get("carroceria")?.value.descripcionCarroceria;
        veh.tipoServicio=this.Formulario.get("servicio")?.value.descripcionServicio;
        veh.linea = this.Formulario.get('linea')?.value.descripcion;
        console.log("tipo de servicio : ",this.Formulario.get('servicio')?.value.descripcionServicio);
        veh.clase={};
        veh.clase.idClase=this.Formulario.get("claseveh")?.value;
        veh.marca={};
        veh.marca.idMarca=this.Formulario.get("marcaveh")?.value.idMarca;
        veh.tipoCombustible={};
        veh.tipoCombustible.idTipoCombustible=this.Formulario.get("tipocom")?.value;
        veh.tipoVehiculo={};
        veh.tipoVehiculo.idTipoVehiculo=this.Formulario.get("tipoveh")?.value;
        veh.propietario={};
        veh.propietario.idPersona=this.Formulario.get('filterprop')?.value.idPersona;;
        veh.enConvenioVehiculo=this.Formulario.get('swconv')?.value? 1 : 0;
        veh.numeroLicenciaTransito = this.Formulario.get('numeroLicenciaTransito')?.value;
        veh.fechaMatricula = this.Formulario.get('fechaMatricula')?.value;
        veh.numeroSerie = this.Formulario.get('numeroSerie')?.value;
        //veh.numeroRevisionTecnicomecanica=this.Formulario.get('numeroRevisionTecnicoMecanica')?.value;
        json.revisionPreventiva={};
        json.revisionPreventiva.fechaVencimientoRevisionPreventiva=this.Formulario.get("fechafinRP")?.value;
        json.revisionPreventiva.fechaInicioRevisionPreventiva=this.Formulario.get("fechainiRP")?.value;
        json.revisionPreventiva.revisionPreventiva=this.nombreArchivoRevisionPreventiva;
        json.tarjetaOperacion={};
        json.tarjetaOperacion.numeroTarjetaOperacion=this.Formulario.get("numTO")?.value;
        json.tarjetaOperacion.fechaVencimientoTarjetaOperacion=this.Formulario.get("fechafinTO")?.value;
        json.tarjetaOperacion.fechaExpedicionTarjetaOperacion=this.Formulario.get("fechainiTO")?.value;
        json.tarjetaOperacion.unoTarjetaOperacion=this.nombreArchivoTarjetaOperacion;
        json.revisionTecnicomecanica={};
        json.revisionTecnicomecanica.fechaRevisionTecnicomecanica=this.Formulario.get("fechainiTM")?.value;
        json.revisionTecnicomecanica.fechaVencimientoRevisionTecnicomecanica=this.Formulario.get("fechafinTM")?.value;
        json.revisionTecnicomecanica.revisionTecnicomecanica=this.nombreArchivoRevisionTecnicoMecanica;
        json.revisionTecnicomecanica.numeroRevisionTecnicoMecanica = this.Formulario.get("numeroRevisionTecnicoMecanica")?.value;
        json.polizaExtracontractual={};
        json.polizaExtracontractual.fechaInicioPolizaExtracontractual=this.Formulario.get("fechainiPE")?.value;
        json.polizaExtracontractual.fechaVencimientoPolizaExtracontractual=this.Formulario.get("fechafinPE")?.value;
        json.polizaExtracontractual.numeroPolizaExtracontractual=this.Formulario.get("numPE")?.value;
        json.polizaExtracontractual.polizaExtracontractual=this.nombreArchivoPolizaExtraContractual;
        json.polizaExtracontractual.aseguradora={};
        json.polizaExtracontractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPE")?.value;
        json.polizaContractual={}
        json.polizaContractual.fechaInicioPolizaContractual=this.Formulario.get("fechainiPC")?.value;
        json.polizaContractual.fechaVencimientoPolizaContractual=this.Formulario.get("fechafinPC")?.value;
        json.polizaContractual.numeroPolizaContractual=this.Formulario.get("numPC")?.value;
        json.polizaContractual.polizaContractual=this.nombreArchivoPolizaContractual;
        json.polizaTodoRiesgo={}
        json.polizaTodoRiesgo.fechaInicio=this.Formulario.get("fechaInicioPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.fechaFin=this.Formulario.get("fechaFinPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.numeroPoliza=this.Formulario.get("numeroPolizaTodoRiesgo")?.value;
        json.polizaTodoRiesgo.nombreArchivoPoliza=this.nombreArchivoPolizaTodoRiesgo;
        json.polizaTodoRiesgo.aseguradora={};
        json.polizaTodoRiesgo.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPolizaTodoRiesgo")?.value;
        json.soat={}
        json.polizaContractual.aseguradora={};
        json.polizaContractual.aseguradora.idAseguradora=this.Formulario.get("aseguradoraPC")?.value;
        json.soat={}
        json.soat.fechaInicioSoat=this.Formulario.get("fechainiSOAT")?.value;
        json.soat.fechaVencimientoSoat=this.Formulario.get("fechafinSOAT")?.value;
        json.soat.numeroSoat=this.Formulario.get("numSOAT")?.value;
        json.soat.soat=this.nombreArchivoSoat;
        json.soat.aseguradora={};
        json.soat.aseguradora.idAseguradora=this.Formulario.get("aseguradoraSOAT")?.value;
        json.vehiculo=veh;
        return json;
  }
  async guardar2()
  {


    if(this.edit)
    {
      if(!this.Formulario.valid)
      {
        console.log("pendientes : ",this.Formulario.status);
        console.log("pendientes : ",this.Formulario.errors);
        console.log("pendientes : ",this.Formulario.value);
        console.log("pendientes : ",this.Formulario.valueChanges);
        console.log("pendientes : ",this.Formulario);

        let arregloValores = this.Formulario.controls;
        let camposPendientes = [];
        let camposPendientesString = "";
        for (const fila in arregloValores)
        {
          if(this.Formulario.controls[fila].valid==false)
          {
            if(fila == "placa")
            {
              camposPendientesString = camposPendientesString +"placa"+"<br>";
            }
            if(fila == "modeloveh")
            {
              camposPendientesString = camposPendientesString +"modelo del vehículo"+"<br>";
            }
            if(fila == "cilindraje")
            {
              camposPendientesString = camposPendientesString +"cilindraje"+"<br>";
            }
            if(fila == "numpas")
            {
              camposPendientesString = camposPendientesString +"numero de pasajeros"+"<br>";
            }
            if(fila == "color")
            {
              camposPendientesString = camposPendientesString +"color del vehículo"+"<br>";
            }
            if(fila == "tipocom")
            {
              camposPendientesString = camposPendientesString +"tipo de convenio"+"<br>";
            }
            if(fila == "tipoveh")
            {
              camposPendientesString = camposPendientesString +"tipo de vehículo"+"<br>";
            }
            if(fila == "claseveh")
            {
              camposPendientesString = camposPendientesString +"clase de vehículo"+"<br>";
            }
            if(fila == "aseguradoraSOAT")
            {
              camposPendientesString = camposPendientesString +"Aseguradora del SOAT"+"<br>";
            }
            if(fila == "numSOAT")
            {
              camposPendientesString = camposPendientesString +"número del soat"+"<br>";
            }
            if(fila == "fechainiSOAT")
            {
              camposPendientesString = camposPendientesString +"fecha de inicio del soat"+"<br>";
            }
            if(fila == "fechafinSOAT")
            {
              camposPendientesString = camposPendientesString +"fecha de fin del soat"+"<br>";
            }
            if(fila == "fechainiTM")
            {
              camposPendientesString = camposPendientesString +"fecha inicio técnico mecánica"+"<br>";
            }

            if(fila == "fechafinTM")
            {
              camposPendientesString = camposPendientesString +"fecha fin técnico mecánica"+"<br>";
            }
            if(fila == "aseguradoraPC")
            {
              camposPendientesString = camposPendientesString +"aseguradora póliza contractual"+"<br>";
            }
            if(fila == "numPC")
            {
              camposPendientesString = camposPendientesString +"número póliza contractual"+"<br>";
            }
            if(fila == "fechainiPC")
            {
              camposPendientesString = camposPendientesString +"fecha inicio póliza contractual"+"<br>";
            }
            if(fila == "fechafinPC")
            {
              camposPendientesString = camposPendientesString +"fecha fin póliza contractual"+"<br>";
            }
            if(fila == "aseguradoraPE")
            {
              camposPendientesString = camposPendientesString +"aseguradora póliza extra contractual"+"<br>";
            }
            if(fila == "numPE")
            {
              camposPendientesString = camposPendientesString +"número póliza extra contractual"+"<br>";
            }
            if(fila == "fechainiPE")
            {
              camposPendientesString = camposPendientesString +"fecha inicio póliza extra contractual"+"<br>";
            }
            if(fila == "fechafinPE")
            {
              camposPendientesString = camposPendientesString +"fecha fin póliza extra contractual"+"<br>";
            }
            if(fila == "fechainiRP")
            {
              camposPendientesString = camposPendientesString +"fecha inicio revisión preventiva"+"<br>";
            }
            if(fila == "entidadTransito")
            {
              camposPendientesString = camposPendientesString +"entidad de tránsito"+"<br>";
            }
            if(fila == "carroceria")
            {
              camposPendientesString = camposPendientesString +"carrocería"+"<br>";
            }
            if(fila == "servicio")
            {
              camposPendientesString = camposPendientesString +"ftipo de servicio"+"<br>";
            }
            if(fila == "linea")
            {
              camposPendientesString = camposPendientesString +"Linea marca"+"<br>";
            }
            if(fila == "filterprop")
            {
              camposPendientesString = camposPendientesString +"Propietario"+"<br>";
            }
            if(fila == "numeroLicenciaTransito")
            {
              camposPendientesString = camposPendientesString +"Número de Licencia de tránsito"+"<br>";
            }
            if(fila == "fechaMatricula")
            {
              camposPendientesString = camposPendientesString +"fecha de Matrícula"+"<br>";
            }
            if(fila == "numeroRevisionTecnicoMecanica")
            {
              camposPendientesString = camposPendientesString +"Número revisión técnico mecánica"+"<br>";
            }
          }

        }

        Swal.fire({
          title:'ERROR!!!',
          html:'HAY CAMPOS PENDIENTES POR LLENAR \n'+camposPendientesString,
          //text:'HAY CAMPOS PENDIENTES POR LLENAR <br> '+camposPendientesString,
          icon:'warning'
        })
      }else{
        this.completarSolicitud();
      }
    }else{

      if(!this.Formulario.valid)
      {
        let arregloValores = this.Formulario.controls;
        let camposPendientes = [];
        let camposPendientesString = "";
        for (const fila in arregloValores)
        {
          if(this.Formulario.controls[fila].valid==false)
          {
            if(fila == "placa")
            {
              camposPendientesString = camposPendientesString +"placa"+"<br>";
            }
            if(fila == "modeloveh")
            {
              camposPendientesString = camposPendientesString +"modelo del vehículo"+"<br>";
            }
            if(fila == "cilindraje")
            {
              camposPendientesString = camposPendientesString +"cilindraje"+"<br>";
            }
            if(fila == "numpas")
            {
              camposPendientesString = camposPendientesString +"numero de pasajeros"+"<br>";
            }
            if(fila == "color")
            {
              camposPendientesString = camposPendientesString +"color del vehículo"+"<br>";
            }
            if(fila == "tipocom")
            {
              camposPendientesString = camposPendientesString +"tipo de convenio"+"<br>";
            }
            if(fila == "tipoveh")
            {
              camposPendientesString = camposPendientesString +"tipo de vehículo"+"<br>";
            }
            if(fila == "claseveh")
            {
              camposPendientesString = camposPendientesString +"clase de vehículo"+"<br>";
            }
            if(fila == "aseguradoraSOAT")
            {
              camposPendientesString = camposPendientesString +"Aseguradora del SOAT"+"<br>";
            }
            if(fila == "numSOAT")
            {
              camposPendientesString = camposPendientesString +"número del soat"+"<br>";
            }
            if(fila == "fechainiSOAT")
            {
              camposPendientesString = camposPendientesString +"fecha de inicio del soat"+"<br>";
            }
            if(fila == "fechafinSOAT")
            {
              camposPendientesString = camposPendientesString +"fecha de fin del soat"+"<br>";
            }
            if(fila == "fechainiTM")
            {
              camposPendientesString = camposPendientesString +"fecha inicio técnico mecánica"+"<br>";
            }

            if(fila == "fechafinTM")
            {
              camposPendientesString = camposPendientesString +"fecha fin técnico mecánica"+"<br>";
            }
            if(fila == "aseguradoraPC")
            {
              camposPendientesString = camposPendientesString +"aseguradora póliza contractual"+"<br>";
            }
            if(fila == "numPC")
            {
              camposPendientesString = camposPendientesString +"número póliza contractual"+"<br>";
            }
            if(fila == "fechainiPC")
            {
              camposPendientesString = camposPendientesString +"fecha inicio póliza contractual"+"<br>";
            }
            if(fila == "fechafinPC")
            {
              camposPendientesString = camposPendientesString +"fecha fin póliza contractual"+"<br>";
            }
            if(fila == "aseguradoraPE")
            {
              camposPendientesString = camposPendientesString +"aseguradora póliza extra contractual"+"<br>";
            }
            if(fila == "numPE")
            {
              camposPendientesString = camposPendientesString +"número póliza extra contractual"+"<br>";
            }
            if(fila == "fechainiPE")
            {
              camposPendientesString = camposPendientesString +"fecha inicio póliza extra contractual"+"<br>";
            }
            if(fila == "fechafinPE")
            {
              camposPendientesString = camposPendientesString +"fecha fin póliza extra contractual"+"<br>";
            }
            if(fila == "fechainiRP")
            {
              camposPendientesString = camposPendientesString +"fecha inicio revisión preventiva"+"<br>";
            }
            if(fila == "entidadTransito")
            {
              camposPendientesString = camposPendientesString +"entidad de tránsito"+"<br>";
            }
            if(fila == "carroceria")
            {
              camposPendientesString = camposPendientesString +"carrocería"+"<br>";
            }
            if(fila == "servicio")
            {
              camposPendientesString = camposPendientesString +"ftipo de servicio"+"<br>";
            }
            if(fila == "linea")
            {
              camposPendientesString = camposPendientesString +"Linea marca"+"<br>";
            }
            if(fila == "filterprop")
            {
              camposPendientesString = camposPendientesString +"Propietario"+"<br>";
            }
            if(fila == "numeroLicenciaTransito")
            {
              camposPendientesString = camposPendientesString +"Número de Licencia de tránsito"+"<br>";
            }
            if(fila == "fechaMatricula")
            {
              camposPendientesString = camposPendientesString +"fecha de Matrícula"+"<br>";
            }
            if(fila == "numeroRevisionTecnicoMecanica")
            {
              camposPendientesString = camposPendientesString +"Número revisión técnico mecánica"+"<br>";
            }
          }

        }
        Swal.fire({
          title:'ERROR!!!',
          html:'HAY CAMPOS PENDIENTES POR LLENAR \n'+camposPendientesString,
          //text:'HAY CAMPOS PENDIENTES POR LLENAR <br> '+camposPendientesString,
          icon:'warning'
        })
        console.log("pendientes : ",this.Formulario.errors);
        console.log("pendientes : ",this.Formulario.status);
        console.log("pendientes : ",this.Formulario.value);
        console.log("pendientes : ",this.Formulario.valueChanges);
        console.log("pendientes : ",this.Formulario);

      }else{

        console.log("guardando archivo 1");
        if(this.fotoFrenteVehiculo!=undefined)
        {
          let frente:any =  await this.LoginService.subirArchivoVehiculoFrente(this.fotoFrenteVehiculo);
          this.nombreArchivoFrenteVehiculo =  frente.fotoFrenteAfiliacion;
          console.log("nombre archivo 1 :",this.nombreArchivoFrenteVehiculo);
        }

        console.log("guardando archivo 2");
        if(this.fotoLateralVehiculo!=undefined)
        {
          let lado:any = await this.LoginService.subirArchivoVehiculoLateral(this.fotoLateralVehiculo);
          this.nombreArchivoLadoVehiculo = lado.fotoLadoAfiliacion;
          console.log("nombre archivo 2 :",this.nombreArchivoLadoVehiculo);
        }

        console.log("guardando archivo 3 ",this.fotoTraseraVehiculo);
        if(this.fotoTraseraVehiculo!=undefined)
        {
          let trasera:any = await this.LoginService.subirArchivoVehiculoTrasera(this.fotoTraseraVehiculo);
          this.nombreArchivoParteTraseraVehiuclo = trasera.fotoTraseraAfiliacion;
          console.log("nombre archivo 3 :",this.nombreArchivoParteTraseraVehiuclo);
        }

        console.log("guardando archivo 4");
        if(this.archivoTarjetaOperacion!=undefined)
        {
          let to: any =  await this.LoginService.subirArchivoTarjetaOperacion2(this.archivoTarjetaOperacion);
          this.nombreArchivoTarjetaOperacion =  to.tarjetaOperacionUnoAfiliacion;
          console.log("nombre archivo tarjeta de operación : ",this.nombreArchivoTarjetaOperacion);
        }

        console.log("guardando archivo 5");
        if(this.archivoSoat!=undefined)
        {
          let soat:any = await this.LoginService.subirArchivoSOAT2(this.archivoSoat);
          this.nombreArchivoSoat = soat.soatAfiliacion;
          console.log("nombre archivo soat : ",this.nombreArchivoSoat);
        }

        console.log("guardando archivo 6");
        if(this.archivoRevisionTecnicoMecanica!=undefined)
        {
          let rtm:any = await this.LoginService.subirArchivoTecnicoMecanica(this.archivoRevisionTecnicoMecanica);
          this.nombreArchivoRevisionTecnicoMecanica = rtm.tecnicomecanicaAfiliacion;
          console.log("nombre archivo tc : ",this.nombreArchivoRevisionTecnicoMecanica);
        }

        console.log("guardando archivo 7");
        if(this.archivoPolizaContractural!=undefined)
        {
          let napc:any = await this.LoginService.subirArchivoPolizaContractural(this.archivoPolizaContractural);
          this.nombreArchivoPolizaContractual = napc.contractualAfiliacion;
          console.log("nombre archivo poliza contractual : ",this.nombreArchivoPolizaContractual);
        }

        console.log("guardando archivo 8");
        if(this.archivoPolizaExtraContractural!=undefined)
        {
          let napec:any = await this.LoginService.subirArchivoPolizaExtraContractual(this.archivoPolizaExtraContractural);
          this.nombreArchivoPolizaExtraContractual = napec.extracontractualAfiliacion;
          console.log("nombre archivo poliza extra contractual : ",this.nombreArchivoPolizaExtraContractual);
        }

        console.log("guardando archivo 8");
        if(this.archivoRevisionPreventica!=undefined)
        {
          let rv:any = await this.LoginService.subirArchivoRevisionPreventiva(this.archivoRevisionPreventica);
          this.nombreArchivoRevisionPreventiva = rv.preventivaAfiliacion;
          console.log("nombre archivo revisión preventiva : ",this.nombreArchivoRevisionPreventiva);
        }

        console.log("guardando archivo 9");
        if(this.archivoLicenciaTransito!=undefined)
        {
          let alt:any = await this.LoginService.subirArchivoLicenciaTransito(this.archivoLicenciaTransito);
          this.nombreArchivoLicenciaTransito = alt.tarjetaPropiedadUnoAfiliacion;
          console.log("nombre archivo licencia transito : ",this.nombreArchivoLicenciaTransito);
        }

        console.log("guardando archivo 10");
        if(this.archivoPolizaTodoRiesgo!=undefined)
        {
          let alt:any = await this.LoginService.subirArchivoPolizaTodoRiesgo(this.archivoPolizaTodoRiesgo);
          this.nombreArchivoPolizaTodoRiesgo = alt.archivoPolizaTodoRiesgo;
          console.log("nombre archivo poliza todo riesgo : ",this.nombreArchivoPolizaTodoRiesgo);
        }
        this.completarSolicitudCrear();
      }
    }
  }

  /**
   * Valida las fechas del formulario para asi respectivamente mostrar los errores de los campos
   * @param group Recibe el FormGroup
   * @returns retorna null siempre ya que se meustran los errores segun el control.
   */
  checkFech: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var res:any={};



    if(new Date(group.controls.fechainiTO.value)>new Date(group.controls.fechafinTO.value)){
      group.controls['fechafinTO'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinTO'].setValidators([Validators.required]);
      group.controls['fechafinTO'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    if(new Date(group.controls.fechainiSOAT.value)>new Date(group.controls.fechafinSOAT.value)){
      group.controls['fechafinSOAT'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinSOAT'].setValidators([Validators.required]);
      group.controls['fechafinSOAT'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    if(new Date(group.controls.fechainiTM.value)>new Date(group.controls.fechafinTM.value)){
      group.controls['fechafinTM'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinTM'].setValidators([Validators.required]);
      group.controls['fechafinTM'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    if(new Date(group.controls.fechainiPC.value)>new Date(group.controls.fechafinPC.value)){
      group.controls['fechafinPC'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinPC'].setValidators([Validators.required]);
      group.controls['fechafinPC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    if(new Date(group.controls.fechainiPE.value)>new Date(group.controls.fechafinPE.value)){
      group.controls['fechafinPE'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinPE'].setValidators([Validators.required]);
      group.controls['fechafinPE'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    /*if(new Date(group.controls.fechainiRP.value)>new Date(group.controls.fechafinRP.value)){
      group.controls['fechafinRP'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinRP'].setValidators([Validators.required]);
      group.controls['fechafinRP'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }*/if(new Date(group.controls.fechaInicioPolizaTodoRiesgo.value)>new Date(group.controls.fechaFinPolizaTodoRiesgo.value)){
      group.controls['fechaFinPolizaTodoRiesgo'].setErrors({checkfech:true});
    }else{
      group.controls['fechaFinPolizaTodoRiesgo'].setValidators([Validators.required]);
      group.controls['fechaFinPolizaTodoRiesgo'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    if( res.convfec || res.tofec || res.soatfec ||
     res.TMfec || res.PCfec || res.PEfec ||
     res.RPfec || res.EXTfec || res.LCfec ){

      return res;
    }else{

      return null;
    }
  }

  /**
   * Checkea si esta en convenio y dependiendo de si esta o no en convenio se vuelven obligatorias o no determiandos controles
   * @param group Recibe el FormGroup
   * @returns Retorna null siempre ya que los errores se muestran en cada uno de los controles
   */
  checkConv: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var vrfconv= group.controls.swconv.value;
    var fi=group.controls.fechainiconv.value;
    var ff=group.controls.fechafinconv.value;
    let resf:any={};
    if(this.edit){
      if(vrfconv){
        group.controls['convenio'].setValidators([Validators.required]);
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].setValidators([Validators.required]);
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].setValidators([Validators.required]);
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['licconv'].setValidators([Validators.required]);
        group.controls['licconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        if(this.archnomeditvehconv!="null"){
          group.controls['archconv'].setValidators([this.validarch]);

        }else{
          group.controls['archconv'].setValidators([Validators.required,this.validarch]);
        }
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        if(fi!="" && ff!=""){
          var qff=new Date(ff);
          var qfi=new Date(fi);
          if(qff<qfi){
            group.controls['fechafinconv'].setErrors({checkfech:true})
          }else{
            group.controls['fechafinconv'].setValidators([Validators.required]);
            group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
          }
        }
      }else{
        group.controls['convenio'].clearValidators();
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].clearValidators();
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].clearValidators();
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['licconv'].clearValidators();
        group.controls['licconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archconv'].clearValidators();
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }else{
      if(vrfconv){
        group.controls['convenio'].setValidators([Validators.required]);
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].setValidators([Validators.required]);
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].setValidators([Validators.required]);
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archconv'].setValidators([Validators.required,this.validarch]);
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['licconv'].setValidators([Validators.required]);
        group.controls['licconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        if(fi!="" && ff!=""){
          var qff=new Date(ff);
          var qfi=new Date(fi);
          if(qff<qfi){
            group.controls['fechafinconv'].setErrors({checkfech:true})
          }else{
            group.controls['fechafinconv'].setValidators([Validators.required]);
            group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
          }
        }
      }else{
        group.controls['convenio'].clearValidators();
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].clearValidators();
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].clearValidators();
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archconv'].clearValidators();
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['licconv'].clearValidators();
        group.controls['licconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }


    if( resf.checkfech ){

      return resf;
    }else{

      return null;
    }

  }

  /**
   * Valida el archivo  para saber si la extension es valida
   * @param ctrl Recibe el control
   * @returns Retorna el tipo de error dependiendo del caso
   */
  validarch(ctrl: AbstractControl): ValidationErrors  | null {

    var path = ctrl.value;
    if(ctrl.value!=undefined){
      var path_splitted = path.split('.');
      var extension = path_splitted.pop();
      var ext=extension.toLowerCase();

      if(ext=="png"||ext=="jpg"||ext=="jpeg"){
        return null;
      }else if(ctrl.value==""){
        return null;
      }else{
        return {extension:true};
      }
    }else{
      return {required:true};
    }

  }

  /**
   * Valida si la placa es unica
   * @param ctrl Recibe el control
   * @returns retorna si es unica o no la placa
   */
  validate(
    ctrl: AbstractControl
  ):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log(ctrl.value);
    var est=false;
    return this.data.ObtenerPlaca().pipe(map(data=>(
      data.findIndex(element=>(element.placaVehiculo).toUpperCase()==(ctrl.value).toUpperCase())==-1 || (this.edit && this.resVehEdit.placaVehiculo==ctrl.value)
      ?
       null: { uniquePlaca: true }
    )),
    catchError(()=>of(null)));

  }

  /**
   * Verifica si fue seleccionado o no el propietario, para determinar si es valida
   * @param ctrl recibe el control
   * @returns retorna el tipo de error dependiendo del error si no se ha seleccionado, si no existe , o sino requerido.
   */
  validatePT(ctrl: AbstractControl): ValidationErrors  | null {

    var path = ctrl.value;
    if(ctrl.value!=undefined){

      var numt=this.propArray.findIndex(element=>(element.documentoPersona).toUpperCase()==(ctrl.value).toUpperCase());
      if(numt!=-1){
        if(this.idprop==this.propArray[numt].idPropietario){
          return null;
        }else{
          return {notselect:true};
        }
      }else if(ctrl.value==""){
        return null;
      }else{
        return {notexist:true};
      }
    }else{
      return {required:true};
    }

  }

  filtrarEntidad(event:any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.entidadesTransito.length; i++) {
        let entidadesAux = this.entidadesTransito[i];
        if (entidadesAux.descripcionEntidad.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(entidadesAux);
        }
    }

    this.entidadesFiltrada = filtered;
  }

  filtrarServicio(event:any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.tiposServicios.length; i++) {
        let servicio = this.tiposServicios[i];
        if (servicio.descripcionServicio.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(servicio);
        }
    }

    this.serviciosFiltrados = filtered;
  }

  filtrarColores(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.coloresVehiculo.length; i++) {
        let color = this.coloresVehiculo[i];
        if (color.descripcionColor.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(color);
        }
    }

    this.coloresFiltrados = filtered;
  }

  filtrarCarrocerias(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.tiposCarrocerias.length; i++) {
        let carroceria = this.tiposCarrocerias[i];
        if(carroceria.descripcionCarroceria.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(carroceria);
        }
    }

    this.carroceriasFiltradas = filtered;
  }

  filtrarLineas(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.lineasMarcas.length; i++) {
        let linea = this.lineasMarcas[i];
        if(linea.descripcion.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(linea);
        }
    }

    this.carroceriasFiltradas = filtered;
    this.lineasFiltradas = filtered;
  }

  filtrarMarcas(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.marcaveh.length; i++) {
        let marcas = this.marcaveh[i];
        if(marcas.marca.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(marcas);
        }
    }
    this.marcasFiltradas = filtered;
  }

  filtrarPropietarios(event:any)
  {

    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.propArray.length; i++) {
        let propietario = this.propArray[i];
        if (propietario.nombrePersona.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(propietario);
        }
    }

    this.selectpropArray = filtered;
  }

  async actualizarFotoFrenteVehiculo(event:any)
  {

    this.fotoFrenteVehiculo = event.target.files[0];
    console.log(event.target.files[0]);
    console.log("guardando archivo 1");
        if(this.nombreArchivoFrenteVehiculo=='pendiente')
        {
          let frente:any =  await this.LoginService.subirArchivoVehiculoFrente(this.fotoFrenteVehiculo);
          this.nombreArchivoFrenteVehiculo =  frente.fotoFrenteAfiliacion;
          console.log("nombre archivo 1 :",this.nombreArchivoFrenteVehiculo);
        }else{
          let frente:any =  await this.LoginService.actulizarArchivoVehiculoFrente(this.fotoFrenteVehiculo,this.nombreArchivoFrenteVehiculo);
          this.nombreArchivoFrenteVehiculo =  frente.fotoFrenteAfiliacion;
          console.log("nombre archivo 1 :",this.nombreArchivoFrenteVehiculo);
        }

  }



  async actualizarFotoLateralVehiculo(event:any)
  {
    this.fotoTraseraVehiculo = event.target.files[0];
    console.log("guardando archivo 2");
        if(this.nombreArchivoLadoVehiculo=='pendiente')
        {
          let lado:any = await this.LoginService.subirArchivoVehiculoLateral(this.fotoLateralVehiculo);
          this.nombreArchivoLadoVehiculo = lado.fotoLadoAfiliacion;
          console.log("nombre archivo 2 :",this.nombreArchivoLadoVehiculo);
        }else{
          let lado:any = await this.LoginService.actulizarArchivoVehiculoLado(this.fotoLateralVehiculo,this.nombreArchivoLadoVehiculo);
          this.nombreArchivoLadoVehiculo = lado.fotoLadoAfiliacion;
          console.log("nombre archivo 2 :",this.nombreArchivoLadoVehiculo);
        }
    console.log(event.target.files[0]);
  }

  async actualizarFotoTraseraVehiculo(event:any)
  {
    this.fotoTraseraVehiculo = event.target.files[0];
    console.log("guardando archivo 3 ",this.fotoTraseraVehiculo);
        if(this.nombreArchivoParteTraseraVehiuclo=='pendiente')
        {
          console.log("nombre archivo 3 :",this.nombreArchivoParteTraseraVehiuclo);
          let trasera:any = await this.LoginService.subirArchivoVehiculoTrasera(this.fotoTraseraVehiculo);
          this.nombreArchivoParteTraseraVehiuclo = trasera.fotoTraseraAfiliacion;

        }else{
          console.log("nombre archivo 3 :",this.nombreArchivoParteTraseraVehiuclo);
          let trasera:any = await this.LoginService.actulizarArchivoVehiculoTrasera(this.fotoTraseraVehiculo,this.nombreArchivoParteTraseraVehiuclo);
          this.nombreArchivoParteTraseraVehiuclo = trasera.fotoTraseraAfiliacion;

        }
    console.log(event.target.files[0]);
  }

  async actualizarArchivoTarjetaOperacion(event:any)
  {
    this.archivoTarjetaOperacion = event.target.files[0];
    console.log("guardando archivo 4");
        if(this.nombreArchivoTarjetaOperacion == 'pendiente')
        {
          let to: any =  await this.LoginService.subirArchivoTarjetaOperacion2(this.archivoTarjetaOperacion);
          this.nombreArchivoTarjetaOperacion =  to.tarjetaOperacionUnoAfiliacion;
          console.log("nombre archivo tarjeta de operación : ",this.nombreArchivoTarjetaOperacion);
        }else{
          let to: any =  await this.LoginService.actulizarArchivoTarjetaOperacion(this.archivoTarjetaOperacion,this.nombreArchivoTarjetaOperacion);
          this.nombreArchivoTarjetaOperacion =  to.archivoTarjetaOperacion;
          console.log("nombre archivo tarjeta de operación : ",this.nombreArchivoTarjetaOperacion);
        }
  }

  async actualizarArchivoSoat(event:any)
  {
    this.archivoSoat = event.target.files[0];
    console.log("guardando archivo 5");
        if(this.nombreArchivoSoat == 'pendiente')
        {
          let soat:any = await this.LoginService.subirArchivoSOAT2(this.archivoSoat);
          this.nombreArchivoSoat = soat.soatAfiliacion;
          console.log("nombre archivo soat : ",this.nombreArchivoSoat);
        }else{
          let soat:any = await this.LoginService.actulizarArchivoSoat(this.archivoSoat,this.nombreArchivoSoat);
          this.nombreArchivoSoat = soat.archivoSoat;
          console.log("nombre archivo soat : ",this.nombreArchivoSoat);
        }
  }

  async actualizarArchivoRevisionTecnicoMecanica(event:any)
  {
    this.archivoRevisionTecnicoMecanica = event.target.files[0];
    console.log("guardando archivo 6");
        if(this.nombreArchivoRevisionTecnicoMecanica == 'pendiente')
        {
          let rtm:any = await this.LoginService.subirArchivoTecnicoMecanica(this.archivoRevisionTecnicoMecanica);
          this.nombreArchivoRevisionTecnicoMecanica = rtm.tecnicomecanicaAfiliacion;
          console.log("nombre archivo tc : ",this.nombreArchivoRevisionTecnicoMecanica);
        }else{
          let rtm:any = await this.LoginService.actulizarArchivoRevisionTecnicoMecanica(this.archivoRevisionTecnicoMecanica,this.nombreArchivoRevisionTecnicoMecanica);
          this.nombreArchivoRevisionTecnicoMecanica = rtm.archivoRevisionTecnicomecanica;
          console.log("nombre archivo tc : ",this.nombreArchivoRevisionTecnicoMecanica);
        }
  }

  async actualizarArchivoPolizaContractual(event:any)
  {
    this.archivoPolizaContractural = event.target.files[0];
    console.log("guardando archivo 7");
        if(this.nombreArchivoPolizaContractual == 'pendiente')
        {
          let napc:any = await this.LoginService.subirArchivoPolizaContractural(this.archivoPolizaContractural);
          this.nombreArchivoPolizaContractual = napc.contractualAfiliacion;
          console.log("nombre archivo poliza contractual : ",this.nombreArchivoPolizaContractual);
        }else{
          let napc:any = await this.LoginService.actulizarArchivoPolizaContractual(this.archivoPolizaContractural,this.nombreArchivoPolizaContractual);
          this.nombreArchivoPolizaContractual = napc.archivoPolizaContractual;
          console.log("nombre archivo poliza contractual : ",this.nombreArchivoPolizaContractual);
        }
  }

  async actualizarArchivoPolizaTodoRiesgo(event:any)
  {
    this.archivoPolizaTodoRiesgo = event.target.files[0];
    console.log("guardando archivo 77");
        if(this.nombreArchivoPolizaTodoRiesgo == 'pendiente')
        {
          let napc:any = await this.LoginService.subirArchivoPolizaTodoRiesgo(this.archivoPolizaTodoRiesgo);
          this.nombreArchivoPolizaTodoRiesgo = napc.archivoPolizaTodoRiesgo;
          console.log("nombre archivo poliza todo RIESGO : ",this.nombreArchivoPolizaTodoRiesgo);
        }else{
          let napc:any = await this.LoginService.actulizarArchivoPolizaTodoRiesgo(this.archivoPolizaTodoRiesgo,this.nombreArchivoPolizaTodoRiesgo);
          this.nombreArchivoPolizaTodoRiesgo = napc.archivoPolizaTodoRiesgo;
          console.log("nombre archivo poliza TODO RIESGO : ",this.nombreArchivoPolizaTodoRiesgo);
        }
  }

  async actualizarArchivoPolizaExtraContractual(event:any)
  {
    this.archivoPolizaExtraContractural = event.target.files[0];
    console.log("guardando archivo 7.1");
        if(this.nombreArchivoPolizaExtraContractual == 'pendiente')
        {
          let napec:any = await this.LoginService.subirArchivoPolizaExtraContractual(this.archivoPolizaExtraContractural);
          this.nombreArchivoPolizaExtraContractual = napec.extracontractualAfiliacion;
          console.log("nombre archivo poliza extra contractual : ",this.nombreArchivoPolizaExtraContractual);
        }else{
          let napec:any = await this.LoginService.actulizarArchivoPolizaExtraContractual(this.archivoPolizaExtraContractural,this.nombreArchivoPolizaExtraContractual);
          this.nombreArchivoPolizaExtraContractual = napec.archivoPolizaExtracontractual;
          console.log("nombre archivo poliza extra contractual : ",this.nombreArchivoPolizaExtraContractual);
        }
  }

  async actualizarArchivoRevisionPreventiva(event:any)
  {
    this.archivoRevisionPreventica = event.target.files[0];
    console.log("guardando archivo 8");
        if(this.nombreArchivoRevisionPreventiva == 'pendiente')
        {
          let rv:any = await this.LoginService.subirArchivoRevisionPreventiva(this.archivoRevisionPreventica);
          this.nombreArchivoRevisionPreventiva = rv.preventivaAfiliacion;
          console.log("nombre archivo revisión preventiva : ",this.nombreArchivoRevisionPreventiva);
        }else{
          console.log("nombre archivo revisión preventiva : ",this.nombreArchivoRevisionPreventiva);
          let rv:any = await this.LoginService.actulizarArchivoRevisionPreventica(this.archivoRevisionPreventica,this.nombreArchivoRevisionPreventiva);
          this.nombreArchivoRevisionPreventiva = rv.archivoRevisionPreventiva;
          console.log("nombre archivo revisión preventiva : ",this.nombreArchivoRevisionPreventiva);
          console.log("nombre archivo revisión preventiva : ",rv);
        }
  }

  async actualizarArchivoLicenciaTransito(event:any)
  {
    this.archivoLicenciaTransito = event.target.files[0];
    console.log("guardando archivo 9");
        if(this.nombreArchivoLicenciaTransito == 'pendiente')
        {
          let alt:any = await this.LoginService.subirArchivoLicenciaTransito(this.archivoLicenciaTransito);
          this.nombreArchivoLicenciaTransito = alt.tarjetaPropiedadUnoAfiliacion;
          console.log("nombre archivo licencia transito : ",this.nombreArchivoLicenciaTransito);
        }else{
          let alt:any = await this.LoginService.actulizarArchivoLicenciaTransito(this.archivoLicenciaTransito,this.nombreArchivoLicenciaTransito);
          this.nombreArchivoLicenciaTransito = alt.tarjetaPropiedadUnoAfiliacion;
          console.log("nombre archivo licencia transito : ",this.nombreArchivoLicenciaTransito);
        }
  }

  async actualizarArchivoConevnio(event:any)
  {
    this.archivoConvenio = event.target.files[0];
    console.log("guardando archivo 9");
        if(this.nombreArchivoConvenio == 'pendiente')
        {
          let alt:any = await this.LoginService.subirArchivoConvenio(this.archivoConvenio);
          this.nombreArchivoConvenio = alt.convenioAfiliacion;
          console.log("nombre archivo licencia transito : ",this.nombreArchivoConvenio);
        }else{
          let alt:any = await this.LoginService.actualizarArchivoConvenio(this.archivoConvenio,this.nombreArchivoConvenio);
          this.nombreArchivoConvenio = alt.archivoConvenio;
          console.log("nombre archivo licencia transito : ",this.nombreArchivoConvenio);
        }
  }

  guardarArchivoConvenio(event:any)
  {
    this.archivoConvenio = event.target.files[0];
    console.log(event.target.files[0]);
  }

  guardarFotoFrenteVehiculo(event:any)
  {

    this.fotoFrenteVehiculo = event.target.files[0];
    console.log(event.target.files[0]);
  }

  guardarFotoTraseraVehiculo(event:any)
  {
    this.fotoTraseraVehiculo = event.target.files[0];
    console.log(event.target.files[0]);
  }

  guardarFotoLateralVehiculo(event:any)
  {
    this.fotoLateralVehiculo = event.target.files[0];
    console.log(event.target.files[0]);
  }

  guardarArchivoTarjetaOperacion(event:any)
  {
    this.archivoTarjetaOperacion = event.target.files[0];
  }

  guardarArchivoSoat(event:any)
  {
    this.archivoSoat = event.target.files[0];
  }

  guardarArchivoRevisionTecnicoMecanica(event:any)
  {
    this.archivoRevisionTecnicoMecanica = event.target.files[0];
  }

  guardarArchivoPolizaContractual(event:any)
  {
    this.archivoPolizaContractural = event.target.files[0];
  }

  guardarArchivoPolizaTodoRiesgo(event:any)
  {
    this.archivoPolizaTodoRiesgo = event.target.files[0];
  }

  guardarArchivoPolizaExtraContractual(event:any)
  {
    this.archivoPolizaExtraContractural = event.target.files[0];
  }

  guardarArchivoRevisionPreventiva(event:any)
  {
    this.archivoRevisionPreventica = event.target.files[0];
  }

  guardarArchivoLicenciaTransito(event:any)
  {
    this.archivoLicenciaTransito = event.target.files[0];
  }


}
