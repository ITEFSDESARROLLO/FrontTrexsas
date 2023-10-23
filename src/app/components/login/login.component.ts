import { CentralService } from 'src/app/services/central.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  labels: any;
  Formulario: FormGroup;
  msgnotfound:boolean;
  msgnotaccess:boolean;
  msgnottoken:boolean;

  constructor(private LoginService:LoginService,private router:Router,private cookieService: CookieService,private data:CentralService,private httpService: HttpClient) {
    
    this.msgnotfound=false;
    this.msgnotaccess=false;
    this.msgnottoken=false;
    this.Formulario = new FormGroup({
      username:new FormControl( '', [Validators.required,Validators.minLength(4),Validators.maxLength(16)]),
      pass:new FormControl( '', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
      rec:new  FormControl( false),
    });
   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    if(this.cookieService.check('session')){
      var token=this.cookieService.get('session');;
      this.LoginService.setToken(token);
    }
    //console.log(this.LoginService.getToken());
    this.msgnottoken=this.LoginService.getadvert();
    if(this.LoginService.getToken()!=null){
      this.router.navigate(["/central"]);
    }
    
  }

  ingresar(){
    //this.Formulario.valid
    
    this.LoginService
    .loginuser(this.Formulario.get('username')?.value, this.Formulario.get('pass')?.value)
    .subscribe(
      (data:any)=>{

        if(data.accessToken!=undefined){
          let token=data.accessToken;
          this.LoginService.setToken(token);//Modifica el token
          this.msgnotaccess=false;
          this.msgnotfound=false;
          if(this.Formulario.get('rec')?.value){
            this.cookieService.set( 'session', token );//Crea la cookie
            console.log(this.cookieService.get('session'));
          }
          
          this.router.navigate(["/central"]);//lo envia al menu central
          
        }else if(data.mensaje==1){
          
          this.msgnotfound=true;
          this.msgnotaccess=false;
        }else if(data.mensaje==2){
          
          this.msgnotaccess=true;
          this.msgnotfound=false;
        }
        
        //let token=data.JWT;
        //this.LoginService.setToken(token);
        //this.msgnotfound=false;

        //this.onRol();
        //this.router.navigate(["/central"]);
      },
      (error:any)=>{
        console.log(error);
        if(error.status==401){
          this.msgnotfound=true;
        }
        console.log(error);
      }
    );
    
  }

}
