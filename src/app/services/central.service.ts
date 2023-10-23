import { RevisionPreventiva } from './../models/revision-preventiva';
import { PolizaExtracontractual } from './../models/poliza-extracontractual';
import { PolizaContractual } from './../models/poliza-contractual';
import { Vehiculocreateinterface } from './../models/vehiculocreateinterface';
import { Observacioninterface } from './../models/observacioninterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfiliacionVehiculoInterface } from '../models/afiliacion-vehiculo-interface';
//import { CONFIG } from './config';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/internal/Observable';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class CentralService {

  url:string;
  public resacc:Array<any>;



  constructor(private http: HttpClient, private auth:LoginService) {
    this.resacc=[];
    //this.url = 'http://181.143.139.108:8080/trexsas-desarrollo/'
    //this.url = "http://localhost:8081/trexsas-desarrollo/"
    this.url = 'http://localhost:8080/'
    //this.url ='C:\Users\ITEFS-BACKEND\Downloads'
  }

  obtenerNombre(){
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/nombre`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerAcceso(){
    const token = this.obtenertoken();
    //console.log(token);
    const url_api = this.url+`perfil/accesos`;
    return this.http.get<Array<any>>(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenertoken(){
    return this.auth.getToken();
  }

  obtenerAfiliaciones() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`afiliacion`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  obtenerAfiliacion(id:string) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`afiliacion/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  actualizarafiliacion(json:AfiliacionVehiculoInterface){
    const url_api =  this.url+'afiliacion';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearObservacion(obs:Observacioninterface) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'afiliacion/observacionafiliacion';
    return this.http
      .post(url_api, obs, {
        params: {
        accessToken: token
      }
    });
  }

  ObtenerPlaca() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/placa`;
    return this.http.get<Array<any>>(url_api,{
      params: {
        accessToken: token
      }
    });
  };

  ObtenerCedulas():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/cedula`;
    return this.http.get(url_api,{
      params: {
        accessToken: token
      }
    });
  };

  llamarClientes() {
    const token = this.obtenertoken();
    const url_api = this.url+`cliente/listarClientes`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };



  obtenerImagenVeh(nom:string){
    window.open(this.url+'archivo/vehiculo/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehTO(nom:string){
    window.open(this.url+'archivo/tarjetaoperacion/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehTP(nom:string){
    window.open(this.url+'archivo/tarjetapropiedad/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehLC(nom:string){
    window.open(this.url+'archivo/licenciaconduccion/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehCC(nom:string){
    window.open(this.url+'archivo/cedula/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehFoto(nom:string){
    window.open(this.url+'archivo/foto/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehconv(nom:string){
    window.open(this.url+'archivo/convenio/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehSOAT(nom:string){
    window.open(this.url+'archivo/soat/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehPC(nom:string){
    window.open(this.url+'archivo/polizacontractual/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehTM(nom:string){
    window.open(this.url+'archivo/revisiontecnicomecanica/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehPE(nom:string){
    window.open(this.url+'archivo/polizaextracontractual/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerArchivoPolizaTodoRiesgo(nom:string){
    window.open(this.url+'archivo/polizaTodoRiesgo/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenVehRP(nom:string){
    window.open(this.url+'archivo/revisionpreventiva/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerImagenLogo(nom:string){
    window.open(this.url+'archivo/logocliente/'+nom+'?accessToken='+this.obtenertoken());
  }

  ActualizarArchivoVeh(doc1:File,nomant:string){
    const url_api = this.url+'archivo/vehiculo/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoVehiculo', doc1);

    /*
    return this.http
      .post(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoConv(doc1:File,nomant:string){
    const url_api = this.url+'archivo/convenio/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoConvenio', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoTO(doc1:File,nomant:string){
    const url_api = this.url+'archivo/tarjetaoperacion/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoTarjetaOperacion', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoSOAT(doc1:File,nomant:string){
    const url_api = this.url+'archivo/soat/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoSoat', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoTM(doc1:File,nomant:string){
    const url_api = this.url+'archivo/revisiontecnicomecanica/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoRevisionTecnicomecanica', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoPC(doc1:File,nomant:string){
    const url_api = this.url+'archivo/polizacontractual/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoPolizaContractual', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoPE(doc1:File,nomant:string){
    const url_api = this.url+'archivo/polizaextracontractual/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoPolizaExtracontractual', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoRP(doc1:File,nomant:string){
    const url_api = this.url+'archivo/revisionpreventiva/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoRevisionPreventiva', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoTP(doc1:File,nomant:string){
    const url_api = this.url+'archivo/tarjetapropiedad/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoTarjetaPropiedad', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  ActualizarArchivoLC(doc1:File,nomant:string){
    const url_api = this.url+'archivo/licenciaconduccion/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoLicenciaConduccion', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  async cambiarArchivoLicenciaConductor(doc1:File,nomant:string){
    const url_api = this.url+'archivo/licenciaconduccion/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();
    formD.append('archivoLicenciaConduccion', doc1);
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  ActualizarArchivoCC(doc1:File,nomant:string){
    const url_api = this.url+'archivo/cedula/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoCedula', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  async cambiarArchivoCedulaUsuario(doc1:File,nomant:string,persona:number){
    const url_api = this.url+'archivo/cedula/'+nomant+'/'+persona;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('archivoCedula', doc1);

    /*
    return this.http
      .put(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  //Complemento Vehiculos

  obtenerProp():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`propietario/propietariosvehiculo2`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerVehiculo(id:string):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerVehiculoPlaca(id:string):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerVehiculoPlacaFuec(id:string):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/vehiculoParaFuec/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerVehiculos(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerVehiculosFuec(pag:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    }).toPromise();
  };

  obtenerVehiculosFuec2():Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/obtenerParaFuec`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    }).toPromise();
  };


  obtenerColoresVehiculos():Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/coloresVehiculos`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerLineas(marca:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/traerLinea/`+marca;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerTiposServiciosVehiculos():Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipoServicio`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerTiposCarroceria():Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipoCarroceria`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerEnitdadesTransito():Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/entidadesTransito`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  };

  obtenerBasConductores() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  agregarCond(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/conductor';
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token,
        modificador: modificador
      }
    });
  }

  /*quitarCond(id:string,idcon:string) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/conductor/'+id+'/'+idcon;
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .delete(url_api, {
        params: {
        accessToken: token,
        modificador: modificador
      }
    });
  }*/

  quitarCond(id:string,idcon:string):Promise<any> {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/conductor/'+id+'/'+idcon;
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .delete(url_api, {
        params: {
        accessToken: token,
        modificador: modificador
      }
    }).toPromise();
  }

  conductorOrdenesServicio(){
    const token = this.obtenertoken();
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    console.log("valor",modificador);
  }

  crearConvenio(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/convenio';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }


  actualizarVehiculo(json:Vehiculocreateinterface){
    const url_api =  this.url+'vehiculo';
    const token = this.obtenertoken();
    var decode:any = jwt_decode(token);
    console.log("token : ",decode);
    let modificador = decode.persona;
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token,
        modificador: modificador
      }
    }).
    pipe(map(data=>data));
  }


  crearVehiculo(json:Vehiculocreateinterface)
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    let url_api = "";
    if(json.convenio==undefined)
    {
      url_api = this.url+'vehiculo/crearVehiculoAfiliacion';
    }else{
      url_api = this.url+'vehiculo/crearVehiculoConvenio';
    }
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token,
        modificador:modificador
      }
    });
  }

  crearVehiculoExcel(json:any):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    let url_api = "";
    url_api = this.url+'vehiculo/vehiculosExcel';
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  crearVehiculoAfiliacion(json:Vehiculocreateinterface)
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    let url_api = "";
    url_api = this.url+'vehiculo/crearVehiculoAfiliacion';
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .post(url_api, {
        vehiculo:json.vehiculo,
        soat:json.soat,
        polizaContractual:json.polizaContractual,
        polizaExtracontractual:json.polizaExtracontractual,
        revisionTecnicoMecanica:json.revisionTecnicomecanica,
        revisionPreventiva:json.revisionPreventiva,
        tarjetaOperacion:json.tarjetaOperacion
      }, {
        params: {
        accessToken: token,
        modificador:modificador
      }
    });
  }

  estadoVehiculo(json:any){
    const url_api =  this.url+'vehiculo/estado';
    const token = this.obtenertoken();
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token,
        modificador: modificador
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento propietarios

  obtenerPropietarios(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`propietario`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerNoProp(){
    const token = this.obtenertoken();
    const url_api = this.url+`propietario/nopropietarios`;
    return this.http.get<any>(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerPersona(id:string) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/persona/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerPropietario(id:string) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`propietario/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  actualizarProp(json:any){
    const url_api =  this.url+'propietario';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearProp(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'propietario';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  crearPregunta(json:any, encuesta:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'encuesta/agregarPregunta/'+encuesta;
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  crearOpcion(json:any, pregunta:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'encuesta/agregarOpcion/'+pregunta;
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  EliminarProp(json:any){
    const url_api =  this.url+'propietario/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  inhabilitarContrato(contrato:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/cambiarEstado/'+contrato;
    console.log("token : ",token);
    return this.http.get(url_api,{params:
      {
        token: token
      }}).toPromise();
  }

  habilitarContrato(contrato:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/cambiarEstadoHabilitado/'+contrato;
    return this.http.get(url_api,{params: {token: token}}).toPromise();
  }

  anularFuec(fuec:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'fuec/anular/'+fuec;
    return this.http.get(url_api,{params: {token: token}}).toPromise();
  }


   //Complemento conductores

  obtenerConductores(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`conductor`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerNoCond(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/noconductores`;
    return this.http.get<any>(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerConductor(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerConductorPorPersona(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/obtenerPorPersona/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerCajaCompensacion(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/cajacompensacion`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  obtenerFondoPension(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/fondopensiones`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  obtenerEstadoCivil(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/estadocivil`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  obtenerARL(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/arl`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  obtenerEPS(){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/eps`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  actualizarCond(json:any){
    const url_api =  this.url+'conductor';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearCond(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'conductor';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  async crearConductorNuevoPerfilEditar(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'conductor';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  obtenerImagenExMedicos(nom:string){
    window.open(this.url+'archivo/examenesmedicos/'+nom+'?accessToken='+this.obtenertoken());
  }

  ActualizarArchivoExMedicos(doc1:File,nomant:string){
    const url_api = this.url+'archivo/examenesmedicos/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('examenesMedicos', doc1);

    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  async cambiarArchivoExamenesMedicosConductor(doc1:File,nomant:string){
    const url_api = this.url+'archivo/examenesmedicos/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();
    formD.append('examenesMedicos', doc1);
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  subirArchivoExMedicos(doc1:File){
    const token = this.obtenertoken();
    const url_api = this.url+'archivo/examenesmedicos';
    let formD= new FormData();

    formD.append('examenesMedicos', doc1);

    return this.http
      .post(url_api, formD);
  }

  async subirArchivoLicencia(doc1:File){
    const token = this.obtenertoken();
    const url_api = this.url+'archivo/licenciaconduccion';
    let formD= new FormData();
    formD.append('licenciaUnoAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  async subirArchivoExamenesMedicos(doc1:File){
    const token = this.obtenertoken();
    const url_api = this.url+'archivo/examenesmedicos';
    let formD= new FormData();
    formD.append('examenesMedicos', doc1);
    return this.http.post(url_api, formD).toPromise();
  }


  obtenerImagenPlAportes(nom:string){
    window.open(this.url+'archivo/planillaaportes/'+nom+'?accessToken='+this.obtenertoken());
  }

  ActualizarArchivoPlAportes(doc1:File,nomant:string){
    const url_api = this.url+'archivo/planillaaportes/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('planillaAportes', doc1);

    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  async cambiarArchivoPlanillaAportesConductor(doc1:File,nomant:string){
    const url_api = this.url+'archivo/planillaaportes/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('planillaAportes', doc1);

    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  subirArchivoPlAportes(doc1:File){
    const token = this.obtenertoken();
    const url_api = this.url+'archivo/planillaaportes';
    let formD= new FormData();

    formD.append('planillaAportes', doc1);

    return this.http.post(url_api, formD);
  }

  async subirArchivoPlAnillaAportes(doc1:File)
  {
    const token = this.obtenertoken();
    const url_api = this.url+'archivo/planillaaportes';
    let formD= new FormData();
    formD.append('planillaAportes', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  //Complemento rutas

  obtenerRuta(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`ruta/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerRutas(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`ruta`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerRutasInfoBasica() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`ruta/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  actualizarRuta(json:any){
    const url_api =  this.url+'ruta';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearRuta(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'ruta';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }
  EliminarRuta(json:any){
      const url_api =  this.url+'ruta/estado';
      const token = this.obtenertoken();
      return this.http.
      put(url_api,json,{
        params: {
          accessToken: token
        }
      }).
      pipe(map(data=>data));
    }
  EliminarCond(json:any){
    const url_api =  this.url+'conductor/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento perfiles

  actualizarPerfil(json:any){
    const url_api =  this.url+'perfil';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  crearPerfil(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'perfil';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  EliminarPerfil(json:any){
    const url_api =  this.url+'perfil/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  agregarPerf(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/perfil';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  quitarPerf(id:string,idperf:string) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/conductor/'+id+'/'+idperf;
    return this.http
      .delete(url_api, {
        params: {
        accessToken: token
      }
    });
  }

  quitarPerfil(id:string,idperf:string) {
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/perfil/'+id+'/'+idperf;
    return this.http
      .delete(url_api, {
        params: {
        accessToken: token
      }
    });
  }

  obtenerPerfil(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`perfil/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerPerfiles(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`perfil`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };



  //Complemento usuarios

  obtenerIdiomas():Observable<any>{
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/idioma';
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  }

  obtenerUltimoIngreso(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/ultimoingreso/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerUsuario(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }





  EliminarUsuario(json:any){
    const url_api =  this.url+'cuenta/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  eliminarOpcion(id:number):Promise<any>
  {
    const url_api =  this.url+'encuesta/eliminarOpcion/'+id;
    const token = this.obtenertoken();
    return this.http.
    delete(url_api,{
      params: {
        accessToken: token
      }
    }).toPromise();
  }

  eliminarPregunta(id:number):Promise<any>
  {
    const url_api =  this.url+'encuesta/eliminarPregunta/'+id;
    const token = this.obtenertoken();
    return this.http.
    delete(url_api,{
      params: {
        accessToken: token
      }
    }).toPromise();
  }
  obtenerUsuExt(nom:string):Observable<any> {
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/usuariocuenta';
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        palabra:nom
      }
    });
  }

  obtenerBasPerfiles() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`perfil/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  obtenerUltimosIngresos(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/ultimoingreso/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerUsuarios(pag:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerUsuariosTotales() {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`cuenta/usuariosFiltro`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,

      }
    });
  };

  actualizarUsu(json:any){
    const url_api =  this.url+'cuenta';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  actualizarUsuarioConductor(json:any){
    const url_api =  this.url+'cuenta/editarCuentaConductor';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearUsu(json:any,perfil:number) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token,
        perfil:perfil
      }
    });
  }

  crearUsuarioConductor(json:any,perfil:number):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/crearCuentaConductor/'+perfil;
    return this.http.post(url_api, json, {
        params: {
        accessToken: token,
        perfil:perfil
      }
    }).toPromise();
  }

  crearUsuariosConductor(json:any):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cuenta/crearConductoresMasivo';
    return this.http.post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  crearContratosMasivos(json:any):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/crearContratosMasivos';
    return this.http.post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  ActualizarArchivoFoto(doc1:File,nomant:string){
    const url_api = this.url+'archivo/foto/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('fotoPersona', doc1);
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  async cambiarFotoUsuario(doc1:File,nomant:string){
    const url_api = this.url+'archivo/foto/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('fotoPersona', doc1);
    return this.http.put(url_api, formD, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  subirArchivoFoto(doc1:File){
    const url_api = this.url+'archivo/foto';
    let formD= new FormData();

    formD.append('fotoPersona', doc1);

    /*
    return this.http
      .post(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .post(url_api, formD);
  }

  async subirArchivoFotoUsuario(doc1:File)
  {
    const url_api = this.url+'archivo/foto';
    let formD= new FormData();
    formD.append('fotoPersona', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  //Complemento clientes

  obtenerClientes(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`cliente`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerClientesOrdenes():Promise<any> {
    const token = this.obtenertoken();
    const url_api = this.url+`cliente/obtenerClientesOrdenes`;
    return this.http.get(url_api,
    {
      params: {
        accessToken: token
      }
    }).toPromise();
  };

  obtenerCliente(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`cliente/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerInfoBasicaClientes() {
    const token = this.obtenertoken();
    const url_api = this.url+`cliente/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  actualizarCli(json:any){
    const url_api =  this.url+'cliente';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearCli(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cliente';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }


  crearClientesExcel(json:any):Promise<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'cliente/crearClientesMasivos';
    return this.http.post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  ActualizarArchivoLogo(doc1:File,nomant:string){
    const url_api = this.url+'archivo/logocliente/'+nomant;
    const token = this.obtenertoken();
    let formD= new FormData();

    formD.append('logoCliente', doc1);

    /*
    return this.http
      .post(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .put(url_api, formD, {
        params: {
        accessToken: token
      }
    });
  }

  cambiarClave(usuario:number,cuenta:number):Promise<any>{
    const token = this.obtenertoken();
    //console.log(token);
    const url_api = this.url+`cuenta/cambiarContraseña/${usuario}/${cuenta}`;
    return this.http.get<any>(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  }


  subirArchivoLogo(doc1:File){
    const url_api = this.url+'archivo/logocliente';
    let formD= new FormData();

    formD.append('logoCliente', doc1);

    /*
    return this.http
      .post(url_api, tel, {
        params
        accessToken: token
      }
    });*/
    //console.log(formD.get("fotoFrenteAfiliacion"));
    return this.http
      .post(url_api, formD);
  }

  //Complemento pasajeros

  obtenerPasajeros(id:string,pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`pasajero/listar/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerPasajerosInfoBasica() {
    const token = this.obtenertoken();
    const url_api = this.url+`pasajero/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
  };

  obtenerPasajero(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`pasajero/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerNoPas(){
    const token = this.obtenertoken();
    const url_api = this.url+`pasajero/nopasajeros`;
    return this.http.get<any>(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  actualizarPas(json:any){
    const url_api =  this.url+'pasajero';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }


  crearPas(json:any) {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'pasajero';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  EliminarPas(json:any){
    const url_api =  this.url+'pasajero/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  EliminarCli(json:any){
    const url_api =  this.url+'cliente/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento configuraciones

  obtenerConfiguracion(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`configuraciones/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerConfiguracionPQR(){
    const token = this.obtenertoken();
    const url_api = this.url+`configuraciones/obtener`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  actualizarConfiguracion(json:any){
    const url_api =  this.url+'configuraciones';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  crearCorreo(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'configuraciones/correo';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarCorreo(json:any){
    const url_api =  this.url+'configuraciones/correo';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  eliminarCorreo(id:string) {
    const token = this.obtenertoken();
    const url_api = this.url+'configuraciones/correo/'+id;
    return this.http
      .delete(url_api, {
        params: {
        accessToken: token
      }
    });
  }

  //Complemento tipos de combustible

  obtenerTiposCombustible(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipocombustible/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerTipoCombustible(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipocombustible/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearTipoCombustible(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/tipocombustible';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarTipoCombustible(json:any){
    const url_api =  this.url+'vehiculo/tipocombustible';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoTipoCombustible(json:any){
    const url_api =  this.url+'vehiculo/tipocombustible/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento tipos de vehiculo

  obtenerTiposVehiculo(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipovehiculo/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerTiposVehiculoFiltro():Promise<any>{
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipovehiculo/filtro`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    }).toPromise();
  };

  obtenerTipoVehiculo(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/tipovehiculo/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearTipoVehiculo(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/tipovehiculo';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarTipoVehiculo(json:any){
    const url_api =  this.url+'vehiculo/tipovehiculo';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoTipoVehiculo(json:any){
    const url_api =  this.url+'vehiculo/tipovehiculo/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento marcas de vehiculo

  obtenerMarcas(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/marca/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerMarca(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/marca/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearMarca(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/marca';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarMarca(json:any){
    const url_api =  this.url+'vehiculo/marca';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoMarca(json:any){
    const url_api =  this.url+'vehiculo/marca/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento clases de vehiculo

  obtenerClasesVehiculo(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/clase/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerClaseVehiculo(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/clase/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearClaseVehiculo(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/clase';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarClaseVehiculo(json:any){
    const url_api =  this.url+'vehiculo/clase';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoClaseVehiculo(json:any){
    const url_api =  this.url+'vehiculo/clase/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento Aseguradoras de Polizas

  obtenerAseguradoras(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/aseguradora/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerAseguradora(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/aseguradora/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearAseguradora(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/aseguradora';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarAseguradora(json:any){
    const url_api =  this.url+'vehiculo/aseguradora';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoAseguradora(json:any){
    const url_api =  this.url+'vehiculo/aseguradora/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento empresas de convenios

  obtenerEmpresasConvenio(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/empresaconvenio/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerEmpresaConvenio(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/empresaconvenio/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearEmpresaConvenio(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'vehiculo/empresaconvenio';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarEmpresaConvenio(json:any){
    const url_api =  this.url+'vehiculo/empresaconvenio';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoEmpresaConvenio(json:any){
    const url_api =  this.url+'vehiculo/empresaconvenio/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento fondos de pensiones

  obtenerFondosPensiones(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/fondopensiones/listar`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
  };

  obtenerFondoPensiones(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/fondopensiones/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearFondoPensiones(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'conductor/fondopensiones';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarFondoPensiones(json:any){
    const url_api =  this.url+'conductor/fondopensiones';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoFondoPensiones(json:any){
    const url_api =  this.url+'conductor/fondopensiones/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

 //Complemento cajas de compensacion

 obtenerCajasCompensacion(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`conductor/cajacompensacion/listar`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerCajacompensacion(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/cajacompensacion/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearCajacompensacion(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'conductor/cajacompensacion';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarCajacompensacion(json:any){
    const url_api =  this.url+'conductor/cajacompensacion';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoCajacompensacion(json:any){
    const url_api =  this.url+'conductor/cajacompensacion/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento empresas ARL

 obtenerARLs(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`conductor/arl/listar`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerArl(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/arl/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearArl(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'conductor/arl';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarArl(json:any){
    const url_api =  this.url+'conductor/arl';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoArl(json:any){
    const url_api =  this.url+'conductor/arl/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento empresas EPS

 obtenerEPSs(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`conductor/eps/listar`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerEps(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`conductor/eps/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearEps(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'conductor/eps';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarEps(json:any){
    const url_api =  this.url+'conductor/eps';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoEps(json:any){
    const url_api =  this.url+'conductor/eps/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

    //Complemento Objetos contrato

 obtenerObjetosContrato(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`contrato/objetocontrato/listar`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  }

  obtenerObjetosContratoInfoBasica() {
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/objetocontrato/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
    }

  obtenerObjetoContrato(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/objetocontrato/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  crearObjetoContrato(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/objetocontrato';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarObjetoContrato(json:any){
    const url_api =  this.url+'contrato/objetocontrato';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  estadoObjetoContrato(json:any){
    const url_api =  this.url+'contrato/objetocontrato/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  //Complemento Contrato permanente

 obtenerPermanentes(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`contrato/listar`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };
  obtenerPermanente(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/obtenerContrato/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerPermanenteEditar(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/obtenerContratoEditar/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerInfoBasicaPermanentes():Promise<any>{
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    }).toPromise();
    };

    obtenerPlacasSalud():Observable<any> {
      // TODO: obtener token
      // TODO: not null
      const token = this.obtenertoken();
      const url_api = this.url+`vehiculo/infobasica`;
      return this.http.get(url_api, {
        params: {
          accessToken: token,
        }
      });
    };

  crearPermanente(json:any):Promise<any> {
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  editarPermanente(json:any):Promise<any> {
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/editarContrato';
    return this.http
      .put(url_api, json, {
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  agregarPasajeroContrato(pasajero:number,contrato:number):Promise<any> {
    const token = this.obtenertoken();
    console.log("pasajero : ",pasajero);
    console.log("contrato : ",contrato);
    const url_api = this.url+'contrato/agregarPasajeroContrato/'+pasajero+"/"+contrato;
    return this.http
      .get(url_api,{
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  eliminarPasajeroContrato(pasajero:number,contrato:number):Promise<any> {
    console.log("pasajero : ",pasajero);
    console.log("contrato : ",contrato);
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/eliminarPasajeroContrato/'+pasajero+"/"+contrato;
    return this.http
      .delete(url_api,{
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  eliminarOrdenServicio(idOrdenServicio:number):Promise<any> {
    console.log("ordenServicio : ",idOrdenServicio);

    const token = this.obtenertoken();
    const url_api = this.url+'ordenservicio/'+idOrdenServicio;
    return this.http
      .delete(url_api,{
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  traerPasajerosContrato(id:any):Promise<any>
  {
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/listarPasajerosContrato/'+id;
    return this.http
      .get(url_api,{
        params: {
        accessToken: token
      }
    }).toPromise();
  }

  actualizarPermanente(json:any){
    const url_api =  this.url+'contrato/editarContrato';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }



  //Complemento Contrato Ocasional



 obtenerOcasionales(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`contrato/ocasional`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerPdfCO(nom:string){
    window.open(this.url+'archivo/ocasional/'+nom+'?accessToken='+this.obtenertoken());
  }

  obtenerPlacasTurismo():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`vehiculo/infobasicaturismo`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerResContrato():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/responsablecontrato`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerBasicCli() :Observable<any>{
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`cliente/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerPasajerosContrato(id:any):Promise<any>
  {
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/listarPasajerosContrato/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  }

  obtenerBasicPas():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`pasajero/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerBasicRutas():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`ruta/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  obtenerBasicObjeto():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/objetocontrato/infobasica`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  };

  actualizarEstOcasional(json:any){
    const url_api =  this.url+'contrato/ocasional/estado';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  obtenerOcasional(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`contrato/ocasional/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerFuec(id:string):Promise<any>{
    const token = this.obtenertoken();
    const url_api = this.url+"fuec/"+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  }

  obtenerFuecQR(id:string):Promise<any>{
    const token = this.obtenertoken();
    console.log("url prueba 1");
    const url_api = this.url+"fuec/infoQR/"+id;
    console.log("url prueba final",url_api);
    return this.http.get(url_api).toPromise();
  }

  crearContratoOcas(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'contrato/ocasional';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  //Complemento FUEC

  crearFuecSalud(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'fuec';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

 obtenerFuecs(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`fuec`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };
  obtenerPdfF(nom:string){
    window.open(this.url+'archivo/descargarFuec/'+nom);
  }

  async generarPdf(id:number)
  {
    const token = this.obtenertoken();
    let decode:any = jwt_decode(token);
    console.log("token kakakakakaka: ",decode);
    let modificador = decode.persona;
    console.log("token 2: ",modificador);
    const url_api = this.url+'archivo/generar/'+id+"/"+modificador;
    console.log("token: ",url_api);
    return this.http.post<any>(url_api,{}).toPromise();

  }

//Complemento Reservas

crearReserva(json:any) {
  const token = this.obtenertoken();
  let decode:any = jwt_decode(token);
  let modificador = decode.persona;
  const url_api = this.url+'reserva';
  return this.http
    .post(url_api, json, {
      params: {
      accessToken: token,
      modificador: modificador
    }
  });
}

actualizarReserva(json:any){
  const url_api =  this.url+'reserva';
  const token = this.obtenertoken();
  let decode:any = jwt_decode(token);
  console.log("token : ",decode);
  let modificador = decode.persona;
  return this.http
  .put(url_api,json,{
    params: {
      accessToken: token,
      modificador: modificador
    }
  }).
  pipe(map(data=>data));
}

obtenerReservas() {
  const token = this.obtenertoken();
  const url_api = this.url+`reserva`;
  return this.http.get(url_api, {
    params: {
      accessToken: token
    }
  });
  };

  obtenerReservasConductor(pag:number):Promise<any>
  {
    const token = this.obtenertoken();
    var decoded:any = jwt_decode(token);
    let id = decoded.sub;
    const url_api = this.url+"reserva/obtenerPorConductor/"+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    }).toPromise();
  }

  obtenerReservasDisponibles(pag:number):Promise<any>
  {
    const token = this.obtenertoken();
    var decoded:any = jwt_decode(token);
    let id = decoded.sub;
    const url_api = this.url+"reserva/obtenerReservasDisponibles";
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    }).toPromise();
  }

  obtenerReserva(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`reserva/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerReservaDuplicado(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`reserva/duplicar/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerPasajerosContratoReserva(id:string):Promise<any>
  {
    const token = this.obtenertoken();
    const url_api = this.url+`reserva/traerPasajerosContrato/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  }

  estadoReserva(json:any){
    const url_api =  this.url+'reserva/estado';
    const token = this.obtenertoken();
    let decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token,
        modificador: modificador
      }
    }).
    pipe(map(data=>data));
  }

  cancelarReserva(id:number,motivoCancelacion:any):Promise<any>
  {
    const url_api =  this.url+'reserva/cancelar/'+id;
    const token = this.obtenertoken();
    let decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http.
    put(url_api,
      {
        idReserva:id,
        observacionesReserva:motivoCancelacion
      },{
      params: {
        accessToken: token,
        modificador: modificador
      }
    }).toPromise();
  }

  terminarReserva(id:number):Promise<any>
  {
    const url_api =  this.url+'reserva/terminar/'+id;
    const token = this.obtenertoken();
    let decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http.
    put(url_api,{
      params: {
        accessToken: token,
        modificador: modificador
      }
    }).toPromise();
  }

//Complemento Orden Servicio

crearOrdenServicio(json:any) {
  const token = this.obtenertoken();
  const url_api = this.url+'ordenservicio';
  return this.http
    .post(url_api, json, {
      params: {
      accessToken: token
    }
  });
}

obtenerOrdenesServicio(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`ordenservicio`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerOrdenesServicioLista() {
    const token = this.obtenertoken();
    const url_api = this.url+`ordenservicio/obtenerOrdenesServicio`;
    return this.http.get(url_api, {
      params: {
        accessToken: token
      }
    });
    };

    filtrarOrdenesServicioLista(inicio:string,fin:string,conductor:string)
    {
      const token = this.obtenertoken();
      const url_api = this.url+`ordenservicio/obtenerOrdenesServicioFecha/${inicio}/${fin}`;
      return this.http.get(url_api, {
        params: {
          accessToken: token,
          conductor:conductor
        }
      });
      };

  obtenerOrdenServicio(id:string):Promise<any>
  {
    const token = this.obtenertoken();
    const url_api = this.url+"ordenservicio/"+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    }).toPromise();
  }

  obtenerPdfOS(nom:string){
    window.open(this.url+'archivo/ordenservicio/'+nom+'?accessToken='+this.obtenertoken());
  }

  //Complemento Facturas

crearFactura(json:any) {
  const token = this.obtenertoken();
  const url_api = this.url+'factura';
  return this.http
    .post(url_api, json, {
      params: {
      accessToken: token
    }
  });
}

actualizarFactura(json:any){
  const url_api =  this.url+'factura';
  const token = this.obtenertoken();
  return this.http
  .put(url_api,json,{
    params: {
      accessToken: token
    }
  }).
  pipe(map(data=>data));
}

obtenerFacturas(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`factura`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerFactura(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`factura/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerInfoReservasCumplidas(fi:string,ff:string,idcl:number){
    const token = this.obtenertoken();
    const url_api = this.url+`factura/inforeservascumplidas`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        fechaInicio:fi,
        fechaFinal:ff,
        idCliente:idcl
      }
    });
  }

  estadoFactura(json:any){
    const url_api =  this.url+'factura/estado';
    const token = this.obtenertoken();
    return this.http.
    put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  obtenerPdfFactura(nom:string){
    window.open(this.url+'archivo/factura/'+nom+'?accessToken='+this.obtenertoken());
  }

  //Complemento Cuenta de cobro

crearCuentaCobro(json:any) {
  const token = this.obtenertoken();
  const url_api = this.url+'cuentacobro';
  return this.http
    .post(url_api, json, {
      params: {
      accessToken: token
    }
  });
}

actualizarCuentaCobro(json:any){
  const url_api =  this.url+'cuentacobro';
  const token = this.obtenertoken();
  return this.http
  .put(url_api,json,{
    params: {
      accessToken: token
    }
  }).
  pipe(map(data=>data));
}

obtenerCuentasCobro(pag:number) {
  const token = this.obtenertoken();
  const url_api = this.url+`cuentacobro`;
  return this.http.get(url_api, {
    params: {
      accessToken: token,
      pr:''+pag
    }
  });
  };

  obtenerCuentaCobro(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`cuentacobro/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  eliminarCuentaCobro(id:string){
    const url_api =  this.url+'cuentacobro/'+id;
    const token = this.obtenertoken();
    return this.http.
    delete(url_api,{
      params: {
        accessToken: token
      }
    })
  }

  obtenerPdfCC(nom:string){
    window.open(this.url+'archivo/cuentacobro/'+nom+'?accessToken='+this.obtenertoken());
  }

  filtrarReservas(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"reserva/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarCuentas(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"cuenta/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarFondoPensiones(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"conductor/fondoPensiones/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarTipoCombustible(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/tipoCombustible/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarOrdenesServicio(criterio:string,valor:string,inicio:string,fin:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"ordenservicio/filtrarOrdenesServicio/"+criterio+"/"+valor
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        inicio:inicio,
        fin:fin
      }
    }).toPromise();
  }

  filtrarObjetoContrato(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"contrato/objeto/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarTipoVehiculo(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/tipoVehiculo/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarClaseVehiculo(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/clase/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarMarcas(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/marca/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarAseguradora(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/aseguradora/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarEmpresaConvenio(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/empresaConvenio/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarCajaCompensacion(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"conductor/cajaCompensacion/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarEps(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"conductor/eps/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarArl(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"conductor/arl/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarVinculaciones(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"afiliacion/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarVehiculo(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"vehiculo/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarPropietario(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"propietario/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarClientes(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"cliente/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarRutas(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"ruta/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarRutasFuec(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"fuec/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  filtrarRutasFuecOrigenDestino(origen:string,destino:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"fuec/filtrarRuta"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        origen:origen,
        destino:destino
      }
    }).toPromise();
  }

  filtrarConductores(criterio:string,valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"conductor/filtrar"
    return this.http.get<any>(url_api,{
      params:{
        accessToken : token,
        criterio:criterio,
        valor:valor
      }
    }).toPromise();
  }

  buscarDireccionesOrigen():Promise<string[]>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"reserva/traerDireccionesOrigen"
    return this.http.get<string[]>(url_api,{
      params:{
        accessToken : token
      }
    }).toPromise();
  }

  buscarDireccionesDestino():Promise<string[]>
  {
    const token = this.obtenertoken();
    let url_api = this.url+"reserva/traerDireccionesDestino"
    return this.http.get<string[]>(url_api,{
      params:{
        accessToken : token
      }
    }).toPromise();
  }

  obtenerClientesFiltro():Promise<any>
  {
    const token = this.obtenertoken();
    //const url_api = this.url+`obtenerClientesFiltro`;
    const url_api = this.url+`factura/clienteFiltro`;
    return this.http.get<any>(url_api, {params: {accessToken: token}}).toPromise();
  };

  filtrarFacturas(criterio:string, valor:string):Promise<any>
  {
    const token = this.obtenertoken();
    //const url_api = this.url+`obtenerClientesFiltro`;
    const url_api = this.url+`factura/filtrar`;
    return this.http.get<any>(url_api, {params: {accessToken: token,criterio:criterio,valor:valor}}).toPromise();
  }

  crearPQR(json:any) {
    const token = this.obtenertoken();
    const url_api = this.url+'pqr';
    return this.http
      .post(url_api, json, {
        params: {
        accessToken: token
      }
    });
  }

  actualizarPQR(json:any){
    const url_api =  this.url+'pqr';
    const token = this.obtenertoken();
    return this.http
    .put(url_api,json,{
      params: {
        accessToken: token
      }
    }).
    pipe(map(data=>data));
  }

  obtenerPQR(id:string){
    const token = this.obtenertoken();
    const url_api = this.url+`pqr/`+id;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
      }
    });
  }

  obtenerPQRS(pag:number) {
    const token = this.obtenertoken();
    const url_api = this.url+`pqr`;
    return this.http.get(url_api, {
      params: {
        accessToken: token,
        pr:''+pag
      }
    });
    };

    obtenerCapacitaciones(pag:number) {
      const token = this.obtenertoken();
      const url_api = this.url+`capacitacion`;
      return this.http.get(url_api, {
        params: {
          accessToken: token,
          pr:''+pag
        }
      });
      };

      crearCapacitacion(json:any) {
        const token = this.obtenertoken();
        const url_api = this.url+'capacitacion';
        return this.http
          .post(url_api, json, {
            params: {
            accessToken: token
          }
        });
      }

      eliminarCapacitacion(id:string){
        const url_api =  this.url+'capacitacion/'+id;
        const token = this.obtenertoken();
        return this.http.
        delete(url_api,{
          params: {
            accessToken: token
          }
        })
      }
      obtenerNotificaciones(pr:number):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+`notificacion`;
        return this.http.get<any>(url_api, {
          params: {
            accessToken: token,
            pr:pr
          }
        }).toPromise();
      }

      obtenerConductoresNotificacion():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`conductor/conductores`;
        return this.http.get<any>(url_api, {
          params: {
            accessToken: token
          }
        }).toPromise();
      };
      obtenerPropietariosNotificacion():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`propietario/propietarios`;
        return this.http.get<any>(url_api, {
          params: {
            accessToken: token
          }
        }).toPromise();
      };
      obtenerPasajerosNotificacion():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`pasajero/pasajeros`;
        return this.http.get<any>(url_api, {
          params: {
            accessToken: token
          }
        }).toPromise();
      };
      obtenerClientesNotificacion():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`cliente/clientes`;
        return this.http.get<any>(url_api, {
          params: {
            accessToken: token
          }
        }).toPromise();
      };

      obtenerCapacitacion(id:string){
        const token = this.obtenertoken();
        const url_api = this.url+`capacitacion/`+id;
        return this.http.get(url_api, {
          params: {
            accessToken: token,
          }
        });
      }
      actualizarCapacitacion(json:any){
        const url_api =  this.url+'capacitacion';
        const token = this.obtenertoken();
        return this.http
        .put(url_api,json,{
          params: {
            accessToken: token
          }
        }).
        pipe(map(data=>data));
      }

      crearCorreoConfiguracionPQR(json:any) {
        const token = this.obtenertoken();
        const url_api = this.url+'configuraciones/correoPQR';
        return this.http
          .post(url_api, json, {
            params: {
            accessToken: token
          }
        });
      }

      eliminarCorreoConfiguracionPQR(id:number) {
        const token = this.obtenertoken();
        const url_api = this.url+'configuraciones/correoPQR/'+id;
        return this.http
          .delete(url_api, {
            params: {
            accessToken: token
          }
        });
      }

      actualizarCorreoConfiguracionPQR(json:any){
        const url_api =  this.url+'configuraciones/correoPQR';
        const token = this.obtenertoken();
        return this.http
        .put(url_api,json,{
          params: {
            accessToken: token
          }
        }).
        pipe(map(data=>data));
      }

      crearNotificacion(json:any)
      {
        const token = this.obtenertoken();
        const url_api = this.url+'notificacion/';
        let notificacion = json;
        return this.http
          .post(url_api, notificacion, {
            params: {
            accessToken: token,
            notificacion:json
          }
        });
      }

      crearNotificacionCliente(json:any,cliente:number)
      {
        const token = this.obtenertoken();
        const url_api = this.url+'notificacion/notificacionCliente/'+cliente;
        let notificacion = json;
        return this.http
          .post(url_api, notificacion, {
            params: {
            accessToken: token,
            notificacion:json
          }
        });
      }


      eliminarNotificacion(id:string){
        const url_api =  this.url+'notificacion';
        const token = this.obtenertoken();
        return this.http.
        delete(url_api,{
          params: {
            accessToken: token,
            id:id
          }
        })
      }

      obtenerNotificacion(id:string){
        const token = this.obtenertoken();
        const url_api = this.url+`notificacion/`+id;
        return this.http.get(url_api, {
          params: {
            accessToken: token,
          }
        });
      }

      editarNotificacion(json:any)
      {
        const token = this.obtenertoken();
        const url_api = this.url+'notificacion/';
        let notificacion = json;
        return this.http
          .put(url_api, notificacion, {
            params: {
            accessToken: token
          }
        });
      }

      editarNotificacionIndividual(json:any,id:number)
      {
        const token = this.obtenertoken();
        const url_api = this.url+'notificacion/individual/'+id;
        let notificacion = json;
        return this.http
          .put(url_api, notificacion, {
            params: {
            accessToken: token
          }
        });
      }

      obtenerPersonaNotificacion(id:number) {
        // TODO: obtener token
        // TODO: not null
        console.log("id a enviar : ",id)
        const token = this.obtenertoken();
        const url_api = this.url+`notificacion/personaNotificacion/`+id;
        return this.http.get(url_api, {
          params: {
            accessToken: token,
          }
        });
      };

      crearEncuesta(json:any)
      {
        const token = this.obtenertoken();
        const url_api = this.url+'encuesta';
        return this.http
          .post(url_api, json, {
            params: {
            accessToken: token
          }
        });
      }

      obtenerEncuestas(pr:number):Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`encuesta`;
        return this.http.get(url_api, {params: {accessToken: token,pr:pr}}).toPromise();
      };

      traerEncuestas():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`encuesta/traerEncuestas`;
        return this.http.get(url_api, {params: {accessToken: token}}).toPromise();
      };

      obtenerEncuesta(id:string):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+`encuesta/verEncuesta/`+id;
        return this.http.get(url_api, {
          params: {
            accessToken: token,
          }
        }).toPromise();
      }

      eliminarEncuesta(id:string):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+`encuesta/eliminar/`+id;
        return this.http.delete(url_api, {
          params: {
            accessToken: token,
          }
        }).toPromise();
      }

      obtenerEncuestaUsuario(id:string,id2:string):Promise<any>{
        const token = this.obtenertoken();
        const url_api = this.url+"encuesta/encuestaUsuario/"+id+"/"+id2;
        return this.http.get(url_api).toPromise();
      }

      ediatarEncuesta(json:any):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+'encuesta';
        return this.http
          .put(url_api, json, {
            params: {
            accessToken: token
          }
        }).toPromise();
      }

      traerPreguntasEncuesta(id:number):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+'encuesta/preguntasEncuesta/'+id;
        return this.http
          .get(url_api,{
            params: {
            accessToken: token
          }
        }).toPromise();
      }

      ObtenerCiudad():Observable<any> {
        // TODO: obtener token
        // TODO: not null
        const url_api = this.url+`cuenta/ciudad`;
        return this.http.get(url_api);
      };

      responderEncuesta(json:any):Promise<any>
      {
        const token = this.obtenertoken();
        const url_api = this.url+'encuestaRespuesta';
        return this.http
          .post(url_api, json, {
            params: {
            accessToken: token
          }
        }).toPromise();
      }

      obtenerCalificacionesConductor(id:string):Promise<any>{
        const token = this.obtenertoken();
        const url_api = this.url+"encuestaRespuesta/calificacionesConductor/"+id;
        return this.http.get(url_api,{
          params:{
            accessToken: token
          }
        }).toPromise();
      }

      obtenerReservasPasajero()
      {
        const token = this.obtenertoken();
        var decoded:any = jwt_decode(token);
        let id = decoded.sub;
        console.log("id: ",id)
        const url_api = this.url+`reserva/reservasPasajero`;
        return this.http.get(url_api,
        {
          params: {
            accessToken: token,
            usuario:id
          }
        }).toPromise();
      };

      obtenerEncuestasParametrizadas():Promise<any>
      {
        // TODO: obtener token
        // TODO: not null
        const token = this.obtenertoken();
        const url_api = this.url+`encuesta/traerEncuestasParametrizadas`;
        return this.http.get(url_api, {
          params: {
            accessToken: token
          }
        }).toPromise();
      };

      crearEncuestaParametrizada(encuesta:any,tipo:any):Promise<any> {
        const token = this.obtenertoken();
        console.log("token : ",token);
        const url_api = this.url+'encuesta/crearEncuestaParametro/'+encuesta+"/"+tipo;
        return this.http
          .get(url_api,{
            params: {
              accessToken: token,
          }
        }).toPromise();
      }

      traerTiposParametros():Promise<any> {
        const token = this.obtenertoken();
        console.log("token : ",token);
        const url_api = this.url+'encuesta/traerTipos/';
        return this.http
          .get(url_api,{
            params: {
              accessToken: token,
          }
        }).toPromise();
      }

      buscarDatosServiciosExcel(arreglo:any):Promise<any>
      {
        const token = this.obtenertoken();
        let url_api = this.url+"reserva/serviciosexcel"
        return this.http.post<any>(url_api,arreglo,{
          params:{
            accessToken : token
          }
        }).toPromise();
      }

      buscarDatosVehiculosExcel(arreglo:any):Promise<any>
      {
        const token = this.obtenertoken();
        let url_api = this.url+"vehiculo/traerExcel"
        console.log("exportacion",arreglo)
        return this.http.post<any>(url_api,arreglo,{
          params:{
            accessToken : token
          }
        }).toPromise();
      }

  traerURLSistema()
  {
    const token = this.obtenertoken();
        //console.log("token : ",token);
        const url_api = this.url+'perfil/urlSistema';
        return this.http
          .get(url_api,{
            params: {
              accessToken: token,
          }
        }).toPromise();
  }

  replicarServicio(fechas:any, idServicio:number):Promise<any>
  {
    // TODO: obtener token
    // TODO: not null
    const token = this.obtenertoken();
    const url_api = this.url+'reserva/replicar/'+idServicio;
    var decode:any = jwt_decode(token);
    let modificador = decode.persona;
    return this.http
      .post(url_api, fechas, {
        params: {
        accessToken: token,
        modificador: modificador
      }
    }).toPromise();
  }
}
