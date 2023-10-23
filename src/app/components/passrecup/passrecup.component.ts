import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passrecup',
  templateUrl: './passrecup.component.html',
  styleUrls: ['./passrecup.component.css']
})
export class PassrecupComponent implements OnInit {
  Formulario: FormGroup;
  msgnotfound:boolean;
  msgsuccess:boolean;
  msgprinc:boolean;
  constructor(private LoginService:LoginService,private router:Router) {
    this.msgnotfound=false;
    this.msgsuccess=false;
    this.msgprinc=false;
    this.Formulario = new FormGroup({
      username:new FormControl( '', [Validators.required,Validators.minLength(4),Validators.maxLength(16)]),
    });
   }

  ngOnInit(): void {
  }

  ingresar(){
    //this.Formulario.valid
    
    this.LoginService
    .Recuperarpass(this.Formulario.get('username')?.value)
    .subscribe(
      (data:any)=>{
        //console.log(data);
        if(data.mensaje==1){
          this.msgprinc=false;
          this.msgsuccess=true;
          this.msgnotfound=false;
          this.Formulario.get('username')?.disable();
        }else if(data.mensaje==2){
          this.msgprinc=false;
          this.msgsuccess=false;
          this.msgnotfound=true;
        }else{
          this.msgprinc=true;
          this.msgsuccess=false;
          this.msgnotfound=false;
          this.Formulario.get('username')?.disable();
        } 
        //this.msgnotfound=false;
        //this.onRol();
      },
      (error:any)=>{
        console.log(error);
        this.msgnotfound=true;
        
        //console.log(error);
      }
    );
    
  }

}
