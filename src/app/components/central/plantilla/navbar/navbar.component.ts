import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CentralService } from 'src/app/services/central.service';
import { Component, ElementRef, OnInit,HostBinding } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public listperm:Array<any>;

  private listTitles: any[]=[];

  UrlTree:any;
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  nombre:string;
  @HostBinding('class') componentCssClass:any;

  constructor( private LoginService:LoginService,private cookieService: CookieService,private data:CentralService,location: Location,  private element: ElementRef, private router: Router) {
    this.nombre="";
    this.location = location;
    this.sidebarVisible = false;
    this.UrlTree={};
    this.listperm=[];
    var $layer: any = document.getElementsByClassName('close-layer')[0];
  }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.mostrar();
    this.obtenerNombre();
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
       var $layer: any = document.getElementsByClassName('close-layer')[0];
       if ($layer) {
         $layer.remove();
         this.mobile_menu_visible = 0;
       }
   });
  }

  modTema(tema:any)
  {
    this.componentCssClass = tema;
  }

  /**
   * Consulta si tiene acceso para saber si mostrarlo o no, o en determinado caso, inhabilitarlo
   * @param {string} nom Es la uri padre
   * @param {string} bac Es al uri hija
   * @returns true o false dependiendo de si tiene acceso o no
   */
  consult(nom:string,bac:string):boolean{
    var urip=this.listperm.findIndex(element=>element.uriPadre==nom && element.uriHija==bac);
    if(urip!=-1){
      return true
    }else{
      return false;
    }
  }

  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const body = document.getElementsByTagName('body')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);

      body.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton?.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  };
  sidebarToggle() {
      var $toggle = document.getElementsByClassName('navbar-toggler')[0];

      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
      const body = document.getElementsByTagName('body')[0];

      if (this.mobile_menu_visible == 1) {
          // $('html').removeClass('nav-open');
          body.classList.remove('nav-open');
          $layer=$layer;
          if ($layer) {
              $layer.remove();
          }
          setTimeout(function() {
              $toggle.classList.remove('toggled');
          }, 400);

          this.mobile_menu_visible = 0;
      } else {
          setTimeout(function() {
              $toggle.classList.add('toggled');
          }, 430);

          var $layer = document.createElement('div');
          $layer.setAttribute('class', 'close-layer');


          if (body.querySelectorAll('.main-panel')) {
              document.getElementsByClassName('main-panel')[0].appendChild($layer);
          }else if (body.classList.contains('off-canvas-sidebar')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          }

          setTimeout(function() {
              $layer.classList.add('visible');
          }, 100);

          $layer.onclick = function() { //asign a function
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            $layer.classList.remove('visible');
            setTimeout(function() {
                $layer.remove();
                $toggle.classList.remove('toggled');
            }, 400);
          }.bind(this);

          body.classList.add('nav-open');
          this.mobile_menu_visible = 1;

      }
  };

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  /**
   * Lista los accesos autorizados para restringir los accesos
   */
  mostrar(){

    this.UrlTree = this.router.parseUrl(this.router.url).root.children.primary.segments;
    //console.log(this.UrlTree);

    this.data.obtenerAcceso().subscribe(
      (res:Array<any>)=>{
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
}
