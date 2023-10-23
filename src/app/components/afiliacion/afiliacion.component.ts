import { Ciudad } from './../../models/ciudad';
import { CentralService } from './../../services/central.service';
import { AseguradorasVehiculoInterface } from './../../models/aseguradoras-vehiculo-interface';
import { TipoVehiculoInterface } from './../../models/tipo-vehiculo-interface';
import { ConveniosVehiculoInterface } from './../../models/convenios-vehiculo-interface';
import { MarcaVehiculoInterface } from './../../models/marca-vehiculo-interface';
import { ClaseVehiculoInterface } from './../../models/clase-vehiculo';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCombustibleInterface } from 'src/app/models/tipo-combustible';
import { AfiliacionVehiculoInterface } from 'src/app/models/afiliacion-vehiculo-interface';
import { Observacioninterface } from 'src/app/models/observacioninterface';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as moment from 'moment';

@Component({
  selector: 'app-afiliacion',
  templateUrl: './afiliacion.component.html',
  styleUrls: ['./afiliacion.component.css']
})
export class AfiliacionComponent implements OnInit {
  alertpen=false;
  selectedIndex = 0;
  aFormGroup: FormGroup;
  siteKey:string;
  lang:string;
  theme:string;
  labels: any;
  notifi:number;
  porcentaje:number;
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
  resTP:any;
  resLC:any;
  resCC:any;
  tipocom:Array<TipoCombustibleInterface>;
  ciudades:Array<Ciudad>;
  tipoveh:Array<TipoVehiculoInterface>;
  aseguradoraveh:Array<AseguradorasVehiculoInterface>;
  claseveh:Array<ClaseVehiculoInterface>;
  marcaveh:Array<MarcaVehiculoInterface>;
  listplaca:Array<any>;
  listidenty:Array<any>;
  modeloveh:any;
  categorialicveh:any;
  estadoa:any;
  verfpl:boolean;
  verfidenty:boolean;
  convenios:Array<ConveniosVehiculoInterface>;
  tipodocs:any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  NomimgeditVehArray:Array<string>=[];
  archnomeditvehconv="";
  archnomeditvehTO:Array<string>=[];
  archnomeditvehSOAT="";
  archnomeditvehTM="";
  archnomeditvehPC="";
  archnomeditvehPE="";
  archnomeditvehRP="";
  archnomeditvehTP:Array<string>=[];
  archnomeditvehLC:Array<string>=[];
  archnomeditvehCC:Array<string>=[];
  FileimgVehArray:Array<File>=[];
  NomimgVehArray:Array<string>=[];
  AlertimgVehArray:Array<boolean>=[];
  archalertvehconv=false;
  
