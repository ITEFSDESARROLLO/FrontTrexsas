import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.css']
})
export class PasajeroComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  iduser:number;
  tipodocs:any;
  selectnopasArray:Array<any>;
  nopasArray:Array<any>;
  docuno="";
  docdos="";
  fotoper="";
  idpersona:number;
  idpas:number;

  porcentaje: number;
  resedit:any;
  param: string;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.porcentaje=0;
    this.edit=false;
    this.view=false;
    this.iduser=-1;
    this.idpersona=-1;
    this.idpas=-1;
    this.selectnopasArray=[];
    this.nopasArray=[];
    this.tipodocs=[];
    this.resedit={}
    this.Formulario = new FormGroup({
      swest:new FormControl(false),
      pas:new FormControl( '',[Validators.required,this.validatePT.bind(this)]),
      nompas:new FormControl( ''),
      apepas:new FormControl( ''),
      tipodocpas:new FormControl( {value:'',disabled:true}),
      numdocpas:new FormControl( ''),
      correopas:new FormControl( ''),
      tel1pas:new FormControl( ''),
      tel2pas:new FormControl( ''),
      direccionpas:new FormControl( ''),
      ciudadpas:new FormControl( ''),
      fechaN:new FormControl( ''),
      ciudadepas:new FormControl( ''),
      idioma:new FormControl( ''),
      usucuenta:new FormControl( ''),
      fechaR:new FormControl( ''),
      fechaA:new FormControl( ''),
    })
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
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerPasajero(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.Formulario.get("pas")?.setValidators([this.validatePT.bind(this)]);
          this.Formulario.get("pas")?.updateValueAndValidity();
          this.resedit={}
          
          this.resedit=res;
          this.idpas=res.idPasajero;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoPasajero==1?true:false,
            nompas:res.persona.nombrePersona,
            apepas:res.persona.apellidoPersona,
            tipodocpas:res.persona.tipoDocPersona,
            numdocpas:res.persona.documentoPersona,
            correopas:res.persona.correoPersona,
            tel1pas:res.persona.celularUnoPersona,
            tel2pas:res.persona.celularDosPersona,
            direccionpas:res.persona.direccionPersona,
            ciudadpas:res.persona.ciudadPersona.ciudad,
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadepas:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroPasajero!=null?res.fechaRegistroPasajero.substr(0,10):"",
            fechaA:res.fechaActualizacionPasajero!=null?res.fechaActualizacionPasajero.substr(0,10):"",
          });
      })
    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerPasajero(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={}
          
          this.resedit=res;
          this.idpas=res.idPropietario;
          this.docuno=res.persona.documentoUnoPersona;
          this.docdos=res.persona.documentoDosPersona;
          this.fotoper=res.persona.fotoPersona;
          this.Formulario.patchValue({
            swest:res.estadoPropietario==1?true:false,
            nompas:res.persona.nombrePersona,
            apepas:res.persona.apellidoPersona,
            tipodocpas:res.persona.tipoDocPersona,
            numdocpas:res.persona.documentoPersona,
            correopas:res.persona.correoPersona,
            tel1pas:res.persona.celularUnoPersona,
            tel2pas:res.persona.celularDosPersona,
            direccionpas:res.persona.direccionPersona,
            ciudadpas:res.persona.ciudadPersona.ciudad,
            fechaN:res.persona.fechaNacimientoPersona!=null?res.persona.fechaNacimientoPersona.substr(0,10):"",
            ciudadepas:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
            idioma:res.persona.idioma.idioma,
            fechaR:res.fechaRegistroPropietario!=null?res.fechaRegistroPropietario.substr(0,10):"",
            fechaA:res.fechaActualizacionPropietario!=null?res.fechaActualizacionPropietario.substr(0,10):"",
          });
          this.Formulario.disable();
      })
    }
  }

  /**
   * Lista los registros de los ususarios que aun no son pasajeros;
   */
  obtenerUsuarios():void{
    this.data.obtenerNoPas()
    .subscribe((usu:Array<any>) => {
      this.nopasArray=usu;
      console.log(this.nopasArray)
    });
  }
  
  /**
   * Obtiene los Tipo de Documento
   */
  obtenerTipoDoc():void{
    this.tipodocs.push({id:"CC",value:"Cedula de Ciudadania"});
    this.tipodocs.push({id:"TI",value:"Tajeta de Identidad"});
    this.tipodocs.push({id:"CE",value:"Cedula de Extranjeria"});
  }

  /**
   * Sirve para filtrar el pasajero, haciendo una lista independiente de pasajeros y luevo volviendola a modificar para filtrar los pasajeros, y mostrando maximo 6 usuarios.
   */
  filtrarPas():void{
    this.selectnopasArray=[];
    for(var i=0;i<this.nopasArray.length;i++){
      this.selectnopasArray.push(this.nopasArray[i]);
    }
    //console.log(this.selectnopasArray);
    //console.log(this.nopasArray);
    var filtro=(""+this.Formulario.get("pas")?.value).toUpperCase();
    if(this.nopasArray.length>0){
      let pas = this.selectnopasArray.filter(pasajero=> pasajero.documentoPersona.includes(filtro) || ((pasajero.nombrePersona).toUpperCase()).includes(filtro) || ((pasajero.apellidoPersona).toUpperCase()).includes(filtro ) || ((pasajero.apellidoPersona).toUpperCase()+' '+(pasajero.nombrePersona).toUpperCase()).includes(filtro ) || ((pasajero.nombrePersona+' '+pasajero.apellidoPersona).toUpperCase()).includes(filtro ));
      this.selectnopasArray=pas;
      if(pas.length>6){
        this.selectnopasArray.length=6;
      }
    }else{
      this.selectnopasArray=[];
    }
    
  }

  /**
   * Elegir Pasajero, toma el id elegido y lo envia al metodo para que asi mismo se rellene la informacion improtante del usuario a convertir en pasajero.
   * @param id Id que se va a consultar
   */
  elegirPas(id:number){
    this.iduser=id;
    this.param = (this.route.snapshot.params['id']).substr(5,this.param.length);
    console.log(this.param);
    this.data.obtenerPersona(""+id).subscribe(
      (res:any)=>{
        console.log(res)
        this.idpersona=res.persona.idPersona;
        this.docuno=res.persona.documentoUnoPersona;
        this.docdos=res.persona.documentoDosPersona;
        this.fotoper=res.persona.fotoPersona;
        this.Formulario.patchValue({
          nompas:res.persona.nombrePersona,
          apepas:res.persona.apellidoPersona,
          tipodocpas:res.persona.tipoDocPersona,
          numdocpas:res.persona.documentoPersona,
          correopas:res.persona.correoPersona,
          tel1pas:res.persona.celularUnoPersona,
          tel2pas:res.persona.celularDosPersona,
          direccionpas:res.persona.direccionPersona,
          ciudadpas:res.persona.ciudadPersona.ciudad,
          fechaN:res.persona.fechaNacimientoPersona.substr(0,10),
          ciudadepas:res.persona.ciudadExpedicionPersona!=null?res.persona.ciudadExpedicionPersona.ciudad:"",
          idioma:res.persona.idioma.idioma,
          usucuenta:res.cuenta.usuarioCuenta,
          fechaR:res.cuenta.fechaRegistroCuenta!=null?res.cuenta.fechaRegistroCuenta.substr(0,10):"",
          fechaA:res.cuenta.fechaActualizacionCuenta!=null?res.cuenta.fechaActualizacionCuenta.substr(0,10):"",
        });
      })
    this.reestablecer();
  }

  /**
   * Reestablece el control segun la información del id elegido.. 
   */
  reestablecer(){
    console.log(this.Formulario.get("pas")?.value);
    console.log(this.iduser);
    this.Formulario.get("pas")?.setValue((this.nopasArray.find(element =>element.idPersona==this.iduser))?.documentoPersona);
    this.filtrarPas();
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
  downloadFoto(nom:string){
    this.data.obtenerImagenVehFoto(nom);
  }
  
  
  
  /**
   * Guarda el registro del Formulario si es Valido, enviando la informacion pertienente a convertir.
   */
  guardar(){
    this.porcentaje=0;
    if(!this.Formulario.valid){
      console.log(this.Formulario);

    }else{
      if(this.edit==false){
      
        let resp:any;
        resp={};
        resp.estadoPasajero=this.Formulario.get("swest")?.value?1:0;
        resp.cliente={};
        resp.cliente.idCliente=this.param;
        resp.persona={};
        resp.persona.idPersona=this.idpersona;
        
        console.log(resp);
        this.data.crearPas(resp).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }else{
        let resp:any;
        resp={};
        resp.idPasajero=this.idpas;
        resp.estadoPasajero=this.Formulario.get("swest")?.value?1:0;
        resp.cliente={};
        resp.cliente.idCliente=this.resedit.cliente.idCliente;
        
        console.log(resp);
          this.data.actualizarPas(resp).subscribe((res:any)=>{
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
   * Valida si se ha seleccionado un usuario o no a convertir,
   * @param ctrl Control a recibir
   * @returns retorna el tipo de error dependiendo si no exite, o no ha sido elegido
   */
  validatePT(ctrl: AbstractControl): ValidationErrors  | null {
    //console.log(ctrl.value) ;
    var path = ctrl.value;
    if(ctrl.value!=undefined){
      //console.log(extension.toLowerCase()) ;
      var numt=this.nopasArray.findIndex(element=>(element.documentoPersona).toUpperCase()==(ctrl.value).toUpperCase())
      if(numt!=-1){
        if(this.iduser==this.nopasArray[numt].idPersona){
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

}
