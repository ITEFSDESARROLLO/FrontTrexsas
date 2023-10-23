import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tipocombustible',
  templateUrl: './tipocombustible.component.html',
  styleUrls: ['./tipocombustible.component.css']
})
export class TipocombustibleComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idtc:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.edit=false;
    this.view=false;
    this.idtc=-1;
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
      this.data.obtenerTipoCombustible(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorTipoCombustible;
          this.actualizador=res.actualizadoPorTipoCombustible;
          this.idtc=res.idTipoCombustible;
          this.Formulario.patchValue({
            swest:res.estadoTipoCombustible==1?true:false,
            txtNombre:res.tipoCombustible
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerTipoCombustible(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idtc=res.idTipoCombustible;
          this.registrador=res.registradoPorTipoCombustible;
          this.actualizador=res.actualizadoPorTipoCombustible;
          this.Formulario.patchValue({
            swest:res.estadoTipoCombustible==1?true:false,
            txtNombre:res.tipoCombustible
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idTipoCombustible=this.idtc;
      JSON.tipoCombustible=this.Formulario.get("txtNombre")?.value;
      JSON.estadoTipoCombustible=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarTipoCombustible(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.tipoCombustible=this.Formulario.get("txtNombre")?.value;
      JSON.estadoTipoCombustible=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearTipoCombustible(JSON).subscribe(
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
