import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { Ciudad } from 'src/app/models/ciudad';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  alertpen=false;
  usu:string;
  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  fotoper="";
  resFoto:any;
  ciudades:Array<Ciudad>=[];
  ciudadesC:Array<Ciudad>=[];
  listoC:boolean;
  iduser:number;
  inputc:number;
  username="";
  inpusername=false;
  alertusu=false;
  listauser:Array<any>;
  param: string;
  resedit:any;
  archantFoto:string;
  archnomFoto:string;
  archfileFoto:File;
  archalertFoto:boolean;
  checkblur:number;
  porcentaje: number;
  cliente:any;



  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.usu="";
    this.porcentaje=0;
    this.param="";
    this.resedit={};
    this.edit=false;
    this.view=false;
    this.iduser=-1;
    this.listoC=false;
    this.inputc=-1;
    this.archantFoto="";
    this.archnomFoto="Selecciona un Archivo";
    this.archfileFoto=new File(["foo"], "Imagen", {
      type: "text/plain",
    });
    this.archalertFoto=false;
    this.listauser=[];
    this.checkblur=0;
    var numberpattern="[0-9]+";
    this.obtenerCiudades();
    this.Formulario=new FormGroup({
      razon:new FormControl('',[Validators.required]),
      nit:new FormControl('',[Validators.required,Validators.pattern(numberpattern)]),
      direccion:new FormControl('',[Validators.required]),
      enviop:new FormControl(false,),
      swest:new FormControl(true,),
      fins:new FormControl(false,),
      selectedC:new FormControl('',[Validators.required]),
      archlogo:new FormControl(''),
      correo:new FormControl('',[Validators.required, Validators.email]),
      tel1:new FormControl('',[Validators.required,this.validtel]),
      tel2:new FormControl('',[this.validtel]),
    },{
      validators:[this.checkC.bind(this)]
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
      this.obtenerCiudades();
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerUsuario(urlid).subscribe(
        (res:any)=>{
          this.cliente = res;
          console.log("cliente : ",res);
          this.resedit=res;
          this.resFoto={};
          this.resFoto.logoCliente=res.cuenta.cliente.logoCliente!=null?res.cuenta.cliente.logoCliente:null;
          this.fotoper=res.cuenta.cliente.logoCliente!=null?res.cuenta.cliente.logoCliente:null;
          this.inputc=res.cuenta.cliente.ciudadCliente!=null?res.cuenta.cliente.ciudadCliente.idCiudad:-1;
          this.Formulario.patchValue({
            razon:res.cuenta.cliente.razonSocialCliente,
            nit:res.cuenta.cliente.nitCliente,
            direccion:res.cuenta.cliente.direccionCliente,
            enviop:res.cuenta.cliente.envioProgramacionCliente==1?true:false,
            swest:res.cuenta.estadoCuenta==1 ?true:false,
            fins:res.cuenta.cliente.finalizarServicioCliente==1?true:false,
            selectedC:res.cuenta.cliente.ciudadCliente.ciudad,
            correo:res.cuenta.cliente.correoCliente,
            tel1:res.cuenta.cliente.celularUnoCliente!=null?res.cuenta.cliente.celularUnoCliente:"",
            tel2:res.cuenta.cliente.celularDosCliente!=null?res.cuenta.cliente.celularDosCliente:"",
          });
        });

    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerUsuario(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit=res;
          this.resFoto={};
          this.resFoto.logoCliente=res.cuenta.cliente.logoCliente!=null?res.cuenta.cliente.logoCliente:null;
          this.fotoper=res.cuenta.cliente.logoCliente!=null?res.cuenta.cliente.logoCliente:null;
          this.inputc=res.cuenta.cliente.ciudadCliente!=null?res.cuenta.cliente.ciudadCliente.idCiudad:-1;
          this.Formulario.patchValue({
            razon:res.cuenta.cliente.razonSocialCliente,
            nit:res.cuenta.cliente.nitCliente,
            direccion:res.cuenta.cliente.direccionCliente,
            enviop:res.cuenta.cliente.envioProgramacionCliente==1?true:false,
            swest:res.cuenta.estadoCuenta==1 ?true:false,
            fins:res.cuenta.cliente.finalizarServicioCliente==1?true:false,
            selectedC:res.cuenta.cliente.ciudadCliente.ciudad,
            correo:res.cuenta.cliente.correoCliente,
            tel1:res.cuenta.cliente.celularUnoCliente!=null?res.cuenta.cliente.celularUnoCliente:"",
            tel2:res.cuenta.cliente.celularDosCliente!=null?res.cuenta.cliente.celularDosCliente:"",
          });
          this.Formulario.disable();
        });
    }
  }

  /**
   * Segun si es Edit o no se manda la peticion definitiva, que guarda todos los cambios si es crear o editar si este el porcentaje de completado es igual a 100 se ejecuta el proceso de publicacion del registro
   */
  completarSolicitud(){
    let JSON:any={};
    if(this.porcentaje==100){
      if(this.edit){
        JSON.idCuenta=this.resedit.cuenta.idCuenta;
        JSON.cliente={};
        JSON.cliente.idCliente=this.resedit.cuenta.cliente.idCliente;
        JSON.cliente.razonSocialCliente=this.Formulario.get("razon")?.value;
        JSON.cliente.nitCliente=this.Formulario.get("nit")?.value;
        JSON.cliente.direccionCliente=this.Formulario.get("direccion")?.value;
        JSON.cliente.envioProgramacionCliente=this.Formulario.get("enviop")?.value?1:0;
        JSON.cliente.finalizarServicioCliente=this.Formulario.get("fins")?.value?1:0;
        JSON.cliente.ciudadCliente={};
        JSON.cliente.ciudadCliente.idCiudad=this.inputc;
        JSON.cliente.logoCliente=this.resFoto!=null?this.resFoto.logoCliente:null;
        JSON.cliente.correoCliente=this.Formulario.get("correo")?.value;
        JSON.cliente.celularUnoCliente=this.Formulario.get("tel1")?.value;
        JSON.cliente.celularDosCliente=this.Formulario.get("tel2")?.value;
        JSON.estadoCuenta=this.Formulario.get("swest")?.value?1:0;

        console.log(JSON);
        this.data.actualizarCli(JSON).subscribe(
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
      }else{
        JSON.cliente={};
        JSON.cliente.razonSocialCliente=this.Formulario.get("razon")?.value;
        JSON.cliente.nitCliente=this.Formulario.get("nit")?.value;
        JSON.cliente.direccionCliente=this.Formulario.get("direccion")?.value;
        JSON.cliente.envioProgramacionCliente=this.Formulario.get("enviop")?.value?1:0;
        JSON.cliente.finalizarServicioCliente=this.Formulario.get("fins")?.value?1:0;
        JSON.cliente.ciudadCliente={};
        JSON.cliente.ciudadCliente.idCiudad=this.inputc;
        JSON.cliente.logoCliente=this.resFoto!=null?this.resFoto.logoCliente:null;
        JSON.cliente.correoCliente=this.Formulario.get("correo")?.value;
        JSON.cliente.celularUnoCliente=this.Formulario.get("tel1")?.value;
        JSON.cliente.celularDosCliente=this.Formulario.get("tel2")?.value;
        JSON.cuenta={};

        JSON.cuenta.estadoCuenta=this.Formulario.get("swest")?.value?1:0;

        console.log(JSON);
        this.data.crearCli(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        })
      }
    }

  }

  /**
   * Segun si el Formulario es valido o no, se evalua si es Edit o no, se suben las fotos, para por ultimo llamar el metodo completarSolicitud
   */
  guardar(){
    this.porcentaje=0;
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid ){
      console.log(this.Formulario);
      this.alertpen=true;
    }else{
      if(this.edit){
        if(this.archnomFoto!="Selecciona un Archivo" && (this.fotoper==null || this.fotoper=='null' || this.fotoper=='')){
          this.data.subirArchivoLogo(
            this.archfileFoto
          ).subscribe(
            (resF:any)=>{

              console.log(resF);
              this.resFoto=resF;
              this.porcentaje+=100;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else if(this.archnomFoto!="Selecciona un Archivo"){
          this.data.ActualizarArchivoLogo(
            this.archfileFoto,
            this.fotoper
          ).subscribe(
            (resF:any)=>{
              console.log(resF);
              this.resFoto=resF;
              this.porcentaje+=100;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }
        else {
          this.porcentaje+=100;
          this.completarSolicitud();
        }
      }else{
        if(this.archnomFoto!="Selecciona un Archivo"){
          this.data.subirArchivoLogo(
            this.archfileFoto
          ).subscribe(
            (resF:any)=>{
              this.resFoto=resF;
              this.porcentaje+=100;
              this.completarSolicitud();
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.resFoto=null;
          this.porcentaje+=100;
          this.completarSolicitud();
        }
      }
    }


  }

  /**
   * Obtener la lista de las ciudades.
   */
  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:Array<Ciudad>) => {
        this.ciudades = ciudad;
        this.ciudadesC = ciudad;

        this.Formulario.updateValueAndValidity();
      });
  }

  /**
   * Llama al metodo de  descarga donde crea una nueva pestaña para visualizar el archivo
   * @param nom Recibe el nombre de la foto a mostrar
   */
  downloadFoto(nom:string){
    this.data.obtenerImagenLogo(nom);
  }

  /**
   * Cambia la foto dependiendo de si hay foto o no
   * @param element recive la variable de evento generada en el change, que trae el archivo
   */
  cambioFoto(element:any){
    console.log(element);
    if(element.target.files[0]!==undefined){

        this.archfileFoto=element.target.files[0];
        this.archnomFoto=element.target.files[0].name;
    }else{
      this.archnomFoto="Selecciona un Archivo";
    }
  }

  /**
   * Cuando hay algun cambio en el espacio de la ciudad se cambiara el select, dependiendo de si existe alguna ciudad comparando el espacio.
   */
  cambioC(){
    console.log(this.ciudadesC);
    console.log(this.listoC);
      this.listoC=true;
      this.ciudadesC=[];
      for(var i=0;i<this.ciudades.length;i++){
        this.ciudadesC.push(this.ciudades[i]);
      }
      //this.doc[i]=false;
      this.inputc=-1;
      //this.docauth[i]=false;
      let pas = this.ciudadesC.filter(ciud=> ciud.ciudad.includes((this.Formulario.get('selectedC')?.value).toUpperCase()));
      this.ciudadesC=pas;
      //console.log(pas);
      if(pas.length!=0){
        var found1 = this.ciudadesC.findIndex(element =>element.ciudad==(this.Formulario.get('selectedC')?.value).toUpperCase());
        if(-1!=found1){
          this.inputc=pas[found1].idCiudad;
          this.Formulario.get('selectedC')?.setValue(pas[found1].ciudad);
          this.listoC=false;
          //console.log(this.inputc[pos])
        }
      }


  }

  /**
   * si se selecciona una ciudad desde el autorrellenado se rellena el espacio de la ciudad y se guarda el id para cuando vaya a guardar
   * @param id Id de la ciudad
   * @param nom Nombre de la Ciudad
   */
  selectC(id:number,nom:string){
    this.inputc=id;
      this.Formulario.get('selectedC')?.setValue(nom);
    this.listoC=false;
  }

  /**
   * Activa o desactiva la vista de lista de Ciudades
   */
  vfocus(){
    this.checkblur=0;
    this.listoC=true;
    this.cambioC();
  }

  /**
   * Checkea la ciudad si es valida.
   * @param group Recibe todo el FormGroup
   * @returns Retorna siempre null y modifica el control de la ciudad para mostrar el error
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
   * Valida si el telefono es valido dependiendo del tamaño de la cadena
   * @param ctrl Recibe el control a evaluar
   * @returns Retorna El tipo de error o null
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
   * Valida si el archivo es valido
   * @param ctrl Recibe el control
   * @returns retorna null o el tipo de error si es requerido o extension
   */
  validarch(ctrl: AbstractControl): ValidationErrors  | null {
    console.log(ctrl.value) ;
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






}
