import { CentralService } from 'src/app/services/central.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Propietario } from 'src/app/models/propietario';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {
  labels: any;
  alertpen=false;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  iduser:number;
  tipodocs:any;
  selectnopropArray:Array<Propietario>;
  nopropArray:Array<Propietario>;
  docuno="";
  docdos="";
  fotoper="";
  idpersona:number;
  idprop:number;
  archnomvehCC:Array<string>=[];
  archfilevehCC:Array<File>=[];
  archalertvehCC:Array<boolean>=[];
  porcentaje: number;
  resCC:any;
  resedit:any;
  param: string;
  propietario:any;
  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.porcentaje=0;
    this.edit=false;
    this.view=false;
    this.iduser=-1;
    this.idpersona=-1;
    this.idprop=-1;
    this.selectnopropArray=[];
    this.nopropArray=[];
    this.tipodocs=[];
    this.resCC={};
    this.resedit={};
    var numberpattern="[0-9]+";
    this.Formulario = new FormGroup({
      swest:new FormControl(false),
      prop:new FormControl( '',{validators:[Validators.required,this.validatePT.bind(this)]}),
      nomprop:new FormControl( ''),
      apeprop:new FormControl( ''),
      tipodocprop:new FormControl( {value:'',disabled:true}),
      numdocprop:new FormControl( ''),
      correoprop:new FormControl( ''),
      tel1prop:new FormControl( ''),
      tel2prop:new FormControl( ''),
      direccionprop:new FormControl( ''),
      ciudadprop:new FormControl( ''),
      fechaN:new FormControl( ''),
      ciudadeprop:new FormControl( ''),
      idioma:new FormControl( ''),
      usucuenta:new FormControl( ''),
      fechaR:new FormControl( ''),
      fechaA:new FormControl( ''),
      archCC:new FormControl( '',[this.validarch]),
      archCC1:new FormControl( '',[this.validarch]),
    },{
      validators:[this.checkArch.bind(this)]
    })
    this.archnomvehCC.push("Selecciona un Archivo");
    this.archnomvehCC.push("Selecciona un Archivo");
    this.archfilevehCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archfilevehCC.push(new File(["foo"], "Imagen", {
      type: "text/plain",
    }));
    this.archalertvehCC.push(false);
    this.archalertvehCC.push(false);
    this.obtenerUsuarios();
    this.obtenerTipoDoc();
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
      this.Formulario.get("prop")?.setValidators([this.validatePT.bind(this)]);
      this.Formulario.get("prop")?.updateValueAndValidity();
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerPropietario(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.propietario = res;
          this.resedit={}
          
          this.resedit=res;
          this.idprop=res.idPropietario;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          console.log(this.resCC);
          this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
          this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoPropietario==1?true:false,
            nomprop:res.persona.nombrePersona,
            apeprop:res.persona.apellidoPersona,
            tipodocprop:res.persona.tipoDocPersona,
            numdocprop:res.persona.documentoPersona,
            correoprop:res.persona.correoPersona,
            tel1prop:res.persona.celularUnoPersona,
            tel2prop:res.persona.celularDosPersona,
            direccionprop:res.persona.direccionPersona,
            ciudadprop:res.persona!=null?res.persona.ciudadPersona.ciudad:"",
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadeprop:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroPropietario!=null?res.fechaRegistroPropietario.substr(0,10):"",
            fechaA:res.fechaActualizacionPropietario!=null?res.fechaActualizacionPropietario.substr(0,10):"",
          });
      })
    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerPropietario(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={}
          
          this.resedit=res;
          this.idprop=res.idPropietario;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          console.log(this.resCC);
          this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
          this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoPropietario==1?true:false,
            nomprop:res.persona.nombrePersona,
            apeprop:res.persona.apellidoPersona,
            tipodocprop:res.persona.tipoDocPersona,
            numdocprop:res.persona.documentoPersona,
            correoprop:res.persona.correoPersona,
            tel1prop:res.persona.celularUnoPersona,
            tel2prop:res.persona.celularDosPersona,
            direccionprop:res.persona.direccionPersona,
            ciudadprop:res.persona!=null?res.persona.ciudadPersona.ciudad:"",
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadeprop:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroPropietario!=null?res.fechaRegistroPropietario.substr(0,10):"",
            fechaA:res.fechaActualizacionPropietario!=null?res.fechaActualizacionPropietario.substr(0,10):"",
          });
          this.Formulario.disable();
      })
    }
  }

  /**
   * Obtiene usuarios No propietarios
   */
  obtenerUsuarios():void{
    this.data.obtenerNoProp()
    .subscribe((usu:Array<Propietario>) => {
      this.nopropArray=usu;
      console.log(this.nopropArray)
    });
  }
  
  /**
   * Obtiene el Tipo de documento
   */
  obtenerTipoDoc():void{
    this.tipodocs.push({id:"CC",value:"Cedula de Ciudadania"});
    this.tipodocs.push({id:"TI",value:"Tajeta de Identidad"});
    this.tipodocs.push({id:"CE",value:"Cedula de Extranjeria"});
  }

  /**
   * Filtrar el Propietario, de acuerdo a lo que se vaya escribiendo va filtrando en un maximo de 6
   */
  filtrarProp():void{
    this.selectnopropArray=[];
    for(var i=0;i<this.nopropArray.length;i++){
      this.selectnopropArray.push(this.nopropArray[i]);
    }
    console.log(this.selectnopropArray);
    //console.log(this.nopropArray);
    var filtro=(""+this.Formulario.get("prop")?.value).toUpperCase();
    console.log(filtro);
    if(this.nopropArray.length>0){
      let prop = this.selectnopropArray.filter(propietario=> propietario.documentoPersona.includes(filtro) || ((propietario.nombrePersona).toUpperCase()).includes(filtro) || ((propietario.apellidoPersona).toUpperCase()).includes(filtro ) || ((propietario.apellidoPersona).toUpperCase()+' '+(propietario.nombrePersona).toUpperCase()).includes(filtro ) || ((propietario.nombrePersona+' '+propietario.apellidoPersona).toUpperCase()).includes(filtro ));
      this.selectnopropArray=prop;
      if(prop.length>6){
        this.selectnopropArray.length=6;
      }
    }else{
      this.selectnopropArray=[];
    }
    
  }

  /**
   * Toma el ID y muestra la informacion relacionada al ususario a ocnvertir en propietario
   * @param id Id a consultar
   */
  elegirProp(id:number){
    this.resCC={};
    this.iduser=id;
    this.data.obtenerPersona(""+id).subscribe(
      (res:any)=>{
        console.log(res)
        this.idpersona=res.persona.idPersona;
        this.docuno=res.persona.documentoUnoPersona;
        this.docdos=res.persona.documentoDosPersona;
        console.log(this.resCC);
        this.resCC.documentoUnoPersona=res.persona.documentoUnoPersona;
        this.resCC.documentoDosPersona=res.persona.documentoDosPersona;
        this.fotoper=res.persona.fotoPersona;
        this.Formulario.patchValue({
          nomprop:res.persona.nombrePersona,
          apeprop:res.persona.apellidoPersona,
          tipodocprop:res.persona.tipoDocPersona,
          numdocprop:res.persona.documentoPersona,
          correoprop:res.persona.correoPersona,
          tel1prop:res.persona.celularUnoPersona,
          tel2prop:res.persona.celularDosPersona,
          direccionprop:res.persona.direccionPersona,
          ciudadprop:res.persona.ciudadPersona.ciudad,
          fechaN:res.persona.fechaNacimientoPersona.substr(0,10),
          ciudadeprop:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
          idioma:res.persona.idioma.idioma,
          usucuenta:res.cuenta.usuarioCuenta,
          fechaR:res.cuenta.fechaRegistroCuenta!=null?res.cuenta.fechaRegistroCuenta.substr(0,10):"",
          fechaA:res.cuenta.fechaActualizacionCuenta!=null?res.cuenta.fechaActualizacionCuenta.substr(0,10):"",
        });
      })
      this.reestablecer()
    
  }

  /**
   * Reestablece la informacion al id que se puso como propietario
   */
  reestablecer(){
    console.log(this.Formulario.get("prop")?.value);
    console.log(this.iduser);
    this.Formulario.get("prop")?.setValue((this.nopropArray.find(element =>element.idPersona==this.iduser))?.documentoPersona);
    
    this.filtrarProp();
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehCC(nom:string){
    this.data.obtenerImagenVehCC(nom);
  }

  /**
   * llama el metodo de obtener una imagen para crear la nueva pestaña y visualizarla.
   * @param nom Nombre del archivo
   */
  downloadVehFoto(nom:string){
    this.data.obtenerImagenVehFoto(nom);
  }

  /**
   * Detecta is hay un uvento de cambio dentro del input, y de acuerdo a eso cambia el archivo a guardar para subirlo
   * @param element Recibe el evento generado
   * @param nom Pocision de la cual se edita si la cara 1 o 2
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
   * Publica ya todo el Fromulario con el nombre de las imagenes asignadas dependiendo si ya termino de subir las imagenes o no
   */
  completarSolicitud(){
    if(this.edit==false){
      if(this.porcentaje==100){
        console.log(this.resCC);
        let resp:any;
        resp={};
        
        resp.persona={};
        resp.persona.idPersona=this.idpersona;
        resp.persona.documentoUnoPersona=this.resCC.documentoUnoPersona;
        resp.persona.documentoDosPersona=this.resCC.documentoDosPersona;
        console.log(resp);
        this.data.crearProp(resp).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        })
      }
    }else{
      if(this.porcentaje==100){
        let resp:any;
        console.log(this.resCC)
        resp={};
        resp.idPropietario=this.idprop;
        resp.estadoPropietario=this.Formulario.get("swest")?.value?1:0;
        resp.persona={};
        resp.persona.idPersona=this.resedit.persona.idPersona;
        resp.persona.documentoUnoPersona=this.resCC.documentoUnoPersona;
        resp.persona.documentoDosPersona=this.resCC.documentoDosPersona;
        console.log(resp);
        this.data.actualizarProp(resp).subscribe((res:any)=>{
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
   * Comienza  con subir lso archivos llamando a CompletarSolicitud, hasta que el procentaje llegue al 100.
   */
  guardar(){
    this.porcentaje=0;
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid){
      console.log(this.Formulario);
      this.alertpen=true;

    }else{
      if(this.archnomvehCC[0] !="Selecciona un Archivo" && (this.docuno=='' || this.docuno=='null' || this.docuno==null)){
        this.LoginService.subirArchivoCC(
          this.archfilevehCC[0],
          this.archfilevehCC[1]
        ).subscribe(
          (resCC:any)=>{
            this.resCC={};
            this.resCC.documentoUnoPersona=resCC.documentoUnoAfiliacion;
            this.resCC.documentoDosPersona=resCC.documentoDosAfiliacion;
            this.porcentaje+=100;
            this.completarSolicitud();
          })
      } else if( !(this.docuno=='' || this.docuno=='null' || this.docuno==null)){
        if(this.archnomvehCC[0] !="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfilevehCC[0],
            this.docuno
          ).subscribe(
            (resCC:any)=>{
              console.log(resCC);
              this.resCC.documentoUnoPersona=resCC.archivoCedula;
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
        if(this.archnomvehCC[1]!="Selecciona un Archivo"){
          this.data.ActualizarArchivoCC(
            this.archfilevehCC[1],
            this.docdos
          ).subscribe(
            (resCC:any)=>{
              
              console.log(resCC);
              this.resCC.documentoDosPersona=resCC.archivoCedula;
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
        
      }else{
        this.porcentaje+=100;
        this.completarSolicitud();
      }
    }
    
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
   * Valida si selecciono a un usuario para convertir en propietario, o no
   * @param ctrl recibe el control
   * @returns retorna el tipo de error dependiendo del caso
   */
  validatePT(ctrl: AbstractControl): ValidationErrors  | null {
    //console.log(ctrl.value) ;
    var path = ctrl.value;
    if(ctrl.value!=undefined){
      //console.log(extension.toLowerCase()) ;
      var numt=this.nopropArray.findIndex(element=>(element.documentoPersona).toUpperCase()==(ctrl.value).toUpperCase());
      if(numt!=-1){
        if(this.iduser==this.nopropArray[numt].idPersona){
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
   * Checkea que antes de que se convierta a un propietario, se valide que tnega la cedula subida sino, lo vuelve obligatorio.
   * @returns seimpre reotrna null ya que el error se muestra en el control.
   */
  checkArch: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    
    var CC=group.controls.archCC.value;
    var CC1=group.controls.archCC1.value;
    console.log(this.docuno)
    if(!this.edit){
      if((this.docuno=='' || this.docuno=='null' || this.docuno==null) && (CC=="" || CC1=="")){
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
      if((this.docuno=='' || this.docuno=='null' || this.docuno==null) && (CC!="" || CC1!="")){
        console.log("NO")
        console.log((this.docuno=='' || this.docuno=='null' || this.docuno==null))

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
  

}
