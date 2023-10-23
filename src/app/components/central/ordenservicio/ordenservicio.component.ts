import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenservicio',
  templateUrl: './ordenservicio.component.html',
  styleUrls: ['./ordenservicio.component.css']
})
export class OrdenservicioComponent implements OnInit {

  labels: any;
  Formulario: FormGroup;
  idReserva:any;
  param: string;
  conductores:Array<any>;
  vehiculos:Array<any>;
  ocultar=false;
  msm:string;
  view:boolean;
  edit:boolean;
  orden:any;
  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.vehiculos=[];
    this.conductores=[];
    this.param="";
    this.msm="";
    this.Formulario=new FormGroup({
      slcVehiculo:new FormControl( null,[Validators.required]),
      slcConductor:new FormControl( null,[Validators.required]),
      txtValorConductor:new FormControl( '',[Validators.required]),
      txtValorFacturar:new FormControl( '',[Validators.required]),
      txtObservaciones:new FormControl( ''),
    });
  }

  ngOnInit(): void {
    this.obtenerVehiculosInfoBasica();
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.idReserva = this.route.snapshot.params['id'];
    console.log("red ",this.idReserva)

  }

  selectVehiculo(ob:any){
    if(ob!=undefined){
      this.conductores=ob.conductorList;
      console.log("ob : ",ob);
    }
    else{
      this.conductores=[];
      console.log("ob : ",ob);
    }
  }


  obtenerVehiculosInfoBasica(){
    this.data
      .obtenerPlacasSalud()
      .subscribe((res:Array<any>) => {
        console.log("orden de servicio : ",res);
        this.vehiculos = res;
      });
  }



  guardar(){
    this.Formulario.markAllAsTouched();
    if(this.Formulario.valid){
      var JSON:any={};
      JSON.vehiculo={};
      JSON.conductor={};
      JSON.reserva={};
      JSON.vehiculo.idVehiculo=this.Formulario.get("slcVehiculo")?.value.idVehiculo;
      JSON.conductor.idConductor=this.Formulario.get("slcConductor")?.value;
      JSON.reserva.idReserva=this.idReserva;
      JSON.valorConductorOrdenServicio=this.Formulario.get("txtValorConductor")?.value;
      JSON.valorFacturarOrdenServicio=this.Formulario.get("txtValorFacturar")?.value;
      JSON.observacionesOrdenServicio=this.Formulario.get("txtObservaciones")?.value;
      console.log(JSON);

      this.data.crearOrdenServicio(JSON).subscribe((res:any)=>{

        console.log("respuesta : ",res);
          if(res.mensaje==1){
            Swal.fire({
              title: 'Operación Exitosa',
              text: 'ORDEN DE SERVICIO CREADA CON ÉXTIO',
              icon:'success'
            }).then(respuesta=>
              {
                if(respuesta.isConfirmed)
                {
                  window.location.href = "/central/ordenesservicio";
                }
              })
            this.ocultar=true;
          }else{
            this.ocultar=false;
            Swal.fire({
              title: 'Error',
              text: 'Error en el sistema '+res.mensaje,
              icon:'success'
            })
          }

      });

    }
  }

}