  archnomvehconv="Selecciona un Archivo";
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
  archfilevehLC:Array<File>=[];
  archnomvehLC:Array<string>=[];
  archalertvehLC:Array<boolean>=[];
  archfilevehCC:Array<File>=[];
  archnomvehCC:Array<string>=[];
  archalertvehCC:Array<boolean>=[];
  param: string;
  constructor(private formBuilder: FormBuilder,private spinnerService: SpinnerService,private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.porcentaje=0;
    this.siteKey='6LdoxMMaAAAAABEdVwuVh5otGfoctaHPda7H7hME';
    this.lang='es';
    this.theme='Light';
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.idedit=-1;
    this.notifi=0;
    this.listobsv=[];
    this.edit=false;
    this.view=false;
    this.param="";
    this.listplaca=[];
    this.listidenty=[];
    this.verfpl=false;
    this.verfidenty=false;
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
    this.archfilevehLC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfilevehLC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archnomvehLC.push("Selecciona un Archivo");
    this.archnomvehLC.push("Selecciona un Archivo");
    this.archalertvehLC.push(false);
    this.archalertvehLC.push(false);
    this.archfilevehCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfilevehCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archnomvehCC.push("Selecciona un Archivo");
    this.archnomvehCC.push("Selecciona un Archivo");
    this.archalertvehCC.push(false);
    this.archalertvehCC.push(false);
    //Nom EDIT
    this.archnomeditvehTO.push("");
    this.archnomeditvehTO.push("");
    this.archnomeditvehTP.push("");
    this.archnomeditvehTP.push("");
    this.archnomeditvehLC.push("");
    this.archnomeditvehLC.push("");
    this.archnomeditvehCC.push("");
    this.archnomeditvehCC.push("");
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
    this.categorialicveh=[];
    this.tipocom=[];
    this.tipoveh=[];
    this.aseguradoraveh=[];
    this.claseveh=[];
    this.marcaveh=[];
    this.convenios=[];
    this.tipodocs=[];
    this.ciudades=[];
    this.obtenerModelo();
    this.obtenerCategoria();
    this.obtenerCiudades();
    this.obtenerClases();
    this.obtenerConvenios();
    this.obtenerMarcas();
    this.obtenerTiposCombustibles();
    this.obtenerTipoDoc();
    this.obtenerTiposVehiculos();
    this.obtenerAseguradorasVehiculos();
    this.obtenerEstadoA();
    
    var numberpattern="[0-9]+";
    var allowedExtensions = ['png', 'jpg','jpeg'];
    this.Formulario = new FormGroup({
      codi:new FormControl( ''),
      placa:new FormControl( '',{validators:[Validators.required,Validators.minLength(5),Validators.maxLength(6),Validators.pattern("([A-Z]{3}\[0-9]{3})|([A-Z]{1}\[0-9]{4})|([A-Z]{2}\[0-9]{4})|([A-Z]{1}\[0-9]{5})")],updateOn:'blur'}),
      numpas:new FormControl( '',[Validators.required,Validators.pattern(numberpattern)]),
      tipocom:new FormControl( null,[Validators.required]),
      tipoveh:new FormControl( null,[Validators.required]),
      claseveh:new FormControl( null,[Validators.required]),
      marcaveh:new FormControl( null,[Validators.required]),
      color:new FormControl( '',[Validators.required]),
      modeloveh:new FormControl( null,[Validators.required]),
      cilindraje:new FormControl( '',[Validators.required]),
      swconv: new FormControl( false),
      convenio:new FormControl( null,[Validators.required]),
      nomprop:new FormControl( '',[Validators.required]),
      apeprop:new FormControl( '',[Validators.required]),
      tipodocprop:new FormControl( null,[Validators.required]),
      numdocprop:new FormControl( '',{validators:[Validators.required,Validators.minLength(4),Validators.pattern(numberpattern)],updateOn:'blur'}),
      correoprop:new FormControl( '',[Validators.required, Validators.email]),
      tel1prop:new FormControl( '',[Validators.required,this.validtel,Validators.pattern(numberpattern)]),
      tel2prop:new FormControl( '',[this.validtel,Validators.pattern(numberpattern)]),
      direccionprop:new FormControl( '',[Validators.required]),
      ciudadprop:new FormControl( null,[Validators.required]),
      swcondprop:new FormControl( false),
      archveh:new FormControl( '',[Validators.required,this.validarch]),
      archveh1:new FormControl( '',[Validators.required,this.validarch]),
      archveh2:new FormControl( '',[Validators.required,this.validarch]),
      fechainiconv:new FormControl( ''),
      fechafinconv:new FormControl( ''),
      archconv:new FormControl( '',[Validators.required,this.validarch]),
      numTO:new FormControl( '',[Validators.required]),
      fechainiTO:new FormControl( '',[Validators.required]),
      fechafinTO:new FormControl( '',[Validators.required]),
      archTO:new FormControl( '',[Validators.required,this.validarch]),
      archTO1:new FormControl( '',[Validators.required,this.validarch]),
      aseguradoraSOAT:new FormControl( null,[Validators.required]),
      numSOAT:new FormControl( '',[Validators.required]),
      fechainiSOAT:new FormControl( '',[Validators.required]),
      fechafinSOAT:new FormControl( '',[Validators.required]),
      archSOAT:new FormControl( '',[Validators.required,this.validarch]),
      fechainiTM:new FormControl( '',[Validators.required]),
      fechafinTM:new FormControl( '',[Validators.required]),
      archTM:new FormControl( '',[Validators.required,this.validarch]),
      aseguradoraPC:new FormControl( null,[Validators.required]),
      numPC:new FormControl( '',[Validators.required]),
      fechainiPC:new FormControl( '',[Validators.required]),
      fechafinPC:new FormControl( '',[Validators.required]),
      archPC:new FormControl( '',[Validators.required,this.validarch]),
      aseguradoraPE:new FormControl( null,[Validators.required]),
      numPE:new FormControl( '',[Validators.required]),
      fechainiPE:new FormControl( '',[Validators.required]),
      fechafinPE:new FormControl( '',[Validators.required]),
      archPE:new FormControl( '',[Validators.required,this.validarch]),
      fechainiRP:new FormControl( '',[Validators.required]),
      fechafinRP:new FormControl( '',[Validators.required]),
      archRP:new FormControl( '',[Validators.required,this.validarch]),
      archTP:new FormControl( '',[Validators.required,this.validarch]),
      archTP1:new FormControl( '',[Validators.required,this.validarch]),
      numeroMotor:new FormControl( '',[Validators.required]),
      numeroChasis:new FormControl( '',[Validators.required]),
      numeroVin:new FormControl( '',[Validators.required]),
      catlic:new FormControl( null,[Validators.required]),
      fechainiLC:new FormControl( '',[Validators.required]),
      fechafinLC:new FormControl( '',[Validators.required]),
      archLC:new FormControl( '',[Validators.required,this.validarch]),
      archLC1:new FormControl( '',[Validators.required,this.validarch]),
      archCC:new FormControl( '',[Validators.required,this.validarch]),
      archCC1:new FormControl( '',[Validators.required,this.validarch]),
      Notas:new FormControl( ''),
      optestado:new FormControl( null),
    },{
      validators:[this.checkConv.bind(this),this.checkLic.bind(this),this.checkFech]
    });
   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,6)==="editar"){
      //this.obtenerPlacas();
      this.obtenerCedulas();
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerAfiliacion(urlid).subscribe((res: AfiliacionVehiculoInterface) => {
        console.log(res);
        if(res.idAfiliacion!=undefined){
          this.idedit=res.idAfiliacion;


        }
        
        
        this.listobsv=res.observacionAfiliacionList;
        this.archnomeditvehTO[0]=""+res.tarjetaOperacionUnoAfiliacion;
        this.archnomeditvehTO[1]=""+res.tarjetaOperacionDosAfiliacion;
        this.resTO={
          tarjetaOperacionUnoAfiliacion:res.tarjetaOperacionUnoAfiliacion,
          tarjetaOperacionDosAfiliacion:res.tarjetaOperacionDosAfiliacion
        };
        this.archnomeditvehTP[0]=""+res.tarjetaPropiedadUnoAfiliacion;
        this.archnomeditvehTP[1]=""+res.tarjetaPropiedadDosAfiliacion;
        this.resTP={
          tarjetaPropiedadUnoAfiliacion:res.tarjetaPropiedadUnoAfiliacion,
          tarjetaPropiedadDosAfiliacion:res.tarjetaPropiedadDosAfiliacion
        };
        this.archnomeditvehLC[0]=""+res.licenciaUnoAfiliacion;
        this.archnomeditvehLC[1]=""+res.licenciaDosAfiliacion;
        this.resLC={
          licenciaUnoAfiliacion:res.licenciaUnoAfiliacion,
          licenciaDosAfiliacion:res.licenciaDosAfiliacion
        };
        this.archnomeditvehCC[0]=""+res.documentoUnoAfiliacion;
        this.archnomeditvehCC[1]=""+res.documentoDosAfiliacion;
        this.resCC={
          documentoUnoAfiliacion:res.documentoUnoAfiliacion,
          documentoDosAfiliacion:res.documentoDosAfiliacion
        };
        this.NomimgeditVehArray[0]=""+res.fotoFrenteAfiliacion;
        this.NomimgeditVehArray[1]=""+res.fotoLadoAfiliacion;
        this.NomimgeditVehArray[2]=""+res.fotoTraseraAfiliacion;
        this.resveh={
          fotoFrenteAfiliacion:res.fotoFrenteAfiliacion,
          fotoLadoAfiliacion:res.fotoLadoAfiliacion,
          fotoTraseraAfiliacion:res.fotoTraseraAfiliacion
        };
        this.archnomeditvehconv=""+res.convenioAfiliacion;
        this.resconv={
          convenioAfiliacion:res.convenioAfiliacion
        };
        this.archnomeditvehSOAT=""+res.soatAfiliacion;this.resSOAT={
          soatAfiliacion:res.soatAfiliacion
        };
        this.archnomeditvehTM=""+res.tecnicomecanicaAfiliacion;
        this.resTM={
          tecnicomecanicaAfiliacion:res.tecnicomecanicaAfiliacion
        };
        this.archnomeditvehPC=""+res.contractualAfiliacion;
        this.resPC={
          contractualAfiliacion:res.contractualAfiliacion
        };
        this.archnomeditvehPE=""+res.extracontractualAfiliacion;
        this.resPE={
          extracontractualAfiliacion:res.extracontractualAfiliacion
        };
        this.archnomeditvehRP=""+res.preventivaAfiliacion;
        this.resRP={
          preventivaAfiliacion:res.preventivaAfiliacion
        };
        console.log(this.archnomeditvehconv);
        this.Formulario.get("archveh").setValidators([this.validarch]);
        this.Formulario.get("archveh1")?.setValidators([this.validarch]);
        this.Formulario.get("archveh2")?.setValidators([this.validarch]);
        this.Formulario.get("archTO")?.setValidators([this.validarch]);
        this.Formulario.get("archTO1")?.setValidators([this.validarch]);
        this.Formulario.get("archSOAT")?.setValidators([this.validarch]);
        this.Formulario.get("archTM")?.setValidators([this.validarch]);
        this.Formulario.get("archPC")?.setValidators([this.validarch]);
        this.Formulario.get("archPE")?.setValidators([this.validarch]);
        this.Formulario.get("archRP")?.setValidators([this.validarch]);
        this.Formulario.get("archTP")?.setValidators([this.validarch]);
        this.Formulario.get("archTP1")?.setValidators([this.validarch]);
        this.Formulario.get("archCC")?.setValidators([this.validarch]);
        this.Formulario.get("archCC1")?.setValidators([this.validarch]);//Modifica los validadores normales
        this.Formulario.get("archveh")?.updateValueAndValidity();
        this.Formulario.get("archveh1")?.updateValueAndValidity();
        this.Formulario.get("archveh2")?.updateValueAndValidity();
        this.Formulario.get("archTO")?.updateValueAndValidity();
        this.Formulario.get("archTO1")?.updateValueAndValidity();
        this.Formulario.get("archSOAT")?.updateValueAndValidity();
        this.Formulario.get("archTM")?.updateValueAndValidity();
        this.Formulario.get("archPC")?.updateValueAndValidity();
        this.Formulario.get("archPE")?.updateValueAndValidity();
        this.Formulario.get("archRP")?.updateValueAndValidity();
        this.Formulario.get("archTP")?.updateValueAndValidity();
        this.Formulario.get("archTP1")?.updateValueAndValidity();
        this.Formulario.get("archCC")?.updateValueAndValidity();
        this.Formulario.get("archCC1")?.updateValueAndValidity();
        
        this.Formulario.get("placa")?.setAsyncValidators([this.validate.bind(this)]);//Modifica los validadores Asincronos
        this.Formulario.get("placa")?.updateValueAndValidity();
        this.Formulario.get("numdocprop")?.setAsyncValidators([this.validateP.bind(this)]);
        this.Formulario.get("numdocprop")?.updateValueAndValidity();
        console.log(this.Formulario.get("placa").errors);
        this.Formulario.patchValue({
          //res.idAfiliacion
          codi:res.codigoInternoAfiliacion,
          placa:res.placaAfiliacion,
          numpas:res.pasajerosAfiliacion,
          tipocom:res.tipoCombustibleAfiliacion,
          tipoveh:res.tipoVehiculoAfiliacion,
          claseveh:res.claseVehiculoAfiliacion,
          marcaveh:res.marcaAfiliacion,
          color:res.colorAfiliacion,
          modeloveh:res.modeloAfiliacion,
          cilindraje:res.cilindrajeAfiliacion,
          swconv:res.empresaConvenio!=null?true: false,
          convenio:res.empresaConvenio!=null?res.empresaConvenio: null,
          nomprop:res.nombreAfiliacion,
          apeprop:res.apellidoAfiliacion,
          tipodocprop:res.tipoDocAfiliacion,
          numdocprop:res.documentoAfiliacion,
          correoprop:res.correoAfiliacion,
          tel1prop:res.telefonoUnoAfiliacion,
          tel2prop:res.telefonoDosAfiliacion,
          direccionprop:res.direccionAfiliacion,
          ciudadprop:res.ciudadAfiliacion,
          swcondprop:res.esConductorAfiliacion,
          //:res.fotoLadoAfiliacion,
          //:res.fotoTraseraAfiliacion,res.fotoFrenteAfiliacion
          //:,
          fechainiconv:res.inicioConvenioAfiliacion?.substr(0,10),
          fechafinconv:res.finConvenioAfiliacion?.substr(0,10),
          //:res.tarjetaPropiedadUnoAfiliacion,
          //:res.tarjetaPropiedadDosAfiliacion,res.convenioAfiliacion
          //:,
          numTO:res.numeroTarjetaOperacionAfiliacion,
          fechainiTO:res.inicioTarjetaOperacionAfiliacion?.substr(0,10),
          fechafinTO:res.finTarjetaOperacionAfiliacion?.substr(0,10),
          //:res.tarjetaOperacionDosAfiliacion,
          //:,res.tarjetaOperacionUnoAfiliacion
          aseguradoraSOAT:res.aseguradoraSoatAfiliacion,
          numSOAT:res.numeroSoatAfiliacion,
          fechainiSOAT:res.inicioSoatAfiliacion?.substr(0,10),
          fechafinSOAT:res.finSoatAfiliacion?.substr(0,10),
          //:res.inicioTecnicomecanicaAfiliacion,res.soatAfiliacion
          fechainiTM:res.inicioTecnicomecanicaAfiliacion?.substr(0,10),
          fechafinTM:res.finTecnicomecanicaAfiliacion?.substr(0,10),
          //:,res.tecnicomecanicaAfiliacion
          aseguradoraPC:res.aseguradoraContractualAfiliacion,
          numPC:res.numeroContractualAfiliacion,
          fechainiPC:res.inicioContractualAfiliacion?.substr(0,10),
          fechafinPC:res.finContractualAfiliacion?.substr(0,10),
          //:res.contractualAfiliacion,
          aseguradoraPE:res.aseguradoraExtracontractualAfiliacion,
          numPE:res.numeroExtracontractualAfiliacion,
          fechainiPE:res.inicioExtracontractualAfiliacion?.substr(0,10),
          fechafinPE:res.finExtracontractualAfiliacion?.substr(0,10),
          //:res.extracontractualAfiliacion,
          fechainiRP:res.inicioPreventivaAfiliacion?.substr(0,10),
          fechafinRP:res.finPreventivaAfiliacion?.substr(0,10),
          //res.preventivaAfiliacion
          numeroMotorAfiliacion:res.numeroMotorAfiliacion,
          numeroChasisAfiliacion:res.numeroChasisAfiliacion,
          numeroVinAfiliacion:res.numeroVinAfiliacion,
          catlic:res.categoriaLicenciaAfiliacion,
          fechainiLC:res.inicioLicenciaAfiliacion?.substr(0,10),
          fechafinLC:res.finLicenciaAfiliacion?.substr(0,10),
          //:res,    licenciaDosAfiliacion
          //:res,    documentoUnoAfiliacion
          //:res,    documentoDosAfiliacion
          //:res,    estadoAfiliacion
  
        });
        //this.statusplaca();
        this.Formulario.get("placa")?.markAsTouched();
        this.Formulario.get("numdocprop")?.markAsTouched();
        this.Formulario.get("codi")?.setValidators([Validators.required]);
        this.Formulario.get("codi")?.updateValueAndValidity();
        this.Formulario.get("Notas")?.setValidators([Validators.required]);
        this.Formulario.get("Notas")?.updateValueAndValidity();
        this.Formulario.get("optestado")?.setValidators([Validators.required]);
        this.Formulario.get("optestado")?.updateValueAndValidity();
        
        if(this.listobsv.length>0){
          var fechaf=new Date(this.listobsv[this.listobsv.length-1].fechaRegistroObservacion);
          var sem=moment({year :fechaf.getFullYear(), month :fechaf.getMonth(), date :fechaf.getDate(), hours: fechaf.getHours(), minutes:fechaf.getMinutes(), seconds:fechaf.getSeconds() }).add(80, 'seconds');
          console.log(fechaact);
          console.log(sem.toDate());
          var fechaact=sem.toDate();
          var fecha=new Date();
          if(fecha<fechaact){
            this.selectedIndex = 2;
            setTimeout( function(){
              try {
                document.querySelector("#sectioncuad").scrollIntoView();
                } catch (e) { }
            }, 500 );
          }
        }
        console.log(this.listobsv.length);
        console.log(this.listobsv);
        
        
      });
      

    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerAfiliacion(urlid).subscribe((res: AfiliacionVehiculoInterface) => {
        console.log(res);
        this.archnomeditvehTO[0]=""+res.tarjetaOperacionUnoAfiliacion;
        this.archnomeditvehTO[1]=""+res.tarjetaOperacionDosAfiliacion;
        this.archnomeditvehTP[0]=""+res.tarjetaPropiedadUnoAfiliacion;
        this.archnomeditvehTP[1]=""+res.tarjetaPropiedadDosAfiliacion;
        this.archnomeditvehLC[0]=""+res.licenciaUnoAfiliacion;
        this.archnomeditvehLC[1]=""+res.licenciaDosAfiliacion;
        this.archnomeditvehCC[0]=""+res.documentoUnoAfiliacion;
        this.archnomeditvehCC[1]=""+res.documentoDosAfiliacion;
        this.NomimgeditVehArray[0]=""+res.fotoFrenteAfiliacion;
        this.NomimgeditVehArray[1]=""+res.fotoLadoAfiliacion;
        this.NomimgeditVehArray[2]=""+res.fotoTraseraAfiliacion;
        this.archnomeditvehconv=""+res.convenioAfiliacion;
        this.archnomeditvehSOAT=""+res.soatAfiliacion;
        this.archnomeditvehTM=""+res.tecnicomecanicaAfiliacion;
        this.archnomeditvehPC=""+res.contractualAfiliacion;
        this.archnomeditvehPE=""+res.extracontractualAfiliacion;
        this.archnomeditvehRP=""+res.preventivaAfiliacion;
        this.listobsv=res.observacionAfiliacionList;
        console.log(this.archnomeditvehconv);
        this.Formulario.patchValue({
          //res.idAfiliacion
          codi:res.codigoInternoAfiliacion,
          placa:res.placaAfiliacion,
          numpas:""+res.pasajerosAfiliacion,
          tipocom:res.tipoCombustibleAfiliacion,
          tipoveh:res.tipoVehiculoAfiliacion,
          claseveh:res.claseVehiculoAfiliacion,
          marcaveh:res.marcaAfiliacion,
          color:res.colorAfiliacion,
          modeloveh:res.modeloAfiliacion,
          cilindraje:res.cilindrajeAfiliacion,
          swconv:res.empresaConvenio!=null?true: false,
          convenio:res.empresaConvenio!=null?res.empresaConvenio: null,
          nomprop:res.nombreAfiliacion,
          apeprop:res.apellidoAfiliacion,
          tipodocprop:res.tipoDocAfiliacion,
          numdocprop:res.documentoAfiliacion,
          correoprop:res.correoAfiliacion,
          tel1prop:res.telefonoUnoAfiliacion,
          tel2prop:res.telefonoDosAfiliacion,
          direccionprop:res.direccionAfiliacion,
          ciudadprop:res.ciudadAfiliacion,
          swcondprop:res.esConductorAfiliacion,
          //:res.fotoLadoAfiliacion,
          //:res.fotoTraseraAfiliacion,res.fotoFrenteAfiliacion
          //:,
          fechainiconv:res.inicioConvenioAfiliacion?.substr(0,10),
          fechafinconv:res.finConvenioAfiliacion?.substr(0,10),
          //:res.tarjetaPropiedadUnoAfiliacion,
          //:res.tarjetaPropiedadDosAfiliacion,res.convenioAfiliacion
          //:,
          numTO:res.numeroTarjetaOperacionAfiliacion,
          fechainiTO:res.inicioTarjetaOperacionAfiliacion?.substr(0,10),
          fechafinTO:res.finTarjetaOperacionAfiliacion?.substr(0,10),
          //:res.tarjetaOperacionDosAfiliacion,
          //:,res.tarjetaOperacionUnoAfiliacion
          aseguradoraSOAT:res.aseguradoraSoatAfiliacion,
          numSOAT:res.numeroSoatAfiliacion,
          fechainiSOAT:res.inicioSoatAfiliacion?.substr(0,10),
          fechafinSOAT:res.finSoatAfiliacion?.substr(0,10),
          //:res.inicioTecnicomecanicaAfiliacion,res.soatAfiliacion
          fechainiTM:res.inicioTecnicomecanicaAfiliacion?.substr(0,10),
          fechafinTM:res.finTecnicomecanicaAfiliacion?.substr(0,10),
          //:,res.tecnicomecanicaAfiliacion
          aseguradoraPC:res.aseguradoraContractualAfiliacion,
          numPC:res.numeroContractualAfiliacion,
          fechainiPC:res.inicioContractualAfiliacion?.substr(0,10),
          fechafinPC:res.finContractualAfiliacion?.substr(0,10),
          //:res.contractualAfiliacion,
          aseguradoraPE:res.aseguradoraExtracontractualAfiliacion,
          numPE:res.numeroExtracontractualAfiliacion,
          fechainiPE:res.inicioExtracontractualAfiliacion?.substr(0,10),
          fechafinPE:res.finExtracontractualAfiliacion?.substr(0,10),
          //:res.extracontractualAfiliacion,
          fechainiRP:res.inicioPreventivaAfiliacion?.substr(0,10),
          fechafinRP:res.finPreventivaAfiliacion?.substr(0,10),
          //res.preventivaAfiliacion
          numeroMotorAfiliacion:res.numeroMotorAfiliacion,
          numeroChasisAfiliacion:res.numeroChasisAfiliacion,
          numeroVinAfiliacion:res.numeroVinAfiliacion,
          catlic:res.categoriaLicenciaAfiliacion,
          fechainiLC:res.inicioLicenciaAfiliacion?.substr(0,10),
          fechafinLC:res.finLicenciaAfiliacion?.substr(0,10),
          //:res,    licenciaDosAfiliacion
          //:res,    documentoUnoAfiliacion
          //:res,    documentoDosAfiliacion
          //:res,    estadoAfiliacion
  
        });
        this.Formulario.get("codi")?.clearValidators();
        this.Formulario.get("codi")?.updateValueAndValidity();
        this.Formulario.disable();
      });
    }

  }
  ngAfterViewInit(): void {
    
  }

  /**
   * Se utiliza para convertir todos los espacios en mayusculas
   * @param {string} nom Nombre del control a modificar
   */
  mayus(nom:string):void{
    this.Formulario.get(nom)?.setValue((this.Formulario.get(nom)?.value).toUpperCase());
  }

  /**
   * Se utiliza para obtener los modelos
   */
  obtenerModelo():void{
    var fechaac=new Date();
    for(var i=fechaac.getFullYear();i>=1900;i--){
      this.modeloveh.push({value:""+i});
      //console.log(i);
    }
  }

  /**
   * Se utiliza para obtener las categorias
   */
  obtenerCategoria():void{
    this.categorialicveh.push({value:"A1"});
    this.categorialicveh.push({value:"A2"});
    this.categorialicveh.push({value:"B1"});
    this.categorialicveh.push({value:"B2"});
    this.categorialicveh.push({value:"C1"});
    this.categorialicveh.push({value:"C2"});
    this.categorialicveh.push({value:"C3"});
  }
  /**
   * Se utiliza para obtener los estados
   */
  obtenerEstadoA():void{
    this.estadoa.push({value:0, text:"Pendiente"});
    this.estadoa.push({value:1, text:"Aprobada"});
    this.estadoa.push({value:2, text:"En Revisión"});
    this.estadoa.push({value:3, text:"Rechazado"});
  }
  /**
   * Se utiliza para obtener las clases
   */
  obtenerClases(){
    this.LoginService
      .ObtenerClases()
      .subscribe((clases:Array<ClaseVehiculoInterface>) => {
        this.claseveh = clases;
      });
  }

  /**
   * Se utiliza para obtener las placas
   */
  obtenerPlacas(){
    this.data
      .ObtenerPlaca()
      .subscribe((placas:Array<any>) => {
        this.listplaca = placas;
        //this.statusplaca();
      });
  }

  /**
   * Se utiliza para obtener las cedulas
   */
  obtenerCedulas(){
    this.data
      .ObtenerCedulas()
      .subscribe((cedulas:Array<any>) => {
        this.listidenty = cedulas;
        console.log(this.listidenty)
      });
  }

  /**
   * Se utiliza para obtener las ciudades
   */
  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:Array<Ciudad>) => {
        this.ciudades = ciudad;
      });
  }
  /**
   * Se utiliza para obtener los convenios
   */
  obtenerConvenios():void{
    this.LoginService
      .ObtenerConvenios()
      .subscribe((convenios: Array<ConveniosVehiculoInterface>) => {
        this.convenios = convenios;
      });
  }

  /**
   * Se utiliza para obtener las marcas
   */
  obtenerMarcas():void{
    this.LoginService
      .ObtenerMarcas()
      .subscribe((marcas: Array<MarcaVehiculoInterface>) => {
        this.marcaveh = marcas;
      });
  }

  /**
   * Se utiliza para obtener los tipos de combustible
   */
  obtenerTiposCombustibles():void{
    this.LoginService
      .ObtenerTipoCombustibles()
      .subscribe((tipocombustible: Array<TipoCombustibleInterface>) => {
        this.tipocom = tipocombustible;
      });
  }

  /**
   * Se utiliza para obtener los tipos de vehiculos
   */
  obtenerTiposVehiculos():void{
    this.LoginService
      .ObtenerTipoVehiculos()
      .subscribe((tipovehiculo: Array<TipoVehiculoInterface>) => {
        this.tipoveh = tipovehiculo;
      });
  }

  /**
   * Se utiliza para obtener los aseguradoras vehiculos.
   */
  obtenerAseguradorasVehiculos():void{
    this.LoginService
      .ObtenerAseguradoras()
      .subscribe((aseguradoravehiculo: Array<AseguradorasVehiculoInterface>) => {
        this.aseguradoraveh = aseguradoravehiculo;
      });
  }

  /**
   * Se utiliza para obtener los Tipos de documentos.
   */
  obtenerTipoDoc():void{
    this.tipodocs.push({id:"CC",value:"Cedula de Ciudadania"});
    this.tipodocs.push({id:"TI",value:"Tajeta de Identidad"});
    this.tipodocs.push({id:"CE",value:"Cedula de Extranjeria"});
  }

  /**
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
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
   * Se utiliza para cambiar el archivo que se manda a guardar.
   */
  cambioVehLC(element:any,nom:number){
    if(element.target.files[0]!==undefined){
      

        this.archfilevehLC[nom]=element.target.files[0];
        this.archnomvehLC[nom]=element.target.files[0].name;
        
        console.log(this.archfilevehLC[0]);
        console.log(this.archfilevehLC[1]);
        this.archalertvehLC[nom]=false;
    }else{
      this.archnomvehLC[nom]="Selecciona un Archivo";
    }
  }

  /**
   * Se utiliza para cambiar el archivo que se manda a guardar.
   */
  cambioVehCC(element:any,nom:number){
    if(element.target.files[0]!==undefined){
      

        this.archfilevehCC[nom]=element.target.files[0];
        this.archnomvehCC[nom]=element.target.files[0].name;
        
        this.archalertvehCC[nom]=false;
      
    }else{
      this.archnomvehCC[nom]="Selecciona un Archivo";
    }
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVeh(nom:string){
    this.data.obtenerImagenVeh(nom);
  }

  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehTO(nom:string){
    this.data.obtenerImagenVehTO(nom);
  }

  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehTP(nom:string){
    this.data.obtenerImagenVehTP(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehLC(nom:string){
    this.data.obtenerImagenVehLC(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehCC(nom:string){
    this.data.obtenerImagenVehCC(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehConv(nom:string){
    this.data.obtenerImagenVehconv(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehSOAT(nom:string){
    this.data.obtenerImagenVehSOAT(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehPC(nom:string){
    this.data.obtenerImagenVehPC(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehTM(nom:string){
    this.data.obtenerImagenVehTM(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehPE(nom:string){
    this.data.obtenerImagenVehPE(nom);
  }
  
  /**
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
  downloadVehRP(nom:string){
    this.data.obtenerImagenVehRP(nom);
  }

  /**
   * Ejecuta el metodo PUT para actualizar la información
   */
  completarSolicitud(){
    console.log("Entro")
    if(this.porcentaje==100){
      let afiliacion:AfiliacionVehiculoInterface={};
      console.log(this.Formulario);
      if(this.Formulario.get('swconv')?.value){
        if(this.Formulario.get('swcondprop')?.value){
          afiliacion.idAfiliacion=this.idedit;
          afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
          afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
          afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
          afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
          afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
          afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
          afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
          afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
          afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
          afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
          afiliacion.empresaConvenio=this.Formulario.get("convenio")?.value;
          afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
          afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
          afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
          afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
          afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
          afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
          afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
          afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
          afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
          afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
          afiliacion.fotoFrenteAfiliacion=this.resveh.fotoFrenteAfiliacion;
          afiliacion.fotoLadoAfiliacion=this.resveh.fotoLadoAfiliacion;
          afiliacion.fotoTraseraAfiliacion=this.resveh.fotoTraseraAfiliacion;
          afiliacion.inicioConvenioAfiliacion=this.Formulario.get("fechainiconv")?.value;
          afiliacion.finConvenioAfiliacion=this.Formulario.get("fechafinconv")?.value;
          afiliacion.convenioAfiliacion=this.resconv.convenioAfiliacion;
          afiliacion.tarjetaPropiedadUnoAfiliacion=this.resTP.tarjetaPropiedadUnoAfiliacion;
          afiliacion.tarjetaPropiedadDosAfiliacion=this.resTP.tarjetaPropiedadDosAfiliacion;
          afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
          afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
          afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
          afiliacion.tarjetaOperacionUnoAfiliacion=this.resTO.tarjetaOperacionUnoAfiliacion;
          afiliacion.tarjetaOperacionDosAfiliacion=this.resTO.tarjetaOperacionDosAfiliacion;
          afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
          afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
          afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
          afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
          afiliacion.soatAfiliacion=this.resSOAT.soatAfiliacion;
          afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
          afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
          afiliacion.tecnicomecanicaAfiliacion=this.resTM.tecnicomecanicaAfiliacion;
          afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
          afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
          afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
          afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
          afiliacion.contractualAfiliacion=this.resPC.contractualAfiliacion;
          afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
          afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
          afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
          afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
          afiliacion.extracontractualAfiliacion=this.resPE.extracontractualAfiliacion;
          afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
          afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
          afiliacion.preventivaAfiliacion=this.resRP.preventivaAfiliacion;
          afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
          afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
          afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
          afiliacion.categoriaLicenciaAfiliacion=this.Formulario.get("catlic")?.value;
          afiliacion.inicioLicenciaAfiliacion=this.Formulario.get("fechainiLC")?.value;
          afiliacion.finLicenciaAfiliacion=this.Formulario.get("fechafinLC")?.value;
          afiliacion.licenciaUnoAfiliacion=this.resLC.licenciaUnoAfiliacion;
          afiliacion.licenciaDosAfiliacion=this.resLC.licenciaDosAfiliacion;
          afiliacion.documentoUnoAfiliacion=this.resCC.documentoUnoAfiliacion;
          afiliacion.documentoDosAfiliacion=this.resCC.documentoDosAfiliacion;
          afiliacion.estadoAfiliacion=this.Formulario.get("optestado")?.value;
          afiliacion.notificarAfiliacion=this.notifi;
          console.log(afiliacion);
        }else{
          afiliacion.idAfiliacion=this.idedit;
          afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
          afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
          afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
          afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
          afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
          afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
          afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
          afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
          afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
          afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
          afiliacion.empresaConvenio=this.Formulario.get("convenio")?.value;
          afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
          afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
          afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
          afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
          afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
          afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
          afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
          afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
          afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
          afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
          afiliacion.fotoFrenteAfiliacion=this.resveh.fotoFrenteAfiliacion;
          afiliacion.fotoLadoAfiliacion=this.resveh.fotoLadoAfiliacion;
          afiliacion.fotoTraseraAfiliacion=this.resveh.fotoTraseraAfiliacion;
          afiliacion.inicioConvenioAfiliacion=this.Formulario.get("fechainiconv")?.value;
          afiliacion.finConvenioAfiliacion=this.Formulario.get("fechafinconv")?.value;
          afiliacion.convenioAfiliacion=this.resconv.convenioAfiliacion;
          afiliacion.tarjetaPropiedadUnoAfiliacion=this.resTP.tarjetaPropiedadUnoAfiliacion;
          afiliacion.tarjetaPropiedadDosAfiliacion=this.resTP.tarjetaPropiedadDosAfiliacion;
          afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
          afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
          afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
          afiliacion.tarjetaOperacionUnoAfiliacion=this.resTO.tarjetaOperacionUnoAfiliacion;
          afiliacion.tarjetaOperacionDosAfiliacion=this.resTO.tarjetaOperacionDosAfiliacion;
          afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
          afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
          afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
          afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
          afiliacion.soatAfiliacion=this.resSOAT.soatAfiliacion;
          afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
          afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
          afiliacion.tecnicomecanicaAfiliacion=this.resTM.tecnicomecanicaAfiliacion;
          afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
          afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
          afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
          afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
          afiliacion.contractualAfiliacion=this.resPC.contractualAfiliacion;
          afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
          afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
          afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
          afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
          afiliacion.extracontractualAfiliacion=this.resPE.extracontractualAfiliacion;
          afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
          afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
          afiliacion.preventivaAfiliacion=this.resRP.preventivaAfiliacion;
          afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
          afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
          afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
          afiliacion.documentoUnoAfiliacion=this.resCC.documentoUnoAfiliacion;
          afiliacion.documentoDosAfiliacion=this.resCC.documentoDosAfiliacion;
          afiliacion.estadoAfiliacion=this.Formulario.get("optestado")?.value;
          afiliacion.notificarAfiliacion=this.notifi;
          console.log(afiliacion);
        }
      }else{
        if(this.Formulario.get('swcondprop')?.value){
          afiliacion.idAfiliacion=this.idedit;
          afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
          afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
          afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
          afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
          afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
          afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
          afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
          afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
          afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
          afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
          afiliacion.empresaConvenio=this.Formulario.get("convenio")?.value;
          afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
          afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
          afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
          afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
          afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
          afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
          afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
          afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
          afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
          afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
          afiliacion.fotoFrenteAfiliacion=this.resveh.fotoFrenteAfiliacion;
          afiliacion.fotoLadoAfiliacion=this.resveh.fotoLadoAfiliacion;
          afiliacion.fotoTraseraAfiliacion=this.resveh.fotoTraseraAfiliacion;
          afiliacion.inicioConvenioAfiliacion=this.Formulario.get("fechainiconv")?.value;
          afiliacion.finConvenioAfiliacion=this.Formulario.get("fechafinconv")?.value;
          afiliacion.convenioAfiliacion=this.resconv.convenioAfiliacion;
          afiliacion.tarjetaPropiedadUnoAfiliacion=this.resTP.tarjetaPropiedadUnoAfiliacion;
          afiliacion.tarjetaPropiedadDosAfiliacion=this.resTP.tarjetaPropiedadDosAfiliacion;
          afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
          afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
          afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
          afiliacion.tarjetaOperacionUnoAfiliacion=this.resTO.tarjetaOperacionUnoAfiliacion;
          afiliacion.tarjetaOperacionDosAfiliacion=this.resTO.tarjetaOperacionDosAfiliacion;
          afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
          afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
          afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
          afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
          afiliacion.soatAfiliacion=this.resSOAT.soatAfiliacion;
          afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
          afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
          afiliacion.tecnicomecanicaAfiliacion=this.resTM.tecnicomecanicaAfiliacion;
          afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
          afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
          afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
          afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
          afiliacion.contractualAfiliacion=this.resPC.contractualAfiliacion;
          afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
          afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
          afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
          afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
          afiliacion.extracontractualAfiliacion=this.resPE.extracontractualAfiliacion;
          afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
          afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
          afiliacion.preventivaAfiliacion=this.resRP.preventivaAfiliacion;
          afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
          afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
          afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
          afiliacion.categoriaLicenciaAfiliacion=this.Formulario.get("catlic")?.value;
          afiliacion.inicioLicenciaAfiliacion=this.Formulario.get("fechainiLC")?.value;
          afiliacion.finLicenciaAfiliacion=this.Formulario.get("fechafinLC")?.value;
          afiliacion.licenciaUnoAfiliacion=this.resLC.licenciaUnoAfiliacion;
          afiliacion.licenciaDosAfiliacion=this.resLC.licenciaDosAfiliacion;
          afiliacion.documentoUnoAfiliacion=this.resCC.documentoUnoAfiliacion;
          afiliacion.documentoDosAfiliacion=this.resCC.documentoDosAfiliacion;
          afiliacion.estadoAfiliacion=this.Formulario.get("optestado")?.value;
          afiliacion.notificarAfiliacion=this.notifi;
          console.log(afiliacion);
        }else{
          afiliacion.idAfiliacion=this.idedit;
          afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
          afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
          afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
          afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
          afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
          afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
          afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
          afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
          afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
          afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
          afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
          afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
          afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
          afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
          afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
          afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
          afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
          afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
          afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
          afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
          afiliacion.fotoFrenteAfiliacion=this.resveh.fotoFrenteAfiliacion;
          afiliacion.fotoLadoAfiliacion=this.resveh.fotoLadoAfiliacion;
          afiliacion.fotoTraseraAfiliacion=this.resveh.fotoTraseraAfiliacion;
          afiliacion.tarjetaPropiedadUnoAfiliacion=this.resTP.tarjetaPropiedadUnoAfiliacion;
          afiliacion.tarjetaPropiedadDosAfiliacion=this.resTP.tarjetaPropiedadDosAfiliacion;
          afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
          afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
          afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
          afiliacion.tarjetaOperacionUnoAfiliacion=this.resTO.tarjetaOperacionUnoAfiliacion;
          afiliacion.tarjetaOperacionDosAfiliacion=this.resTO.tarjetaOperacionDosAfiliacion;
          afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
          afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
          afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
          afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
          afiliacion.soatAfiliacion=this.resSOAT.soatAfiliacion;
          afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
          afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
          afiliacion.tecnicomecanicaAfiliacion=this.resTM.tecnicomecanicaAfiliacion;
          afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
          afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
          afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
          afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
          afiliacion.contractualAfiliacion=this.resPC.contractualAfiliacion;
          afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
          afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
          afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
          afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
          afiliacion.extracontractualAfiliacion=this.resPE.extracontractualAfiliacion;
          afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
          afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
          afiliacion.preventivaAfiliacion=this.resRP.preventivaAfiliacion;
          afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
          afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
          afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
          afiliacion.documentoUnoAfiliacion=this.resCC.documentoUnoAfiliacion;
          afiliacion.documentoDosAfiliacion=this.resCC.documentoDosAfiliacion;
          
          afiliacion.estadoAfiliacion=this.Formulario.get("optestado")?.value;
          afiliacion.notificarAfiliacion=this.notifi;
          console.log(afiliacion);
        }
      }
      var observ:Observacioninterface={
        observacionAfiliacion:this.Formulario.get("Notas")?.value,
        afiliacion:{
            idAfiliacion:this.idedit
        }

      }
      console.log(observ);
      this.data.crearObservacion(
        observ
      ).subscribe(
        (resobs:any)=>{
          console.log(resobs);
          if(resobs.mensaje==1){
            this.data.actualizarafiliacion(afiliacion).subscribe(
              (res:any)=>{
                console.log(res);
                if(res.mensaje==1){
                  this.spinnerService.detenerSpinner();
                  this.ocultar=true;
                  this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
                  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/central/afiliaciones/'+this.param]);
                  });
                }else{
                  this.ocultar=false;
                  this.msm+=res.mensaje;
                }
              }
            )
          }else{
            this.msm+=" "+resobs.mensaje;
          }
        },
        err => {
          console.log(err);
        }
      ) ;
      
    }
  }

  /**
   * cambia la opcion de si notificar o solo guardar
   */
  cambiarnotifi(){
    this.notifi=1;
    this.guardar();
  }

  /**
   * Utiliza los metodos de Actualizar o crear segun el caso, En actualizar sube los archivos nuevos y solo llama a 
   * completarSolicitud()   para guardar todo en BD, En cuanto al crear, si lo ejecuta todo en este metodo, tanto la subida como la publicacion en BD.
   * Al principio no validaba si el Formulario era valido, pero ahora esta logica fue implementada en todas las vistas. 
   */
  guardar(){
    
    if(this.param?.substr(0,4)==="edit"){
      this.Formulario.markAllAsTouched();//Marca todos los controles como Tocados
      if(this.Formulario.get("optestado")?.value!=1 && (this.Formulario.get('placa').errors?.uniquePlaca || this.Formulario.get('numdocprop').errors?.uniqueDoc)){//verifica si la placa es unica, y el numero de documento es unico
        this.Formulario.get("placa")?.clearAsyncValidators();
        this.Formulario.get("placa")?.updateValueAndValidity();
        this.Formulario.get("numdocprop")?.clearAsyncValidators();
        this.Formulario.get("numdocprop")?.updateValueAndValidity();
        this.Formulario.markAllAsTouched();
      }
      
      if(!this.Formulario.valid ){
        console.log("Campos Pendientes");
        console.log(this.Formulario);
        this.alertpen=true;
        if(this.Formulario.get("optestado")?.value!=1){
          this.Formulario.get("placa")?.setAsyncValidators([this.validate.bind(this)]);
          this.Formulario.get("placa")?.updateValueAndValidity();
          this.Formulario.get("numdocprop")?.setAsyncValidators([this.validateP.bind(this)]);
          this.Formulario.get("numdocprop")?.updateValueAndValidity();
          this.Formulario.markAllAsTouched();
        }
      }else{
        if(this.NomimgVehArray[0]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoVeh(
            this.FileimgVehArray[0],
            this.NomimgeditVehArray[0]
          ).subscribe(
            (resveh:any)=>{
              this.resveh.fotoFrenteAfiliacion=resveh.archivoVehiculo;
              this.porcentaje+=5;
              this.completarSolicitud();
              console.log(resveh);
            },
            err => {
              console.log(err);
            }
          ) ;
  
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
        if(this.NomimgVehArray[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoVeh(
            this.FileimgVehArray[1],
            this.NomimgeditVehArray[1]
          ).subscribe(
            (resveh:any)=>{
              this.resveh.fotoLadoAfiliacion=resveh.archivoVehiculo;
              this.porcentaje+=5;
              this.completarSolicitud();
              console.log(resveh);
            },
            err => {
              console.log(err);
            }
          ) ;
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.NomimgVehArray[2]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoVeh(
            this.FileimgVehArray[2],
            this.NomimgeditVehArray[2]
          ).subscribe(
            (resveh:any)=>{
              this.resveh.fotoTraseraAfiliacion=resveh.archivoVehiculo;
              this.porcentaje+=5;
              this.completarSolicitud();
              console.log(resveh);
            },
            err => {
              console.log(err);
            }
          ) ;
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.Formulario.get('swconv')?.value){
          if(this.archnomvehconv!="Selecciona un Archivo" && this.archnomeditvehconv!="null" ){
            this.data.ActualizarArchivoConv(
              this.archfilevehconv,
              this.archnomeditvehconv
              ).subscribe(
              (resconv:any)=>{
                this.resconv.convenioAfiliacion=resconv.archivoConvenio;
                this.porcentaje+=5;
                this.completarSolicitud();
              },
              err => {
                console.log(err);
              }
            )
          }else if(this.archnomvehconv!="Selecciona un Archivo" && this.archnomeditvehconv=="null"){
            this.LoginService.subirArchivoConv(
              this.archfilevehconv
              ).subscribe(
              (resconv:any)=>{
                this.resconv.convenioAfiliacion=resconv.convenioAfiliacion;
                this.porcentaje+=5;
                this.completarSolicitud();
              });
          }else{
            this.porcentaje+=5;
            this.completarSolicitud();
          }
          
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehTO[0]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoTO(
            this.archfilevehTO[0],
            this.archnomeditvehTO[0]
          ).subscribe(
            (resTO:any)=>{
              this.resTO.tarjetaOperacionUnoAfiliacion=resTO.archivoTarjetaOperacion;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehTO[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoTO(
            this.archfilevehTO[1],
            this.archnomeditvehTO[1]
          ).subscribe(
            (resTO:any)=>{
              this.resTO.tarjetaOperacionDosAfiliacion=resTO.archivoTarjetaOperacion;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehSOAT!="Selecciona un Archivo"){
          this.data.ActualizarArchivoSOAT(
            this.archfilevehSOAT,
            this.archnomeditvehSOAT
          ).subscribe(
            (resSOAT:any)=>{
              this.resSOAT.soatAfiliacion=resSOAT.archivoSoat;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehTM!="Selecciona un Archivo"){
          this.data.ActualizarArchivoTM(
            this.archfilevehTM,
            this.archnomeditvehTM
          ).subscribe(
            (resTM:any)=>{
              this.resTM.tecnicomecanicaAfiliacion=resTM.archivoRevisionTecnicomecanica;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
        
        if(this.archnomvehPC!="Selecciona un Archivo"){
          this.data.ActualizarArchivoPC(
            this.archfilevehPC,
            this.archnomeditvehPC
          ).subscribe(
            (resPC:any)=>{
              this.resPC.contractualAfiliacion=resPC.archivoPolizaContractual;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehPE!="Selecciona un Archivo"){
          this.data.ActualizarArchivoPE(
            this.archfilevehPE,
            this.archnomeditvehPE
          ).subscribe(
            (resPE:any)=>{
              this.resPE.extracontractualAfiliacion=resPE.archivoPolizaExtracontractual;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehRP!="Selecciona un Archivo"){
          this.data.ActualizarArchivoRP(
            this.archfilevehRP,
            this.archnomeditvehRP
          ).subscribe(
            (resRP:any)=>{
              this.resRP.preventivaAfiliacion=resRP.archivoRevisionPreventiva;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehTP[0]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoTP(
            this.archfilevehTP[0],
            this.archnomeditvehTP[0]
          ).subscribe(
            (resTP:any)=>{
              this.resTP.tarjetaPropiedadUnoAfiliacion=resTP.archivoTarjetaPropiedad;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehTP[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoTP(
            this.archfilevehTP[1],
            this.archnomeditvehTP[1]
          ).subscribe(
            (resTP:any)=>{
              this.resTP.tarjetaPropiedadDosAfiliacion=resTP.archivoTarjetaPropiedad;
              this.completarSolicitud();
              this.porcentaje+=5;
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.Formulario.get('swcondprop')?.value){
          if(this.archnomvehLC[0]!="Selecciona un Archivo" && this.archnomeditvehLC[0]!="null"){
            this.data.ActualizarArchivoLC(
              this.archfilevehLC[0],
              this.archnomeditvehLC[0]
            ).subscribe(
              (resLC:any)=>{
                this.resLC.licenciaUnoAfiliacion=resLC.archivoLicenciaConduccion;
                this.completarSolicitud();
                this.porcentaje+=5;
              },
              err => {
                console.log(err);
              }
            )
          }else if(this.archnomvehLC[0]!="Selecciona un Archivo" && this.archnomeditvehLC[0]=="null"){
            this.LoginService.subirArchivoLC(
              this.archfilevehLC[0],
              this.archfilevehLC[1]
            ).subscribe(
              (resLC:any)=>{
                this.resLC.licenciaUnoAfiliacion=resLC.licenciaUnoAfiliacion;
                this.resLC.licenciaDosAfiliacion=resLC.licenciaDosAfiliacion;
                this.porcentaje+=5;
                this.completarSolicitud();
              });
          }else{
            this.porcentaje+=5;
            this.completarSolicitud();
          }
  
          if(this.archnomvehLC[1]!="Selecciona un Archivo" && this.archnomeditvehLC[1]!="null"){
            this.data.ActualizarArchivoLC(
              this.archfilevehLC[1],
              this.archnomeditvehLC[1]
            ).subscribe(
              (resLC:any)=>{
                this.resLC.licenciaDosAfiliacion=resLC.archivoLicenciaConduccion;
                this.completarSolicitud();
                this.porcentaje+=5;
              },
              err => {
                console.log(err);
              }
            )
          }else{
            this.porcentaje+=5;
            this.completarSolicitud();
          }
  
          
        }else{
          this.porcentaje+=10;
          this.completarSolicitud();
        }
        
  
        if(this.archnomvehCC[0]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfilevehCC[0],
            this.archnomeditvehCC[0]
          ).subscribe(
            (resCC:any)=>{
              this.resCC.documentoUnoAfiliacion=resCC.archivoCedula;
              this.porcentaje+=5;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5;
          this.completarSolicitud();
        }
  
        if(this.archnomvehCC[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfilevehCC[1],
            this.archnomeditvehCC[1]
          ).subscribe(
            (resCC:any)=>{
              this.resCC.documentoDosAfiliacion=resCC.archivoCedula;
              this.porcentaje+=5+15;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=5+15;
          this.completarSolicitud();
        }
  
      }

    }else{
      this.Formulario.markAllAsTouched();
      this.aFormGroup.markAllAsTouched();
      console.log(this.Formulario);

      
      
      if(!this.Formulario.valid || 
        !this.aFormGroup.valid 
      ){
        console.log("Campos pendientes")
        console.log(this.Formulario);
        this.alertpen=true;
      }else{
        this.LoginService.subirArchivoVeh(
          this.FileimgVehArray[0],
          this.FileimgVehArray[1],
          this.FileimgVehArray[2]
        ).subscribe(
          (resveh:any)=>{
            //console.log(resveh);
            if(this.Formulario.get('swconv')?.value){
              this.LoginService.subirArchivoTO(
                this.archfilevehTO[0],
                this.archfilevehTO[1]
              ).subscribe(
                (resTO:any)=>{
                  //console.log(resTO);
                  this.LoginService.subirArchivoSOAT(
                    this.archfilevehSOAT
                  ).subscribe(
                    (resSOAT:any)=>{
                      //console.log(resSOAT);
                      this.LoginService.subirArchivoTM(
                        this.archfilevehTM
                      ).subscribe(
                        (resTM:any)=>{
                          //console.log(resTM);
                          this.LoginService.subirArchivoPC(
                            this.archfilevehPC
                          ).subscribe(
                            (resPC:any)=>{
                              //console.log(resPC);
                              this.LoginService.subirArchivoPE(
                                this.archfilevehPE
                              ).subscribe((resPE:any)=>{
                                //console.log(resPE);
                                this.LoginService.subirArchivoRP(
                                  this.archfilevehRP
                                ).subscribe(
                                  (resRP:any)=>{
                                    //console.log(resRP);
                                    this.LoginService.subirArchivoTP(
                                      this.archfilevehTP[0],
                                      this.archfilevehTP[1]
                                    ).subscribe(
                                      (resTP:any)=>{
                                        //console.log(resTP);
                                        
                                        //console.log(resLC);
                                        this.LoginService.subirArchivoCC(
                                          this.archfilevehCC[0],
                                          this.archfilevehCC[1]
                                        ).subscribe(
                                          (resCC:any)=>{
                                            if(this.Formulario.get('swcondprop')?.value){
                                              this.LoginService.subirArchivoLC(
                                                this.archfilevehLC[0],
                                                this.archfilevehLC[1]
                                              ).subscribe(
                                                (resLC:any)=>{
                                                  console.log("////");
                                                  console.log(resveh);
                                                  //console.log(resconv);
                                                  console.log(resTO);
                                                  console.log(resSOAT);
                                                  console.log(resTM);
                                                  console.log(resPC);
                                                  console.log(resPE);
                                                  console.log(resRP);
                                                  console.log(resTP);
                                                  console.log(resLC);
                                                  console.log(resCC);
                                                  let afiliacion:AfiliacionVehiculoInterface={};
                                                  afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
                                                  afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
                                                  afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
                                                  afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
                                                  afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
                                                  afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
                                                  afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
                                                  afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
                                                  afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
                                                  afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
                                                  afiliacion.empresaConvenio=this.Formulario.get("convenio")?.value;
                                                  afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
                                                  afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
                                                  afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
                                                  afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
                                                  afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
                                                  afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
                                                  afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
                                                  afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
                                                  afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
                                                  afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
                                                  afiliacion.fotoFrenteAfiliacion=resveh.fotoFrenteAfiliacion;
                                                  afiliacion.fotoLadoAfiliacion=resveh.fotoLadoAfiliacion;
                                                  afiliacion.fotoTraseraAfiliacion=resveh.fotoTraseraAfiliacion;
                                                  //afiliacion.inicioConvenioAfiliacion=this.Formulario.get("fechainiconv")?.value;
                                                  //afiliacion.finConvenioAfiliacion=this.Formulario.get("fechafinconv")?.value;
                                                  //afiliacion.convenioAfiliacion=resconv.convenioAfiliacion;
                                                  afiliacion.tarjetaPropiedadUnoAfiliacion=resTP.tarjetaPropiedadUnoAfiliacion;
                                                  afiliacion.tarjetaPropiedadDosAfiliacion=resTP.tarjetaPropiedadDosAfiliacion;
                                                  afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
                                                  afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
                                                  afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
                                                  afiliacion.tarjetaOperacionUnoAfiliacion=resTO.tarjetaOperacionUnoAfiliacion;
                                                  afiliacion.tarjetaOperacionDosAfiliacion=resTO.tarjetaOperacionDosAfiliacion;
                                                  afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
                                                  afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
                                                  afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
                                                  afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
                                                  afiliacion.soatAfiliacion=resSOAT.soatAfiliacion;
                                                  afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
                                                  afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
                                                  afiliacion.tecnicomecanicaAfiliacion=resTM.tecnicomecanicaAfiliacion;
                                                  afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
                                                  afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
                                                  afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
                                                  afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
                                                  afiliacion.contractualAfiliacion=resPC.contractualAfiliacion;
                                                  afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
                                                  afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
                                                  afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
                                                  afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
                                                  afiliacion.extracontractualAfiliacion=resPE.extracontractualAfiliacion;
                                                  afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
                                                  afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
                                                  afiliacion.preventivaAfiliacion=resRP.preventivaAfiliacion;
                                                  afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
                                                  afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
                                                  afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
                                                  afiliacion.categoriaLicenciaAfiliacion=this.Formulario.get("catlic")?.value;
                                                  afiliacion.inicioLicenciaAfiliacion=this.Formulario.get("fechainiLC")?.value;
                                                  afiliacion.finLicenciaAfiliacion=this.Formulario.get("fechafinLC")?.value;
                                                  afiliacion.licenciaUnoAfiliacion=resLC.licenciaUnoAfiliacion;
                                                  afiliacion.licenciaDosAfiliacion=resLC.licenciaDosAfiliacion;
                                                  afiliacion.documentoUnoAfiliacion=resCC.documentoUnoAfiliacion;
                                                  afiliacion.documentoDosAfiliacion=resCC.documentoDosAfiliacion;
                                                  console.log(afiliacion);
                                                  this.LoginService.guardarafiliacion(afiliacion).subscribe(
                                                    (res:any)=>{
                                                      console.log(res);
                                                      if(res.idAfiliacion!=null){
                                                        this.ocultar=true;
                                                        this.msm="CREADO SATISFACTORIAMENTE... Puedes consultar el estado en: http://181.143.139.108:4200/vinculacion/estado/" +res.idAfiliacion;
                                                      }else{
                                                        this.ocultar=false;
                                                        this.msm=res[0].mensaje;
                                                      }
                                                    }
                                                  )
                                                }
                                              )
                                            }else{
                                              console.log("////");
                                              console.log(resveh);
                                              //console.log(resconv);
                                              console.log(resTO);
                                              console.log(resSOAT);
                                              console.log(resTM);
                                              console.log(resPC);
                                              console.log(resPE);
                                              console.log(resRP);
                                              console.log(resTP);
                                              console.log(resCC);
                                              let afiliacion:AfiliacionVehiculoInterface={};
                                              afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
                                              afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
                                              afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
                                              afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
                                              afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
                                              afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
                                              afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
                                              afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
                                              afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
                                              afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
                                              afiliacion.empresaConvenio=this.Formulario.get("convenio")?.value;
                                              afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
                                              afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
                                              afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
                                              afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
                                              afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
                                              afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
                                              afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
                                              afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
                                              afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
                                              afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
                                              afiliacion.fotoFrenteAfiliacion=resveh.fotoFrenteAfiliacion;
                                              afiliacion.fotoLadoAfiliacion=resveh.fotoLadoAfiliacion;
                                              afiliacion.fotoTraseraAfiliacion=resveh.fotoTraseraAfiliacion;
                                              //afiliacion.inicioConvenioAfiliacion=this.Formulario.get("fechainiconv")?.value;
                                              //afiliacion.finConvenioAfiliacion=this.Formulario.get("fechafinconv")?.value;
                                              //afiliacion.convenioAfiliacion=resconv.convenioAfiliacion;
                                              afiliacion.tarjetaPropiedadUnoAfiliacion=resTP.tarjetaPropiedadUnoAfiliacion;
                                              afiliacion.tarjetaPropiedadDosAfiliacion=resTP.tarjetaPropiedadDosAfiliacion;
                                              afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
                                              afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
                                              afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
                                              afiliacion.tarjetaOperacionUnoAfiliacion=resTO.tarjetaOperacionUnoAfiliacion;
                                              afiliacion.tarjetaOperacionDosAfiliacion=resTO.tarjetaOperacionDosAfiliacion;
                                              afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
                                              afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
                                              afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
                                              afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
                                              afiliacion.soatAfiliacion=resSOAT.soatAfiliacion;
                                              afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
                                              afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
                                              afiliacion.tecnicomecanicaAfiliacion=resTM.tecnicomecanicaAfiliacion;
                                              afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
                                              afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
                                              afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
                                              afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
                                              afiliacion.contractualAfiliacion=resPC.contractualAfiliacion;
                                              afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
                                              afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
                                              afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
                                              afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
                                              afiliacion.extracontractualAfiliacion=resPE.extracontractualAfiliacion;
                                              afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
                                              afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
                                              afiliacion.preventivaAfiliacion=resRP.preventivaAfiliacion;
                                              afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
                                              afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
                                              afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
                                              afiliacion.documentoUnoAfiliacion=resCC.documentoUnoAfiliacion;
                                              afiliacion.documentoDosAfiliacion=resCC.documentoDosAfiliacion;
                                              console.log(afiliacion);
                                              this.LoginService.guardarafiliacion(afiliacion).subscribe(
                                                (res:any)=>{
                                                  console.log(res);
                                                  if(res.idAfiliacion!=null){
                                                    this.ocultar=true;
                                                    this.msm="CREADO SATISFACTORIAMENTE... Puedes consultar el estado en: http://181.143.139.108:4200/vinculacion/estado/" +res.idAfiliacion;
                                                  }else{
                                                    this.ocultar=false;
                                                    this.msm=res[0].mensaje;
                                                  }
                                                }
                                              )
                                                
                                            }
                                            
                                          }
                                        )
                                      }
                                    )
                                  }
                              )
                              })
                              
                            }
                          )
                        }
                      )
                    }
                  )
                    
                }
              )
            }else{
              this.LoginService.subirArchivoTO(
                this.archfilevehTO[0],
                this.archfilevehTO[1]
              ).subscribe(
                (resTO:any)=>{
                  //console.log(resTO);
                  this.LoginService.subirArchivoSOAT(
                    this.archfilevehSOAT
                  ).subscribe(
                    (resSOAT:any)=>{
                      //console.log(resSOAT);
                      this.LoginService.subirArchivoTM(
                        this.archfilevehTM
                      ).subscribe(
                        (resTM:any)=>{
                          //console.log(resTM);
                          this.LoginService.subirArchivoPC(
                            this.archfilevehPC
                          ).subscribe(
                            (resPC:any)=>{
                              //console.log(resPC);
                              this.LoginService.subirArchivoPE(
                                this.archfilevehPE
                              ).subscribe((resPE:any)=>{
                                //console.log(resPE);
                                this.LoginService.subirArchivoRP(
                                  this.archfilevehRP
                                ).subscribe(
                                  (resRP:any)=>{
                                    //console.log(resRP);
                                    this.LoginService.subirArchivoTP(
                                      this.archfilevehTP[0],
                                      this.archfilevehTP[1]
                                    ).subscribe(
                                      (resTP:any)=>{
                                        //console.log(resTP);
                                        
                                        //console.log(resLC);
                                        this.LoginService.subirArchivoCC(
                                          this.archfilevehCC[0],
                                          this.archfilevehCC[1]
                                        ).subscribe(
                                          (resCC:any)=>{
                                            if(this.Formulario.get('swcondprop')?.value){
                                              this.LoginService.subirArchivoLC(
                                                this.archfilevehLC[0],
                                                this.archfilevehLC[1]
                                              ).subscribe(
                                                (resLC:any)=>{
                                                  console.log("////");
                                                  console.log(resveh);
                                                  console.log(resTO);
                                                  console.log(resSOAT);
                                                  console.log(resTM);
                                                  console.log(resPC);
                                                  console.log(resPE);
                                                  console.log(resRP);
                                                  console.log(resTP);
                                                  console.log(resLC);
                                                  console.log(resCC);
                                                  let afiliacion:AfiliacionVehiculoInterface={};
                                                  afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
                                                  afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
                                                  afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
                                                  afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
                                                  afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
                                                  afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
                                                  afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
                                                  afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
                                                  afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
                                                  afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
                                                  afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
                                                  afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
                                                  afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
                                                  afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
                                                  afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
                                                  afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
                                                  afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
                                                  afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
                                                  afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
                                                  afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
                                                  afiliacion.fotoFrenteAfiliacion=resveh.fotoFrenteAfiliacion;
                                                  afiliacion.fotoLadoAfiliacion=resveh.fotoLadoAfiliacion;
                                                  afiliacion.fotoTraseraAfiliacion=resveh.fotoTraseraAfiliacion;
                                                  afiliacion.tarjetaPropiedadUnoAfiliacion=resTP.tarjetaPropiedadUnoAfiliacion;
                                                  afiliacion.tarjetaPropiedadDosAfiliacion=resTP.tarjetaPropiedadDosAfiliacion;
                                                  afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
                                                  afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
                                                  afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
                                                  afiliacion.tarjetaOperacionUnoAfiliacion=resTO.tarjetaOperacionUnoAfiliacion;
                                                  afiliacion.tarjetaOperacionDosAfiliacion=resTO.tarjetaOperacionDosAfiliacion;
                                                  afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
                                                  afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
                                                  afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
                                                  afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
                                                  afiliacion.soatAfiliacion=resSOAT.soatAfiliacion;
                                                  afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
                                                  afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
                                                  afiliacion.tecnicomecanicaAfiliacion=resTM.tecnicomecanicaAfiliacion;
                                                  afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
                                                  afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
                                                  afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
                                                  afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
                                                  afiliacion.contractualAfiliacion=resPC.contractualAfiliacion;
                                                  afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
                                                  afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
                                                  afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
                                                  afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
                                                  afiliacion.extracontractualAfiliacion=resPE.extracontractualAfiliacion;
                                                  afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
                                                  afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
                                                  afiliacion.preventivaAfiliacion=resRP.preventivaAfiliacion;
                                                  afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
                                                  afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
                                                  afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
                                                  afiliacion.categoriaLicenciaAfiliacion=this.Formulario.get("catlic")?.value;
                                                  afiliacion.inicioLicenciaAfiliacion=this.Formulario.get("fechainiLC")?.value;
                                                  afiliacion.finLicenciaAfiliacion=this.Formulario.get("fechafinLC")?.value;
                                                  afiliacion.licenciaUnoAfiliacion=resLC.licenciaUnoAfiliacion;
                                                  afiliacion.licenciaDosAfiliacion=resLC.licenciaDosAfiliacion;
                                                  afiliacion.documentoUnoAfiliacion=resCC.documentoUnoAfiliacion;
                                                  afiliacion.documentoDosAfiliacion=resCC.documentoDosAfiliacion;
                                                  console.log(afiliacion);
                                                  this.LoginService.guardarafiliacion(afiliacion).subscribe(
                                                    (res:any)=>{
                                                      console.log(res);
                                                      if(res.idAfiliacion!=null){
                                                        this.ocultar=true;
                                                        this.msm="CREADO SATISFACTORIAMENTE... Puedes consultar el estado en: http://181.143.139.108:4200/vinculacion/estado/" +res.idAfiliacion;
                                                      }else{
                                                        this.ocultar=false;
                                                        this.msm=res[0].mensaje;
                                                      }
                                                    }
                                                  )
                                                }
                                              )
                                            }else{
                                              console.log("////");
                                              console.log(resveh);
                                              console.log(resTO);
                                              console.log(resSOAT);
                                              console.log(resTM);
                                              console.log(resPC);
                                              console.log(resPE);
                                              console.log(resRP);
                                              console.log(resTP);
                                              console.log(resCC);
                                              let afiliacion:AfiliacionVehiculoInterface={};
                                              afiliacion.codigoInternoAfiliacion=this.Formulario.get("codi")?.value;
                                              afiliacion.placaAfiliacion=(this.Formulario.get("placa")?.value).toUpperCase();
                                              afiliacion.pasajerosAfiliacion=parseInt(this.Formulario.get("numpas")?.value, 10);
                                              afiliacion.tipoCombustibleAfiliacion=this.Formulario.get("tipocom")?.value;
                                              afiliacion.tipoVehiculoAfiliacion=this.Formulario.get("tipoveh")?.value;
                                              afiliacion.claseVehiculoAfiliacion=this.Formulario.get("claseveh")?.value;
                                              afiliacion.marcaAfiliacion=this.Formulario.get("marcaveh")?.value;
                                              afiliacion.colorAfiliacion=this.Formulario.get("color")?.value;
                                              afiliacion.modeloAfiliacion=this.Formulario.get("modeloveh")?.value;
                                              afiliacion.cilindrajeAfiliacion=this.Formulario.get("cilindraje")?.value;
                                              afiliacion.nombreAfiliacion=this.Formulario.get("nomprop")?.value;
                                              afiliacion.apellidoAfiliacion=this.Formulario.get("apeprop")?.value;
                                              afiliacion.tipoDocAfiliacion=this.Formulario.get("tipodocprop")?.value;
                                              afiliacion.documentoAfiliacion=this.Formulario.get("numdocprop")?.value;
                                              afiliacion.correoAfiliacion=this.Formulario.get("correoprop")?.value;
                                              afiliacion.telefonoUnoAfiliacion=this.Formulario.get("tel1prop")?.value;
                                              afiliacion.telefonoDosAfiliacion=this.Formulario.get("tel2prop")?.value;
                                              afiliacion.direccionAfiliacion=this.Formulario.get("direccionprop")?.value;
                                              afiliacion.ciudadAfiliacion=this.Formulario.get("ciudadprop")?.value;
                                              afiliacion.esConductorAfiliacion=this.Formulario.get("swcondprop")?.value? 1 : 0;
                                              afiliacion.fotoFrenteAfiliacion=resveh.fotoFrenteAfiliacion;
                                              afiliacion.fotoLadoAfiliacion=resveh.fotoLadoAfiliacion;
                                              afiliacion.fotoTraseraAfiliacion=resveh.fotoTraseraAfiliacion;
                                              afiliacion.tarjetaPropiedadUnoAfiliacion=resTP.tarjetaPropiedadUnoAfiliacion;
                                              afiliacion.tarjetaPropiedadDosAfiliacion=resTP.tarjetaPropiedadDosAfiliacion;
                                              afiliacion.numeroTarjetaOperacionAfiliacion=this.Formulario.get("numTO")?.value;
                                              afiliacion.inicioTarjetaOperacionAfiliacion=this.Formulario.get("fechainiTO")?.value;
                                              afiliacion.finTarjetaOperacionAfiliacion=this.Formulario.get("fechafinTO")?.value;
                                              afiliacion.tarjetaOperacionUnoAfiliacion=resTO.tarjetaOperacionUnoAfiliacion;
                                              afiliacion.tarjetaOperacionDosAfiliacion=resTO.tarjetaOperacionDosAfiliacion;
                                              afiliacion.aseguradoraSoatAfiliacion=this.Formulario.get("aseguradoraSOAT")?.value;
                                              afiliacion.numeroSoatAfiliacion=this.Formulario.get("numSOAT")?.value;
                                              afiliacion.inicioSoatAfiliacion=this.Formulario.get("fechainiSOAT")?.value;
                                              afiliacion.finSoatAfiliacion=this.Formulario.get("fechafinSOAT")?.value;
                                              afiliacion.soatAfiliacion=resSOAT.soatAfiliacion;
                                              afiliacion.inicioTecnicomecanicaAfiliacion=this.Formulario.get("fechainiTM")?.value;
                                              afiliacion.finTecnicomecanicaAfiliacion=this.Formulario.get("fechafinTM")?.value;
                                              afiliacion.tecnicomecanicaAfiliacion=resTM.tecnicomecanicaAfiliacion;
                                              afiliacion.aseguradoraContractualAfiliacion=this.Formulario.get("aseguradoraPC")?.value;
                                              afiliacion.numeroContractualAfiliacion=this.Formulario.get("numPC")?.value;
                                              afiliacion.inicioContractualAfiliacion=this.Formulario.get("fechainiPC")?.value;
                                              afiliacion.finContractualAfiliacion=this.Formulario.get("fechafinPC")?.value;
                                              afiliacion.contractualAfiliacion=resPC.contractualAfiliacion;
                                              afiliacion.aseguradoraExtracontractualAfiliacion=this.Formulario.get("aseguradoraPE")?.value;
                                              afiliacion.numeroExtracontractualAfiliacion=this.Formulario.get("numPE")?.value;
                                              afiliacion.inicioExtracontractualAfiliacion=this.Formulario.get("fechainiPE")?.value;
                                              afiliacion.finExtracontractualAfiliacion=this.Formulario.get("fechafinPE")?.value;
                                              afiliacion.extracontractualAfiliacion=resPE.extracontractualAfiliacion;
                                              afiliacion.inicioPreventivaAfiliacion=this.Formulario.get("fechainiRP")?.value;
                                              afiliacion.finPreventivaAfiliacion=this.Formulario.get("fechafinRP")?.value;
                                              afiliacion.preventivaAfiliacion=resRP.preventivaAfiliacion;
                                              afiliacion.numeroMotorAfiliacion=this.Formulario.get("numeroMotor")?.value;
                                              afiliacion.numeroChasisAfiliacion=this.Formulario.get("numeroChasis")?.value;
                                              afiliacion.numeroVinAfiliacion=this.Formulario.get("numeroVin")?.value;
                                              afiliacion.documentoUnoAfiliacion=resCC.documentoUnoAfiliacion;
                                              afiliacion.documentoDosAfiliacion=resCC.documentoDosAfiliacion;
                                              console.log(afiliacion);
                                              this.LoginService.guardarafiliacion(afiliacion).subscribe(
                                                (res:any)=>{
                                                  console.log(res);
                                                  if(res.idAfiliacion!=null){
                                                    this.ocultar=true;
                                                    this.msm="CREADO SATISFACTORIAMENTE... Puedes consultar el estado en: http://181.143.139.108:4200/vinculacion/estado/" +res.idAfiliacion;
                                                  }else{
                                                    this.ocultar=false;
                                                    this.msm=res[0].mensaje;
                                                  }
                                                }
                                              )
                                            }
                                            
                                          }
                                        )
                                      }
                                    )
                                  }
                              )
                              })
                              
                            }
                          )
                        }
                      )
                    }
                  )
                    
                }
              )
            }
            
            
          },
          err => {
            console.log(err);
          }
        ) ;
      }
      

    }
  }
  
  /**
   * Checkea que todas las fechas finales sean  mayores  a las iniciales, recuerde que hay dos tipos de validadores los validadres universales que piden un FormGroup o
   * o los validadores unicos, que piden un AbstractControl  que sirven para validar un unico espacio.
   */
  checkFech: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var res:any={};
    
    //group.controls['fechafinEXT'].updateValueAndValidity({emitEvent:false, onlySelf:true});//Actualiza los validadores a implementar segun le control.
    //res.convfec=true;
    if(new Date(group.controls.fechainiTO.value)>new Date(group.controls.fechafinTO.value)){
      group.controls['fechafinTO'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinTO'].setValidators([Validators.required]);
      group.controls['fechafinTO'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    //console.log(group.controls.fechafinTO.errors);
    //res.tofec=true;
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
    if(new Date(group.controls.fechainiRP.value)>new Date(group.controls.fechafinRP.value)){
      group.controls['fechafinRP'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinRP'].setValidators([Validators.required]);
      group.controls['fechafinRP'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    /*if(new Date(group.controls.fechainiEXT.value)>new Date(group.controls.fechafinEXT.value)){
      group.controls['fechafinEXT'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinEXT'].setValidators([Validators.required]);
      group.controls['fechafinEXT'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }*/
    if( res.convfec || res.tofec || res.soatfec ||
     res.TMfec || res.PCfec || res.PEfec ||
     res.RPfec || res.EXTfec || res.LCfec ){
      
      return res;
    }else{
      
      return null;
    }
  }

 
  /**
   * Checkea los controles resepcto a la licencia, para verificar si son obligatorios o no, ademas de checkear que la fechas final de la licencia sea  mayor  a la inicial,
   * Estos validadores siempre retornaran null, ya que se necesita que todo aparesca segun los controles, y no aparescan alerts. 
   */
  checkLic: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var vrfconv= group.controls.swcondprop.value;
    var fi=group.controls.fechainiLC.value;
    var ff=group.controls.fechafinLC.value;
    let resf:any={};
    if(this.edit){
      if(vrfconv){
        group.controls['catlic'].setValidators([Validators.required]);
        group.controls['catlic'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiLC'].setValidators([Validators.required]);
        group.controls['fechainiLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinLC'].setValidators([Validators.required]);
        group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        if(this.archnomeditvehLC[0]!="null"){
          group.controls['archLC'].setValidators([this.validarch]);
          group.controls['archLC1'].setValidators([this.validarch]);

        }else{
          group.controls['archLC'].setValidators([Validators.required,this.validarch]);
          group.controls['archLC1'].setValidators([Validators.required,this.validarch]);
        }
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
  
        if(fi!="" && ff!=""){
          var qff=new Date(ff);
          var qfi=new Date(fi);
          if(qff<qfi){
            group.controls['fechafinLC'].setErrors({checkfech:true})
          }else{
            group.controls['fechafinLC'].setValidators([Validators.required]);
            group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
          }
        }
      }else{  
        group.controls['catlic'].clearValidators();
        group.controls['catlic'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiLC'].clearValidators();
        group.controls['fechainiLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinLC'].clearValidators();
        group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC'].clearValidators();
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC1'].clearValidators();
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }else{
      if(vrfconv){
        group.controls['catlic'].setValidators([Validators.required]);
        group.controls['catlic'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiLC'].setValidators([Validators.required]);
        group.controls['fechainiLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinLC'].setValidators([Validators.required]);
        group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC1'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
  
        if(fi!="" && ff!=""){
          var qff=new Date(ff);
          var qfi=new Date(fi);
          if(qff<qfi){
            group.controls['fechafinLC'].setErrors({checkfech:true})
          }else{
            group.controls['fechafinLC'].setValidators([Validators.required]);
            group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
          }
        }
      }else{  
        group.controls['catlic'].clearValidators();
        group.controls['catlic'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiLC'].clearValidators();
        group.controls['fechainiLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinLC'].clearValidators();
        group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC'].clearValidators();
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC1'].clearValidators();
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }

    if( resf.checkfech){
      
      return resf;
    }else{
      
      return null;
    }
    
  }

  /**
   * Checkea los controles respecto al convenio, si dice que si en crear solo pedira a que empresa pertenece, de lo contrario en editar pide todos los espacios,
   * este tambien retorna null, solo medifica los controles
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
        group.controls['convenio'].clearValidators();//Limpia los validadores con respecto al control abstracto
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].clearValidators();
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].clearValidators();
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archconv'].clearValidators();
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }else{
      if(vrfconv){
        group.controls['convenio'].setValidators([Validators.required]);
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }else{  
        group.controls['convenio'].clearValidators();
        group.controls['convenio'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechainiconv'].clearValidators();
        group.controls['fechainiconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinconv'].clearValidators();
        group.controls['fechafinconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archconv'].clearValidators();
        group.controls['archconv'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }
    

    if( resf.checkfech ){
      
      return resf;
    }else{
      
      return null;
    }
    
  }

  /**
   * Este validador se aplica a un unico control dentro del FormGroup, este solo valida que el telefono sea de determinada longitud 
   * @param ctrl recibe el control a comprobar
   */
  validtel(ctrl: AbstractControl): ValidationErrors  | null {
    console.log(ctrl.get("color")) ;
    if(ctrl.value.length==0 ||ctrl.value.length==7 || ctrl.value.length==10){
      return null;

    }else{
      return {nottel:true};
    }
  }

  /**
   * Este validador se aplica a un unico control dentro del FormGroup, este solo valida que el archivo se valido de lo contrario, saltara error
   * @param ctrl recibe el control a comprobar
   */
  validarch(ctrl: AbstractControl): ValidationErrors  | null {
    //console.log(ctrl.value) ;
    var path = ctrl.value;
    if(ctrl.value!=undefined){
      var path_splitted = path.split('.');
      var extension = path_splitted.pop();
      var ext=extension.toLowerCase();
      //console.log(extension.toLowerCase()) ;
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
   * Este validador se aplica a un unico control dentro del FormGroup, este solo valida que la placa sea unica de lo contrario, saltara error, recuerde que este validador es 
   * asincorno y este no permite hacer un console log
   * @param ctrl recibe el control a comprobar
   */
  validate(
    ctrl: AbstractControl
  ):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log(ctrl.value);
    var est=false;
    return this.data.ObtenerPlaca().pipe(map(data=>(
      data.findIndex(element=>(element.placaVehiculo).toUpperCase()==(ctrl.value).toUpperCase())!=-1
      ?
      { uniquePlaca: true } : null
    )),
    catchError(()=>of(null)));
    /** .subscribe((placas:Array<any>) => {
      this.listplaca = placas;
      if((placas.findIndex(element=>(element.placaVehiculo).toUpperCase()==(ctrl.value).toUpperCase()))!=-1){
        console.log(123)
        est=true;
        return est ? { uniquePlaca: true } : null;
      }else{
        est=false;
        return est ? { uniquePlaca: true } : null;
      };
    });*/
    //return est ? { uniquePlaca: true } : null;
    
  }

  /**
   * Este validador se aplica a un unico control dentro del FormGroup, este solo valida que el numero de documento sea unico de lo contrario, saltara error, recuerde que este validador es 
   * asincorno y este no permite hacer un console log
   * @param ctrl recibe el control a comprobar
   */
  validateP(
    ctrl: AbstractControl
  ):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log(ctrl.value);
    var est=false;
    return this.data.ObtenerCedulas().pipe(map(data=>(
      data.findIndex(element=>(element.documentoPersona).toUpperCase()==(ctrl.value).toUpperCase())!=-1
      ?
      { uniqueDoc: true } : null
    )),
    catchError(()=>of(null)));
    /** 
     * .findIndex(element=>(element.documentoPersona).toUpperCase()==this.Formulario.get("numdocprop")?.value)
     * this.data
      .ObtenerCedulas()
      .subscribe((cedulas:Array<any>) => {
        this.listidenty = cedulas;
        console.log(this.listidenty)
        this.statusidenty();
      });*/
    //return est ? { uniquePlaca: true } : null;
    
  }
  

}
