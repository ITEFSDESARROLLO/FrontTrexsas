import { CentralService } from 'src/app/services/central.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public listperm:Array<any>;
  UrlTree:any;
  menuItems: any[];
  nombre:string;

  constructor( private LoginService:LoginService,private router:Router,private cookieService: CookieService,private data:CentralService) {
    this.nombre="";
    this.menuItems=[];
    this.listperm=[];
  }

  ngOnInit() {
    this.obtenerNombre();
    this.mostrar();
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  /**
   * Lista los accesos autorizados para restringir los accesos
   */
  mostrar(){

    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    console.log("three . ",this.UrlTree);

    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
        console.log("permisos : ",res);
        this.listperm=res;
      }
    )
  }

  obtenerNombre(){
    this.data.obtenerNombre().subscribe(
      (res:any)=>{
        this.nombre=res.nombrePersona+" "+res.apellidoPersona;
      }
    )
  }
  /**
   * Consulta si tiene acceso para saber si mostrarlo o no, o en determinado caso, inhabilitarlo
   * @param {string} nom Es la uri padre
   * @param {string} bac Es al uri hija
   * @returns true o false dependiendo de si tiene acceso o no
   */
  consult(nom:string,bac:string):boolean{
    //console.log("buscando permisos : ",this.listperm);
    var urip=this.listperm.findIndex(element=>element.uriPadre==nom && element.uriHija==bac);
    //console.log("uri padre : ",urip);
    if(urip!=-1)
    {
      //console.log("padre ",nom);
      //console.log("nom : "+nom+" : !=1 || back :"+bac+" sin permiso");
      return true
    }else{
      //console.log(nom+" : ==1 : "+bac+" con permiso");
      //console.log("nom : "+nom+" : !=1 || back :"+bac+" con permiso");
      return false;
    }

  }

  /**
   * Cierra la Sesion actual consumiendo le servicio de cierre y limpiando toda la ifnormacion de la sesion, llevandolo al login.
   */
  cerrarsesion(){
    this.LoginService
    .logoutUser()
    .subscribe(
      (data:any)=>{
        //console.log(data);
        if(data.mensaje==1){
          this.LoginService.limpiar();//Limpia el LocalStorage
          this.router.navigate([""]);//Navega al login
          if(this.cookieService.check('session')){//Elimina la cookie
            this.cookieService.deleteAll();
          }
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

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
