import { CentralService } from './../services/central.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceSSOrdenServicioGuard implements CanActivate {

  constructor(private data:CentralService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    var url=this.router.parseUrl(state.url).root.children.primary.segments;

    console.log("-q url :",url);
    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        console.log(" 0 rutas :",res)
        console.log("1 rutas :",url[2])
        console.log("1 rutas :",url[0])
        if(url[1]!==undefined)
        {
          console.log("1 rutas :",url[1])
          var urip=res.filter(element=>element.uriPadre=="/"+url[1].path);//Aca se evalua la uripadre que siempres sera la pocision 1
          var urih=-1;
          console.log("urip : ",urip);  
          if(url[2]!==undefined)
          {
            
            let re = new RegExp('\D');
            
            if(re.test(url[2].path)==false)
            {
              urih = 1;
            }else{
              console.log("2 rutas :",url[2])
            urih= urip.findIndex(element=>element.uriHija=="/"+url[2].path);//Aca se evalua las uris hijas que siempres sera la pocision 2
            if(urih==-1){
              console.log("3 rutas :",urih)
              urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,6));//Aca se evalua las uris hijas que siempres sera la pocision 2
            }
            if(urih==-1){
              console.log("4 rutas :",urih)
              urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,3));//Aca se evalua las uris hijas que siempres sera la pocision 2
            }
            if(urih==-1){
              console.log("5 rutas :",urih)
              urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,8));//Aca se evalua las uris hijas que siempres sera la pocision 2
            }
            }
            
            

          }else{
            console.log("6 rutas :")
            
            urih=urip.findIndex(element=>element.uriHija=="/");//Aca se evalua si esta en el listar
          }
          console.log("resultado :",urih);
          console.log("url 6 ",url);
          if(urih==-1){
            this.router.navigate(['/central']);// si la ubicacion en la que esta, no se encuentra dentro de los accesos, dara -1 devolviendolo a central.
          }
          //if(("/"+url[1].path)==)

        }
      })
    return true;
  }
  
}
