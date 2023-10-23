import { CentralService } from 'src/app/services/central.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Propietario } from 'src/app/models/propietario';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  alertpen=false;
  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  iduser:number;
  tipodocs:any;
  tiporh:any;
  tipogenero:any;
  tipocaja:any;
  tipofondo:any;
  tipoeps:any;
  tipoarl:any;
  tipoestadoc:any;
  categorialicveh:any;
  selectnoCondArray:Array<any>;
  noCondArray:Array<any>;
  docuno="";
  docdos="";
  fotoper="";
  idpersona:number;
  idcond:number;
  archnomCC:Array<string>=[];
  archnomeditvehLC:Array<string>=[];
  archnomvehLC:Array<string>=[];
  archfilevehLC:Array<File>=[];
  archalertvehLC:Array<boolean>=[];
  archfileCC:Array<File>=[];
  archalertCC:Array<boolean>=[];
  antExMed:string;
  archnomExMed:string;
  archfileExMed:File;
  archalertExMed:boolean;
  antPlanApo:string;
  archnomPlanApo:string;
  archfilePlanApo:File;
  archalertPlanApo:boolean;
  porcentaje: number;
  resCC:any;
  resExMed:any;
  resPlan:any;
  resLC:any;
  resedit:any;
  param: string;
  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.porcentaje=0;
    this.edit=false;
    this.view=false;
    this.iduser=-1;
    this.idpersona=-1;
    this.idcond=-1;
    this.selectnoCondArray=[];
    this.noCondArray=[];
    this.tipodocs=[];
    this.tiporh=[];
    this.tipogenero=[];
    this.tipocaja=[];
    this.tipofondo=[];
    this.tipoeps=[];
    this.tipoarl=[];
    this.tipoestadoc=[];
    this.categorialicveh=[];
    this.resCC={};
    this.resExMed={};
    this.resPlan={};
    this.resedit={};
    this.Formulario = new FormGroup({
      swest:new FormControl(false),
      cond:new FormControl( '',{validators:[Validators.required,this.validatePT.bind(this)]}),
      nomcond:new FormControl( ''),
      apecond:new FormControl( ''),
      tipodoccond:new FormControl( {value:'',disabled:true}),
      numdoccond:new FormControl( ''),
      correocond:new FormControl( ''),
      tel1cond:new FormControl( ''),
      tel2cond:new FormControl( ''),
      direccioncond:new FormControl( ''),
      ciudadcond:new FormControl( ''),
      fechaN:new FormControl( ''),
      ciudadecond:new FormControl( ''),
      idioma:new FormControl( ''),
      usucuenta:new FormControl( ''),
      fechaR:new FormControl( ''),
      fechaA:new FormControl( ''),
      archCC:new FormControl( '',[this.validarch]),
      archCC1:new FormControl( '',[this.validarch]),
      archEx:new FormControl( '',[Validators.required,this.validarch]),
      archPlan:new FormControl( '',[Validators.required,this.validarch]),
      //
      rh:new FormControl( null,[Validators.required]),
      genero:new FormControl( null,[Validators.required]),
      catlic:new FormControl( null,[Validators.required]),
      fechainiLC:new FormControl( '',[Validators.required]),
      fechafinLC:new FormControl( '',[Validators.required]),
      archLC:new FormControl( '',[Validators.required,this.validarch]),
      archLC1:new FormControl( '',[Validators.required,this.validarch]),
      inicioEpsConductor:new FormControl( '',[Validators.required]),
      finEpsConductor:new FormControl( '',[Validators.required]),
      inicioArlConductor:new FormControl( '',[Validators.required]),
      finArlConductor:new FormControl( '',[Validators.required]),
      cajaCompensacion:new FormControl( null,[Validators.required]),
      fondoPensiones:new FormControl( null,[Validators.required]),
      eps:new FormControl( null,[Validators.required]),
      arl:new FormControl( null,[Validators.required]),
      estadoCivil:new FormControl( null,[Validators.required]),
    },{
      validators:[this.checkArch.bind(this),this.checkFech.bind(this)]
    })
    this.archnomCC.push("Selecciona un Archivo");
    this.archnomCC.push("Selecciona un Archivo");
    this.archfileCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfileCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archalertCC.push(false);
    this.archalertCC.push(false);
    this.antExMed="";
    this.archnomExMed="Selecciona un Archivo";
    this.archfileExMed=new File(["foo"], "Imagen", {
      type:"text/plain",
    });
    this.archalertExMed=false;
    this.antPlanApo="";
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
    this.archnomeditvehLC.push("");
    this.archnomeditvehLC.push("");
    this.archnomPlanApo="Selecciona un Archivo";
    this.archfilePlanApo=new File(["foo"], "Imagen", {
      type:"text/plain",
    });
    this.archalertPlanApo=false;
    this.obtenerUsuarios();
    this.obtenerTipoDoc();
    this.obtenerRH();
    this.obtenerGenero();
    this.obtenerCaja();
    this.obtenerEPS();
    this.obtenerARL();
    this.obtenerEstadoC();
    this.obtenerPensiones();
    this.obtenerCategoria();
  }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,6)==="editar"){
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.Formulario.get("cond")?.setValidators([this.validatePT.bind(this)]);
      this.Formulario.get("cond")?.updateValueAndValidity();
      this.data.obtenerConductor(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          
          this.resedit={}
          
          this.resedit=res;
          this.idcond=res.idConductor;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          console.log(this.resCC);
          this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
          this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
          //Guaarda para que despues se pueda descargar.
          this.archnomeditvehLC[0]=""+res.licenciaList[res.licenciaList.length-1]?.documentoUnoLicencia;
          this.archnomeditvehLC[1]=""+res.licenciaList[res.licenciaList.length-1]?.documentoDosLicencia;
          //Guarda el cuerpo para respetar la misma estructura que responde en el servicio de subida. (ESto se hace en dado caso que se decida dejar de reemplazar el mismo nombre y crearlo con diferentes nombres, este es el que se modifica cuando se actualiza).
          this.resLC={
            licenciaUnoAfiliacion:res.licenciaList[res.licenciaList.length]>0?res.licenciaList[res.licenciaList.length-1].documentoUnoLicencia:null, 
            licenciaDosAfiliacion:res.licenciaList[res.licenciaList.length]>0?res.licenciaList[res.licenciaList.length-1].documentoDosLicencia:null 
          };
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoConductor==1?true:false,
            nomcond:res.persona.nombrePersona,
            apecond:res.persona.apellidoPersona,
            tipodoccond:res.persona.tipoDocPersona,
            numdoccond:res.persona.documentoPersona,
            correocond:res.persona.correoPersona,
            tel1cond:res.persona.celularUnoPersona,
            tel2cond:res.persona.celularDosPersona,
            direccioncond:res.persona.direccionPersona,
            ciudadcond:res.persona.ciudadPersona.ciudad,
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadecond:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroConductor!=null?res.fechaRegistroConductor.substr(0,10):"",
            fechaA:res.fechaActualizacionConductor!=null?res.fechaActualizacionConductor.substr(0,10):"",
            
            rh:res.rhConductor!=null?res.rhConductor:null,
            genero:res.generoConductor,
            inicioEpsConductor:res.inicioEpsConductor!=null?res.inicioEpsConductor.substr(0,10):"",
            finEpsConductor:res.finEpsConductor!=null?res.finEpsConductor.substr(0,10):"",
            inicioArlConductor:res.inicioArlConductor!=null?res.inicioArlConductor.substr(0,10):"",
            finArlConductor:res.finArlConductor!=null?res.finArlConductor.substr(0,10):"",
            fechainiLC:res.licenciaList.length>0 ?res.licenciaList[res.licenciaList.length-1]?.fechaExpedicionLicencia?.substr(0,10):"",
            fechafinLC:res.licenciaList.length>0?res.licenciaList[res.licenciaList.length-1]?.fechaVencimientoLicencia?.substr(0,10):"",
            catlic:res.licenciaList.length>0?res.licenciaList[res.licenciaList.length-1]?.categoriaLicencia:"",
            cajaCompensacion:res.cajaCompensacion!=null?res.cajaCompensacion.idCajaCompensacion:"",
            fondoPensiones:res.fondoPensiones!=null?res.fondoPensiones.idFondoPensiones:null,
            eps:res.eps!=null?res.eps.idEps:null,
            arl:res.arl!=null?res.arl.idArl:null,
            estadoCivil:res.estadoCivil!=null?res.estadoCivil.idEstadoCivil:null,
          });
          console.log(res.licenciaList[res.licenciaList.length]>0);
          this.antExMed=res.examenesMedicosConductor!=null?res.examenesMedicosConductor:"";
          this.antPlanApo=res.planillaAportesConductor!=null?res.planillaAportesConductor:"";
      })
    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerConductor(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          
          this.resedit={}
          
          this.resedit=res;
          this.idcond=res.idConductor;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          console.log(this.resCC);
          this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
          this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
          this.archnomeditvehLC[0]=""+res.licenciaList[res.licenciaList.length-1].documentoUnoLicencia;
          this.archnomeditvehLC[1]=""+res.licenciaList[res.licenciaList.length-1].documentoDosLicencia;
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoConductor==1?true:false,
            nomcond:res.persona.nombrePersona,
            apecond:res.persona.apellidoPersona,
            tipodoccond:res.persona.tipoDocPersona,
            numdoccond:res.persona.documentoPersona,
            correocond:res.persona.correoPersona,
            tel1cond:res.persona.celularUnoPersona,
            tel2cond:res.persona.celularDosPersona,
            direccioncond:res.persona.direccionPersona,
            ciudadcond:res.persona.ciudadPersona.ciudad,
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadecond:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroConductor!=null?res.fechaRegistroConductor.substr(0,10):"",
            fechaA:res.fechaActualizacionConductor!=null?res.fechaActualizacionConductor.substr(0,10):"",
            
            rh:res.rhConductor!=null?res.rhConductor:null,
            genero:res.generoConductor,
            inicioEpsConductor:res.inicioEpsConductor!=null?res.inicioEpsConductor.substr(0,10):"",
            finEpsConductor:res.finEpsConductor!=null?res.finEpsConductor.substr(0,10):"",
            inicioArlConductor:res.inicioArlConductor!=null?res.inicioArlConductor.substr(0,10):"",
            finArlConductor:res.finArlConductor!=null?res.finArlConductor.substr(0,10):"",
            fechainiLC:res.licenciaList[res.licenciaList.length]>0 ?res.licenciaList[res.licenciaList.length-1].fechaExpedicionLicencia?.substr(0,10):"",
            fechafinLC:res.licenciaList[res.licenciaList.length]>0?res.licenciaList[res.licenciaList.length-1].fechaVencimientoLicencia?.substr(0,10):"",
            cajaCompensacion:res.cajaCompensacion!=null?res.cajaCompensacion.idCajaCompensacion:"",
            fondoPensiones:res.fondoPensiones!=null?res.fondoPensiones.idFondoPensiones:null,
            eps:res.eps!=null?res.eps.idEps:null,
            arl:res.arl!=null?res.arl.idArl:null,
            estadoCivil:res.estadoCivil!=null?res.estadoCivil.idEstadoCivil:null,
          });
          this.antExMed=res.examenesMedicosConductor;
          this.antPlanApo=res.planillaAportesConductor;
          this.Formulario.disable();
      })
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
   * Muetra la foto en una nueva pestaña
   * @param {string} nom Nombre de la foto que se va consultar.
   */
   downloadVehLC(nom:string){
    this.data.obtenerImagenVehLC(nom);
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
   * Obtener usuarios a convertir en conductores.
   */
  obtenerUsuarios():void{
    this.data.obtenerNoCond()
    .subscribe(
      (usu:Array<any>) => {
        this.noCondArray=usu;
        console.log(this.noCondArray);
      },
      err=>{
        console.log(err);
        this.noCondArray=[
            {
                "apellidoPersona": "Diaz",
                "documentoPersona": "1826325478",
                "nombrePersona": "Ignacio",
                "idPersona": 3
            }
        ]
        console.log(this.noCondArray);
      }
      );
  }
  
  /**
   * Obtener los Tipos de Documentos.
   */
  obtenerTipoDoc():void{
    this.tipodocs.push({id:"CC",value:"Cedula de Ciudadania"});
    this.tipodocs.push({id:"TI",value:"Tajeta de Identidad"});
    this.tipodocs.push({id:"CE",value:"Cedula de Extranjeria"});
  }

  /**
   * Obetner los tipos de RH.
   */
  obtenerRH():void{
    this.tiporh.push({id:"+O",value:"+O"});
    this.tiporh.push({id:"-O",value:"-O"});
    this.tiporh.push({id:"+A",value:"+A"});
    this.tiporh.push({id:"-A",value:"-A"});
    this.tiporh.push({id:"+AB",value:"+AB"});
    this.tiporh.push({id:"-AB",value:"-AB"});
  }

  /**
   * Obtener el genero.
   */
  obtenerGenero():void{
    
    this.tipogenero.push({id:"MASCULINO",value:"MASCULINO"});
    this.tipogenero.push({id:"FEMENINO",value:"FEMENINO"});
    this.tipogenero.push({id:"OTRO",value:"OTRO"});
  }

  /**
   * Obtener las Cajas de Compensación
   */
  obtenerCaja():void{
    this.data
      .obtenerCajaCompensacion()
      .subscribe((res:any) => {
        this.tipocaja = res;
        console.log(res);
      });
  }


  /**
   * Obtener las EPSs
   */
  obtenerEPS():void{
    this.data
      .obtenerEPS()
      .subscribe((res:any) => {
        this.tipoeps = res;
        console.log(res);
      });
  }

  /**
   * Obtener las Arls
   */
  obtenerARL():void{
    this.data
      .obtenerARL()
      .subscribe((res:any) => {
        this.tipoarl = res;
        console.log(res);
      });
  }

  /**
   * Obtener los tipos de estados civiles
   */
  obtenerEstadoC():void{
    this.data
      .obtenerEstadoCivil()
      .subscribe((res:any) => {
        this.tipoestadoc = res;
        console.log(res);
      });
  }

  /**
   * Obtener los Fondos de Pensiones
   */
  obtenerPensiones():void{
    this.data
      .obtenerFondoPension()
      .subscribe((res:any) => {
        this.tipofondo = res;
        console.log(res);
      });
  }

  /**
   * Detecta el cambio de los archivos de cedula, para luego guardar el archivo en su respectiva pocision, para luego subirlo
   * @param element Evento que se recive cuando cambio el control
   * @param nom Pocision de el array de Files a modificar.
   */
  cambioCC(element:any,nom:number){
    if(element.target.files[0]!==undefined){

        this.archfileCC[nom]=element.target.files[0];
        this.archnomCC[nom]=element.target.files[0].name;
        this.archalertCC[nom]=false;
    }else{
      this.archnomCC[nom]="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el cambio de los Examenes Medicos, para luego guardar el archivo y luego subirlo
   * @param element 
   */
  cambioExMed(element:any){
    if(element.target.files[0]!==undefined){
        this.archfileExMed=element.target.files[0];
        this.archnomExMed=element.target.files[0].name;
        this.archalertExMed=false;
    }else{
      this.archnomExMed="Selecciona un Archivo";
    }
  }

  /**
   * Detecta el Cambio de Planilla de Aportes para luego guardar el archivo y subirlo
   * @param element 
   */
  cambioPlanApo(element:any){
    if(element.target.files[0]!==undefined){

        this.archfilePlanApo=element.target.files[0];
        this.archnomPlanApo=element.target.files[0].name;
        this.archalertPlanApo=false;
    }else{
      this.archnomPlanApo="Selecciona un Archivo";
    }
  }
/**
 * Filtrar los no conductores para asi convertirlos.
 */
  filtrarCond():void{
    this.selectnoCondArray=[];
    for(var i=0;i<this.noCondArray.length;i++){
      this.selectnoCondArray.push(this.noCondArray[i]);
    }
    //console.log(this.selectnoCondArray);
    //console.log(this.noCondArray);
    var filtro=(""+this.Formulario.get("cond")?.value).toUpperCase();
    if(this.noCondArray.length>0){
      let prop = this.selectnoCondArray.filter(usuario=> usuario.documentoPersona.includes(filtro) || ((usuario.nombrePersona).toUpperCase()).includes(filtro) || ((usuario.apellidoPersona).toUpperCase()).includes(filtro ) || ((usuario.apellidoPersona).toUpperCase()+' '+(usuario.nombrePersona).toUpperCase()).includes(filtro ) || ((usuario.nombrePersona+' '+usuario.apellidoPersona).toUpperCase()).includes(filtro ));
      this.selectnoCondArray=prop;
      if(prop.length>6){
        this.selectnoCondArray.length=6;
      }
    }else{
      this.selectnoCondArray=[];
    }
    
  }
  /**
   * Segun a quien haya decidido convertir en conductor se modificara la información para luego visualizarla al usuario Final
   * @param id Id al cual se va a convertir en Conductor
   */
  elegirCond(id:number){
    this.resCC={};
    this.iduser=id;
    this.data.obtenerPersona(""+id).subscribe(
      (res:any)=>{
        console.log(res)
        this.idpersona=res.persona.idPersona;
        this.docuno=res.persona.documentoUnoPersona;
        this.docdos=res.persona.documentoDosPersona;
        console.log(this.resCC);
        console.log(this.docuno)
        this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
        this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
        this.fotoper=res.persona.fotoPersona;
        this.Formulario.patchValue({
          nomcond:res.persona.nombrePersona,
          apecond:res.persona.apellidoPersona,
          tipodoccond:res.persona.tipoDocPersona,
          numdoccond:res.persona.documentoPersona,
          correocond:res.persona.correoPersona,
          tel1cond:res.persona.celularUnoPersona,
          tel2cond:res.persona.celularDosPersona,
          direccioncond:res.persona.direccionPersona,
          ciudadcond:res.persona.ciudadPersona.ciudad,
          fechaN:res.persona.fechaNacimientoPersona.substr(0,10),
          ciudadecond:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
          idioma:res.persona.idioma.idioma,
          usucuenta:res.cuenta.usuarioCuenta,
          fechaR:res.cuenta.fechaRegistroCuenta!=null?res.cuenta.fechaRegistroCuenta.substr(0,10):"",
          fechaA:res.cuenta.fechaActualizacionCuenta!=null?res.cuenta.fechaActualizacionCuenta.substr(0,10):"",
        });
        this.reestablecer();
      })
    
  }

  /**
   * Reestablece los datos del propietario a convertir
   */
  reestablecer(){
    console.log(this.Formulario.get("cond")?.value);
    console.log(this.iduser);
    this.Formulario.get("cond")?.setValue((this.noCondArray.find(element =>element.idPersona==this.iduser))?.documentoPersona);
    this.filtrarCond();
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadCC(nom:string){
    this.data.obtenerImagenVehCC(nom);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadEx(nom:string){
    this.data.obtenerImagenExMedicos(nom);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadPlan(nom:string){
    this.data.obtenerImagenPlAportes(nom);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadFoto(nom:string){
    this.data.obtenerImagenVehFoto(nom);
  }

  /**
   * Si es Edit actualiza el registro sino lo crea, dependiendo si ya termino de subir los archivos respectivos, esto lo detecta si porcentaje es igual a 100.
   */
  completarSolicitud():void{
    if(this.edit==false){
      if(this.porcentaje==100){
        let resp:any;
        resp={};
        console.log(this.resPlan);
        console.log(this.resExMed);
        resp.conductor={};
        resp.conductor.planillaAportesConductor=this.resPlan.planillaAportes;
        resp.conductor.examenesMedicosConductor=this.resExMed.examenesMedicos;
        resp.conductor.persona={};
        resp.conductor.persona.idPersona=this.idpersona;
        resp.conductor.persona.documentoUnoPersona=this.resCC.documentoUnoPersona;
        resp.conductor.persona.documentoDosPersona=this.resCC.documentoDosPersona;
        resp.conductor.rhConductor=this.Formulario.get("rh")?.value;
        resp.conductor.generoConductor =this.Formulario.get("genero")?.value;
        resp.conductor.inicioEpsConductor =this.Formulario.get("inicioEpsConductor")?.value;
        resp.conductor.finEpsConductor =this.Formulario.get("finEpsConductor")?.value;
        resp.conductor.inicioArlConductor =this.Formulario.get("inicioArlConductor")?.value;
        resp.conductor.finArlConductor =this.Formulario.get("finArlConductor")?.value;
        resp.conductor.cajaCompensacion={};
        resp.conductor.cajaCompensacion.idCajaCompensacion =this.Formulario.get("cajaCompensacion")?.value;
        resp.conductor.fondoPensiones={};
        resp.conductor.fondoPensiones.idFondoPensiones =this.Formulario.get("fondoPensiones")?.value;
        resp.conductor.eps={};
        resp.conductor.eps.idEps =this.Formulario.get("eps")?.value;
        resp.conductor.arl={};
        resp.conductor.arl.idArl =this.Formulario.get("arl")?.value;
        resp.conductor.estadoCivil={};
        resp.conductor.estadoCivil.idEstadoCivil =this.Formulario.get("estadoCivil")?.value;
        resp.licencia={};
        resp.licencia.fechaExpedicionLicencia=this.Formulario.get("fechainiLC")?.value;
        resp.licencia.fechaVencimientoLicencia=this.Formulario.get("fechafinLC")?.value;
        resp.licencia.categoriaLicencia=this.Formulario.get("catlic")?.value;
        resp.licencia.numeroLicencia=this.Formulario.get("numdoccond")?.value;
        resp.licencia.documentoUnoLicencia=this.resLC.licenciaUnoAfiliacion;//OJO ACA ES COMO USTED ME RESPONDE EL DE SUBIR ARCHIVOS, ACA NO ES COMO USTED DIGA, ES COMO ME RESPONDE EN EL SERVICIO
        resp.licencia.documentoDosLicencia=this.resLC.licenciaDosAfiliacion;//OJO ACA ES COMO USTED ME RESPONDE EL DE SUBIR ARCHIVOS, ACA NO ES COMO USTED DIGA, ES COMO ME RESPONDE EN EL SERVICIO
        console.log(resp);
        this.data.crearCond(resp).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"CONVERTIDO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        })
      }
    }else{
      if(this.porcentaje==100){
        let resp:any;
        console.log(this.resPlan);
        console.log(this.resExMed);
        resp={};
        resp.conductor={};
        resp.conductor.idConductor=this.idcond;
        resp.conductor.estadoConductor=this.Formulario.get("swest")?.value?1:0;
        resp.conductor.planillaAportesConductor=this.resPlan.planillaAportes;
        resp.conductor.examenesMedicosConductor=this.resExMed.examenesMedicos;
        resp.conductor.persona={};
        resp.conductor.persona.idPersona=this.resedit.persona.idPersona;
        resp.conductor.persona.documentoUnoPersona=this.resCC.documentoUnoPersona;
        resp.conductor.persona.documentoDosPersona=this.resCC.documentoDosPersona;
        resp.conductor.rhConductor=this.Formulario.get("rh")?.value;
        resp.conductor.generoConductor =this.Formulario.get("genero")?.value;
        resp.conductor.inicioEpsConductor =this.Formulario.get("inicioEpsConductor")?.value;
        resp.conductor.finEpsConductor =this.Formulario.get("finEpsConductor")?.value;
        resp.conductor.inicioArlConductor =this.Formulario.get("inicioArlConductor")?.value;
        resp.conductor.finArlConductor =this.Formulario.get("finArlConductor")?.value;
        resp.conductor.cajaCompensacion={};
        resp.conductor.cajaCompensacion.idCajaCompensacion =this.Formulario.get("cajaCompensacion")?.value;
        resp.conductor.fondoPensiones={};
        resp.conductor.fondoPensiones.idFondoPensiones =this.Formulario.get("fondoPensiones")?.value;
        resp.conductor.eps={};
        resp.conductor.eps.idEps =this.Formulario.get("eps")?.value;
        resp.conductor.arl={};
        resp.conductor.arl.idArl =this.Formulario.get("arl")?.value;
        resp.conductor.estadoCivil={};
        resp.conductor.estadoCivil.idEstadoCivil =this.Formulario.get("estadoCivil")?.value;
        resp.licencia={};
        resp.licencia.idLicencia=this.resedit.licenciaList[this.resedit.licenciaList.length-1]?.idLicencia;
        resp.licencia.fechaExpedicionLicencia=this.Formulario.get("fechainiLC")?.value;
        resp.licencia.fechaVencimientoLicencia=this.Formulario.get("fechafinLC")?.value;
        resp.licencia.categoriaLicencia=this.Formulario.get("catlic")?.value;
        resp.licencia.numeroLicencia=this.Formulario.get("numdoccond")?.value;
        resp.licencia.documentoUnoLicencia=this.resLC.licenciaUnoAfiliacion;//ACA ES LO MISMO
        resp.licencia.documentoDosLicencia=this.resLC.licenciaDosAfiliacion;
        console.log(resp);
        this.data.actualizarCond(resp).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        })
      }
      
    }
  }

  /**
   * Se suben priemro los archivos, y se llama a CompletarSolicitud y va  avanzando el procentaje ahasta terminar de subir los archivos. 
   */
  guardar(){
    this.porcentaje=0;/**
    Aca no le entiendo su problema, por cada archivo se distribuye un porcentaje aca se envian 6 archivos eso lo divide en 100 eso da 16.6 lo cual quiere decir que cada archivo es un 15 y
    a uno solo, se le suman los 10 que faltan.
    Al final tiene que dar igual a 100, sino no se ejecuta Completar Solicitud que se encarga de guardar todo. Recuerde que Angular es un Framework de funciones asincronas, ejecutandolas
    todas en un hilo que no espera a que el otro termine, sino de una va enviando todo al servidor. Entonces usted tiene que detectar si ya termino de subir archivos, para eso es este porcentaje.

     */
    
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid){
      console.log(this.Formulario);
      this.alertpen=true;

    }else{
      if(this.archnomCC[0] !="Selecciona un Archivo" && (this.docuno=='' || this.docuno=='null' || this.docuno==null)){
        this.LoginService.subirArchivoCC(
          this.archfileCC[0],
          this.archfileCC[1]
        ).subscribe(
          (resCC:any)=>{
            this.resCC={};
            this.resCC.documentoUnoPersona=resCC.documentoUnoAfiliacion;
            this.resCC.documentoDosPersona=resCC.documentoDosAfiliacion;
            this.porcentaje+=30;
            this.completarSolicitud();
          })
      } else if( !(this.docuno=='' || this.docuno=='null' || this.docuno==null)){
        if(this.archnomCC[0] !="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfileCC[0],
            this.docuno
          ).subscribe(
            (resCC:any)=>{
              console.log(resCC);
              this.resCC.documentoUnoPersona=resCC.archivoCedula;
              this.porcentaje+=15;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=15;
          this.completarSolicitud();
        }
        if(this.archnomCC[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfileCC[1],
            this.docdos
          ).subscribe(
            (resCC:any)=>{
              
              console.log(resCC);
              this.resCC.documentoDosPersona=resCC.archivoCedula;
              this.porcentaje+=15;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=15;
          this.completarSolicitud();
        }
        
      }else{
        this.porcentaje+=30;
        this.completarSolicitud();
      }
      
  
      //if(this.edit){
        if(this.archnomExMed!="Selecciona un Archivo" && this.antExMed!="" && this.edit){
          this.data.ActualizarArchivoExMedicos(
            this.archfileExMed,
            this.antExMed
          ).subscribe(
            (resExMed:any)=>{
              console.log(resExMed)
              this.resExMed.examenesMedicos=resExMed.examenesMedicos;
              this.porcentaje+=15;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        } else if(this.archnomExMed!="Selecciona un Archivo" && this.antExMed==""){
          this.data.subirArchivoExMedicos(
            this.archfileExMed
          ).subscribe(
            (resExMed:any)=>{
              this.resExMed.examenesMedicos=resExMed.examenesMedicos;
              this.porcentaje+=15;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=15;
          this.completarSolicitud();
        }


        if(this.archnomvehLC[0] !="Selecciona un Archivo" && (this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null)){//Verifica que el nombre haya cambiado y que el archivo antiguo no este o no exista
          this.LoginService.subirArchivoLC(
            this.archfilevehLC[0],
            this.archfilevehLC[1]
          ).subscribe(
            (resLC:any)=>{
              this.resLC={};
              this.resLC=resLC;
              //this.resLC.licenciaUnoAfiliacion=resLC.licenciaUnoAfiliacion;
              //this.resLC.licenciaDosAfiliacion=resLC.licenciaDosAfiliacion;
              this.porcentaje+=30;
              this.completarSolicitud();
          });
        } else if( !(this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null)){//Verifica que el archivo si exista
          if(this.archnomvehLC[0] !="Selecciona un Archivo"){
            this.data.ActualizarArchivoLC(
              this.archfilevehLC[0],
              this.archnomeditvehLC[0]
            ).subscribe(
              (resLC:any)=>{
                this.resLC.licenciaUnoAfiliacion=resLC.archivoLicenciaConduccion;
                this.porcentaje+=15;//OJO! USTED TENIA EL PORCENTAJE DEBAJO DE LA FUNCION DE completarSolicitud(), SI USTED LO DEJA DESPUES DE LLAMAR LA FUNCION, ESO NUNCA SE VA GUARDAR.
                this.completarSolicitud();
              },
              err => {
                console.log(err);
              }
            )
          }else{
            this.porcentaje+=15;
            this.completarSolicitud();
          }
          if(this.archnomvehLC[1]!="Selecciona un Archivo"){
            this.data.ActualizarArchivoLC(
              this.archfilevehLC[1],
              this.archnomeditvehLC[1]
            ).subscribe(
              (resLC:any)=>{
                this.resLC.licenciaDosAfiliacion=resLC.archivoLicenciaConduccion;
                this.porcentaje+=15;//ACA DE NUEVO LO MISMO EL PORCENTAJE VA ANTES DEL completarSolicitud() 
                this.completarSolicitud();
              },
              err => {
                console.log(err);
              }
            )
          }else{
            this.porcentaje+=15;
            this.completarSolicitud();
          }
          
        }else{
          this.porcentaje+=30;
          this.completarSolicitud();
        }

        /**
        if(this.archnomvehLC[0]!="Selecciona un Archivo" && this.archnomeditvehLC[0]!="null"){
          this.data.ActualizarArchivoLC(
            this.archfilevehLC[0],
            this.archnomeditvehLC[0]
          ).subscribe(
            (resLC:any)=>{
              this.resLC.licenciaUnoAfiliacion=resLC.archivoLicenciaConduccion;
              this.completarSolicitud();
              this.porcentaje+=25;
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
        } */

        if(this.archnomPlanApo!="Selecciona un Archivo" && this.antPlanApo!="" && this.edit){
        this.data.ActualizarArchivoPlAportes(
          this.archfilePlanApo,
          this.antPlanApo
        ).subscribe(
          (resPlan:any)=>{
            this.resPlan.planillaAportes=resPlan.planillaAportes;
            this.porcentaje+=25;
            this.completarSolicitud();
          },
          err => {
            console.log(err);
          }
        )
        }else if(this.archnomPlanApo!="Selecciona un Archivo" && this.antPlanApo==""){
          this.data.subirArchivoPlAportes(
            this.archfilePlanApo
          ).subscribe(
            (resPlan:any)=>{
              this.resPlan.planillaAportes=resPlan.planillaAportes;
              this.porcentaje+=25;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
          }else{
            this.porcentaje+=25;
            this.completarSolicitud();
          }
      //}else{
        
       
      //}
    };
    
    
  }


/**
 * Valida el tipo de archivo
 * @param ctrl Recibe el control
 * @returns Retorne el tipo de error o null
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
   * Valida las fechas del formulario para asi respectivamnete mostrar los errores de lso campos
   * @param group Recibe el FormGroup
   * @returns retorna null siempre ya que se meustran los errores segun el control.
   */
  checkFech: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var res:any={};
    
    
    //res.convfec=true;
    if(new Date(group.controls.inicioEpsConductor.value)>new Date(group.controls.finEpsConductor.value)){
      group.controls['finEpsConductor'].setErrors({checkfech:true});
    }else{
      group.controls['finEpsConductor'].setValidators([Validators.required]);
      group.controls['finEpsConductor'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    //console.log(group.controls.fechafinTO.errors);
    //res.tofec=true;
    if(new Date(group.controls.inicioArlConductor.value)>new Date(group.controls.finArlConductor.value)){
      group.controls['finArlConductor'].setErrors({checkfech:true});
    }else{
      group.controls['finArlConductor'].setValidators([Validators.required]);
      group.controls['finArlConductor'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    if(new Date(group.controls.fechainiLC.value)>new Date(group.controls.fechafinLC.value)){
      group.controls['fechafinLC'].setErrors({checkfech:true});
    }else{
      group.controls['fechafinLC'].setValidators([Validators.required]);
      group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    
    return null;
  }

  /**
   * Valida si el Control donde identifica quien se va a convertir en conductor si esta seleccionado o si existe o no,
   * @param ctrl Recibe el control
   * @returns Retorna el tipo de error o null
   */
  validatePT(ctrl: AbstractControl): ValidationErrors  | null {
    //console.log(ctrl.value) ;
    var path = ctrl.value;
    if(ctrl.value!=undefined){
      //console.log(extension.toLowerCase()) ;
      var numt=this.noCondArray.findIndex(element=>(element.documentoPersona).toUpperCase()==(ctrl.value).toUpperCase())
      if(numt!=-1){
        if(this.iduser==this.noCondArray[numt].idPersona){
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

  /**
   * Valida si los archivos son requeridos o no dependiendo si es crear o editar.
   * @param group Recibe el FormGroup
   * @returns Retorna null siempre, ya que los controles son editados para mostrar los errores, segun cada control.
   */
  checkArch: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    
    var CC=group.controls.archCC.value;
    var CC1=group.controls.archCC1.value;
    var exmed=group.controls.archEx.value;
    var pl=group.controls.archPlan.value;
    var LC=group.controls.archLC.value;//Obtiene el control para verificar si esta vacio o no
    var LC1=group.controls.archLC1.value;//Obtiene el control para verificar si esta vacio o no
    if(!this.edit){
      if((this.docuno=='' || this.docuno=='null' || this.docuno==null) && (CC=="" || CC1=="")){//Priemero valida si no hay documentos, de lo contrario los vuelve requeridos
        group.controls['archCC'].setValidators([Validators.required,this.validarch]);
        group.controls['archCC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archCC1'].setValidators([Validators.required,this.validarch]);
        group.controls['archCC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }else{
        group.controls['archCC'].setValidators([this.validarch]);
        group.controls['archCC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archCC1'].setValidators([this.validarch]);
        group.controls['archCC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
      if((this.antExMed=='' || this.antExMed=='null' || this.antExMed==null) && exmed=="" ){
        group.controls['archEx'].setValidators([Validators.required,this.validarch]);
        group.controls['archEx'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archEx'].setValidators([this.validarch]);
        group.controls['archEx'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      if((this.antPlanApo=='' || this.antPlanApo=='null' || this.antPlanApo==null) && pl=="" ){
        group.controls['archPlan'].setValidators([Validators.required,this.validarch]);
        group.controls['archPlan'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archPlan'].setValidators([this.validarch]);
        group.controls['archPlan'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      //Se agregan los validadores que verifiquen si hay una licencia o no para saber si es obligatorio o no
      if((this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null) && LC=="" ){
        group.controls['archLC'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archLC'].setValidators([this.validarch]);
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      if((this.archnomeditvehLC[1]=='' || this.archnomeditvehLC[1]=='null' || this.archnomeditvehLC[1]==null) && LC1=="" ){
        group.controls['archLC1'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archLC1'].setValidators([this.validarch]);
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
    }else{
      if((this.docuno=='' || this.docuno=='null' || this.docuno==null) && (CC!="" || CC1!="")){
        group.controls['archCC'].setValidators([Validators.required,this.validarch]);
        group.controls['archCC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archCC1'].setValidators([Validators.required,this.validarch]);
        group.controls['archCC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }else{
        group.controls['archCC'].setValidators([this.validarch]);
        group.controls['archCC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archCC1'].setValidators([this.validarch]);
        group.controls['archCC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
      if((this.antExMed=='' || this.antExMed=='null' || this.antExMed==null) ){
        group.controls['archEx'].setValidators([Validators.required,this.validarch]);
        group.controls['archEx'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }else{
        group.controls['archEx'].setValidators([this.validarch]);
        group.controls['archEx'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      if((this.antPlanApo=='' || this.antPlanApo=='null' || this.antPlanApo==null) ){
        group.controls['archPlan'].setValidators([Validators.required,this.validarch]);
        group.controls['archPlan'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }else{
        group.controls['archPlan'].setValidators([this.validarch]);
        group.controls['archPlan'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      //Se agregan los validadores que verifiquen si hay una licencia o no para saber si es obligatorio o no
      if((this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null) && LC=="" ){
        group.controls['archLC'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archLC'].setValidators([this.validarch]);
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
      if((this.archnomeditvehLC[1]=='' || this.archnomeditvehLC[1]=='null' || this.archnomeditvehLC[1]==null) && LC1=="" ){
        group.controls['archLC1'].setValidators([Validators.required,this.validarch]);
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
       
      }else{
        group.controls['archLC1'].setValidators([this.validarch]);
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        
      }
    }
    
    return null;
  }

  checkLic: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var fi=group.controls.fechainiLC.value;
    var ff=group.controls.fechafinLC.value;
    let resf:any={};
    if(this.edit){
      //Porque Esto? que acaso lso espacios dejan de ser obligatorios en el editar? OJO CON LO QUE ESTA PROGRAMANDO! UNA COSA SON VALIDADORES Y OTRA ERRORES!
        group.controls['catlic'].clearValidators();
        group.controls['catlic'].updateValueAndValidity({emitEvent:false, onlySelf:true});//actualiza y valida de nuevo los campos (SOLO SI SE AGREGA UN NUEVO VALIDADOR O SE EDITAN LOS VALIDADORES SE DEBE PONER ESTA LINEA) OJO SON VALIDADORES NO ERRORES! VALIDADORES != ERRORES 
        group.controls['fechainiLC'].clearValidators();
        group.controls['fechainiLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['fechafinLC'].clearValidators();
        group.controls['fechafinLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC'].clearValidators();
        group.controls['archLC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
        group.controls['archLC1'].clearValidators();
        group.controls['archLC1'].updateValueAndValidity({emitEvent:false, onlySelf:true});
     
    }else{
       // EN AMBAS COMPARACIONES LO MISMO, OJO JAMES! ACA EL CLEAR ES PARA LIMPIAR Y QUITAR TODOS LOS VALIDADORES!
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

    return null;
    
  }

}
