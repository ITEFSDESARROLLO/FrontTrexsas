import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { CentralService } from './../../../services/central.service';
import { LoginService } from './../../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracion-pqr',
  templateUrl: './configuracion-pqr.component.html',
  styleUrls: ['./configuracion-pqr.component.css']
})
export class ConfiguracionPQRComponent implements OnInit {

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
    this.data.obtenerConfiguracionPQR().subscribe(
      (res:any)=>{
        console.log(res);
        this.correoList=res;
      });
    
  }

  eliminarCorreo(id:number){
    this.data.eliminarCorreoConfiguracionPQR(id).subscribe(
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
    console.log(JSON);
    this.data.crearCorreoConfiguracionPQR(JSON).subscribe(
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
    console.log(JSON);
    this.data.actualizarCorreoConfiguracionPQR(JSON).subscribe(
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
      this.data.actualizarCorreoConfiguracionPQR(JSON).subscribe((res:any)=>{
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
