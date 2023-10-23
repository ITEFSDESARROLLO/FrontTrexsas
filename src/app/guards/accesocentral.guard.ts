import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AccesocentralGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    

    if(this.login.getToken()==null){
      this.router.navigate(['/']);
      return false;
    }else{
      this.login
      .validUser(this.login.getToken())
      .subscribe(
        (data:any)=>{
          if(data.mensaje==2){
            this.router.navigate(['/']);
            this.login.setadvert(true);
            this.login.limpiar();
            return false;
            
          }else {
            this.login.setadvert(false);
            return true;
          }
          
          //let token=data.JWT;
          //this.LoginService.setToken(token);
          //this.msgnotfound=false;
  
          //this.onRol();
          //this.router.navigate(["/central"]);
        },
        (error:any)=>{
          this.router.navigate(['/']);
          return false;
        }
      );
    }
    return true;
  }
  
}
