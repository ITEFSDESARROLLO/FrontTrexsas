import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { Ciudad } from 'src/app/models/ciudad';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idruta:number;
  param: string;
  ciudades:Array<Ciudad>;
  inputc:Array<number>;
  listoc:Array<boolean>;
  ciudadesO:Array<Ciudad>;
  ciudadesD:Array<Ciudad>;
  checkblur:Array<number>;
  ruta:any;

constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.edit=false;
    this.view=false;
    this.idruta=-1;
    this.ciudades=[];
    this.ciudadesO=[];
    this.ciudadesD=[];
    this.inputc=[];
    this.listoc=[];
    this.checkblur=[];
    
    this.inputc.push(-1);
    this.inputc.push(-1);
    this.listoc.push(false);
    this.listoc.push(false);
    this.checkblur.push(0);
    this.checkblur.push(0);
    this.obtenerCiudades();
    this.Formulario = new FormGroup({
      cod:new FormControl( '',[Validators.required]),
      selectedCO:new FormControl( '',[Validators.required]),
      selectedCD:new FormControl( '',[Validators.required]),
      descripcion:new FormControl( ''),
      swest:new FormControl(false),
      regreso:new FormControl( false),
      
    },{
      validators:[this.checkCO.bind(this),this.checkCD.bind(this)]
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
      this.data.obtenerRuta(urlid).subscribe(
        (res:any)=>{
          this.ruta = res;
          console.log("ruta: ",res);
          this.idruta=res.idRuta;
          this.inputc[0]=res.ciudadOrigen.idCiudad;
          this.inputc[1]=res.ciudadDestino.idCiudad;
          this.Formulario.patchValue({
            swest:res.estadoRuta==1?true:false,
            cod:res.codigoRuta,
            selectedCO:res.ciudadOrigen.ciudad,
            selectedCD:res.ciudadDestino.ciudad,
            descripcion:res.descripcionRecorridoRuta,
            regreso:res.regresoRuta==1?true:false,
            
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerRuta(urlid).subscribe(
        (res:any)=>{
          this.ruta = res;
          console.log(res)
          this.Formulario.patchValue({
            swest:res.estadoRuta==1?true:false,
            cod:res.codigoRuta,
            selectedCO:res.ciudadOrigen.ciudad,
            selectedCD:res.ciudadDestino.ciudad,
            descripcion:res.descripcionRecorridoRuta,
            regreso:res.regresoRuta==1?true:false,
            
          });
          this.Formulario.disable();
        });
    }
  }
/**
 * Obtiene las ciudades y asigna a cada select las ciudades.
 */
  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:Array<Ciudad>) => {
        this.ciudades = ciudad;
        this.ciudadesO = ciudad;
        this.ciudadesD = ciudad;
        
        this.Formulario.updateValueAndValidity();
      });
  }
/**
 * Es el que determian si mostrar el autocompletado
 * @param a Es al pocision del array de ciudades
 */
  vfocus(a:number){
    this.checkblur[a]=0;
    this.listoc[a]=true;
    this.cambioC(a);
  }

  /**
   * Guarda el id de la ciudad seleccionada,y pone el nombre ne el control
   * @param id id de la ciudad
   * @param nom nombre de la ciudad
   * @param pos poscision de la lista de si muestra o oculta la lista
   */
  selectC(id:number,nom:string,pos:number){
    this.inputc[pos]=id;
    if(pos==0){
      this.Formulario.get('selectedCO')?.setValue(nom);
    }else{
      this.Formulario.get('selectedCD')?.setValue(nom);
    }
    this.listoc[pos]=false;
  }

   /**
    * Filtra las ciudades segun lo que vaya presionando el usuario.
    * @param pos posciòn de la cual esta cambiando la ciudad
    */
  cambioC(pos:number){
    console.log(this.ciudadesO);
    console.log(this.listoc[pos]);
    if(pos==0){
      this.listoc[pos]=true;
      this.ciudadesO=[];
      for(var i=0;i<this.ciudades.length;i++){
        this.ciudadesO.push(this.ciudades[i]);
      }
      //this.doc[i]=false;
      this.inputc[pos]=-1;
      //this.docauth[i]=false;
      let pas = this.ciudadesO.filter(ciud=> ciud.ciudad.includes((this.Formulario.get('selectedCO')?.value).toUpperCase()));
      this.ciudadesO=pas;
      //console.log(pas);
      if(pas.length!=0){
        var found1 = this.ciudadesO.findIndex(element =>element.ciudad==(this.Formulario.get('selectedCO')?.value).toUpperCase());
        if(-1!=found1){
          this.inputc[pos]=pas[found1].idCiudad;
          this.Formulario.get('selectedCO')?.setValue(pas[found1].ciudad);
          this.listoc[pos]=false;
          //console.log(this.inputc[pos])
        }
      }
      
    }
    else{
      this.listoc[pos]=true;
      this.ciudadesD=[];
      for(var i=0;i<this.ciudades.length;i++){
        this.ciudadesD.push(this.ciudades[i]);
      }
      //this.doc[i]=false;
      this.inputc[pos]=-1;
      //this.docauth[i]=false;
      let pas1 = this.ciudadesD.filter(ciud=> ciud.ciudad.includes((this.Formulario.get('selectedCD')?.value).toUpperCase()));
      this.ciudadesD=pas1;
      //console.log(pas1);
      if(pas1.length!=0){
        var found1 = this.ciudadesD.findIndex(element =>element.ciudad==(this.Formulario.get('selectedCD')?.value).toUpperCase());
        if(-1!=found1){
          this.inputc[pos]=pas1[found1].idCiudad;
          this.Formulario.get('selectedCD')?.setValue(pas1[found1].ciudad);
          this.listoc[pos]=false;
          //console.log(this.inputc[pos])
        }
      }



      
      
    }
  }

  /**
   * Guarda el Formulario dependiendo de si el Formulario es valido, de lo contrario, no permite el guardado y muestra campos pendiendtes-.
   */
  guardar(){
    let JSON:any={};
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid ){
      console.log(this.Formulario);
    }else{
        if(this.edit){
        JSON.idRuta=this.idruta;
        JSON.regresoRuta=this.Formulario.get("regreso")?.value?1:0;
        JSON.descripcionRecorridoRuta=this.Formulario.get("descripcion")?.value;
        JSON.estadoRuta=this.Formulario.get("swest")?.value?1:0;
        JSON.ciudadOrigen={};
        JSON.ciudadOrigen.idCiudad=this.inputc[0];
        JSON.ciudadDestino={};
        JSON.ciudadDestino.idCiudad=this.inputc[1];
        JSON.codigoRuta=this.Formulario.get("cod")?.value;
        console.log(JSON);
        this.data.actualizarRuta(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        })
      }else{

        JSON.regresoRuta=this.Formulario.get("regreso")?.value?1:0;
        JSON.descripcionRecorridoRuta=this.Formulario.get("descripcion")?.value;
        JSON.estadoRuta=this.Formulario.get("swest")?.value?1:0;
        JSON.ciudadOrigen={};
        JSON.ciudadOrigen.idCiudad=this.inputc[0];
        JSON.ciudadDestino={};
        JSON.ciudadDestino.idCiudad=this.inputc[1];
        JSON.codigoRuta=this.Formulario.get("cod")?.value;
        console.log(JSON);
        this.data.crearRuta(JSON).subscribe(
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
 * Checkea si la ciudad es valida dependiendo de si esta o no en la lista
 * @param group recibe el FormGroup
 * @returns retorna null siempre ya que modifica el error del control
 */
  checkCO: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    
    var CD=group.controls.selectedCO.value;
    var verf=this.ciudades.findIndex(element =>element.ciudad==(CD).toUpperCase());
    if(verf!=-1){
      group.controls['selectedCO'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      return null;
    }else{
      group.controls['selectedCO'].setErrors({validC:true})
      return null;
    }

  }

  /**
 * Checkea si la ciudad es valida dependiendo de si esta o no en la lista
 * @param group recibe el FormGroup
 * @returns retorna null siempre ya que modifica el error del control
 */
  checkCD: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    
    var CD=group.controls.selectedCD.value;
    var verf=this.ciudades.findIndex(element =>element.ciudad==(CD).toUpperCase());
    if(verf!=-1){
      group.controls['selectedCD'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      return null;
    }else{
      group.controls['selectedCD'].setErrors({validC:true})
      return null;
    }
    
  }


}
