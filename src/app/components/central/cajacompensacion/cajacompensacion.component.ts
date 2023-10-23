import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cajacompensacion',
  templateUrl: './cajacompensacion.component.html',
  styleUrls: ['./cajacompensacion.component.css']
})
export class CajacompensacionComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idcc:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {

    this.param="";
    this.edit=false;
    this.view=false;
    this.idcc=-1;
    this.resedit={};
    this.registrador={};
    this.actualizador={};
    this.Formulario = new FormGroup({
      txtNombre:new FormControl( '',[Validators.required]),
      swest:new FormControl(false)
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
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerCajacompensacion(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorCajaCompensacion;
          this.actualizador=res.actualizadoPorCajaCompensacion;
          this.idcc=res.idCajaCompensacion;
          this.Formulario.patchValue({
            swest:res.estadoCajaCompensacion==1?true:false,
            txtNombre:res.cajaCompensacion
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerCajacompensacion(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idcc=res.idCajaCompensacion;
          this.registrador=res.registradoPorCajaCompensacion;
          this.actualizador=res.actualizadoPorCajaCompensacion;
          this.Formulario.patchValue({
            swest:res.estadoCajaCompensacion==1?true:false,
            txtNombre:res.cajaCompensacion
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idCajaCompensacion=this.idcc;
      JSON.cajaCompensacion=this.Formulario.get("txtNombre")?.value;
      JSON.estadoCajaCompensacion=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarCajacompensacion(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.cajaCompensacion=this.Formulario.get("txtNombre")?.value;
      JSON.estadoCajaCompensacion=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearCajacompensacion(JSON).subscribe(
        (res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm="CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm=res.mensaje;
          }
        }
      )
      
    }
  }

}
