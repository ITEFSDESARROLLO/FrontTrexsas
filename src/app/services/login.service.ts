import { AfiliacionVehiculoInterface } from './../models/afiliacion-vehiculo-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { CONFIG } from './config';
import { catchError, map } from 'rxjs/operators';
//import { ClaseVehiculoInterface } from '../models/clase-vehiculo';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private adverttoken:boolean;
  url:string;

  constructor(private http: HttpClient) {
    this.adverttoken=false;
    //this.url = 'http://181.143.139.108:8080/trexsas-desarrollo/'
    //this.url = "http://localhost:8081/trexsas-desarrollo/"
   this.url = 'http://localhost:8080/'
  //this.url = 'C:\Users\ITEFS-BACKEND\Downloads'
  }

  getadvert(){
    return this.adverttoken;
  }

  setadvert(advert:boolean){
    this.adverttoken=advert;
  }

  loginuser(username: string, password: string){
    const url_api = this.url+'login';
    console.log("url de logeo: "+url_api);
    return this.http.
    post(url_api,{"username":username,"password":password}).
    pipe(
      map(data=>data),
      //catchError(this.handleError)
    );

  }

  setToken(token: string):void{
    //let token_string = JSON.stringify(token);
    localStorage.setItem("accessToken",token);
  }

  getToken(): any{

    var token=localStorage.getItem("accessToken");
    return token ;
  }

  Recuperarpass(username:string){
    const url_api =  this.url+'login/recuperacionclave';
    return this.http.
    post(url_api,{"username":username}).
    pipe(
      map(data=>data)
      );
  }


  changepass(pass:string,token:string){
    const url_api =  this.url+'cuenta/recuperacionclave';
    return this.http.
    post(url_api,{"password":pass,"accessToken":token}).
    pipe(map(data=>data));
  }

  logoutUser(){
    let accessToken = this.getToken();
    const url_api = this.url+'login/logout';

    return this.http.post(url_api,{accessToken}).
    pipe(map(data=>data));
  }

  validUser(token:string){
    var accessToken = token;
    const url_api = this.url+'login/token';

    return this.http.post(url_api,{"accessToken":accessToken}).
    pipe(map(data=>data));
  }

  limpiar(){
    localStorage.clear();
  }

  //AFILIACIONES

  ObtenerClases():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`vehiculo/clase`;
    return this.http.get(url_api);
  };

  ObtenerCiudad():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`cuenta/ciudad`;
    return this.http.get(url_api);
  };


  ObtenerConvenios():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+'vehiculo/empresaconvenio';
    return this.http.get(url_api);
  };

  ObtenerMarcas():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`vehiculo/marca`;
    return this.http.get(url_api);
  };

  

  ObtenerTipoCombustibles():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`vehiculo/tipocombustible`;
    return this.http.get(url_api);
  };

  ObtenerTipoVehiculos():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`vehiculo/tipovehiculo`;
    return this.http.get(url_api);
  };

  ObtenerAseguradoras():Observable<any> {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`vehiculo/aseguradora`;
    return this.http.get(url_api);
  };



  subirArchivoVeh(doc1:File,doc2:File,doc3:File){
    const url_api = this.url+'archivo/vehiculo';
    let formD= new FormData();

    formD.append('fotoFrenteAfiliacion', doc1);
    formD.append('fotoLadoAfiliacion', doc2);
    formD.append('fotoTraseraAfiliacion', doc3);

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

  async subirArchivoVehiculoFrente(frente:File){
    const url_api = this.url+'archivo/vehiculoFrente';

    let formD= new FormData();
    formD.append('fotoFrenteAfiliacion', frente);
    return this.http.post(url_api, formD).toPromise();
  }

  async subirArchivoVehiculoLateral(lateral:File)
  {
    const url_api = this.url+'archivo/vehiculoLateral';
    let formD= new FormData();
    formD.append('fotoLadoAfiliacion', lateral);
    return this.http.post(url_api, formD).toPromise();
  }

  async subirArchivoVehiculoTrasera(trasera:File){
    const url_api = this.url+'archivo/vehiculoTrasera';
    let formD= new FormData();
    formD.append('fotoTraseraAfiliacion', trasera);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoConv(doc1:File){
    const url_api = this.url+'archivo/convenio';
    let formD= new FormData();

    formD.append('convenioAfiliacion', doc1);

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

  async subirArchivoConvenio(doc1:File){
    const url_api = this.url+'archivo/convenio';
    let formD= new FormData();
    formD.append('convenioAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }



  subirArchivoTO(doc1:File,doc2:File){
    const url_api = this.url+'archivo/tarjetaoperacion';
    let formD= new FormData();

    formD.append('tarjetaOperacionUnoAfiliacion', doc1);
    formD.append('tarjetaOperacionDosAfiliacion', doc2);

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

  subirArchivoTarjetaOperacion(doc1:File){
    const url_api = this.url+'archivo/tarjetaoperacion';
    let formD= new FormData();
    formD.append('tarjetaOperacionUnoAfiliacion', doc1);
    return this.http.post(url_api, formD);
  }

  async subirArchivoTarjetaOperacion2(doc1:File){
    const url_api = this.url+'archivo/tarjetaoperacion';
    let formD= new FormData();
    formD.append('tarjetaOperacionUnoAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoSOAT(doc1:File){
    const url_api = this.url+'archivo/soat';
    let formD= new FormData();
    formD.append('soatAfiliacion', doc1);
    return this.http.post(url_api, formD);
  }

  async subirArchivoSOAT2(doc1:File){
    const url_api = this.url+'archivo/soat';
    let formD= new FormData();
    formD.append('soatAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoTM(doc1:File){
    const url_api = this.url+'archivo/revisiontecnicomecanica';
    let formD= new FormData();

    formD.append('tecnicomecanicaAfiliacion', doc1);

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

  async subirArchivoTecnicoMecanica(doc1:File){
    const url_api = this.url+'archivo/revisiontecnicomecanica';
    let formD= new FormData();
    formD.append('tecnicomecanicaAfiliacion', doc1);
    return this.http
      .post(url_api, formD).toPromise();
  }

  subirArchivoPC(doc1:File){
    const url_api = this.url+'archivo/polizacontractual';
    let formD= new FormData();

    formD.append('contractualAfiliacion', doc1);

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

  async subirArchivoPolizaContractural(doc1:File){
    const url_api = this.url+'archivo/polizacontractual';
    let formD= new FormData();
    formD.append('contractualAfiliacion', doc1);
    return this.http
      .post(url_api, formD).toPromise();
  }

  async subirArchivoPolizaTodoRiesgo(doc1:File){
    const url_api = this.url+'archivo/polizaTodoRiesgo';
    let formD= new FormData();
    formD.append('polizaTodoRiesgo', doc1);
    return this.http
      .post(url_api, formD).toPromise();
  }

  subirArchivoPE(doc1:File){
    const url_api = this.url+'archivo/polizaextracontractual';
    let formD= new FormData();

    formD.append('extracontractualAfiliacion', doc1);

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

  async subirArchivoPolizaExtraContractual(doc1:File){
    const url_api = this.url+'archivo/polizaextracontractual';
    let formD= new FormData();
    formD.append('extracontractualAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoRP(doc1:File){
    const url_api = this.url+'archivo/revisionpreventiva';
    let formD= new FormData();

    formD.append('preventivaAfiliacion', doc1);

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

  async subirArchivoRevisionPreventiva(doc1:File){
    const url_api = this.url+'archivo/revisionpreventiva';
    let formD= new FormData();
    formD.append('preventivaAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoTP(doc1:File,doc2:File){
    const url_api = this.url+'archivo/tarjetapropiedad';
    let formD= new FormData();

    formD.append('tarjetaPropiedadUnoAfiliacion', doc1);
    formD.append('tarjetaPropiedadDosAfiliacion', doc2);

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

  async subirArchivoLicenciaTransito(doc1:File){
    const url_api = this.url+'archivo/tarjetapropiedad';
    let formD= new FormData();
    formD.append('tarjetaPropiedadUnoAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoLC(doc1:File,doc2:File){
    const url_api = this.url+'archivo/licenciaconduccion';
    let formD= new FormData();

    formD.append('licenciaUnoAfiliacion', doc1);
    formD.append('licenciaDosAfiliacion', doc2);

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

  async subirArchivoLicencia(doc1:File){
    const url_api = this.url+'archivo/licenciaconduccion';
    let formD= new FormData();
    formD.append('licenciaUnoAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  subirArchivoCC(doc1:File,doc2:File)
  {
    const url_api = this.url+'archivo/cedula';
    let formD= new FormData();

    formD.append('documentoUnoAfiliacion', doc1);
    formD.append('documentoDosAfiliacion', doc2);

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

  async subirArchivoCedula(doc1:File)
  {
    const url_api = this.url+'archivo/cedula';
    let formD= new FormData();
    formD.append('documentoUnoAfiliacion', doc1);
    return this.http.post(url_api, formD).toPromise();
  }

  async actulizarArchivoVehiculoFrente(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/vehiculoFrente/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('fotoFrenteAfiliacion', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoVehiculoLado(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/vehiculoLateral/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('fotoLadoAfiliacion', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actualizarArchivoConvenio(doc1:File,nombre:string){
    const url_api = this.url+'archivo/convenio/'+nombre;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoConvenio', doc1);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoVehiculoTrasera(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/vehiculoTrasera/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('fotoTraseraAfiliacion', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoTarjetaOperacion(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/tarjetaoperacion/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoTarjetaOperacion', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoSoat(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/soat/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoSoat', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoRevisionTecnicoMecanica(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/revisiontecnicomecanica/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoRevisionTecnicomecanica', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoPolizaContractual(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/polizacontractual/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoPolizaContractual', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoPolizaTodoRiesgo(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/polizaTodoRiesgo/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoPolizaTodoRiesgo', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoPolizaExtraContractual(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/polizaextracontractual/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoPolizaExtracontractual', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoRevisionPreventica(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/revisionpreventiva/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoRevisionPreventiva', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }

  async actulizarArchivoLicenciaTransito(frente:File,nombreArchivo:string){
    const url_api = this.url+'archivo/tarjetapropiedad/'+nombreArchivo;
    const token = this.getToken();
    let formD= new FormData();
    formD.append('archivoTarjetaPropiedad', frente);
    return this.http.put(url_api, formD, {
      params: {
      accessToken: token
    }
  }).toPromise();
  }



  guardarafiliacion(json:AfiliacionVehiculoInterface){
    const url_api =  this.url+'afiliacion';
    return this.http.
    post(url_api,json).
    pipe(map(data=>data));
  }

  obtenerestAfiliacion(id:string):Observable<any>  {
    // TODO: obtener token
    // TODO: not null
    const url_api = this.url+`afiliacion/verestado/`+id;
    return this.http.get(url_api);
  };

  traerEstadisticasVehiculos():Promise<any>
  {
    const url_api = this.url+`vehiculo`;
    let token = this.getToken();
    return this.http.get(url_api,{params: {
      accessToken: token
    }}).toPromise();
  };

  traerEstadisticasServicios():Promise<any> {
    const url_api = this.url+`reserva/estadisticas`;
    let token = this.getToken();
    return this.http.get(url_api,{params: {
      accessToken: token
    }}).toPromise();
  };

}
