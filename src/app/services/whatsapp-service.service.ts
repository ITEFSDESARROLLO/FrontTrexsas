import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappServiceService {

  url:string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8181/'
   }

   enviarMensaje(telefonoDestino:string):Promise<any>
   {
    let urlApi = this.url+"mensaje?destino="+telefonoDestino+"&cuerpo=hola+esto+es+una+prueba&indicativo=57"
     return this.http.get(urlApi).toPromise();
   }
}
