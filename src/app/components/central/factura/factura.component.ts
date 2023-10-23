import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  datofechaini:any;
  datofechafin:any;
  total:any;
  dato:any;
  concepto:any;
  param:string;
  labels: any;
  resReservasCumplidas:any={};
  reservas:Array<any>;
  contratos:any[]=[];
  Formulario:FormGroup;
  FormularioFechas:FormGroup;
  idF:number;
  idCli:number;
  view=false;
  edit=false;
  msm:string="";
  fechaInicio="";
  fechaFin="";
  ocultar=false;
  clienteSeleccionado:any;
  desplegableCliente:any;
  facturas:any[]=[];

  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute,private httpService: HttpClient) {

    this.FormularioFechas=new FormGroup({
      txtFechaInicio:new FormControl(null,[Validators.required]),
      slcContrato:new FormControl( null,[Validators.required]),
      txtFechaFin:new FormControl( null,[Validators.required]),
    },{
      validators:[this.checkFechas.bind(this)]
    });
    this.Formulario=new FormGroup({
      txtFecha:new FormControl( null,[Validators.required]),
      txtConcepto:new FormControl( null,[Validators.required]),
    },{
      validators:[this.checkFecha.bind(this)]
    });
    this.obtenerPermanentesInfoBasica();
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
      this.idF=+urlid;
      this.data.obtenerFactura(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.fechaInicio=res.fechaInicioFactura;
            this.fechaFin=res.fechaFinFactura;
            this.idCli=res.cliente.idCliente;
            this.FormularioFechas.patchValue({
              slcContrato:res.cliente.idCliente,
              txtFechaInicio:res.fechaInicioFactura,
              txtFechaFin:res.fechaFinFactura
            });
            this.Formulario.patchValue({
              txtFecha:res.fechaFactura,
              txtConcepto:res.conceptoFactura,
            });
          }
          this.data
            .obtenerInfoReservasCumplidas(this.fechaInicio,this.fechaFin,this.idCli)
            .subscribe((res:Array<any>) => {
              console.log(res)
              this.resReservasCumplidas = res;
            });
        });

    }
    if(this.param?.substr(0,3)==="ver"){
      var urlid=this.param.substr(3,this.param.length);
      this.edit=false;
      this.view=true;
      this.idF=+urlid;
      this.data.obtenerFactura(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.fechaInicio=res.fechaInicioFactura;
            this.fechaFin=res.fechaFinFactura;
            this.idCli=res.cliente.idCliente;
            this.FormularioFechas.patchValue({
              slcContrato:res.cliente.idCliente,
              txtFechaInicio:res.fechaInicioFactura,
              txtFechaFin:res.fechaFinFactura
            });
            this.FormularioFechas.disable();
            this.Formulario.patchValue({
              txtFecha:res.fechaFactura,
              txtConcepto:res.conceptoFactura,
            });
            this.Formulario.disable();
          }
          this.data
            .obtenerInfoReservasCumplidas(this.fechaInicio,this.fechaFin,this.idCli)
            .subscribe((res:Array<any>) => {
              console.log(res);
              this.resReservasCumplidas = res;
            });
        });

    }

    this.obtenerclientes();
  }

  obtenerclientes(){
    this.data.llamarClientes().subscribe((res: any) => {
       this.clienteSeleccionado = res.clientes;
      console.log('respuesta clientes  ', res);
  });
}

  obtenerPermanentesInfoBasica(){
    this.data
      .obtenerInfoBasicaPermanentes()
      .then(res=> {
        this.contratos = res;
      }).catch(error =>
        {
          console.log("error : ",error);
        });
  }

  buscarReservas(){
    if(this.FormularioFechas.valid){
      this.fechaInicio = this.datofechaini;
      this.fechaFin = this.datofechafin;
      this.idCli = this.FormularioFechas.get("slcContrato")?.value;
      console.log("fecha inicio : ",this.fechaInicio);
      console.log("fecha fin : ",this.fechaFin);
      console.log("idCli : ",this.idCli);
      this.data
      .obtenerInfoReservasCumplidas(this.fechaInicio,this.fechaFin,this.idCli)
      .subscribe((res:Array<any>) => {
        console.log(res)
        this.resReservasCumplidas = res;
      });
    }else{
      this.FormularioFechas.markAllAsTouched();
    }
  }


  guardar(){
    this.Formulario.markAllAsTouched();
    if(this.Formulario.valid){
      var JSON:any={};
      JSON.cliente={};
      JSON.fechaInicioFactura=this.fechaInicio;
      JSON.fechaFinFactura=this.fechaFin;
      JSON.fechaFactura=this.Formulario.get("txtFecha")?.value;
      JSON.totalFactura=this.resReservasCumplidas.total;
      JSON.conceptoFactura=this.Formulario.get("txtConcepto")?.value;
      JSON.cliente.idCliente=this.idCli;
      console.log(JSON);
      if(this.edit){
        JSON.idFactura=this.idF;
        this.data.actualizarFactura(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }else{
        this.data.crearFactura(JSON).subscribe((res:any)=>{
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

  obtenerfacturas(){
    var con:any;
    let dia=this.datofechaini?.getDate();
    let mes=this.datofechaini?.getMonth()+1;
    let anio=this.datofechaini?.getFullYear();
    let diafin=this.datofechafin?.getDate();
    let mesfin=this.datofechafin?.getMonth()+1;
    let aniofin=this.datofechafin?.getFullYear();
    let fechainicial= anio+"-"+mes+"-"+dia;
    let fechafinal=aniofin+"-"+mesfin+"-"+diafin;
    console.log('respuesta facturas  ', this.desplegableCliente?.idCliente);
    console.log('respuesta fin  ', fechafinal);
    console.log('respuesta turas  ', fechainicial);
    this.data.obtenerInfoReservasCumplidas(fechainicial,fechafinal,this.desplegableCliente?.idCliente).subscribe((res: any) => {
      if(res.reservas == 0){
        Swal.fire({
          title:"No Resultados",
          text:"Los datos seleccionados no son validos o no tienen servicios culminados",
          icon:"error"
        })
      }else{
        this.facturas=res.reservas;
        this.total=res.total;
      }
    });
  }

  agregarcliente(){
    console.log('clien',this.desplegableCliente);
  }

  checkFechas: ValidationErrors = (group: FormGroup): ValidationErrors | null=> { // here we have the 'passwords' group
    var regreso = group.controls.txtFechaFin.value;
    var salida =  group.controls.txtFechaInicio.value;
    if(new Date(salida)>new Date(regreso)){
      group.controls['txtFechaFin'].setErrors({checkfech:true});
    }else{
      group.controls['txtFechaFin'].setValidators([Validators.required]);
      group.controls['txtFechaFin'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    return null
  }

  checkFecha: ValidationErrors = (group: FormGroup): ValidationErrors | null=> {
    var salida =  group.controls.txtFecha.value;
    if(new Date()>=new Date(salida) && salida!=null){
      group.controls['txtFecha'].setErrors({checkfech:true});
    }
    return null
  }

  generarprefactura(){
    let fechaactual=this.formateofecha(new Date());
    let fechainicial=this.formateofecha(this.datofechaini);
    let fechafinal=this.formateofecha(this.datofechafin);
    let factura={
      fechaFinFactura:fechafinal,
      fechaInicioFactura:fechainicial,
      fechaFactura:fechaactual,
      totalFactura:this.total,
      factura:this.dato,
      conceptoFactura:this.concepto,
      cliente:this.desplegableCliente
    }
    console.log(factura);
    this.data.crearFactura(factura).subscribe((res:any) => {
      console.log('res',res);
      if(res.factura == 0){
        Swal.fire({
          title:"No Resultados",
          text:"No se encontraron datos para realizar la prefactura",
          icon:"error"
        })
      }else{
        Swal.fire({
          title:"Realizada",
          text:"prefactura se realizo correctamente",
          icon:"info"
        })
      }
    });
  }

  formateofecha(fecha:any){
    let fechanueva;
    let dia=fecha.getDate();
    let mes=fecha.getMonth()+1;
    let anio=fecha.getFullYear();
    if(mes<10){
      fechanueva= anio+"-"+"0"+mes+"-"+dia;
    }else{
      fechanueva= anio+"-"+mes+"-"+dia;
    }
    return fechanueva;
  }
}
