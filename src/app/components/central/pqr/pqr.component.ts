import { WhatsappServiceService } from './../../../services/whatsapp-service.service';
import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from './../../../services/central.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css']
})
export class PQRComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  idCC:number;
  param: string;
  ocultar=false;
  msm:string;
  view:boolean;
  edit:boolean;
  fecha:string;
  pqrSeleccionada:string;
  isChecked = true;
  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient,private mensajero:WhatsappServiceService) { 
    this.param="";
    this.msm="";
    this.view=false;
    this.edit=false;
    this.fecha="";
    this.Formulario=new FormGroup({
      txtDescripcion:new FormControl( null,[Validators.required])
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
      this.data.obtenerPQR(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.isChecked=res.redactor=="ANÓNIMO"?false:true;
            this.pqrSeleccionada = res.tipo;
            this.Formulario.patchValue({
              txtDescripcion:res.descripcion,
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
      JSON.descripcion=this.Formulario.get("txtDescripcion")?.value;
      JSON.tipo = this.pqrSeleccionada;
      if(this.isChecked)
      {
        JSON.redactor="";
      }else{
        JSON.redactor="ANÓNIMO";
      }
      let fecha = new Date()
      let mes = fecha.getMonth()<9?"0"+(fecha.getMonth()+1):fecha.getMonth()+1
      JSON.fechaPublicacion = fecha.getFullYear()+"-"+mes+"-"+fecha.getDate();
      console.log(JSON);
      if(this.edit){
        
        this.data.actualizarCuentaCobro(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="ACTUALIZADO SATISFACTORIAMENTE";
            console.log("1",res);
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
            console.log("2",res);
          }
        });
      }else{
        
        this.data.crearPQR(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="CREADO SATISFACTORIAMENTE";
            this.mensajero.enviarMensaje("3117259636").then(respuesta =>
              {
                console.log("respuesta mensaje ",respuesta)
              }).catch(error =>
                {
                  console.log("respuesta error ",error)
                })
            console.log("3",res);
          }else{
            this.ocultar=false;
            
            this.msm+=res.mensaje;
            console.log("4",res);
          }
        });
      }
    }
  }
}
