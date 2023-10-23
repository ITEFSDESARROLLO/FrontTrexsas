import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/models/ciudad';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-ultimoingreso',
  templateUrl: './ultimoingreso.component.html',
  styleUrls: ['./ultimoingreso.component.css']
})
export class UltimoingresoComponent implements OnInit {

 
  labels: any;
  Form:FormGroup;
  ocultar=false;
  edit:boolean;
  view:boolean;
  idruta:number;
  param: string;

  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) { 
    this.param="";
    this.edit=false;
    this.view=false;
    this.idruta=-1;
    this.Form= new FormGroup({
      fechaUltimoIngreso:new FormControl( ''),
      ip:new FormControl( ''),
      navegador:new FormControl( ''),
      usuario:new FormControl( ''),
      nombre:new FormControl(''),
      documento:new FormControl( '')
    });
    
  }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerUltimoIngreso(urlid).subscribe(
        (res:any)=>{
          this.Form.patchValue({
            fechaUltimoIngreso:res.fechaUltimoIngresoCuenta,
            ip:res.ipUltimoIngresoCuenta,
            navegador:res.navegadorUltimoIngresoCuenta,
            usuario:res.cuenta.usuarioCuenta,
            nombre:res.cuenta.persona.nombrePersona+' '+res.cuenta.persona.apellidoPersona,
            documento:res.cuenta.persona.documentoPersona
          });
          this.Form.disable();
        });
    }
  }


}
