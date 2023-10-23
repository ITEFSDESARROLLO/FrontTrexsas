import { CentralService } from 'src/app/services/central.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-informacion-fuec-qr',
  templateUrl: './informacion-fuec-qr.component.html',
  styleUrls: ['./informacion-fuec-qr.component.scss']
})
export class InformacionFuecQRComponent implements OnInit {

  fuec:any;

  constructor(private route:ActivatedRoute,private servicio:CentralService) { }

  ngOnInit(): void {
    let parametroRuta = this.route.snapshot.paramMap.get('qr');
    if(parametroRuta==undefined)
    {
      alert("no ingresado el identificador del fuec")
    }else{
      var decode:any = jwt_decode(parametroRuta);
      let modificador = decode.data;
      let fuecId = modificador.split("_")[1];
      this.traerFuecInfo(fuecId);
    }

  }

  traerFuecInfo(idFuec:any)
  {
    this.servicio.obtenerFuecQR(idFuec).then(respuesta =>{
      this.fuec = respuesta;
      if(respuesta==undefined)
      {
        alert("no existe fuec con el identificado dado");
      }else{
        this.fuec = respuesta;
      }
    }).catch(error =>{
      alert("error en el servidor");
    })
  }

}
