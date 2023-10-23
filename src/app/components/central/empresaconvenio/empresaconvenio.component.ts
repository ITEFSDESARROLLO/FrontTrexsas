import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empresaconvenio',
  templateUrl: './empresaconvenio.component.html',
  styleUrls: ['./empresaconvenio.component.css']
})
export class EmpresaconvenioComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idec:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {

    this.param="";
    this.edit=false;
    this.view=false;
    this.idec=-1;
    this.resedit={};
    this.registrador={};
    this.actualizador={};
    this.Formulario = new FormGroup({
      txtNombre:new FormControl( '',[Validators.required]),
      txtNit:new FormControl( '',[Validators.required]),
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
      this.data.obtenerEmpresaConvenio(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorEmpresaConvenio;
          this.actualizador=res.actualizadoPorEmpresaConvenio;
          this.idec=res.idEmpresaConvenio;
          this.Formulario.patchValue({
            swest:res.estadoEmpresaConvenio==1?true:false,
            txtNombre:res.nombreEmpresaConvenio,
            txtNit:res.nitEmpresaConvenio
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerEmpresaConvenio(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idec=res.idEmpresaConvenio;
          this.registrador=res.registradoPorEmpresaConvenio;
          this.actualizador=res.actualizadoPorEmpresaConvenio;
          this.Formulario.patchValue({
            swest:res.estadoEmpresaConvenio==1?true:false,
            txtNombre:res.nombreEmpresaConvenio,
            txtNit:res.nitEmpresaConvenio
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idEmpresaConvenio=this.idec;
      JSON.nombreEmpresaConvenio=this.Formulario.get("txtNombre")?.value;
      JSON.nitEmpresaConvenio=this.Formulario.get("txtNit")?.value;
      JSON.estadoEmpresaConvenio=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarEmpresaConvenio(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.nombreEmpresaConvenio=this.Formulario.get("txtNombre")?.value;
      JSON.nitEmpresaConvenio=this.Formulario.get("txtNit")?.value;
      JSON.estadoEmpresaConvenio=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearEmpresaConvenio(JSON).subscribe(
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
