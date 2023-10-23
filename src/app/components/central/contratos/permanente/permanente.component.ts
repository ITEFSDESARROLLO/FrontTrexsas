import { LoginService } from './../../../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { Ciudad } from 'src/app/models/ciudad';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-permanente',
  templateUrl: './permanente.component.html',
  styleUrls: ['./permanente.component.css'],
  providers:[MessageService]
})
export class PermanenteComponent implements OnInit {

  Formulario: FormGroup;
  edit:boolean;
  view:boolean;
  labels: any;
  clientes:any;
  rutas:any;
  rutasCrear:Array<any>;
  rutasMostrar:Array<any>;
  pasajeros:any;
  pasajerosMostrar:any[]=[];
  pasajerosCrear:any[] = [];
  idContratoPermanente:any;
  objetos:any;
  param: string;
  clienteSeleccionado:any;
  ciudadesE:Array<Ciudad>;
  ciudadesU:Array<Ciudad>;
  ciudades:any[]=[];
  ciudadesFiltradas:any[]=[];
  pasajeroSeleccionado:any = "";
  contratoEditar:any;
  constructor(private data: CentralService,private LoginService:LoginService, private httpService: HttpClient,private router:Router,private route:ActivatedRoute,
    private servicioMensaje:MessageService) {
    this.param="";
    this.idContratoPermanente="";
    this.edit=false;
    this.view=false;
    this.clienteSeleccionado={};
    this.clientes=[];
    this.rutas=[];
    this.pasajeros=[];
    this.rutasCrear=[];
    this.rutasMostrar=[];
    this.pasajerosMostrar=[];
    this.pasajerosCrear=[];
    this.objetos=[];
    var numberpattern='[0-9]+';
    this.Formulario = new FormGroup({
      slcCliente:new FormControl( '',[Validators.required]),
      slcObjeto:new FormControl( null),
      txtNombre:new FormControl( '',[Validators.required]),
      txtDocumento:new FormControl( '',[Validators.required]),
      txtTelefono:new FormControl( '',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(numberpattern)]),
      txtDireccion:new FormControl( '',[Validators.required]),
      nmbValorContrato:new FormControl(''),
      txtFechaInicio:new FormControl( '',[Validators.required]),
      txtFechaFin:new FormControl( '',[Validators.required]),
      txtTipoContrato:new FormControl ('',Validators.required),
      txtCiudadContrato:new FormControl('',Validators.required),
      nmbNumeroContrato:new FormControl( '',[Validators.required,Validators.pattern(numberpattern)]),

    });
  }

  ngOnInit(): void {
    console.log("contrato para ver : ",this.idContratoPermanente);
    this.obtenerClientes();
    this.obtenerCiudades();
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,6)==="editar")
    {

      var idContratoUrl=this.param.substr(6,this.param.length);
      this.edit=true;
      this.data.obtenerPermanenteEditar(idContratoUrl).subscribe((respuesta:any) =>
        {
          if(respuesta.mensaje ==1)
          {

            this.contratoEditar = respuesta.contrato;
            console.log("contrato recibido : ",this.contratoEditar)
            this.pasajerosMostrar = this.contratoEditar.pasajeroList;
            this.pasajeros = respuesta.libres;
            console.log("pasajeros mostrar : ",this.pasajerosMostrar);
            console.log("pasajeros mostrar : ",this.pasajeros);
            //this.clienteSeleccionado = this.contratoEditar.cliente;
            this.seleccion(this.contratoEditar.cliente);
            this.Formulario.patchValue({
              slcCliente:this.contratoEditar.cliente,
              slcObjeto:this.contratoEditar.objetoContrato,
              txtNombre:this.contratoEditar.responsable,
              txtDocumento:this.contratoEditar.documentoResponsable,
              txtTelefono:this.contratoEditar.telefonoResponsable,
              txtDireccion:this.contratoEditar.direccionResponsable,
              nmbValorContrato:this.contratoEditar.valorContrato,
              //txtFechaInicio:new Date(this.contratoEditar.fechaInicioContrato),
              txtFechaInicio:this.contratoEditar.fechaInicioContrato,
              //txtFechaFin:new Date(this.contratoEditar.fechaFinContrato),
              txtFechaFin:this.contratoEditar.fechaFinContrato,
              txtTipoContrato:this.contratoEditar.tipoContrato.id,
              txtCiudadContrato:this.contratoEditar.ciudad,
              nmbNumeroContrato:this.contratoEditar.numeracionContrato,

            })
          }else{
            console.log("mensaje : ",respuesta.mensaje);
          }

          for (let index = 0; index < this.pasajerosMostrar.length; index++)
          {
            for (let index2 = 0; index2 < this.pasajeros.length; index2++)
            {
              if(this.pasajeros[index2].idPasajero == this.pasajerosMostrar[index].idPasajero)
              {
                console.log("1. eliminando pasajero : ",this.pasajeros[index2].idPasajero);
                console.log("2. eliminando pasajero mostrar: ",this.pasajerosMostrar[index].idPasajero);
                this.pasajeros.splice(index2,1);
                break;
              }

            }

          }

          console.log("pasajeros pendientes : ",this.pasajeros);

        })
    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      this.idContratoPermanente=this.param.substr(3,this.param.length);
      console.log("contrato para ver : ",this.param);
      this.data.obtenerPermanente(this.idContratoPermanente).subscribe(

        (res:any)=>{
          console.log("contrato traido : ",res.contrato.cliente)
          this.contratoEditar = res.contrato;
          this.clienteSeleccionado = res.contrato.cliente;
          this.Formulario.patchValue({
            slcCliente:this.contratoEditar.cliente,
              slcObjeto:this.contratoEditar.objetoContrato,
              txtNombre:this.contratoEditar.responsable,
              txtDocumento:this.contratoEditar.documentoResponsable,
              txtTelefono:this.contratoEditar.telefonoResponsable,
              txtDireccion:this.contratoEditar.direccionResponsable,
              nmbValorContrato:this.contratoEditar.valorContrato,
              //txtFechaInicio:new Date(this.contratoEditar.fechaInicioContrato),
              txtFechaInicio:this.contratoEditar.fechaInicioContrato,
              //txtFechaFin:new Date(this.contratoEditar.fechaFinContrato),
              txtFechaFin:this.contratoEditar.fechaFinContrato,
              txtTipoContrato:this.contratoEditar.tipoContrato.id,
              txtCiudadContrato:this.contratoEditar.ciudad,
              nmbNumeroContrato:this.contratoEditar.numeracionContrato,
          });
          this.pasajerosCrear = res.pasajeroList;
          this.Formulario.disable();
        });
    }else{
      this.obtenerClientes();
      this.obtenerCiudades();
      this.obtenerPasajeros();
    }
  }

  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:any) => {
        console.log("ciudad : ",ciudad);
        this.ciudades = ciudad;
        this.Formulario.updateValueAndValidity();
      });
  }

  carajar()
  {
    alert("puto el que lea esto");
  }

  GuardarContrato() {

    if(this.Formulario.valid)
    {
      console.log("valido")
      if(this.edit==false)
      {
        this.pasajerosCrear = this.pasajerosMostrar;
        console.log(this.pasajerosMostrar.length);
        let contrato:any={};
        contrato.numeracionContrato=this.Formulario.get("nmbNumeroContrato")?.value;
        contrato.estadoContrato=1;
        contrato.valorContrato=this.Formulario.get("nmbValorContrato")?.value;
        contrato.objetoContrato=this.Formulario.get("slcObjeto")?.value;
        contrato.cliente=this.Formulario.get("slcCliente")?.value;
        contrato.pasajeroList=this.pasajerosCrear;
        contrato.fechaInicioContrato=this.Formulario.get("txtFechaInicio")?.value;
        contrato.fechaFinContrato=this.Formulario.get("txtFechaFin")?.value;
        contrato.tipoContrato = {
          id:this.Formulario.get('txtTipoContrato')?.value
        };
        contrato.responsable=this.Formulario.get("txtNombre")?.value;
        contrato.documentoResponsable=this.Formulario.get("txtDocumento")?.value;
        contrato.telefonoResponsable = this.Formulario.get("txtTelefono")?.value;
        contrato.direccionResponsable = this.Formulario.get('txtDireccion')?.value;
        contrato.ciudad = this.Formulario.get('txtCiudadContrato')?.value;
        console.log("contrato : ",contrato);
        this.data.crearPermanente(contrato).then(res=>{
            console.log(res);

              console.log("Creado Satisfactoriamente");
              Swal.fire({
                title: 'ÉXTIO',
                text: 'CONTRATO CREADO CON ÉXITO',
                icon:'success',
                showConfirmButton:true
              }).then(respuesta =>
                {
                  if(respuesta.isConfirmed)
                  {
                    window.location.replace("/central/contratos")
                  }

                })


          }
        ).catch(error =>
          {
            console.log("error : ",error);
          });
      }else{
        console.log("editando : ");
        console.log("valores ",this.Formulario.value);
        console.log(this.pasajerosMostrar.length);
        let contrato:any={};
        contrato.idContrato = this.contratoEditar.idContrato;
        contrato.contadorContrato = this.contratoEditar.contadorContrato;
        contrato.consecutivoContrato = this.contratoEditar.consecutivoContrato;
        contrato.numeracionContrato=this.Formulario.get("nmbNumeroContrato")?.value;
        contrato.estadoContrato=1;
        contrato.valorContrato=this.Formulario.get("nmbValorContrato")?.value;
        contrato.objetoContrato=this.Formulario.get("slcObjeto")?.value;
        contrato.cliente=this.Formulario.get("slcCliente")?.value;
        let pasajerosCrear:any[] = [];
        for (const iterator of this.pasajerosMostrar)
        {
          let pasajero = {
            idPasajero: iterator.persona.idPasajero
          };
          pasajerosCrear.push(pasajero);
        }
        contrato.pasajeroList=pasajerosCrear;
        contrato.fechaInicioContrato=this.Formulario.get("txtFechaInicio")?.value;
        contrato.fechaFinContrato=this.Formulario.get("txtFechaFin")?.value;
        contrato.tipoContrato = {
          id:this.Formulario.get('txtTipoContrato')?.value
        };
        contrato.responsable=this.Formulario.get("txtNombre")?.value;
        contrato.documentoResponsable=this.Formulario.get("txtDocumento")?.value;
        contrato.telefonoResponsable = this.Formulario.get("txtTelefono")?.value;
        contrato.direccionResponsable = this.Formulario.get('txtDireccion')?.value;
        contrato.ciudad = this.Formulario.get('txtCiudadContrato')?.value;
        console.log("contrato : ",contrato);
        this.data.editarPermanente(contrato).then(res=>{
            console.log(res);

              console.log("Creado Satisfactoriamente");
              Swal.fire({
                title: 'ÉXTIO',
                text: 'CONTRATO EDITAdO CON ÉXITO',
                icon:'success',
                showConfirmButton:true
              }).then(respuesta =>
                {
                  if(respuesta.isConfirmed)
                  {
                    window.location.replace("/central/contratos")
                  }
                })


          }
        ).catch(error =>
          {
            console.log("error : ",error);
          });
      }
    }else{
      console.log(" no valido")
      console.log(" no valido ",this.Formulario.errors)
      console.log("valores ",this.Formulario.controls);

      Swal.fire({
        title: 'ERROR',
        text: 'HAY CAMPOS PENDIENTES',
        icon:'warning'
      })

    }



  }

  obtenerClientes(){
    this.data
      .obtenerInfoBasicaClientes()
      .subscribe((resCliente:any) => {
        this.clientes = resCliente;
        this.Formulario.updateValueAndValidity();
      });
  }

  obtenerObjetos(){
    this.data
      .obtenerObjetosContratoInfoBasica()
      .subscribe((res:any) => {
        this.objetos = res;
        this.Formulario.updateValueAndValidity();
      });
  }

  obtenerRutas(){
    this.data
      .obtenerRutasInfoBasica()
      .subscribe((res:any) => {
        this.rutas = res;
        this.Formulario.updateValueAndValidity();
      });
  }

  obtenerPasajeros(){
    this.data
      .obtenerPasajerosInfoBasica()
      .subscribe((res:any) => {
        this.pasajeros = res;
        console.log("todos putos los pasajeros : ",res);
        this.Formulario.updateValueAndValidity();
      });
  }

  seleccion(a:any){
    if(a!=undefined){
      this.clienteSeleccionado=a;
    }else{
      this.clienteSeleccionado={};
    }
  }

  eliminarItemArreglo( arr:any, item:any ) {
    return arr.filter( function( e:any ) {
        return e !== item;
    } );
  };

  agregarPasajero(){

      console.log("pasajero a ingresar . ",this.pasajeroSeleccionado);
      var p=this.pasajeroSeleccionado;
      this.pasajerosMostrar.push(p);
      let pas:any={};
      pas.idPasajero=p.idPasajero;
      this.pasajerosCrear.push(pas);
      this.pasajeros=this.eliminarItemArreglo(this.pasajeros,p);

  }

  agregarPasajeroEditar(){
    console.log("pasajero a ingresar . ",this.pasajeroSeleccionado);
      var p=this.pasajeroSeleccionado;
      this.pasajerosMostrar.push(p);
      let pas:any={};
      pas.idPasajero=p.idPasajero;
      this.pasajerosCrear.push(pas);
      this.pasajeros=this.eliminarItemArreglo(this.pasajeros,p);
      this.data.agregarPasajeroContrato(p.idPasajero,this.contratoEditar.idContrato).then(respuesta=>
        {
          console.log("mensaje : ",respuesta);
          //this.pasajeros.splice(index,1);
          this.showSuccess();
          this.pasajeroSeleccionado = "";
        }).catch(error =>
          {
            console.log("error : ",error);
          })
  }

  agregarRuta(){
    if(this.Formulario.get("slcRuta")?.value!=undefined){
      var p=this.Formulario.get("slcRuta")?.value;
      this.rutasMostrar.push(p);
      let rut:any={};
      rut.idRuta=p.idRuta;
      this.rutasCrear.push(rut);
      this.rutas=this.eliminarItemArreglo(this.rutas,p);
      this.Formulario.patchValue({
        slcRuta:undefined
      });
    }
  }

  eliminarPasajero(p:any){
    this.pasajeros.push(p);
    this.pasajerosMostrar=this.eliminarItemArreglo(this.pasajerosMostrar,p);
    let pas:any={};
    pas.idPasajero=p.idPasajero;
    this.pasajerosCrear=this.eliminarItemArreglo(this.pasajerosCrear,pas);
    this.pasajeroSeleccionado = "";
  }

  eliminarPasajeroEditar(p:any,idPasajero:number)
  {
    this.pasajeros.push(p);
    this.pasajerosMostrar=this.eliminarItemArreglo(this.pasajerosMostrar,p);
    let pas:any={};
    pas.idPasajero=p.idPasajero;
    this.pasajerosCrear=this.eliminarItemArreglo(this.pasajerosCrear,pas);
    this.pasajeroSeleccionado = "";
    this.data.eliminarPasajeroContrato(p.idPasajero,this.contratoEditar.idContrato).then(respuesta =>
      {
        console.log("respuesta : ",respuesta);
        this.showSuccess();
        console.log("pasajeros pendientes : ",this.pasajeros);
        console.log("pasajeros mostrar : ",this.pasajerosMostrar);
      }).catch(error =>
        {
          console.log("error : ",error);
        });
  }

  eliminarRuta(p:any){
    this.rutas.push(p);
    this.rutasMostrar=this.eliminarItemArreglo(this.rutasMostrar,p);
    let rut:any={};
    rut.idRuta=p.idRuta;
    this.rutasCrear=this.eliminarItemArreglo(this.rutasCrear,rut);
  }

  filtrarCiudades(event:any)
  {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.ciudades.length; i++) {
        let ciudad = this.ciudades[i];
        if(ciudad.ciudad.toLowerCase().includes(query.toLowerCase()))
        {
            filtered.push(ciudad);
        }
    }

    this.ciudadesFiltradas = filtered;
  }

  showSuccess() {
    this.servicioMensaje.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }


}
