import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/app-constants';
import { CentralService } from 'src/app/services/central.service';
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @ViewChild('searchOrigen')
  public searchElementRefOrigen: ElementRef;
  @ViewChild('searchDestino')
  public searchElementRefDestino: ElementRef;

  latO :number;
  lngO : number;
  latD :number;
  lngD : number;
  public origin: any;
  public destination: any;
  addressO : string;
  addressD : string;
  duracion:string;
  private geoCoder;
  markers: marker[]=[];
  labels: any;
  Formulario: FormGroup;
  pasajeros:Array<any>;
  contratos:any[] = [];
  ocultar=false;
  ocultarFR=false;
  msm="";
  idR:number;
  param: string;
  edit:boolean;
  view:boolean;
  duplicar:boolean;
  distancia:number;
  mostrarRuta:boolean;
  disponibilidadCambioUsuario:boolean = true;
  nombrePasajero:string="";
  reserva:any;
  constructor(private data:CentralService,private router:Router,private route:ActivatedRoute,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader, private httpService: HttpClient) {
    this.pasajeros=[];
    this.param="";
    this.mostrarRuta=false;
    this.edit=false;
    this.view=false;
    this.idR=-1;
    this.Formulario=new FormGroup({
      swIyR:new FormControl(false),
      slcContrato:new FormControl( null,[Validators.required]),
      slcPasajero:new FormControl( null,[Validators.required]),
      txtFechaSalida:new FormControl( '',[Validators.required]),
      txtFechaRegreso:new FormControl( ''),
      txtOrigen:new FormControl( '',[Validators.required,Validators.maxLength(100)]),
      txtDestino:new FormControl( '',[Validators.required,Validators.maxLength(100)]),
      txtNoVoucher:new FormControl( ''),
      txtObservaciones:new FormControl( ''),
    },{
      validators:[this.checkFechas.bind(this)]
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
    console.log("param : ",this.param)
    if(this.param?.substr(0,8)==="duplicar"){
      console.log("duplicando : ");
      this.edit=false;
      this.view=false;
      this.duplicar = true;
      this.disponibilidadCambioUsuario = true;
      var urlid=this.param.substr(8,this.param.length);
      this.data.obtenerReservaDuplicado(urlid).subscribe(
        (res:any)=>{
          console.log("objeto a duplicar",res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.reserva = res.reserva;
            console.log("reserva : ",res)
            var auxContrato:any={};
            auxContrato=this.contratos.find(element=>element.idCliente == res.reserva.cliente.idCliente);

            this.pasajeros=res.pasajeros.pasajeros;
            console.log("contrato : ",this.contratos);
            this.distancia=res.reserva.distanciaReserva;
            this.duracion=res.reserva.duracionReserva;
            this.latO=res.reserva.latitudOrigenReserva;
            this.lngO=res.reserva.longitudOrigenReserva;
            this.lngD=res.reserva.longitudDestinoReserva;
            this.latD=res.reserva.latitudDestinoReserva;
            console.log("horas :",res.reserva.horaInicioReserva.toString().substring(0,5));
            console.log("horas :",res.reserva.fechaInicioReserva.substring(0,10));
            this.Formulario.patchValue({
              slcContrato:auxContrato,
              slcPasajero:"",
              txtFechaSalida:new Date(res.reserva.fechaInicioReserva.substring(0,10)+" "+res.reserva.horaInicioReserva.toString().substring(0,5)),
              txtOrigen:res.reserva.direccionOrigenReserva,
              txtDestino:res.reserva.direccionDestinoReserva,
              txtNoVoucher:res.reserva.numeroVoucher,
              txtObservaciones:res.reserva.observacionesReserva
            });
            this.getDirection();
            this.mostrarRuta=true;
          }
        });

    }
    if(this.param?.substr(0,6)==="editar"){
      var urlid=this.param.substr(6,this.param.length);
      this.edit=true;
      this.duplicar=false;
      this.view=false;
      this.disponibilidadCambioUsuario = false;
      this.idR=+urlid;
      this.data.obtenerReserva(urlid).subscribe(
        (res:any)=>{
          console.log("1: ",res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.reserva = res;
            console.log("reserva : ",res.pasajero.persona)
            var auxContrato:any={};
            auxContrato=this.contratos.find(element=>element.idCliente == res.cliente.idCliente);
            this.pasajeros=auxContrato?.pasajeroList;
            this.distancia=res.distanciaReserva;
            this.duracion=res.duracionReserva;
            this.latO=res.latitudOrigenReserva;
            this.lngO=res.longitudOrigenReserva;
            this.lngD=res.longitudDestinoReserva;
            this.latD=res.latitudDestinoReserva;
            console.log("horas :",res.horaInicioReserva);
            this.Formulario.patchValue({
              slcContrato:auxContrato,
              slcPasajero:res.pasajero.idPasajero,
              txtFechaSalida:new Date(res.fechaInicioReserva.substring(0,10)+" "+res.horaInicioReserva.toString().substring(0,5)),
              txtOrigen:res.direccionOrigenReserva,
              txtDestino:res.direccionDestinoReserva,
              txtNoVoucher:res.numeroVoucher,
              txtObservaciones:res.observacionesReserva
            });
            this.nombrePasajero = res.pasajero.nombres;
            this.getDirection();
            this.mostrarRuta=true;
          }
        });
    }
    if(this.param?.substr(0,3)==="ver"){
      var urlid=this.param.substr(3,this.param.length);
      this.edit=false;
      this.duplicar=false;
      this.view=true;
      this.idR=+urlid;
      this.data.obtenerReserva(urlid).subscribe(
        (res:any)=>{
          console.log("2: ",res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            var auxContrato:any={};
            auxContrato=this.contratos.find(element=>element.idCliente == res.cliente.idCliente);
            this.pasajeros=auxContrato?.pasajeroList;
            this.distancia=res.distanciaReserva;
            this.duracion=res.duracionReserva;
            this.latO=res.latitudOrigenReserva;
            this.lngO=res.longitudOrigenReserva;
            this.lngD=res.longitudDestinoReserva;
            this.latD=res.latitudDestinoReserva;
            this.Formulario.patchValue({
              slcContrato:auxContrato,
              slcPasajero:res.pasajero.idPasajero,
              txtFechaSalida:res.fechaInicioReserva.replace(' ', 'T'),
              txtOrigen:res.direccionOrigenReserva,
              txtDestino:res.direccionDestinoReserva,
              txtNoVoucher:res.numeroVoucher,
              txtObservaciones:res.observacionesReserva
            });
            this.Formulario.disable();
            this.getDirection();
            this.mostrarRuta=true;
          }
        });
    }
    this.getDirection();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocompleteO = new google.maps.places.Autocomplete(this.searchElementRefOrigen.nativeElement);
      autocompleteO.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteO.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latO = place.geometry.location.lat();
          this.lngO = place.geometry.location.lng();
          this.origin = { lat: this.latO, lng: this.lngO };
          if(this.destination.lat!=null){
            this.calculateDistance();
            this.getAddress(this.latO, this.lngO,this.latD,this.lngD);
            this.getDistancia(this.origin, this.destination);
            this.mostrarRuta=true;
          }

        });
      });
      let autocompleteD = new google.maps.places.Autocomplete(this.searchElementRefDestino.nativeElement);
      autocompleteD.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteD.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latD = place.geometry.location.lat();
          this.lngD = place.geometry.location.lng();
          this.destination = { lat: this.latD, lng: this.lngD };
          if(this.origin.lat!=null){
            this.calculateDistance();
            this.getAddress(this.latO, this.lngO,this.latD,this.lngD);
            this.getDistancia(this.origin, this.destination);
            this.mostrarRuta=true;
          }
        });
      });

    });

  }

  calculateDistance() {
    const o = new google.maps.LatLng(this.latO, this.lngO);
    const d = new google.maps.LatLng(this.latD, this.lngD);
    this.distancia = google.maps.geometry.spherical.computeDistanceBetween(o, d);
  }
  //autocomplete directions https://angular-material-extensions.github.io/google-maps-autocomplete/

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }
  clickedMarker(m:string, i:number) {
    console.log(m);
    console.log(i);
  }

  public getDistancia(origen: string, destino: string) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({origins: [origen], destinations: [destino],travelMode:google.maps.TravelMode.DRIVING}, (results: any) => {
        this.duracion=results.rows[0].elements[0].duration.text;
    });
}

  getDirection() {
    this.origin = { lat: this.latO, lng: this.lngO };
    this.destination = { lat: this.latD, lng: this.lngD };
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latO = position.coords.latitude;
        this.lngO = position.coords.longitude;
        this.latD = position.coords.latitude;
        this.lngD = position.coords.longitude;
        this.getAddress(this.latO, this.lngO,this.latD,this.lngD);
      });
    }
  }

  getAddress(latitudeO, longitudeO,latitudeD,longitudeD) {
    this.geoCoder.geocode({ 'location': { lat: latitudeO, lng: longitudeO } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.addressO = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
    this.geoCoder.geocode({ 'location': { lat: latitudeD, lng: longitudeD } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.addressD = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  obtenerPermanentesInfoBasica()
  {
    this.data
      .obtenerInfoBasicaPermanentes()
      .then(res => {
        console.log("res : ",res);
        this.contratos = res.contratos;
      }).catch(error =>
        {
          console.log("error : ",error);
        });
  }

  selectContrato(ob:any){
    console.log("objeto seleccionado : ",ob);
    this.data.obtenerPasajerosContratoReserva(ob.idContrato).then(respuesta =>
      {
        this.pasajeros = respuesta.pasajeros;
        console.log("pasajeros : ",respuesta);
      }).catch(error=>
        {
          console.log("error : ",error);
        })
    console.log("ob : ",ob.idContrato);
    /*if(ob!=undefined){
      this.pasajeros=ob.pasajeroList;
    }
    else{
      this.pasajeros=[];
    }*/
  }

  changeSwIyR(ob:MatSlideToggleChange){
    this.ocultarFR=ob.checked;
  }

  generarFormatoFecha(fecha:Date)
  {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return año+"-"+mes+"-"+dia;
  }

  generarFormatoHora(fecha:Date)
  {
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    return horas+":"+minutos+":"+"00"
  }

  guardar(){

    this.Formulario.markAllAsTouched();
    if(this.Formulario.valid){

      var JSON:any={};
      JSON.cliente={};
      JSON.pasajero={};
      //JSON.cliente.idCliente=this.Formulario.get("slcContrato")?.value.idCliente;
      console.log("idCliente : ",this.Formulario.get("slcContrato")?.value.idContrato);
      console.log("idCliente : ",this.Formulario.get("slcContrato")?.value.idCliente);
      JSON.cliente.idCliente=this.Formulario.get("slcContrato")?.value.idCliente;
      JSON.pasajero.idPasajero=this.Formulario.get("slcPasajero")?.value;
      var fechaInicio=this.generarFormatoFecha(this.Formulario.get("txtFechaSalida")?.value);
      var horaInicio = this.generarFormatoHora(this.Formulario.get("txtFechaSalida")?.value);
      JSON.fechaInicioReserva=fechaInicio;
      JSON.horaInicioReserva = horaInicio;
      JSON.numeroVoucher=this.Formulario.get("txtNoVoucher")?.value;
      JSON.longitudOrigenReserva=this.lngO;
      JSON.latitudOrigenReserva=this.latO;
      JSON.longitudDestinoReserva=this.lngD;
      JSON.latitudDestinoReserva=this.latD;
      JSON.direccionOrigenReserva=this.addressO==undefined?this.Formulario.get('txtOrigen').value:this.addressO;
      JSON.direccionDestinoReserva=this.addressD==undefined?this.Formulario.get('txtDestino').value:this.addressD;
      JSON.duracionReserva=this.duracion;
      JSON.distanciaReserva=this.distancia;
      JSON.observacionesReserva=this.Formulario.get("txtObservaciones")?.value;
      console.log("1");
      if(this.edit){
        JSON.idReserva=this.idR;
        console.log(JSON);
        console.log("2");
        this.data.actualizarReserva(JSON).subscribe((res:any)=>{
          console.log("3");
          if(res.mensaje==1){
            console.log("4");
            if(this.Formulario.get("swIyR")?.value){
              console.log("5");
              var JSONRegreso:any={};
              JSONRegreso.cliente={};
              JSONRegreso.pasajero={};
              JSONRegreso.cliente.idCliente=JSON.cliente.idCliente;
              JSONRegreso.pasajero.idPasajero=JSON.pasajero.idPasajero;
              var fechaRegreso:String;
              fechaRegreso=this.Formulario.get("txtFechaRegreso")?.value.replace('T',' ');
              JSONRegreso.fechaInicioReserva=fechaRegreso;
              JSONRegreso.numeroVoucher=this.Formulario.get("txtNoVoucher")?.value;
              JSONRegreso.longitudOrigenReserva=this.lngD;
              JSONRegreso.latitudOrigenReserva=this.latD;
              JSONRegreso.longitudDestinoReserva=this.lngO;
              JSONRegreso.latitudDestinoReserva=this.latO;
              JSONRegreso.direccionOrigenReserva=this.addressO==undefined?this.Formulario.get('txtOrigen'):this.addressO;
              JSONRegreso.direccionDestinoReserva=this.addressD==undefined?this.Formulario.get('txtDestino'):this.addressD;
              JSONRegreso.duracionReserva=this.duracion;
              JSONRegreso.distanciaReserva=this.distancia;
              JSONRegreso.observacionesReserva=this.Formulario.get("txtObservaciones")?.value;
              console.log(JSONRegreso);
              console.log("6");
              this.data.crearReserva(JSONRegreso).subscribe((res2:any)=>{
                console.log("7");
                if(res2.mensaje==1 && res.mensaje==1){
                  this.ocultar=true;
                    Swal.fire({
                      title: 'Operación Exitosa',
                      text: 'ACTUALIZADO SATISFACTORIAMENTE',
                      icon:'success'
                    }).then(respuesta=>
                      {
                        if(respuesta.isConfirmed)
                        {
                         //window.location.href = "/central/reservas";
                         {
                          this.msm+=" "+"CREADO CON EXITO ";
                        }
                        }
                      })


                }else{
                  this.ocultar=false;
                  Swal.fire({
                    title: 'Error',
                    text: 'Error en el sistema '+res.mensaje,
                    icon:'success'
                  })
                }
              });
            }else{
              this.ocultar=true;
              console.log("8");
              Swal.fire({
                title: 'Operación Exitosa',
                text: 'ACTUALIZADO SATISFACTORIAMENTE',
                icon:'success'
              }).then(respuesta=>
                {
                  if(respuesta.isConfirmed)
                  {
                    //window.location.href = "/central/reservas";
                    {
                      this.msm+=" "+"ACTUALIZADO CON EXITO ";
                    }
                  }
                })
            }
          }else{
            this.ocultar=false;
            console.log("9");
            Swal.fire({
              title: 'Error',
              text: 'Error en el sistema '+res.mensaje,
              icon:'success'
            })
          }
        });

      }else if(this.duplicar){
        JSON.idReserva=this.idR;
        console.log(JSON);
        this.data.crearReserva(JSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            if(this.Formulario.get("swIyR")?.value){
              var JSONRegreso:any={};
              JSONRegreso.cliente={};
              JSONRegreso.pasajero={};
              JSONRegreso.cliente.idCliente=JSON.cliente.idCliente;
              JSONRegreso.pasajero.idPasajero=JSON.pasajero.idPasajero;
              var fechaRegreso:String;
              fechaRegreso=this.Formulario.get("txtFechaRegreso")?.value.replace('T',' ');
              JSONRegreso.fechaInicioReserva=fechaRegreso;
              JSONRegreso.numeroVoucher=this.Formulario.get("txtNoVoucher")?.value;
              JSONRegreso.longitudOrigenReserva=this.lngD;
              JSONRegreso.latitudOrigenReserva=this.latD;
              JSONRegreso.longitudDestinoReserva=this.lngO;
              JSONRegreso.latitudDestinoReserva=this.latO;
              JSONRegreso.direccionOrigenReserva=this.addressO==undefined?this.Formulario.get('txtOrigen'):this.addressO;
              JSONRegreso.direccionDestinoReserva=this.addressD==undefined?this.Formulario.get('txtDestino'):this.addressD;
              JSONRegreso.duracionReserva=this.duracion;
              JSONRegreso.distanciaReserva=this.distancia;
              JSONRegreso.observacionesReserva=this.Formulario.get("txtObservaciones")?.value;
              console.log(JSONRegreso);
              this.data.crearReserva(JSONRegreso).subscribe((res2:any)=>{
                if(res2.mensaje==1 && res.mensaje==1){
                  this.ocultar=true;
                  Swal.fire({
                    title: 'Operación Exitosa',
                    text: 'DUPLICADO SATISFACTORIAMENTE',
                    icon:'success'
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                        //window.location.href = "/central/reservas";
                        this.msm+=" "+"DUPLICADO CON EXITO ";
                      }
                    })

                }else{
                  this.ocultar=false;
                  Swal.fire({
                    title: 'Error',
                    text: 'Error en el sistema '+res.mensaje,
                    icon:'success'
                  })
                }
              });
            }else{
              this.ocultar=true;

              Swal.fire({
                title: 'Operación Exitosa',
                text: 'DUPLICADO SATISFACTORIAMENTE',
                icon:'success'
              }).then(respuesta=>
                {
                  if(respuesta.isConfirmed)
                  {
                  //  window.location.href = "/central/reservas";
                  this.msm+=" "+"CREADO CON EXITO ";
                  }
                })
            }
          }else{
            this.ocultar=false;
            Swal.fire({
              title: 'Error',
              text: 'Error en el sistema '+res.mensaje,
              icon:'success'
            })
          }
        });

      }else{
        this.data.crearReserva(JSON).subscribe((res:any)=>{
          console.log("creando reserva : ",JSON);
          if(res.mensaje==1){
            if(this.Formulario.get("swIyR")?.value){
              var JSONRegreso:any={};
              JSONRegreso.cliente={};
              JSONRegreso.pasajero={};
              JSONRegreso.cliente.idCliente=JSON.cliente.idCliente;
              JSONRegreso.pasajero.idPasajero=JSON.pasajero.idPasajero;
              var fechaRegreso:String;
              fechaRegreso=this.generarFormatoFecha(this.Formulario.get("txtFechaRegreso")?.value);
              horaInicio = this.generarFormatoHora(this.Formulario.get("txtFechaRegreso")?.value);
              JSONRegreso.fechaInicioReserva=fechaRegreso;
              JSONRegreso.horaInicioReserva=horaInicio;
              JSONRegreso.numeroVoucher=this.Formulario.get("txtNoVoucher")?.value;
              JSONRegreso.longitudOrigenReserva=this.lngD;
              JSONRegreso.latitudOrigenReserva=this.latD;
              JSONRegreso.longitudDestinoReserva=this.lngO;
              JSONRegreso.latitudDestinoReserva=this.latO;
              JSONRegreso.direccionOrigenReserva=this.addressD==undefined?this.Formulario.get('txtDestino'):this.addressD;
              JSONRegreso.direccionDestinoReserva=this.addressO==undefined?this.Formulario.get('txtOrigen'):this.addressO;
              JSONRegreso.duracionReserva=this.duracion;
              JSONRegreso.distanciaReserva=this.distancia;
              JSONRegreso.observacionesReserva=this.Formulario.get("txtObservaciones")?.value;
              console.log("creado : ",JSONRegreso);
              this.data.crearReserva(JSONRegreso).subscribe((res2:any)=>{
                if(res2.mensaje==1 && res.mensaje==1){
                  console.log("exito recibido regreso:",res)
                  this.ocultar=true;
                  Swal.fire({
                    title: 'Operación Exitosa',
                    text: 'CREADO SATISFACTORIAMENTE',
                    icon:'success'
                  }).then(respuesta=>
                    {
                      if(respuesta.isConfirmed)
                      {
                       // window.location.href = "/central/reservas";
                       this.msm+=" "+"CREADO CON EXITO ";
                      }
                    })

                }else{
                  console.log("error recibido regreso:",res)
                  this.ocultar=false;
                  Swal.fire({
                    title: 'Error',
                    text: 'Error en el sistema '+res.mensaje,
                    icon:'success'
                  })

                }
              });
            }else{
            //mensaje de creacion de usuario
              console.log("exito creado ida :",res)
              this.ocultar=true;
              Swal.fire({
                title: 'Operación Exitosa',
                text: 'CREADO SATISFACTORIAMENTE',
                icon:'success'
              }).then(respuesta=>
                {
                  if(respuesta.isConfirmed)
                  {
                    //window.location.replace('/central/reservas');
                    {

                      this.msm+=" "+"CREADO CON EXITO ";
                    }
                  }
                })

            }
          }else{
            console.log("error creado ida :",res)
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

  checkFechas: ValidationErrors = (group: FormGroup): ValidationErrors | null=> { // here we have the 'passwords' group
    var regreso = group.controls.txtFechaRegreso.value;
    var salida =  group.controls.txtFechaSalida.value;
    var sw =  group.controls.swIyR.value;
    if(sw){
      if(new Date(salida)>new Date(regreso)){
        group.controls['txtFechaRegreso'].setErrors({checkfech:true});
      }else{
        group.controls['txtFechaRegreso'].setValidators([Validators.required]);
        group.controls['txtFechaRegreso'].updateValueAndValidity({emitEvent:false, onlySelf:true});
      }
    }
    return null
  }


}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
