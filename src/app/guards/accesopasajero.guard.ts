import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CentralService } from '../services/central.service';

@Injectable({
  providedIn: 'root'
})
export class AccesopasajeroGuard implements CanActivate {

  constructor(private data:CentralService,private router:Router){
  };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var url=this.router.parseUrl(state.url).root.children.primary.segments;
      this.data.obtenerAcceso().subscribe(
        (res:Array<any>)=>{
          if(url[1]!==undefined){
            var urip=res.filter(element=>element.uriPadre=="/pasajeros");//Aca se evalua la uripadre que siempres sera la pocision 1
            var urih=-1;
            if(url[2]!==undefined){
              urih= urip.findIndex(element=>element.uriHija=="/"+url[2].path);//Aca se evalua las uris hijas que siempres sera la pocision 2
              if(urih==-1){
                urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,6));//Aca se evalua las uris hijas que siempres sera la pocision 2
              }
              if(urih==-1){
                urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,5));//Aca se evalua las uris hijas que siempres sera la pocision 2
              }
              if(urih==-1){
                urih=urip.findIndex(element=>element.uriHija=="/"+url[2].path.substr(0,3));//Aca se evalua las uris hijas que siempres sera la pocision 2
              }
              if(urih==-1){
                urih=urip.findIndex(element=>element.uriHija=="/");//Aca se evalua las uris hijas que siempres sera la pocision 2
              }

            }else{
              urih=urip.findIndex(element=>element.uriHija=="/");//Aca se evalua si esta en el listar
            }
            if(urih==-1){
              this.router.navigate(['/central/clientes']);// si la ubicacion en la que esta, no se encuentra dentro de los accesos, dara -1 devolviendolo a central.
            }
            //if(("/"+url[1].path)==)

          }
          this.data.resacc=  Object.assign({}, res);
          //this.paginator?.mostrar;
          //this.pl.mostrar();
          //console.log(res);
        }
      )
      return true;
    }

  
  
}
