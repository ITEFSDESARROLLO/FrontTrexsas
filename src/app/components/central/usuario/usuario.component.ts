import { FondoPensiones } from './../../../models/ModelosJ/fondo-pensiones';
import { Idioma } from './../../../models/ModelosJ/idioma';
import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/models/ciudad';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usu:string;
  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  iduser:number;
  tipodocs: any[] = [];
  perf:Array<any>;
  perfileslist:any;
  docuno="";
  fotoper="";
  username="";
  inpusername=false;
  alertusu=false;
  listauser:Array<any>;
  ciudades:Array<Ciudad>;
  archnomCC:Array<string>=[];
  archfileCC:Array<File>=[];
  archalertCC:Array<boolean>=[];
  archantFoto:string;
  archnomFoto:string;
  archfileFoto:File;
  archalertFoto:boolean;
  perfselect:Array<any>;
  porcentaje: number;
  resCC:any;
  resFoto:any;
  resedit:any;
  param: string;
  listoc:Array<boolean>;
  inputc:Array<number>;
  ciudadesE:Array<Ciudad>;
  ciudadesU:Array<Ciudad>;
  checkblur:Array<number>;
  idiomas:Array<Idioma>;
  perfilSeleccionado:any;
  formularioConductor:FormGroup;
  antExMed:string;
  archnomExMed:string;
  archfileExMed:File;
  archalertExMed:boolean;
  antPlanApo:string;
  archnomPlanApo:string;
  archfilePlanApo:File;
  archalertPlanApo:boolean;
  archnomeditvehLC:Array<string>=[];
  archnomvehLC:Array<string>=[];
  archfilevehLC:Array<File>=[];
  archalertvehLC:Array<boolean>=[];
  tiporh:any[]=[];
  tipogenero:any[]=[];
  tipocaja:any[]=[];
  tipofondo:any[]=[];
  tipoeps:any[]=[];
  tipoarl:any[]=[];
  tipoestadoc:any[]=[];
  categorialicveh:any[]=[];
  archivosConductor:any[]=[];
  cantidadArchivosGuardados:number=0;
  cantidadArchivosUsuariosGuardados:number=0;
  archivosUsuario:any[]=[];
  displayProgresoCreacion:boolean = false;
  listaProcesoCorrecto:any[] = [];
  progresoCreacionUsuario:number = 0;
  archivoLicenciaConductor:any;
  archivoPlanillaAportesConducotr:any;
  archivoExamenesMedicosConductor:any;
  archivoCedulaUsuario:any;
  archivoFotoUsuario:any;
  nombreArchivoCedulaUsuario:string ="";
  nombreArchivoFotoUsuario:string = "";
  nombreArchivoPlanilla:string = "";
  nombreArchivoExamenes:string = "";
  nombreArchivoLicencia:string = "";
  nombreAarchivoPlanillaEditar:string = "";
  nombreArchivoLicenciaEditar:string = "";
  nombreArchivoExamenesEditar:string = "";
  nombreArchivoDocumentoIdentificacion:string = "";
  idcond: any;
  resLC: { licenciaUnoAfiliacion: any; licenciaDosAfiliacion: any; };
  conductorUsuarioPerfil:any;
  esConductor: boolean;
  nuevoConductorEditar:boolean=false;
  ciudadesFiltradasExpedicion:any[] = [];
  ciudadesFiltradasResidencia:any[] = [];
  displayCreacionConductor:boolean = false;
  objetoLicenciaConductor:any;
  displayCambioContrasenha:boolean =false;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.perfileslist=[];
    this.usu="";
    this.resFoto={}
    this.porcentaje=0;
    this.edit=false;
    this.view=false;
    this.iduser=-1;
    this.tipodocs=[];
    this.ciudades=[];
    this.ciudadesE=[];
    this.ciudadesU=[];
    this.listoc=[];
    this.inputc=[];
    this.perfselect=[];
    this.listauser=[];
    this.inputc.push(-1);
    this.inputc.push(-1);
    this.listoc.push(false);
    this.listoc.push(false);
    this.resCC={};
    this.resedit={};
    this.checkblur=[];
    this.checkblur.push(0);
    this.checkblur.push(0);
    this.idiomas=[];
    this.Formulario = new FormGroup({
      swest:new FormControl(false),
      nom:new FormControl( '',[Validators.required]),
      ape:new FormControl( ''),
      tipodoc:new FormControl( null,[Validators.required]),
      numdoc:new FormControl( '',[Validators.required]),
      ciudade:new FormControl( ''),
     // ciudade:new FormControl( '',[Validators.required]),
      direccion:new FormControl( '',[Validators.required]),
      obsv:new FormControl(''),
      fechaN:new FormControl(null),
      correo:new FormControl( '',[Validators.required, Validators.email]),
      tel1:new FormControl( '',[Validators.required,this.validtel]),
      tel2:new FormControl( '',[this.validtel]),
    //  selectedC:new FormControl( '',[Validators.required]),
      selectedC:new FormControl( ''),
      archCC:new FormControl( ''),
      archCC1:new FormControl( ''),
      archFoto:new FormControl( ''),
      filterperf:new FormControl( ''),
      usucuenta:new FormControl( ''),
      passusuario:new FormControl(''),
      tipoPersona:new FormControl(true),
      //

    },{
      validators:[this.checkArch.bind(this)]
    });
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
    this.archantFoto="";
    this.archnomFoto="Selecciona un Archivo";
    this.archfileFoto=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
    this.formularioConductor = new FormGroup({
      tipoSangre: new FormControl(''),
      genero: new FormControl(''),
      categoriaLicencia: new FormControl(''),
      fechaInicioLicencia: new FormControl(''),
      fechaFinLicencia: new FormControl(''),
      eps: new FormControl(),
      fechaInicioEps: new FormControl(new Date("0000-00-00")),
      fechaFinEps: new FormControl(new Date("0000-00-00")),
      arl: new FormControl(),
      fechaInicioArl: new FormControl(new Date("0000-00-00")),
      fechaFinArl: new FormControl(new Date("0000-00-00")),
      estadoCivil: new FormControl(''),
      cajaCompensacion:new FormControl(''),
      fondoPensiones:new FormControl('')
    })
    this.archalertFoto=false;
    this.obtenerIdiomas();
    this.obtenerCiudades();
    this.obtenerTipoDoc();
    this.obtenerPerf();
   }



  ngOnInit(): void {

    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );

    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,6)==="editar"){
      this.obtenerCiudades();
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerUsuario(urlid).subscribe(
        (res:any)=>{
          console.log("cuenta usuario : ",res.cuenta);
          this.resedit=res;
          this.perfileslist=res.perfilList;
          console.log("lista de perfiles . ",this.perfileslist);
          this.usu=res.cuenta.usuarioCuenta,
          this.docuno=res.cuenta.persona.documentoUnoPersona;
          this.resCC={};
          this.resCC.documentoUnoAfiliacion=res.cuenta.persona.documentoUnoPersona;
          this.resCC.documentoDosAfiliacion=res.cuenta.persona.documentoDosPersona;
          this.resFoto={};
          this.resFoto.fotoPersona=res.cuenta.persona.fotoPersona;
          console.log("foto : ",this.resFoto);
          console.log(this.resFoto);
          this.fotoper=res.cuenta.persona.fotoPersona;
          this.inputc[0]=res.cuenta.persona.ciudadExpedicionPersona!=null?res.cuenta.persona.ciudadExpedicionPersona.idCiudad:-1;
          this.inputc[1]=res.cuenta.persona.ciudadPersona!=null?res.cuenta.persona.ciudadPersona.idCiudad:-1;

          this.Formulario.patchValue({
            swest:res.cuenta.estadoCuenta==1?true:false,
            nom:res.cuenta.persona.nombrePersona,
            ape:res.cuenta.persona.apellidoPersona,
            tipodoc:res.cuenta.persona.tipoDocPersona,
            numdoc:res.cuenta.persona.documentoPersona,
            //ciudade:res.cuenta.persona.ciudadExpedicionPersona!=null?res.cuenta.persona.ciudadExpedicionPersona.ciudad:"",
            //ciudade:res.cuenta.persona.ciudadExpedicionPersona!=null?res.cuenta.persona.ciudadExpedicionPersona:"",
            direccion:res.cuenta.persona.direccionPersona!=null?res.cuenta.persona.direccionPersona:"",
            obsv:res.cuenta.persona.observacionesPersona,
            fechaN:res.cuenta.persona.fechaNacimientoPersona!=null?res.cuenta.persona.fechaNacimientoPersona.substr(0,10):"",
            correo:res.cuenta.persona.correoPersona!=null?res.cuenta.persona.correoPersona:"",
            tel1:res.cuenta.persona.celularUnoPersona!=null?res.cuenta.persona.celularUnoPersona:"",
            tel2:res.cuenta.persona.celularDosPersona!=null?res.cuenta.persona.celularDosPersona:"",
           // selectedC:res.cuenta.persona.ciudadPersona!=null?res.cuenta.persona.ciudadPersona:"",
            usucuenta:res.cuenta.usuarioCuenta,
            passusuario:"",
            tipoPersona:res.cuenta.persona.tipoPersona

          });
          let esConductor:boolean = false;
          for (const iterator of this.perfileslist)
          {
            if(iterator.idPerfil == 2)
            {
              esConductor = true;
              break;
            }
          }
          if(esConductor == true)
          {

                this.esConductor = true;
                console.log("conductor : ",this.resedit.conductor.licenciaList);

                this.conductorUsuarioPerfil={}

                this.conductorUsuarioPerfil=this.resedit.conductor;
                this.idcond=this.conductorUsuarioPerfil.idConductor;
                console.log(this.resCC);
                this.resCC.documentoUnoPersona=this.conductorUsuarioPerfil?.persona.documentoUnoPersona;
                this.archnomeditvehLC[0]=""+this.conductorUsuarioPerfil?.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1]?.documentoUnoLicencia;
                this.archnomeditvehLC[1]=""+this.conductorUsuarioPerfil?.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1]?.documentoDosLicencia;
                console.log("licencia del conductor : ",this.conductorUsuarioPerfil);
                this.resLC={
                  licenciaUnoAfiliacion:this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length]>0?this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1].documentoUnoLicencia:null,
                  licenciaDosAfiliacion:this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length]>0?this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1].documentoDosLicencia:null
                };


                console.log("perfil ",this.perfilSeleccionado);
                this.formularioConductor = new FormGroup({
                  tipoSangre: new FormControl('',Validators.required),
                  genero: new FormControl(''),
                  categoriaLicencia: new FormControl(''),
                  fechaInicioLicencia: new FormControl(''),
                  fechaFinLicencia: new FormControl(''),
                  eps: new FormControl(''),
                  fechaInicioEps: new FormControl(''),
                  fechaFinEps: new FormControl(''),
                  arl: new FormControl(''),
                  fechaInicioArl: new FormControl(''),
                  fechaFinArl: new FormControl(''),
                  estadoCivil: new FormControl(''),
                  cajaCompensacion:new FormControl(''),
                  fondoPensiones:new FormControl('')
                })
                console.log(this.formularioConductor);
                this.fotoper=this.conductorUsuarioPerfil.persona.fotoPersona;
                this.obtenerRH();
                let tipoSangreFormulario:any;
                for (const iterator of this.tiporh)
                {
                  if(iterator.value == this.conductorUsuarioPerfil.rhConductor)
                  {
                    tipoSangreFormulario = iterator.id;
                    console.log("encontrado : ",tipoSangreFormulario);
                    break;
                  }
                }
                this.formularioConductor.patchValue({
                  //fechaR:res.fechaRegistroConductor!=null?res.fechaRegistroConductor.substr(0,10):"",
                  //fechaA:res.fechaActualizacionConductor!=null?res.fechaActualizacionConductor.substr(0,10):"",

                  //tipoSangre:this.conductorUsuarioPerfil.rhConductor!=null?res.rhConductor:null,
                  tipoSangre:tipoSangreFormulario,
                  genero:this.conductorUsuarioPerfil.generoConductor,
                  fechaInicioEps:this.conductorUsuarioPerfil.inicioEpsConductor!=null?this.conductorUsuarioPerfil.inicioEpsConductor.substr(0,10):"",
                  fechaFinEps:this.conductorUsuarioPerfil.finEpsConductor!=null?this.conductorUsuarioPerfil.finEpsConductor.substr(0,10):"",
                  fechaInicioArl:this.conductorUsuarioPerfil.inicioArlConductor!=null?this.conductorUsuarioPerfil.inicioArlConductor.substr(0,10):"",
                  fechaFinArl:this.conductorUsuarioPerfil.finArlConductor!=null?this.conductorUsuarioPerfil.finArlConductor.substr(0,10):"",
                  fechaInicioLicencia:this.conductorUsuarioPerfil.licenciaList.length>0 ?this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1]?.fechaExpedicionLicencia?.substr(0,10):"",
                  fechaFinLicencia:this.conductorUsuarioPerfil.licenciaList.length>0?this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1]?.fechaVencimientoLicencia?.substr(0,10):"",
                  categoriaLicencia:this.conductorUsuarioPerfil.licenciaList.length>0?this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length-1]?.categoriaLicencia:"",
                  cajaCompensacion:this.conductorUsuarioPerfil.cajaCompensacion!=null?this.conductorUsuarioPerfil.cajaCompensacion.idCajaCompensacion:"",
                  fondoPensiones:this.conductorUsuarioPerfil.fondoPensiones!=null?this.conductorUsuarioPerfil.fondoPensiones.idFondoPensiones:null,
                  eps:this.conductorUsuarioPerfil.eps!=null?this.conductorUsuarioPerfil.eps.idEps:null,
                  arl:this.conductorUsuarioPerfil.arl!=null?this.conductorUsuarioPerfil.arl.idArl:null,
                  estadoCivil:this.conductorUsuarioPerfil.estadoCivil!=null?this.conductorUsuarioPerfil.estadoCivil.idEstadoCivil:null,
                });
                console.log(this.conductorUsuarioPerfil.licenciaList[this.conductorUsuarioPerfil.licenciaList.length]>0);
                //console.log("licencia : ",this.conductorUsuarioPerfil.licenciaList[0])
                this.nombreArchivoLicencia = this.conductorUsuarioPerfil.licenciaList[0].documentoUnoLicencia;
                console.log("licencia : ",this.conductorUsuarioPerfil.licenciaList[0])
                this.nombreArchivoExamenesEditar=this.conductorUsuarioPerfil.examenesMedicosConductor;
                this.nombreAarchivoPlanillaEditar=this.conductorUsuarioPerfil.planillaAportesConductor;

          }
        });

    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerUsuario(urlid).subscribe(
        (res:any)=>{
          console.log("respuesta: ",res);
          this.resedit=res;
          this.docuno=res.cuenta.persona.documentoUnoPersona;
          this.resCC={};
          this.resCC.documentoUnoAfiliacion=res.cuenta.persona.documentoUnoPersona;
          this.resFoto={};
          this.resFoto.fotoPersona=res.cuenta.persona.fotoPersona;
          console.log("foto : ",this.resFoto);
          this.fotoper=res.cuenta.persona.fotoPersona;
          //this.inputc[0]=res.cuenta.persona.ciudadExpedicionPersona!=null?res.cuenta.persona.ciudadExpedicionPersona.idCiudad:-1;
         // this.inputc[1]=res.cuenta.persona.ciudadPersona!=null?res.cuenta.persona.ciudadPersona.idCiudad:-1;
          this.Formulario.patchValue({


            //
            swest:res.cuenta.estadoCuenta==1?true:false,
            nom:res.cuenta.persona.nombrePersona,
            ape:res.cuenta.persona.apellidoPersona,
            tipodoc:res.cuenta.persona.tipoDocPersona,
            numdoc:res.cuenta.persona.documentoPersona,
           // ciudade:res.cuenta.persona.ciudadExpedicionPersona!=null?res.cuenta.persona.ciudadExpedicionPersona.ciudad:"",
            direccion:res.cuenta.persona.direccionPersona,
            obsv:res.cuenta.persona.observacionesPersona,
            fechaN:res.cuenta.persona.fechaNacimientoPersona!=null?res.cuenta.persona.fechaNacimientoPersona.substr(0,10):"",
            correo:res.cuenta.persona.correoPersona,
            tel1:res.cuenta.persona.celularUnoPersona,
            tel2:res.cuenta.persona.celularDosPersona,
           // selectedC:res.cuenta.persona.ciudadPersona.ciudad,
            usucuenta:res.cuenta.usuarioCuenta,
            passusuario:"",
            tipoPersona:res.cuenta.persona.tipoPersona

          });
          this.Formulario.disable();
        });
    }

      this.obtenerTipoDoc();
      this.obtenerRH();
      this.obtenerGenero();
      this.obtenerCaja();
      this.obtenerEPS();
      this.obtenerARL();
      this.obtenerEstadoC();
      this.obtenerPensiones();
      this.obtenerCategoria();
    console.log("");
  }

  cambiocontrasena(){
    this.displayCambioContrasenha = true;
    console.log("cuenta usuario : ",this.resedit);

  }
  enviocontrasena(){
    let idcuenta=this.resedit.cuenta.idCuenta;
    let  iduser=this.resedit.cuenta.persona.idPersona;
    this.data.cambiarClave(iduser,idcuenta).then(respuesta=>{
      if(respuesta.mensaje==1){
        Swal.fire({
          title:"Exito",
          text:"contraseña Cambiada",
          icon:"success"
        })
        this.displayCambioContrasenha = false;
      }
    }).catch(error=>{
      Swal.fire({
        title:"Error",
        text:"No se pudo cambiar la contraseña por error en el servidor \n "+error.mensaje,
        icon:"error"
      })
      this.displayCambioContrasenha = false;
    })
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
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
   downloadPlan(nom:string){
    this.data.obtenerImagenPlAportes(nom);
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
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
   downloadEx(nom:string){
    this.data.obtenerImagenExMedicos(nom);
  }

  /**
   * Vuelve el control con letras mayusculas
   * @param nom Control a convertir.
   */
  mayus(nom:string):void{
    this.Formulario.get(nom)?.setValue((this.Formulario.get(nom)?.value).toUpperCase());
  }

  /**
   * Es el que encarga de mostrar o no la lista de autocompletado
   * @param a poscion de la lista a mostrar.
   */
  vfocus(a:number){
    this.checkblur[a]=0;
    this.listoc[a]=true;
    this.cambioC(a);
  }

  /**
   * Guarda el id seleccionado y pone el nombre en el control de acuaerdo a la pocision.
   * @param id id de la ciudad
   * @param nom nombre de la ciudad
   * @param pos poscion de la ciudad a ocultar y a guardar el id
   */
  selectC(id:number,nom:string,pos:number){
    this.inputc[pos]=id;
    if(pos==0){
      this.Formulario.get('ciudade')?.setValue(nom);
    }else{
      this.Formulario.get('selectedC')?.setValue(nom);
    }
    this.listoc[pos]=false;
  }

  /**
   * Obtiene los perfiles para agregar
   */
  obtenerPerf():void{
    this.data
      .obtenerBasPerfiles()
      .subscribe((res:any) => {
        this.perf = res;
        console.log("perfiles",res);
      });
  }

  /**
   * Obtener los tipos de documentos.
   */
  obtenerTipoDoc(): void {
    this.tipodocs.push({ id: "CC", value: "Cedula de Ciudadania" });
    this.tipodocs.push({ id: "TI", value: "Tarjeta de Identidad" });
    this.tipodocs.push({ id: "CE", value: "Cedula de Extranjeria" });
    this.tipodocs.push({ id: "NIT", value: "NIT" });
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadCC(nom:string){
    this.data.obtenerImagenVehCC(nom);
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
   * Filtra la ciudad de acuerdo a la poscion y lo que haya en el control
   * @param pos poscion a evaluar
   */
  cambioC(pos:number){
    console.log(this.ciudadesE);
    console.log(this.listoc[pos]);
    if(pos==0){
      this.listoc[pos]=true;
      this.ciudadesE=[];
      for(var i=0;i<this.ciudades.length;i++){
        this.ciudadesE.push(this.ciudades[i]);
      }
      //this.doc[i]=false;
      this.inputc[pos]=-1;
      //this.docauth[i]=false;
      let pas = this.ciudadesE.filter(ciud=> ciud.ciudad.includes((this.Formulario.get('ciudade')?.value).toUpperCase()));
      this.ciudadesE=pas;
      //console.log(pas);
      if(pas.length!=0){
        var found1 = this.ciudadesE.findIndex(element =>element.ciudad==(this.Formulario.get('ciudade')?.value).toUpperCase());
        if(-1!=found1){
          this.inputc[pos]=pas[found1].idCiudad;
          this.Formulario.get('ciudade')?.setValue(pas[found1].ciudad);
          this.listoc[pos]=false;
          //console.log(this.inputc[pos])
        }
      }

    }
    else{
      this.listoc[pos]=true;
      this.ciudadesU=[];
      for(var i=0;i<this.ciudades.length;i++){
        this.ciudadesU.push(this.ciudades[i]);
      }
      //this.doc[i]=false;
      this.inputc[pos]=-1;
      //this.docauth[i]=false;
      let pas1 = this.ciudadesU.filter(ciud=> ciud.ciudad.includes((this.Formulario.get('selectedC')?.value).toUpperCase()));
      this.ciudadesU=pas1;
      //console.log(pas1);
      if(pas1.length!=0){
        var found1 = this.ciudadesU.findIndex(element =>element.ciudad==(this.Formulario.get('selectedC')?.value).toUpperCase());
        if(-1!=found1){
          this.inputc[pos]=pas1[found1].idCiudad;
          this.Formulario.get('selectedC')?.setValue(pas1[found1].ciudad);
          this.listoc[pos]=false;
          //console.log(this.inputc[pos])
        }
      }

    }
  }

  /**
   * Obtiene las ciudades
   */
  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:Array<Ciudad>) => {
        this.ciudades = ciudad;
        this.ciudadesE = ciudad;
        this.ciudadesU = ciudad;

        this.Formulario.updateValueAndValidity();
      });
  }

  /**
   * Obtiene los idiomas, para relelnar el select
   */
  obtenerIdiomas(){
    this.data
      .obtenerIdiomas()
      .subscribe((idiomas:Array<Idioma>) => {
        this.idiomas = idiomas;

        this.Formulario.updateValueAndValidity();
      });
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadFoto(nom:string){
    this.data.obtenerImagenVehFoto(nom);
  }

  /**
   * Detecta is hay un evento de cambio dentro del input, y de acuerdo a eso cambia el archivo a guardar para subirlo
   * @param element Recibe el evento generado
   */
  cambioFoto(element:any){
    if(element.target.files[0]!==undefined){

        this.archfileFoto=element.target.files[0];
        this.archnomFoto=element.target.files[0].name;
        this.archalertFoto=false;
      }else{
        this.archnomFoto="Selecciona un Archivo";
      }
  }

  /**
   * Guarda el Formulario con el nombre de las imagenes ya generadas. Dependiendo de si actualiza o crea
   */
  completarSolicitud(){
    if(this.edit){
      if(this.porcentaje==100){

        console.log(this.resFoto.fotoPersona);
        console.log(this.resCC.documentoUnoAfiliacion);
        let JSON:any={};
        JSON.idCuenta=this.resedit.cuenta.idCuenta;
        JSON.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
        JSON.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
        //JSON.claveCuenta=this.Formulario.get('repassusuario')?.value!=""?this.Formulario.get('repassusuario')?.value:null;
        JSON.persona={};
        JSON.persona.idPersona=this.resedit.cuenta.persona.idPersona;
        JSON.persona.nombrePersona=this.Formulario.get('nom')?.value;
        JSON.persona.apellidoPersona=this.Formulario.get('ape')?.value;
        JSON.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
        JSON.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
        //JSON.persona.ciudadPersona={};
        //JSON.persona.ciudadPersona.idCiudad=this.inputc[1];
        //console.log("ciudad e ",this.Formulario.get('ciudade')?.value);
        //JSON.persona.ciudadPersona=this.Formulario.get('ciudade')?.value;
        JSON.persona.direccionPersona=this.Formulario.get('direccion')?.value;
        JSON.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
        JSON.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
        JSON.persona.correoPersona=this.Formulario.get('correo')?.value;
        JSON.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
        JSON.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
       // JSON.persona.ciudadExpedicionPersona={};
        //console.log("ciudad r ",this.Formulario.get('selectedC')?.value);
        //JSON.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
        JSON.persona.ciudadExpedicionPersona=this.Formulario.get('selectedC')?.value;
        JSON.persona.documentoUnoPersona=this.resCC?.documentoUnoAfiliacion;
        JSON.persona.documentoDosPersona=this.resCC?.documentoDosAfiliacion;
        JSON.persona.fotoPersona=this.resFoto?.fotoPersona;
        console.log(JSON);
        this.data.actualizarUsu(JSON).subscribe(
          (res:any)=>{
            if(res.mensaje==1){
              this.ocultar=true;
              this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
            }else{
              this.ocultar=false;
              this.msm+=res.mensaje;
            }
          }
        )
      }
    }else{
      if(this.porcentaje==100){
        console.log(this.resFoto.fotoPersona);
        console.log(this.resCC.documentoUnoAfiliacion);
        let JSON:any={};
        JSON.cuenta={};
        console.log("perfil seleccionado : ",this.perfilSeleccionado);
        //JSON.cuenta.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
        JSON.cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
        //JSON.cuenta.claveCuenta=this.Formulario.get('repassusuario')?.value;
        JSON.persona={};
        JSON.persona.nombrePersona=this.Formulario.get('nom')?.value;
        JSON.persona.apellidoPersona=this.Formulario.get('ape')?.value;
        JSON.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
        JSON.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
        //JSON.persona.ciudadPersona={};
        //JSON.persona.ciudadPersona.idCiudad=this.inputc[1];
        JSON.persona.direccionPersona=this.Formulario.get('direccion')?.value;
        JSON.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
        JSON.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
        JSON.persona.correoPersona=this.Formulario.get('correo')?.value;
        JSON.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
        JSON.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
        JSON.persona.ciudadExpedicionPersona={};
        JSON.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
        JSON.persona.documentoUnoPersona=this.resCC.documentoUnoAfiliacion!=undefined?this.resCC.documentoUnoAfiliacion:null;
        JSON.persona.documentoDosPersona=this.resCC.documentoDosAfiliacion!=undefined?this.resCC.documentoDosAfiliacion:null;
        JSON.persona.fotoPersona=this.resFoto.fotoPersona!=undefined?this.resFoto.fotoPersona:null;
        console.log(JSON);
        this.data.crearUsu(JSON,this.perfilSeleccionado).subscribe(
          (res:any)=>{
            if(res.mensaje==1){
              this.ocultar=true;
              this.msm+=" "+"CREADO SATISFACTORIAMENTE";
            }else{
              this.ocultar=false;
              this.msm+=res.mensaje;
            }
          }
        )
      }
    }

  }

  /**
   * Filtra los username, pero este metodo ya no se utliza ya que se paso a implementar un validador Asincrono, para detectar que el username sea siempre unico.
   */
  cambiouser(){
    //console.log("Comprobar");
    if(this.Formulario.get('usucuenta')?.value!=null){
      if(this.Formulario.get('usucuenta')?.value.length>= 4){
        //console.log("Entro a consultar");
        var nametemp=this.Formulario.get('usucuenta')?.value.substr(0,4);
        if(nametemp!==this.username){
          this.username=this.Formulario.get('usucuenta')?.value.substr(0,4);
          ////console.log('1|'+this.Formulario.get('usucuenta')?.value.substr(0,4));
          this.data
          .obtenerUsuExt(this.username)
            .subscribe((data:any) => {
              console.log(data);
              if(data==null){
                this.inpusername=true;
                this.listauser=data;
                this.alertusu=false;
              }else{
                this.inpusername=false;
                this.listauser=data;
                this.comprobarlistauser();
              }
              ////console.log(data==null);
            },
          );
        }
        this.comprobarlistauser();
      }else{
        this.inpusername=false;
      }
    }

  }

  /**
   * Compureba si el usurio es unico, pero se diria que ya no se uttiliza pro la msia razon.
   */
  comprobarlistauser(){
    if(this.listauser!==null && this.listauser!==undefined){
      //console.log('this.listauser');
      //console.log(this.listauser);
      //console.log(this.listauser.length);
      var temp=this.Formulario.get('usucuenta')?.value;
      if(-1==this.listauser.findIndex(element => element.usuarioCuenta==temp)){
        this.inpusername=true;
        this.alertusu=false;
      }else{
        this.inpusername=false;
        this.alertusu=true;
      };
    }else{
      this.inpusername=true;
      this.alertusu=false;
    }
  }

  /**
   * Revisa que el formulario sea valido de lo contrario no permite  la subida de archivos.
   */
  guardar(){
    this.porcentaje=0;
    this.Formulario.markAllAsTouched();
    if(this.perfilSeleccionado.idPerfil == 2)
    {
      this.formularioConductor.markAllAsTouched();
      if(this.Formulario.valid && this.formularioConductor.valid )
      {

      }else{
        let estado = this.Formulario.valid==false?"pendiente en usuario":"pendiente en conductor";
        console.log("problemas con un formulario : ",estado);
      }
    }else if(!this.Formulario.valid ){

      console.log(this.Formulario.get('swest').errors);
      console.log(this.Formulario.get('nom').errors);
      console.log(this.Formulario.get('ape').errors);
      console.log(this.Formulario.get('tipodoc').errors);
      console.log(this.Formulario.get('numdoc').errors);
    //  console.log(this.Formulario.get('ciudade').errors);
      console.log(this.Formulario.get('direccion').errors);
      console.log(this.Formulario.get('obsv').errors);
      console.log(this.Formulario.get('fechaN').errors);
      console.log(this.Formulario.get('correo').errors);
      console.log(this.Formulario.get('tel1').errors);
      console.log(this.Formulario.get('tel2').errors);
      console.log(this.Formulario.get('selectedC').errors);
      console.log(this.Formulario.get('archCC').errors);
      console.log(this.Formulario.get('archCC1').errors);
      console.log(this.Formulario.get('archFoto').errors);
      //console.log(this.Formulario.get('filterPerf').errors);
      console.log(this.Formulario.get('usucuenta').errors);
      console.log(this.Formulario.get('passusuario').errors);
    }else{
      if(this.archnomCC[0] !="Selecciona un Archivo" && (this.docuno=='' || this.docuno=='null' || this.docuno==null)){
        this.LoginService.subirArchivoCC(
          this.archfileCC[0],
          this.archfileCC[1]
        ).subscribe(
          (resCC:any)=>{
            this.resCC=resCC;
            this.porcentaje+=50;
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
        if(this.archnomCC[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfileCC[1],
            ""
          ).subscribe(
            (resCC:any)=>{

              console.log(resCC);
              this.resCC.documentoDosPersona=resCC.archivoCedula;
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

      }else{
        this.porcentaje+=50;
        this.completarSolicitud();
      }
      //if(this.edit){

        if(this.archnomFoto!="Selecciona un Archivo" && !(this.fotoper=='' || this.fotoper=='null' || this.fotoper==null)){
          this.data.ActualizarArchivoFoto(
            this.archfileFoto,
            this.fotoper
          ).subscribe(
            (resF:any)=>{
              console.log(resF)
              this.resFoto.fotoPersona=resF.fotoPersona;
              this.porcentaje+=50;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        } else if(this.archnomFoto!="Selecciona un Archivo" && (this.fotoper=='' || this.fotoper=='null' || this.fotoper==null)){
          this.data.subirArchivoFoto(
            this.archfileFoto
          ).subscribe(
            (resF:any)=>{
              this.resFoto=resF;
              this.porcentaje+=50;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.porcentaje+=50;
          this.completarSolicitud();
        }
      //}else{

      //}
    }

  }

  /**
   * Filtra la lista de perfiles a mostrar. primero rellenado todos los perfiles exceptuando los que ya esten en la lista
   */
  filtrarPerf():void{
    this.perfselect=[];
    for(var i=0;i<this.perf.length;i++){
      if( this.perfileslist.findIndex(element=>element.idPerfil==this.perf[i].idPerfil)==-1 ){
        this.perfselect.push(this.perf[i]);
      }

    }
    console.log("Incio fil");
    console.log(this.perfileslist);
    //console.log(this.selectpropArray);
    //console.log(this.propArray);
    var filtro=(""+this.Formulario.get("filterperf")?.value).toUpperCase();
    if(this.perf.length>0){
      let prop = this.perfselect.filter(cond=> (cond.nombrePerfil).toUpperCase().includes(filtro) );
      console.log(prop)
      this.perfselect=prop;

    }else{
      this.perfselect=[];
    }

  }


  /**
   * De acuerdo al perfil elegido, consume de uan vez el servicio de agregar  y agrega el id, a la lista  de perfiles asignadas.
   * @param id id del perfil seleccionado
   */
  elegirPerf(id:any)
  {
    console.log("quitando ",id)
    if(id.idPerfil!=2)
    {
      console.log("diferente ",id)
      console.log(id);
      this.perfileslist.push(id);
      console.log(this.perfileslist)
      this.Formulario.get("filterperf")?.setValue('');
      this.perfselect=[];
      var jsoncond:any={};
      jsoncond.idCuenta=this.resedit.cuenta.idCuenta;
      jsoncond.idPerfil=id.idPerfil;
      console.log(jsoncond);
      this.data.agregarPerf(jsoncond).subscribe();
    }else{
      console.log("no diferente ",id)
      this.displayCreacionConductor = true;
    }


  }

  limpiarFormulario()
  {
    this.displayCreacionConductor = false;
    this.formularioConductor.reset();
  }

  /**
   * Quita el perfil seleccionado, automatimanete consumiendo el servicio de elimnacion de perfil y obtiene de uevo lso perfiles existentes
   * @param id id del Perfil a eliminar
   */
  quitarPerf(id:string){
    console.log("id recibido para quitar : ",id);
    console.log("id recibido para quitar : ",this.resedit);
    this.data.quitarPerfil(this.resedit.cuenta.idCuenta,id).subscribe(
      (res:any)=>{
        for (let index = 0; index < this.perfileslist.length; index++)
        {

          if(this.perfileslist[index].idPerfil == id)
          {
            console.log("recibido y eliminado: ",id);
            this.perfileslist.splice(index,1);
            break;
          }

        }
        //this.perfileslist.splice(this.perfileslist.findIndex(element=>element.idCuenta==id),1) ;
      }
    );
    this.obtenerPerf();

  }

/**
   * Checkea la ciudad de expedicion, y verifica que sea valida, de lo contrario, muestra el error en el contorl
   * @param group Recibe el FormGroup
   * @returns Retorna null siempre ya que se mentran lso errores en el control y no en un alert.
   */
 checkCE: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{

  var CO=group.controls.ciudade.value;
  var verf=this.ciudades.findIndex(element =>element.ciudad==(CO).toUpperCase());
  if(verf!=-1){
    group.controls['ciudade'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    return null;
  }else{
    group.controls['ciudade'].setErrors({validC:true})
    return null;
  }
}

  /**
   * Checkea si la ciudad es valida de lo contrario retorna el error dentro del control.
   * @param group recibe el group
   * @returns retorna siempre null ya que todo se muestra en el control
   */
  checkC: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{

    var CD=group.controls.selectedC.value;
    var verf=this.ciudades.findIndex(element =>element.ciudad==(CD).toUpperCase());
    if(verf!=-1){
      group.controls['selectedC'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      return null;
    }else{
      group.controls['selectedC'].setErrors({validC:true})
      return null;
    }
  }

  /**
   * Verifica si puso una cedula y no puso la otra, para revisar ambos espacios
   * @param group recibe el grupo
   * @returns retorna siempre null ya que todo se meuestra en el control especifico.
   */
  checkArch: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{

    var CC=group.controls.archCC.value;
    var CC1=group.controls.archCC1.value;
    if(!this.edit){
      if((this.docuno=='' || this.docuno=='null' || this.docuno==null) && CC!="" || CC1!=""){
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
    }else{
      if((CC!="" || CC1!="")&& (this.docuno=='' || this.docuno=='null' || this.docuno==null)){
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
    }

    return null;
  }



  /**
   * Checkea que la contraseña sea valida, y que coincida
   * @param group recibe el FormGroup
   * @returns reorna null siempre y mustra el error en el contorl especifico
   */
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.passusuario.value;
    //let confirmPass = group.controls.repassusuario.value;
    if(!this.edit){
      group.controls['passusuario'].setValidators([Validators.required]);
      group.controls['passusuario'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['passusuario'].clearValidators();
      group.controls['passusuario'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
    return null;
  }

  /**
   * verifica que el username sea unico.
   * @param ctrl recibe el control
   * @returns retorna el tipo de error en este caso, si el usario no es unico retorna error.
   */
  validateP(
    ctrl: AbstractControl
  ):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log(ctrl.value);
    return this.data.obtenerUsuExt(ctrl.value).pipe(map(data=>(
      data.findIndex(element=>(element.usuarioCuenta).toUpperCase()==(ctrl.value).toUpperCase())==-1 || ctrl.value==this.usu
      ?
      null : { uniqueUsu: true }
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

  /**
   * Valida el archivo  para saber si la extension es valida
   * @param ctrl Recibe el control
   * @returns Retorna el tipo de error dependiendo del caso
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
   * Valida el telefono segun el tamaño
   * @param ctrl recibe el control
   * @returns retorna null sino hay ningun error, de lo contrario muetra que no es un telefono valido
   */
  validtel(ctrl: AbstractControl): ValidationErrors  | null {
    console.log(ctrl.value) ;
    if(ctrl.value.length==0 ||ctrl.value.length==7 || ctrl.value.length==10){
      return null;

    }else{
      return {nottel:true};
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

  verificarConductor()
  {
    console.log("verificando :",this.perfilSeleccionado)
    if(this.perfilSeleccionado.idPerfil == 2)
    {
      this.formularioConductor = new FormGroup({
        archEx:new FormControl( ''),
        archPlan:new FormControl( ''),
        //
        rh:new FormControl( null),
        genero:new FormControl( null),
        catlic:new FormControl( null),
        fechainiLC:new FormControl( ''),
        fechafinLC:new FormControl( ''),
        inicioEpsConductor:new FormControl( ''),
        finEpsConductor:new FormControl( ''),
        inicioArlConductor:new FormControl( ''),
        finArlConductor:new FormControl( ''),
        cajaCompensacion:new FormControl( null),
        fondoPensiones:new FormControl( null),
        eps:new FormControl( null),
        arl:new FormControl( null),
        estadoCivil:new FormControl( null),
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
    this.tiporh.push({id:"-B",value:"-B"});
    this.tiporh.push({id:"+B",value:"+B"});
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
   * Verifica si puso una cedula y no puso la otra, para revisar ambos espacios
   * @param group recibe el grupo
   * @returns retorna siempre null ya que todo se meuestra en el control especifico.
   */
   checkArchivosConductor: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
  var exmed=group.controls.archivoExamenes.value;
  var pl=group.controls.planilla.value;
  var LC=group.controls.licencia.value;//Obtiene el control para verificar si esta vacio o no
  if(!this.edit){
    if((this.antExMed=='' || this.antExMed=='null' || this.antExMed==null) && exmed=="" ){
      group.controls['archivoExamenes'].setValidators([Validators.required,this.validarch]);
      group.controls['archivoExamenes'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['archivoExamenes'].setValidators([this.validarch]);
      group.controls['archivoExamenes'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
    if((this.antPlanApo=='' || this.antPlanApo=='null' || this.antPlanApo==null) && pl=="" ){
      group.controls['planilla'].setValidators([Validators.required,this.validarch]);
      group.controls['planilla'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['planilla'].setValidators([this.validarch]);
      group.controls['planilla'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
    //Se agregan los validadores que verifiquen si hay una licencia o no para saber si es obligatorio o no
    if((this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null) && LC=="" ){
      group.controls['licencia'].setValidators([Validators.required,this.validarch]);
      group.controls['licencia'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['licencia'].setValidators([this.validarch]);
      group.controls['licencia'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
  }else{
    if((this.antExMed=='' || this.antExMed=='null' || this.antExMed==null) ){
      group.controls['archivoExamen'].setValidators([Validators.required,this.validarch]);
      group.controls['archivoExamen'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['archivoExamen'].setValidators([this.validarch]);
      group.controls['archivoExamen'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
    if((this.antPlanApo=='' || this.antPlanApo=='null' || this.antPlanApo==null) ){
      group.controls['planilla'].setValidators([Validators.required,this.validarch]);
      group.controls['planilla'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['planilla'].setValidators([this.validarch]);
      group.controls['planilla'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
    //Se agregan los validadores que verifiquen si hay una licencia o no para saber si es obligatorio o no
    if((this.archnomeditvehLC[0]=='' || this.archnomeditvehLC[0]=='null' || this.archnomeditvehLC[0]==null) && LC=="" ){
      group.controls['licencia'].setValidators([Validators.required,this.validarch]);
      group.controls['licencia'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }else{
      group.controls['licencia'].setValidators([this.validarch]);
      group.controls['licencia'].updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
  }

  return null;
  }

  agregarArchivosConductor(event:any, identificadorEntrada:any)
  {

    let archivo = event.target.files[0];
    console.log("subiendo archivos en identificador : ",identificadorEntrada);
    console.log("subiendo archivos en identificador : ",archivo);
    if(this.archivosConductor.length >0)

    {
      let encontrado: boolean = false;
      for (let index = 0; index < this.archivosConductor.length; index++)
      {
        console.log("identificador : ",this.archivosConductor[index].identificacdor);
        if(identificadorEntrada == this.archivosConductor[index].identificacdor)
        {
          console.log("reemplazando archivo : ",archivo.name);
          this.archivosConductor[index].file = archivo;
          encontrado = true;
          break;
        }
      }
      if(encontrado == false)
      {
        let archivoGuardar = {
          id:this.cantidadArchivosGuardados,
          file:archivo,
          identificacdor:identificadorEntrada
        }
        this.archivosConductor.push(archivoGuardar);
        this.cantidadArchivosGuardados= this.cantidadArchivosGuardados + 1;
      }

    }else{
      let archivoGuardar = {
        id:this.cantidadArchivosGuardados,
        file:archivo,
        identificacdor:identificadorEntrada
      }
      this.archivosConductor.push(archivoGuardar);
      console.log("archivo : ",this.archivosConductor);
      this.cantidadArchivosGuardados = this.cantidadArchivosGuardados +1;
    }
  }

  agregarArchivosUsuario(event:any, identificadorEntrada:any)
  {

    let archivo = event.target.files[0];
    console.log("subiendo archivos en identificador : ",identificadorEntrada);
    console.log("subiendo archivos en identificador : ",archivo);
    if(this.archivosUsuario.length >0)

    {
      let encontrado: boolean = false;
      for (let index = 0; index < this.archivosUsuario.length; index++)
      {
        console.log("identificador : ",this.archivosUsuario[index].identificacdor);
        if(identificadorEntrada == this.archivosUsuario[index].identificacdor)
        {
          console.log("reemplazando archivo : ",archivo.name);
          this.archivosUsuario[index].file = archivo;
          encontrado = true;
          break;
        }
      }
      if(encontrado == false)
      {
        let archivoGuardar = {
          id:this.cantidadArchivosUsuariosGuardados,
          file:archivo,
          identificacdor:identificadorEntrada
        }
        this.archivosUsuario.push(archivoGuardar);
        this.cantidadArchivosUsuariosGuardados= this.cantidadArchivosUsuariosGuardados + 1;
      }

    }else{
      let archivoGuardar = {
        id:this.cantidadArchivosUsuariosGuardados,
        file:archivo,
        identificacdor:identificadorEntrada
      }
      this.archivosUsuario.push(archivoGuardar);
      console.log("archivo : ",this.archivosUsuario);
      this.cantidadArchivosUsuariosGuardados = this.cantidadArchivosUsuariosGuardados +1;
    }
  }

  ver()
  {
    /*rh:new FormControl( null,[Validators.required]),

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
        estadoCivil:new FormControl( null,[Validators.required]),*/
    if(this.perfilSeleccionado?.idPerfil == 2)
    {

      this.nuevoConductorEditar = true;
      this.formularioConductor = new FormGroup({
        tipoSangre: new FormControl('',Validators.required),
        genero: new FormControl(''),
        categoriaLicencia: new FormControl(''),
        fechaInicioLicencia: new FormControl(''),
        fechaFinLicencia: new FormControl(''),
        eps: new FormControl(''),
        fechaInicioEps: new FormControl(''),
        fechaFinEps: new FormControl(''),
        arl: new FormControl(''),
        fechaInicioArl: new FormControl(''),
        fechaFinArl: new FormControl(''),
        estadoCivil: new FormControl(''),
        cajaCompensacion:new FormControl(''),
        fondoPensiones:new FormControl('')
      })
      console.log(this.formularioConductor);
      console.log("perfil ",this.perfilSeleccionado);
      console.log("perfil ",this.nuevoConductorEditar);

    }else{
      this.nuevoConductorEditar = false;
      //this.formularioConductor = undefined;
    }

  }

  async crearPerfilConductor()
  {
    if(this.formularioConductor.valid)
    {
      if(this.archivoPlanillaAportesConducotr!=undefined)
      {
        let nombreArchivoPlanilla:any = await this.data.subirArchivoPlAnillaAportes(this.archivoPlanillaAportesConducotr);
        this.nombreArchivoPlanilla = nombreArchivoPlanilla.planillaAportes;
      }

      if(this.archivoLicenciaConductor!=undefined)
      {
        let nombreArchvioLicencia:any = await this.LoginService.subirArchivoLicencia(this.archivoLicenciaConductor);
        this.nombreArchivoLicencia = nombreArchvioLicencia.licenciaUnoAfiliacion;
      }

      if(this.archivoExamenesMedicosConductor!=undefined)
      {
        let nombreArchivoExamenes:any = await this.data.subirArchivoExamenesMedicos(this.archivoExamenesMedicosConductor);
        this.nombreArchivoExamenes = nombreArchivoExamenes.examenesMedicos;
      }

      let JSON:any = {};
      JSON.conductor={};
                JSON.conductor.planillaAportesConductor=this.nombreArchivoPlanilla;
                JSON.conductor.examenesMedicosConductor=this.nombreArchivoExamenes;
                JSON.conductor.persona={};
                JSON.conductor.persona.idPersona = this.resedit.cuenta.persona.idPersona;
                JSON.conductor.rhConductor=this.formularioConductor.get("tipoSangre")?.value;
                JSON.conductor.generoConductor =this.formularioConductor.get("genero")?.value;
                JSON.conductor.inicioEpsConductor =this.formularioConductor.get("fechaInicioEps")?.value;
                JSON.conductor.finEpsConductor =this.formularioConductor.get("fechaFinEps")?.value;
                JSON.conductor.inicioArlConductor =this.formularioConductor.get("fechaInicioArl")?.value;
                JSON.conductor.finArlConductor =this.formularioConductor.get("fechaFinArl")?.value;
                JSON.conductor.cajaCompensacion={};
                JSON.conductor.cajaCompensacion.idCajaCompensacion =this.formularioConductor.get("cajaCompensacion")?.value;
                JSON.conductor.fondoPensiones={};
                JSON.conductor.fondoPensiones.idFondoPensiones =this.formularioConductor.get("fondoPensiones")?.value;
                JSON.conductor.eps={};
                JSON.conductor.eps.idEps = this.formularioConductor.get("eps")?.value;
                JSON.conductor.arl={};
                JSON.conductor.arl.idArl = this.formularioConductor.get("arl")?.value;
                JSON.conductor.estadoCivil={};
                JSON.conductor.estadoCivil.idEstadoCivil =this.formularioConductor.get("estadoCivil")?.value;
                JSON.licencia={};
                JSON.licencia.fechaExpedicionLicencia=this.formularioConductor.get("fechaInicioLicencia")?.value;
                JSON.licencia.fechaVencimientoLicencia=this.formularioConductor.get("fechaFinLicencia")?.value;
                JSON.licencia.categoriaLicencia=this.formularioConductor.get("categoriaLicencia")?.value;
                JSON.licencia.numeroLicencia=this.Formulario.get('numdoc')?.value;
                JSON.licencia.documentoUnoLicencia=this.nombreArchivoLicencia;
                console.log(JSON)
                let mensaje:any = await this.data.crearConductorNuevoPerfilEditar(JSON);
          if(mensaje.mensaje == 1)
          {
            Swal.fire({
              title:"ÉXITO",
              icon:'success',
              text:'COnductor Creado Exitosamente',
              showConfirmButton:true
            }).then(respuesta=>
              {
                if(respuesta.isConfirmed)
                {
                  this.router.navigate['/central/usuarios'];
                }
              });
              var jsoncond:any={};
              jsoncond.idCuenta=this.resedit.cuenta.idCuenta;
              jsoncond.idPerfil=2;
              console.log(jsoncond);
              this.data.agregarPerf(jsoncond).subscribe();
            console.log("perfil seleccionado : ",this.perfilSeleccionado);
            let cuenta:any = {};
              cuenta.idCuenta=this.resedit.cuenta.idCuenta;
              cuenta.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
              cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
              cuenta.persona={};
              cuenta.persona.nombrePersona=this.Formulario.get('nom')?.value;
              cuenta.persona.apellidoPersona=this.Formulario.get('ape')?.value;
              cuenta.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
              cuenta.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
              //cuenta.persona.ciudadPersona={};
              //cuenta.persona.ciudadPersona.idCiudad=this.inputc[1];
              cuenta.persona.direccionPersona=this.Formulario.get('direccion')?.value;
              cuenta.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
              cuenta.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
              cuenta.persona.correoPersona=this.Formulario.get('correo')?.value;
              cuenta.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
              cuenta.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
             // cuenta.persona.ciudadExpedicionPersona={};
              //cuenta.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
              cuenta.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
              cuenta.persona.tipoPersona = this.Formulario.get('tipoPersona')?.value;
              //cuenta.persona.fotoPersona=this.nombreArchivoFotoUsuario;
              cuenta.persona.fotoPersona=this.fotoper;
              this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
              console.log("5");
              console.log("nuevo usuario",cuenta);
              this.data.actualizarUsu(cuenta).subscribe(
                (res:any)=>{
                  if(res.mensaje==1){
                    this.ocultar=true;
                    Swal.fire({
                      title:"ÉXITO",
                      icon:'success',
                      text:'Usuario Actualizado Exitosamente',
                      showConfirmButton:true
                    }).then(respuesta=>
                      {
                        if(respuesta.isConfirmed)
                        {
                          this.router.navigate['/central/usuarios'];
                        }
                      });
                  }else{
                    this.ocultar=false;
                    Swal.fire({
                      title:"PROBLEMAS",
                      icon:'error',
                      text:res.mensaje,
                      showConfirmButton:true
                    }).then(respuesta=>
                      {
                        if(respuesta.isConfirmed)
                        {
                          this.router.navigate['/central/usuarios'];
                        }
                    });
                  }
                }
              )
          }else{
            Swal.fire({
              title:"PROBLEMAS",
              icon:'error',
              text:mensaje,
              showConfirmButton:true
            }).then(respuesta=>
              {
                if(respuesta.isConfirmed)
                {
                  this.router.navigate['/central/usuarios'];
                }
              });
          }
    }
  }

  /*subirCedulaUsuario(cedula:any)
  {
    let nombreArchivo ="";
    this.LoginService.subirArchivoCedula(cedula).then(respuesta =>
      {
        nombreArchivo = respuesta.documentoUnoAfiliacion;
      }).catch(error =>
        {
          console.log("error : ",error);
        })
  }*/

  subirFoto()
  {

  }

  subirLicencia()
  {

  }

  subirExamenes()
  {

  }

  subirPlanilla()
  {

  }

  mostrarFormularioConductor()
  {
    this.displayCreacionConductor = true;
  }

  async guardar2()
  {
    if(this.edit==false)
    {
      console.log("1");
    if(this.perfilSeleccionado.idPerfil!=2)
    {
      console.log("2");
      console.log("3");
      console.log("4");
      if(this.archivoCedulaUsuario!=undefined && this.archivoCedulaUsuario != null)
      {
        let nombreArchivoCedulaUsuario:any = await this.LoginService.subirArchivoCedula(this.archivoCedulaUsuario);
        this.nombreArchivoCedulaUsuario = nombreArchivoCedulaUsuario.documentoUnoAfiliacion;
        console.log("nombre :",nombreArchivoCedulaUsuario);
      }

      this.progresoCreacionUsuario = this.progresoCreacionUsuario + 10;

      this.progresoCreacionUsuario = this.progresoCreacionUsuario + 5;
      if(this.archivoFotoUsuario != undefined && this.archivoFotoUsuario != null)
      {
        let nombreArchivoFotoUsuario:any = await this.data.subirArchivoFotoUsuario(this.archivoFotoUsuario);
        this.nombreArchivoFotoUsuario = nombreArchivoFotoUsuario.fotoPersona;
        console.log("nombre :",nombreArchivoFotoUsuario);
      }

      this.progresoCreacionUsuario = this.progresoCreacionUsuario + 10;

      this.progresoCreacionUsuario = this.progresoCreacionUsuario + 5;

      console.log("4.1");
      //this.Formulario.get('archCC').setValue(this.nombreArchivoCedulaUsuario);
      console.log("4.2");
      //this.Formulario.get('archFoto').setValue(this.nombreArchivoFotoUsuario);
      console.log("4.3");
      this.Formulario.markAllAsTouched();
      console.log("4.4");
      if(this.Formulario.valid)
      {
        console.log("5");
        console.log(this.resFoto.fotoPersona);
        console.log(this.resCC.documentoUnoAfiliacion);
        let JSON:any={};
        JSON.cuenta={};
        console.log("perfil seleccionado : ",this.perfilSeleccionado);
        JSON.cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
       //console.log("ciudad r ",this.Formulario.get('selectedC')?.value);
        JSON.persona={};
        JSON.persona.nombrePersona=this.Formulario.get('nom')?.value;
        JSON.persona.apellidoPersona=this.Formulario.get('ape')?.value;
        JSON.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
        JSON.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
        // JSON.persona.ciudadPersona={};
        // JSON.persona.ciudadPersona = this.Formulario.get('selectedC')?.value;
        JSON.persona.direccionPersona=this.Formulario.get('direccion')?.value;
        JSON.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
        JSON.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
        JSON.persona.correoPersona=this.Formulario.get('correo')?.value;
        JSON.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
        JSON.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
        // JSON.persona.ciudadExpedicionPersona={};
        // JSON.persona.ciudadExpedicionPersona=this.Formulario.get('ciudade')?.value;
        JSON.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
        JSON.persona.fotoPersona=this.nombreArchivoFotoUsuario;
        JSON.persona.tipoPersona=this.Formulario.get('tipoPersona')?.value;
        this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
        console.log("5");
        console.log("nuevo usuario",JSON);
        this.progresoCreacionUsuario = this.progresoCreacionUsuario + 50;
        this.data.crearUsu(JSON,this.perfilSeleccionado.idPerfil).subscribe(
          (res:any)=>{
            if(res.mensaje==1){
               this.ocultar=true;
                Swal.fire({
                    title:"ÉXITO",
                    icon:'success',
                    text:'Usuario Creado Exitosamente',
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }else{
                  this.ocultar=false;
                  Swal.fire({
                    title:"PROBLEMAS",
                    icon:'error',
                    text:res.mensaje,
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }
              }
            )
    }
    }else{
                console.log("4");

                if(this.archivoCedulaUsuario!=undefined && this.archivoCedulaUsuario!=null)
                {
                  let nombreArchivoCedulaUsuario:any = await this.LoginService.subirArchivoCedula(this.archivoCedulaUsuario);
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 10;
                  this.nombreArchivoCedulaUsuario = nombreArchivoCedulaUsuario.documentoUnoAfiliacion;
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 5;
                  console.log("nombre :",nombreArchivoCedulaUsuario);
                }

                if(this.archivoFotoUsuario!=undefined && this.archivoCedulaUsuario!=null)
                {
                  let nombreArchivoFotoUsuario:any = await this.data.subirArchivoFotoUsuario(this.archivoFotoUsuario);
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 10;
                  this.nombreArchivoFotoUsuario = nombreArchivoFotoUsuario.fotoPersona;
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 5;
                }


                if(this.archivoPlanillaAportesConducotr!=undefined && this.archivoCedulaUsuario!=null)
                {
                  let nombreArchivoPlanilla:any = await this.data.subirArchivoPlAnillaAportes(this.archivoPlanillaAportesConducotr);
                  this.nombreArchivoPlanilla = nombreArchivoPlanilla.planillaAportes;
                }

                if(this.archivoLicenciaConductor!=undefined && this.archivoCedulaUsuario!=null)
                {
                  let nombreArchvioLicencia:any = await this.LoginService.subirArchivoLicencia(this.archivoLicenciaConductor);
                  this.nombreArchivoLicencia = nombreArchvioLicencia.licenciaUnoAfiliacion;
                }

                if(this.archivoExamenesMedicosConductor!=undefined && this.archivoCedulaUsuario!=null)
                {
                  let nombreArchivoExamenes:any = await this.data.subirArchivoExamenesMedicos(this.archivoExamenesMedicosConductor);
                  this.nombreArchivoExamenes = nombreArchivoExamenes.examenesMedicos;
                }
                console.log("4.1");
                this.Formulario.markAllAsTouched();
                console.log("4.4");
                if(this.Formulario.valid)
                {
                  console.log("5");
                  console.log(this.resFoto.fotoPersona);
                  console.log(this.resCC.documentoUnoAfiliacion);
                  let JSON:any={};
                  JSON.cuenta={};
                  console.log("perfil seleccionado : ",this.perfilSeleccionado);
                  JSON.cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
                  JSON.persona={};
                  JSON.persona.nombrePersona=this.Formulario.get('nom')?.value;
                  JSON.persona.apellidoPersona=this.Formulario.get('ape')?.value;
                  JSON.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
                  JSON.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
                  // JSON.persona.ciudadPersona={};
                  // JSON.persona.ciudadPersona = this.Formulario.get('selectedC')?.value;
                  JSON.persona.direccionPersona=this.Formulario.get('direccion')?.value;
                  JSON.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
                  JSON.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
                  JSON.persona.correoPersona=this.Formulario.get('correo')?.value;
                  JSON.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
                  JSON.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
                  // JSON.persona.ciudadExpedicionPersona={};
                  // JSON.persona.ciudadExpedicionPersona=this.Formulario.get('ciudade')?.value;
                  JSON.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
                  JSON.persona.fotoPersona=this.nombreArchivoFotoUsuario;
                  JSON.persona.tipoPersona=this.Formulario.get('tipoPersona')?.value;
                  JSON.conductor={};
                  JSON.conductor.planillaAportesConductor=this.nombreArchivoPlanilla;
                  JSON.conductor.examenesMedicosConductor=this.nombreArchivoExamenes;
                  JSON.conductor.persona={};
                  JSON.conductor.rhConductor=this.formularioConductor.get("tipoSangre")?.value;
                  JSON.conductor.generoConductor =this.formularioConductor.get("genero")?.value;
                  JSON.conductor.inicioEpsConductor =this.formularioConductor.get("fechaInicioEps")?.value;
                  JSON.conductor.finEpsConductor =this.formularioConductor.get("fechaFinEps")?.value;
                  JSON.conductor.inicioArlConductor =this.formularioConductor.get("fechaInicioArl")?.value;
                  JSON.conductor.finArlConductor =this.formularioConductor.get("fechaFinArl")?.value;
                  JSON.conductor.cajaCompensacion={};
                  JSON.conductor.cajaCompensacion.idCajaCompensacion =this.formularioConductor.get("cajaCompensacion")?.value;
                  JSON.conductor.fondoPensiones={};
                  JSON.conductor.fondoPensiones.idFondoPensiones =this.formularioConductor.get("fondoPensiones")?.value;
                  JSON.conductor.eps={};
                  JSON.conductor.eps.idEps = this.formularioConductor.get("eps")?.value;
                  JSON.conductor.arl={};
                  JSON.conductor.arl.idArl = this.formularioConductor.get("arl")?.value;
                  JSON.conductor.estadoCivil={};
                  JSON.conductor.estadoCivil.idEstadoCivil =this.formularioConductor.get("estadoCivil")?.value;
                  JSON.licencia={};
                  //JSON.licencia.idLicencia =  this.this.conductorUsuarioPerfil.
                  JSON.licencia.fechaExpedicionLicencia=this.formularioConductor.get("fechaInicioLicencia")?.value;
                  JSON.licencia.fechaVencimientoLicencia=this.formularioConductor.get("fechaFinLicencia")?.value;
                  JSON.licencia.categoriaLicencia=this.formularioConductor.get("categoriaLicencia")?.value;
                  JSON.licencia.numeroLicencia=this.Formulario.get('numdoc')?.value;
                  JSON.licencia.documentoUnoLicencia=this.nombreArchivoLicencia;
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
                  console.log("5");
                  console.log("nuevo usuario",JSON);
                  this.progresoCreacionUsuario = this.progresoCreacionUsuario + 50;
                  this.data.crearUsuarioConductor(JSON,this.perfilSeleccionado.idPerfil).then(
                    (res:any)=>{
                      if(res.mensaje==1){
                        this.ocultar=true;
                        Swal.fire({
                          title:"ÉXITO",
                          icon:'success',
                          text:'Usuario Creado Exitosamente',
                          showConfirmButton:true
                        }).then(respuesta=>
                          {
                            if(respuesta.isConfirmed)
                            {
                              this.router.navigate['/central/usuarios'];
                            }
                          });
                      }else{
                        this.ocultar=false;
                        this.msm+=res.mensaje;
                        Swal.fire({
                          title:"PROBLEMAS",
                          icon:'error',
                          text:res.mensaje,
                          showConfirmButton:true
                        }).then(respuesta=>
                          {
                            if(respuesta.isConfirmed)
                            {
                              this.router.navigate['/central/usuarios'];
                            }
                          });
                      }
                    }
                  );
                }else{
                  let valores = this.formularioConductor.controls;
                  for (const key in valores)
                  {
                    if(this.formularioConductor.controls[key].valid==false)
                    {
                      console.log("campo pendiente : ",key);
                    }
                  }
                  console.log("valore : ",this.formularioConductor.valid);

                }
    }
      }else{
      console.log("1");
      let perfilesUsuario = this.resedit.perfilList;
      let esConductor:boolean = false;
      for (const iterator of this.perfileslist)
      {
        if(iterator.idPerfil == 2)
        {
          esConductor = true;
          break;
        }
      }
    if(!esConductor)
    {
      if(this.nuevoConductorEditar==false)
      {
        console.log("nombre archivo foto : ",this.nombreArchivoFotoUsuario);
        console.log("perfil es diferente a conductor");
          console.log("2");
          console.log("3");
          console.log("4");
          this.nombreArchivoCedulaUsuario = this.docuno;
          this.nombreArchivoFotoUsuario = this.fotoper;
          this.Formulario.markAllAsTouched();
          console.log("4.4");
          if(this.Formulario.valid)
          {
            console.log("5");
            console.log(this.resFoto.fotoPersona);
            console.log(this.resCC.documentoUnoAfiliacion);
            let cuenta:any={};

            console.log("perfil seleccionado : ",this.perfilSeleccionado);
            cuenta.idCuenta=this.resedit.cuenta.idCuenta;
            cuenta.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
            cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
            cuenta.persona={};
            cuenta.persona.nombrePersona=this.Formulario.get('nom')?.value;
            cuenta.persona.apellidoPersona=this.Formulario.get('ape')?.value;
            cuenta.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
            cuenta.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
            cuenta.persona.ciudadPersona={};
            cuenta.persona.ciudadPersona.idCiudad=this.inputc[1];
            cuenta.persona.direccionPersona=this.Formulario.get('direccion')?.value;
            cuenta.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
            cuenta.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
            cuenta.persona.correoPersona=this.Formulario.get('correo')?.value;
            cuenta.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
            cuenta.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
            cuenta.persona.ciudadExpedicionPersona={};
            cuenta.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
            cuenta.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
            cuenta.persona.fotoPersona=this.fotoper;
            cuenta.persona.tipoPersona=this.Formulario.get('tipoPersona')?.value;
            this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
            console.log("5");
            console.log("nuevo usuario",cuenta);
            this.data.actualizarUsu(cuenta).subscribe(
              (res:any)=>{
                if(res.mensaje==1){
                  this.ocultar=true;
                  Swal.fire({
                    title:"ÉXITO",
                    icon:'success',
                    text:'Usuario Actualizado Exitosamente',
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }else{
                  this.ocultar=false;
                  Swal.fire({
                    title:"PROBLEMAS",
                    icon:'error',
                    text:res.mensaje,
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }
              }
            )
          }
      }else{
        let JSON:any = {};
        JSON.conductor={};
                  JSON.conductor.planillaAportesConductor=this.nombreArchivoPlanilla;
                  JSON.conductor.examenesMedicosConductor=this.nombreArchivoExamenes;
                  JSON.conductor.persona={};
                  JSON.conductor.persona.idPersona = this.resedit.cuenta.persona.idPersona;
                  JSON.conductor.persona.idPersona = this.resedit.cuenta.persona.tipoPersona;
                  JSON.conductor.rhConductor=this.formularioConductor.get("tipoSangre")?.value;
                  JSON.conductor.generoConductor =this.formularioConductor.get("genero")?.value;
                  JSON.conductor.inicioEpsConductor =this.formularioConductor.get("fechaInicioEps")?.value;
                  JSON.conductor.finEpsConductor =this.formularioConductor.get("fechaFinEps")?.value;
                  JSON.conductor.inicioArlConductor =this.formularioConductor.get("fechaInicioArl")?.value;
                  JSON.conductor.finArlConductor =this.formularioConductor.get("fechaFinArl")?.value;
                  JSON.conductor.cajaCompensacion={};
                  JSON.conductor.cajaCompensacion.idCajaCompensacion =this.formularioConductor.get("cajaCompensacion")?.value;
                  JSON.conductor.fondoPensiones={};
                  JSON.conductor.fondoPensiones.idFondoPensiones =this.formularioConductor.get("fondoPensiones")?.value;
                  JSON.conductor.eps={};
                  JSON.conductor.eps.idEps = this.formularioConductor.get("eps")?.value;
                  JSON.conductor.arl={};
                  JSON.conductor.arl.idArl = this.formularioConductor.get("arl")?.value;
                  JSON.conductor.estadoCivil={};
                  JSON.conductor.estadoCivil.idEstadoCivil =this.formularioConductor.get("estadoCivil")?.value;
                  JSON.licencia={};
                  JSON.licencia.fechaExpedicionLicencia=this.formularioConductor.get("fechaInicioLicencia")?.value;
                  JSON.licencia.fechaVencimientoLicencia=this.formularioConductor.get("fechaFinLicencia")?.value;
                  JSON.licencia.categoriaLicencia=this.formularioConductor.get("categoriaLicencia")?.value;
                  JSON.licencia.numeroLicencia=this.Formulario.get('numdoc')?.value;
                  JSON.licencia.documentoUnoLicencia=this.nombreArchivoLicencia;
                  console.log(JSON)
        let mensaje:any = await this.data.crearConductorNuevoPerfilEditar(JSON);
        if(mensaje.mensaje == 1)
        {
          Swal.fire({
            title:"ÉXITO",
            icon:'success',
            text:'COnductor Creado Exitosamente',
            showConfirmButton:true
          }).then(respuesta=>
            {
              if(respuesta.isConfirmed)
              {
                this.router.navigate['/central/usuarios'];
              }
            });
            var jsoncond:any={};
            jsoncond.idCuenta=this.resedit.cuenta.idCuenta;
            jsoncond.idPerfil=2;
            console.log(jsoncond);
            this.data.agregarPerf(jsoncond).subscribe();
          console.log("perfil seleccionado : ",this.perfilSeleccionado);
          let cuenta:any = {};
            cuenta.idCuenta=this.resedit.cuenta.idCuenta;
            cuenta.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
            cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
            cuenta.persona={};
            cuenta.persona.nombrePersona=this.Formulario.get('nom')?.value;
            cuenta.persona.apellidoPersona=this.Formulario.get('ape')?.value;
            cuenta.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
            cuenta.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
            cuenta.persona.ciudadPersona={};
            cuenta.persona.ciudadPersona.idCiudad=this.inputc[1];
            cuenta.persona.direccionPersona=this.Formulario.get('direccion')?.value;
            cuenta.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
            cuenta.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
            cuenta.persona.correoPersona=this.Formulario.get('correo')?.value;
            cuenta.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
            cuenta.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
            cuenta.persona.ciudadExpedicionPersona={};
            cuenta.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
            cuenta.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
            cuenta.persona.tipoPersona=this.Formulario.get('tipoPersona')?.value;
            //cuenta.persona.fotoPersona=this.nombreArchivoFotoUsuario;
            cuenta.persona.fotoPersona=this.fotoper;
            this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
            console.log("5");
            console.log("nuevo usuario",cuenta);
            this.data.actualizarUsu(cuenta).subscribe(
              (res:any)=>{
                if(res.mensaje==1){
                  this.ocultar=true;
                  Swal.fire({
                    title:"ÉXITO",
                    icon:'success',
                    text:'Usuario Actualizado Exitosamente',
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }else{
                  this.ocultar=false;
                  Swal.fire({
                    title:"PROBLEMAS",
                    icon:'error',
                    text:res.mensaje,
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
                }
              }
            )
        }else{
          Swal.fire({
            title:"PROBLEMAS",
            icon:'error',
            text:mensaje,
            showConfirmButton:true
          }).then(respuesta=>
            {
              if(respuesta.isConfirmed)
              {
                this.router.navigate['/central/usuarios'];
              }
            });
        }
      }

    }else{
      console.log("perfil conductor");
      console.log("4");
      this.nombreArchivoCedulaUsuario = this.docuno;
      this.nombreArchivoFotoUsuario = this.fotoper;
      this.nombreArchivoPlanilla = this.conductorUsuarioPerfil.planillaAportesConductor;
      this.nombreArchivoLicencia = this.conductorUsuarioPerfil.licenciaList[0]?.documentoUnoLicencia;
      this.nombreArchivoExamenes = this.conductorUsuarioPerfil.examenesMedicosConductor;
      console.log("4.1");
      this.Formulario.markAllAsTouched();
      console.log("4.4");
      if(this.Formulario.valid && this.formularioConductor.valid)
      {
        console.log("5");
        console.log(this.resFoto.fotoPersona);
        console.log(this.resCC.documentoUnoAfiliacion);
        let JSON:any={};
        JSON.cuenta={};
        console.log("perfil seleccionado : ",this.perfilSeleccionado);
        JSON.cuenta.estadoCuenta=this.Formulario.get('swest')?.value?1:0;
        JSON.cuenta.idCuenta=this.resedit.cuenta.idCuenta;
        JSON.cuenta.usuarioCuenta=this.Formulario.get('usucuenta')?.value;
        JSON.cuenta.persona={};
        JSON.cuenta.persona.idPersona= this.Formulario.get('idPersona')?.value;
        JSON.cuenta.persona.nombrePersona=this.Formulario.get('nom')?.value;
        JSON.cuenta.persona.apellidoPersona=this.Formulario.get('ape')?.value;
        JSON.cuenta.persona.tipoDocPersona=this.Formulario.get('tipodoc')?.value;
        JSON.cuenta.persona.documentoPersona=this.Formulario.get('numdoc')?.value;
        JSON.cuenta.persona.ciudadPersona={};
        JSON.cuenta.persona.ciudadPersona.idCiudad=this.inputc[1];
        JSON.cuenta.persona.direccionPersona=this.Formulario.get('direccion')?.value;
        JSON.cuenta.persona.observacionesPersona=this.Formulario.get('obsv')?.value;
        JSON.cuenta.persona.fechaNacimientoPersona=this.Formulario.get('fechaN')?.value;
        JSON.cuenta.persona.correoPersona=this.Formulario.get('correo')?.value;
        JSON.cuenta.persona.celularUnoPersona=this.Formulario.get('tel1')?.value;
        JSON.cuenta.persona.celularDosPersona=this.Formulario.get('tel2')?.value;
        JSON.cuenta.persona.ciudadExpedicionPersona={};
        JSON.cuenta.persona.ciudadExpedicionPersona.idCiudad=this.inputc[0];
        JSON.cuenta.persona.documentoUnoPersona=this.nombreArchivoCedulaUsuario;
        JSON.cuenta.persona.fotoPersona=this.nombreArchivoFotoUsuario;
        JSON.cuenta.persona.tipoPersona=this.Formulario.get('tipoPersona')?.value;
        JSON.conductor={};
        JSON.conductor.idConductor = this.conductorUsuarioPerfil.idConductor;
        JSON.conductor.planillaAportesConductor=this.nombreArchivoPlanilla;
        JSON.conductor.examenesMedicosConductor=this.nombreArchivoExamenes;
        JSON.conductor.persona=JSON.cuenta.persona;
        JSON.conductor.rhConductor=this.formularioConductor.get("tipoSangre")?.value;
        JSON.conductor.generoConductor =this.formularioConductor.get("genero")?.value;
        JSON.conductor.inicioEpsConductor =this.formularioConductor.get("fechaInicioEps")?.value;
        JSON.conductor.finEpsConductor =this.formularioConductor.get("fechaFinEps")?.value;
        JSON.conductor.inicioArlConductor =this.formularioConductor.get("fechaInicioArl")?.value;
        JSON.conductor.finArlConductor =this.formularioConductor.get("fechaFinArl")?.value;
        JSON.conductor.cajaCompensacion={};
        JSON.conductor.cajaCompensacion.idCajaCompensacion =this.formularioConductor.get("cajaCompensacion")?.value;
        JSON.conductor.fondoPensiones={};
        JSON.conductor.fondoPensiones.idFondoPensiones =this.formularioConductor.get("fondoPensiones")?.value;
        JSON.conductor.eps={};
        JSON.conductor.eps.idEps = this.formularioConductor.get("eps")?.value;
        JSON.conductor.arl={};
        JSON.conductor.arl.idArl = this.formularioConductor.get("arl")?.value;
        JSON.conductor.estadoCivil={};
        JSON.conductor.estadoCivil.idEstadoCivil =this.formularioConductor.get("estadoCivil")?.value;
        //JSON.conductor.estadoConductor = this.nuevoConductorEditar.estadoConductor;
        JSON.licencia={};
        console.log("bandera : ",this.conductorUsuarioPerfil.licenciaList[0]?.idLicencia);
        JSON.licencia.idLicencia = this.conductorUsuarioPerfil.licenciaList[0]?.idLicencia;
        JSON.licencia.fechaExpedicionLicencia=this.formularioConductor.get("fechaInicioLicencia")?.value;
        JSON.licencia.fechaVencimientoLicencia=this.formularioConductor.get("fechaFinLicencia")?.value;
        JSON.licencia.categoriaLicencia=this.formularioConductor.get("categoriaLicencia")?.value;
        JSON.licencia.numeroLicencia=this.Formulario.get('numdoc')?.value;
        JSON.licencia.documentoUnoLicencia=this.nombreArchivoLicencia;
        this.progresoCreacionUsuario = this.progresoCreacionUsuario + 20;
        console.log("5");
        console.log("nuevo usuario",JSON);
        this.progresoCreacionUsuario = this.progresoCreacionUsuario + 50;
        console.log("progresa",this.progresoCreacionUsuario);
        this.data.actualizarUsuarioConductor(JSON).subscribe(
        (res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            Swal.fire({
                    title:"ÉXITO",
                    icon:'success',
                    text:'Usuario Actualizado Exitosamente',
                    showConfirmButton:true
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        this.router.navigate['/central/usuarios'];
                      }
                    });
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
            Swal.fire({
              title:"PROBLEMAS",
              icon:'error',
              text:res.mensaje,
              showConfirmButton:true
              }).then(respuesta=>
               {
                if(respuesta.isConfirmed)
                {
                  this.router.navigate['/central/usuarios'];
                }
               });
            }
          }
        );
      }
      else{
        console.log("error de formulario");
        Swal.fire({
          title:"PROBLEMAS",
          icon:'error',
          text:"Faltan campos por llenar",
          showConfirmButton:true
          });
      }
    }
    }
   }

  guardarLicenciaConductor(event:any)
  {
    this.archivoLicenciaConductor = event.target.files[0];
  }

  guardarPlanillaConductor(event:any)
  {
    this.archivoPlanillaAportesConducotr = event.target.files[0];
  }

  guardarExamenesConductor(event:any)
  {
    this.archivoExamenesMedicosConductor = event.target.files[0];
  }

  guardarArchivoCedulaUsuario(event:any)
  {
    this.archivoCedulaUsuario = event.target.files[0];
  }

  guardarArchivoFotoUsuario(event:any)
  {
    this.archivoFotoUsuario = event.target.files[0];
  }

  descargarDocumentoIdentidadConductor()
  {

    this.data.obtenerImagenVehCC(this.docuno);
  }

  descargarFotoUsuario()
  {
    this.data.obtenerImagenVehFoto(this.resFoto.fotoPersona);
  }

  async cambiarDocumentoIdentidadUsuario(event:any)
  {
    let archivoNuevo = event.target.files[0];
    let idPersona = this.resedit.cuenta.persona.idPersona;
    console.log("1");
    let objeto:any = await this.data.cambiarArchivoCedulaUsuario(archivoNuevo,this.docuno,idPersona);
    console.log("2");
    console.log(objeto);
    console.log("3");
    this.docuno = objeto.archivoCedula;
    console.log("4");
    Swal.fire({
      title: 'Éxito',
      text: 'Archivo Actualizado',
      icon:'success'
    })
  }

  async cambiarFotoUsuario(event:any)
  {
    let archivoNuevo = event.target.files[0];
    let idPersona = this.resedit.cuenta.persona.idPersona;
    console.log("1");
    if(this.resFoto.fotoPersona!=null && this.resFoto.fotoPersona!='' && this.resFoto.fotoPersona!=undefined)
    {
      console.log("1");
      let objeto:any = await this.data.cambiarFotoUsuario(archivoNuevo,this.resFoto.fotoPersona);
      console.log("2");
      console.log(objeto);
      console.log("3");
      console.log("nuevo archivo : ",objeto);
      this.fotoper = objeto.fotoPersona;
      this.nombreArchivoFotoUsuario = this.fotoper;
      console.log("4");
      Swal.fire({
        title: 'Éxito',
        text: 'Archivo Actualizado',
        icon:'success'
      })
    }else{
      let objeto:any = await this.data.subirArchivoFotoUsuario(archivoNuevo);
      console.log("2");
      console.log(objeto);
      console.log("3");
      console.log("nuevo archivo : ",objeto);
      this.fotoper = objeto.fotoPersona;
      this.nombreArchivoFotoUsuario = this.fotoper;
      console.log("4");
      Swal.fire({
        title: 'Éxito',
        text: 'Archivo Actualizado',
        icon:'success'
      })
    }

  }

  async cambiarArchivoLicenciaConductor(event:any)
  {
    if(this.nombreArchivoLicencia==undefined || this.nombreArchivoLicencia=='')
    {
      console.log("No definido ",this.conductorUsuarioPerfil.licenciaList[0]);
      //this.conductorUsuarioPerfil.licenciaList = [];
      let archivoNuevo = event.target.files[0];
      let idPersona = this.resedit.cuenta.persona.idPersona;
      console.log("1");
      let objeto:any = await this.data.subirArchivoLicencia(archivoNuevo);
      console.log("2");
      console.log(objeto);
      console.log("3");
      this.conductorUsuarioPerfil.licenciaList[0].documentoUnoLicencia = objeto.licenciaUnoAfiliacion;
      this.nombreArchivoLicencia= objeto.licenciaUnoAfiliacion;
      Swal.fire({
        title: 'Éxito',
        text: 'Archivo Actualizado',
        icon:'success'
      })
    }else{
      console.log("definido ",this.conductorUsuarioPerfil.licenciaList[0]," ",this.nombreArchivoLicencia);
      let archivoNuevo = event.target.files[0];
    let idPersona = this.resedit.cuenta.persona.idPersona;
    console.log("1");
    //let objeto:any = await this.data.cambiarArchivoLicenciaConductor(archivoNuevo,this.resFoto.fotoPersona);
    let objeto:any = await this.data.cambiarArchivoLicenciaConductor(archivoNuevo,this.nombreArchivoLicencia);
    this.nombreArchivoLicencia = objeto.licenciaUnoAfiliacion;
    console.log("2");
    console.log(objeto);
    console.log("3");
    //this.conductorUsuarioPerfil.licenciaList[0].documentoUnoLicencia = objeto.archivoLicenciaConduccion;
    this.nombreArchivoLicencia = objeto.archivoLicenciaConduccion;
    console.log("4");

    }

  }

  async cambiarArchivoExamenesConductor(event:any)
  {
    let archivoNuevo = event.target.files[0];
    let idPersona = this.resedit.cuenta.persona.idPersona;
    console.log("1");
    let objeto:any = await this.data.cambiarArchivoExamenesMedicosConductor(archivoNuevo,this.resFoto.fotoPersona);
    console.log("2");
    console.log(objeto);
    console.log("3");
    this.conductorUsuarioPerfil.examenesMedicosConductor = objeto.examenesMedicos;
    this.nombreArchivoExamenesEditar = objeto.examenesMedicos;
    console.log("4");
    Swal.fire({
      title: 'Éxito',
      text: 'Archivo Actualizado',
      icon:'success'
    })
  }

  async cambiarArchivoPlanilla(event:any)
  {
    let archivoNuevo = event.target.files[0];
    let idPersona = this.resedit.cuenta.persona.idPersona;
    console.log("1");
    let objeto:any = await this.data.cambiarArchivoPlanillaAportesConductor(archivoNuevo,this.resFoto.fotoPersona);
    console.log("2");
    console.log(objeto);
    console.log("3");
    this.conductorUsuarioPerfil.planillaAportesConductor = objeto.planillaAportes;
    this.nombreAarchivoPlanillaEditar = objeto.planillaAportes;
    console.log("4");
    Swal.fire({
      title: 'Éxito',
      text: 'Archivo Actualizado',
      icon:'success'
    })
  }

  descargarArchivoLicenciaConductor()
  {
    this.data.obtenerImagenVehLC(this.conductorUsuarioPerfil.licenciaList[0].documentoUnoLicencia);
  }

  descargarArchivoExamenes()
  {
    this.data.obtenerImagenExMedicos(this.conductorUsuarioPerfil.examenesMedicosConductor);
  }

  descargarArchivoPlanilla()
  {
    this.data.obtenerImagenPlAportes(this.conductorUsuarioPerfil.planillaAportesConductor);
  }

  filtrarCiudadesExpedicion(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.ciudadesE.length; i++) {
        let ciudad:any = this.ciudadesE[i];
        if (ciudad.ciudad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(ciudad);
        }
    }

    this.ciudadesFiltradasExpedicion = filtered;
}
filtrarCiudadesResidencia(event:any) {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : any[] = [];
  let query = event.query;

  for(let i = 0; i < this.ciudadesU.length; i++) {
      let ciudad:any = this.ciudadesU[i];
      if (ciudad.ciudad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(ciudad);
      }
  }
  this.ciudadesFiltradasResidencia = filtered;
}


}
