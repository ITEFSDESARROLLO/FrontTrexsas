import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-cuentacobro',
  templateUrl: './cuentacobro.component.html',
  styleUrls: ['./cuentacobro.component.css']
})
export class CuentacobroComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  idCC:number;
  param: string;
  ocultar=false;
  msm:string;
  view:boolean;
  edit:boolean;
  registrador:any;
  fecha:string;
  lectura:boolean = true;
  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.msm="";
    this.view=false;
    this.edit=false;
    this.fecha="";
    this.registrador=null;
    this.Formulario=new FormGroup({
      txtNombre:new FormControl( null,[Validators.required,Validators.maxLength(200)]),
      txtNit:new FormControl( null,[Validators.required,Validators.maxLength(45)]),
      nmbNumero:new FormControl(''),
      nmbValor:new FormControl( null,[Validators.required]),
      txtConcepto:new FormControl( null,[Validators.required])
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
      var urlid=this.param.substr(6,this.param.length);
      this.edit=true;
      this.view=false;
      this.idCC=+urlid;
      this.data.obtenerCuentaCobro(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.fecha=res.fechaCuentaCobro;
            this.registrador=res.registradoPorCuentaCobro;
            this.Formulario.patchValue({
              txtNombre:res.nombreCuentaCobro,
              nmbNumero:res.numeroCuentaCobro,
              txtNit:res.nitCuentaCobro,
              nmbValor:res.valorCuentaCobro,
              txtConcepto:res.conceptoCuentaCobro
            });
          }
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      var urlid=this.param.substr(3,this.param.length);
      this.edit=false;
      this.view=true;
      this.idCC=+urlid;
      this.data.obtenerCuentaCobro(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.fecha=res.fechaCuentaCobro;
            this.registrador=res.registradoPorCuentaCobro;
            this.Formulario.patchValue({
              txtNombre:res.nombreCuentaCobro,
              nmbNumero:res.numeroCuentaCobro,
              txtNit:res.nitCuentaCobro,
              nmbValor:res.valorCuentaCobro,
              txtConcepto:res.conceptoCuentaCobro
            });
            this.Formulario.disable();
          }
        });

    }
  }

  guardar(){
    this.Formulario.markAllAsTouched();
    if(this.Formulario.valid){
      var JSON:any={};
      console.log("mensaje : 12");
      JSON.nombreCuentaCobro=this.Formulario.get("txtNombre")?.value;
      JSON.numeroCuentaCobro=this.Formulario.get("nmbNumero")?.value;
      JSON.nitCuentaCobro=this.Formulario.get("txtNit")?.value;
      JSON.valorCuentaCobro=this.Formulario.get("nmbValor")?.value;
      JSON.conceptoCuentaCobro=this.Formulario.get("txtConcepto")?.value;
      console.log(JSON);
      if(this.edit){
        JSON.idCuentaCobro=this.idCC;
        this.data.actualizarCuentaCobro(JSON).subscribe((res:any)=>{
          console.log("mensaje : ",res);
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }else{
        this.data.crearCuentaCobro(JSON).subscribe((res:any)=>{
          console.log(JSON.cuentacobro);
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }
    }
  }

}
