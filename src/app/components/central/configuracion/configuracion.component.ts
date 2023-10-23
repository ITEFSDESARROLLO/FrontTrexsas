import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { Ciudad } from 'src/app/models/ciudad';
import { Correo } from 'src/app/models/ModelosJ/correo';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  labels: any;
  correoList:any;
  Formulario: FormGroup;
  FormularioCorreo: FormGroup;
  ocultar=false;
  msm="";
  msc="";
  edit:boolean;
  view:boolean;
  idConf:number;
  param: string;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.correoList=[];
    this.param="";
    this.edit=false;
    this.view=false;
    this.idConf=-1;
    this.Formulario = new FormGroup({
      maxDuracion:new FormControl( '',[Validators.required]),
      maxInicio:new FormControl( '',[Validators.required])
    });
    this.FormularioCorreo = new FormGroup({
      correo:new FormControl( '',[Validators.required,Validators.email])
    });

   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.edit=true;
    this.view=false;
    this.data.obtenerConfiguracion(''+1).subscribe(
      (res:any)=>{
        console.log(res);
        this.correoList=res.correoList;
        this.idConf=res.idConfiguraciones;
        this.Formulario.patchValue({
          maxDuracion:res.maximoDuracionContrato,
          maxInicio:res.maximoInicioContrato
        });
      });
    
  }

  eliminarCorreo(id:number){
    this.data.eliminarCorreo(''+id).subscribe(
      (res:any)=>{
        if(res.mensaje==1){
          this.msc="CORREO ELIMINADO SATISFACTORIAMENTE";
          this.ngOnInit();
        }else{
          this.msc=res.mensaje;
        }
      }
    );
    
  }

  crearCorreo(){
    let JSON:any={};
    JSON.correo=this.FormularioCorreo.get("correo")?.value;
    JSON.configuraciones={};
    JSON.configuraciones.idConfiguraciones=1;
    console.log(JSON);
    this.data.crearCorreo(JSON).subscribe(
      (res:any)=>{
        if(res.mensaje==1){
          this.msc="CORREO CREADO SATISFACTORIAMENTE";
          this.ngOnInit();
        }else{
          this.msc=res.mensaje;
        }
      }
    )
    
  }

  actualizarCorreo(id:number){
    let JSON:any={};
    JSON.idCorreo=id;
    JSON.correo=this.FormularioCorreo.get("correo")?.value;
    JSON.configuraciones={};
    JSON.configuraciones.idConfiguraciones=this.idConf;
    console.log(JSON);
    this.data.actualizarCorreo(JSON).subscribe(
      (res:any)=>{
        if(res.mensaje==1){
          this.msc+="CORREO ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.msc+=res.mensaje;
        }
      }
    )
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idConfiguraciones=this.idConf;
      JSON.maximoDuracionContrato=this.Formulario.get("maxDuracion")?.value;
      JSON.maximoInicioContrato=this.Formulario.get("maxInicio")?.value;
      console.log(JSON);
      this.data.actualizarConfiguracion(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.msm+=" "+"ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm+=res.mensaje;
        }
      })
    }
  }
}
