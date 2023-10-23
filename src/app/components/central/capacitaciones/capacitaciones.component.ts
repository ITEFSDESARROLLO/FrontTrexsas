import { Constants } from 'src/app/constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css']
})
export class CapacitacionesComponent implements OnInit {

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
  capacitacionEdicion:any;
  fechaEjemplo:Date;
  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) { 
    this.param="";
    this.msm="";
    this.view=false;
    this.edit=false;
    this.fecha="";
    this.registrador=null;
    this.Formulario=new FormGroup({
      txtNombre:new FormControl( null,[Validators.required]),
      txtDescripcion:new FormControl( null,[Validators.required]),
      txtFechaInicioInscripciones:new FormControl(null),
      txtFechaFinInscripciones:new FormControl(null),
      txtFechaInicio:new FormControl(null),
      txtFechaFin:new FormControl(null)
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
      this.data.obtenerCapacitacion(urlid).subscribe(
        (res:any)=>{
          console.log("respuesta para editar : ",res);
          console.log("respuesta para editar : ",this.param);
          this.capacitacionEdicion = res;
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.Formulario.patchValue({
              txtNombre:res.nombre,
              txtDescripcion:res.descripcion,
              txtFechaInicioInscripciones:res.fechaInscripcion,
              txtFechaFinInscripciones:res.fechaFinInscripcion,
              txtFechaInicio:res.fechaInicioCapacitacion,
              txtFechaFin:res.fechaFinCapacitacion
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
      console.log("formulario válido :",this.Formulario);
      var JSON:any={};
      JSON.nombre=this.Formulario.get("txtNombre")?.value;
      JSON.descripcion=this.Formulario.get("txtDescripcion")?.value;
      console.log(JSON);
      if(this.edit){
        console.log(JSON);
        this.data.actualizarCapacitacion(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }else{
        console.log("creando");
        JSON.fechaInscripcion=this.generarFormatoFecha(this.Formulario.get("txtFechaInicioInscripciones")?.value);
        JSON.fechaFinInscripcion=this.generarFormatoFecha(this.Formulario.get("txtFechaFinInscripciones")?.value);
        JSON.fechaInicioCapacitacion=this.generarFormatoFecha(this.Formulario.get("txtFechaInicio")?.value);
        JSON.fechaFinCapacitacion=this.generarFormatoFecha(this.Formulario.get("txtFechaFin")?.value);
        let fechaPublicacion = new Date();
        JSON.fechaPublicacion = this.generarFormatoFecha(fechaPublicacion);
        console.log(JSON);
        this.data.crearCapacitacion(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }
    }else{
      console.log("formulario no válido :",this.Formulario);
    }
  }

  generarFormatoFecha(fecha:any):string
  {
    console.log("fecha recibida : ",fecha)
    if(fecha.toString()!='' && fecha!=null)
    {
      let dia = fecha.getDate();
      let mes = fecha.getMonth()+1;
      let año = fecha.getFullYear();
      let fechaSalida = año+"-"+mes+"-"+dia;
      return fechaSalida;
    }else{
      return null; 
    }
  }


}
