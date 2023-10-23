import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-objetocontrato',
  templateUrl: './objetocontrato.component.html',
  styleUrls: ['./objetocontrato.component.css']
})
export class ObjetocontratoComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  idoc:number;
  param: string;
  resedit:any;
  registrador:any;
  actualizador:any;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.edit=false;
    this.view=false;
    this.idoc=-1;
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
      this.data.obtenerObjetoContrato(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.registrador=res.registradoPorObjetoContrato;
          this.actualizador=res.actualizadoPorObjetoContrato;
          this.idoc=res.idObjetoContrato;
          this.Formulario.patchValue({
            swest:res.estadoObjetoContrato==1?true:false,
            txtNombre:res.objetoContrato
          });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerObjetoContrato(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit={};
          this.registrador={};
          this.actualizador={};
          this.resedit=res;
          this.idoc=res.idObjetoContrato;
          this.registrador=res.registradoPorObjetoContrato;
          this.actualizador=res.actualizadoPorObjetoContrato;
          this.Formulario.patchValue({
            swest:res.estadoObjetoContrato==1?true:false,
            txtNombre:res.objetoContrato
          });
          this.Formulario.disable();
        });
    }
  }

  guardar(){
    let JSON:any={};
    if(this.edit){
      JSON.idObjetoContrato=this.idoc;
      JSON.objetoContrato=this.Formulario.get("txtNombre")?.value;
      JSON.estadoObjetoContrato=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.actualizarObjetoContrato(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm="ACTUALIZADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm=res.mensaje;
        }
      })
    }else{
      JSON.objetoContrato=this.Formulario.get("txtNombre")?.value;
      JSON.estadoObjetoContrato=this.Formulario.get("swest")?.value?1:0;
      console.log(JSON);
      this.data.crearObjetoContrato(JSON).subscribe(
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
