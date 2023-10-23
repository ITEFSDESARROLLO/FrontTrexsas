import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idcl:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {

    this.param="";
    this.edit=false;
    this.view=false;
    this.idcl=-1;
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
      this.data.obtenerClaseVehiculo(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorClase;
          this.actualizador=res.actualizadoPorClase;
          this.idcl=res.idClase;
          this.Formulario.patchValue({
            swest:res.estadoClase==1?true:false,
            txtNombre:res.clase
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerClaseVehiculo(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idcl=res.idClase;
          this.registrador=res.registradoPorClase;
          this.actualizador=res.actualizadoPorClase;
          this.Formulario.patchValue({
            swest:res.estadoClase==1?true:false,
            txtNombre:res.clase
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idClase=this.idcl;
      JSON.clase=this.Formulario.get("txtNombre")?.value;
      JSON.estadoClase=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarClaseVehiculo(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.clase=this.Formulario.get("txtNombre")?.value;
      JSON.estadoClase=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearClaseVehiculo(JSON).subscribe(
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
