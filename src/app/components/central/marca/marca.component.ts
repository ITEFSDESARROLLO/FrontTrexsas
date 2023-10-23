import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idm:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {

    this.param="";
    this.edit=false;
    this.view=false;
    this.idm=-1;
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
      this.data.obtenerMarca(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorMarca;
          this.actualizador=res.actualizadoPorMarca;
          this.idm=res.idMarca;
          this.Formulario.patchValue({
            swest:res.estadoMarca==1?true:false,
            txtNombre:res.marca
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerMarca(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idm=res.idMarca;
          this.registrador=res.registradoPorMarca;
          this.actualizador=res.actualizadoPorMarca;
          this.Formulario.patchValue({
            swest:res.estadoMarca==1?true:false,
            txtNombre:res.marca
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idMarca=this.idm;
      JSON.marca=this.Formulario.get("txtNombre")?.value;
      JSON.estadoMarca=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarMarca(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.marca=this.Formulario.get("txtNombre")?.value;
      JSON.estadoMarca=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearMarca(JSON).subscribe(
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
