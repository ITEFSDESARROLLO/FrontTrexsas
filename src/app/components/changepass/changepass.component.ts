import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  Formulario: FormGroup;
  msgnotfound:boolean;
  token:string;
  msgsuccess: boolean;
  constructor(private LoginService:LoginService,private route: ActivatedRoute,private router:Router) {
    this.msgnotfound=false;
    this.msgsuccess=false;
    this.token="";
    this.Formulario = new FormGroup({
      pass:new FormControl( '', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
      pass1:new FormControl( '', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
    },{validators:this.checkPasswords});
   }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['id']; 
    if(this.token!=null){
      this.LoginService
      .validUser(this.token)
      .subscribe(
        (data:any)=>{
          if(data.mensaje==2){
            this.LoginService.setadvert(true);
            this.router.navigate(['/']);
          }
          
        },
        (error:any)=>{
          this.router.navigate(['/']);
        }
      );
    }
  }

  ingresar(){
    //this.Formulario.valid
    
    this.LoginService
    .changepass(this.Formulario.get('pass')?.value,this.token)
    .subscribe(
      (data:any)=>{
        //console.log(data);
        if(data.mensaje!=undefined){
          this.msgsuccess=true;
          this.msgnotfound=false;
          this.Formulario.get('pass')?.disable();
          this.Formulario.get('pass1')?.disable();
          
        }else{
          this.msgsuccess=false;
          this.msgnotfound=true;
          this.Formulario.get('pass')?.disable();
          this.Formulario.get('pass1')?.disable();
        } 
        //let token=data.JWT;
        //this.LoginService.setToken(token);
        //this.msgnotfound=false;

        //this.onRol();
        //this.router.navigate(["/central"]);
      },
      (error:any)=>{
        console.log(error);
        
        //console.log(error);
      }
    );
    
  }

  

  checkPasswords(c: AbstractControl): ValidationErrors | null  { // here we have the 'passwords' group
    let pass = c.get(['pass']);
    let confirmPass = c.get(['pass1']);
    if (pass?.value !== confirmPass?.value) {
      return { notSame: true };
    }
    return null;
    //return pass.value === confirmPass.value ? null : { notSame: true }
  }

}
