import { UriHija } from './../../../models/ModelosJ/uri-hija';
import { Router, ActivatedRoute } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import { list } from 'postcss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  resedit:any;
  param: string;
  arrayurihija:Array<any>;
  listaURLSistema:any;
  constructor(private LoginService:LoginService,private data:CentralService,private router:Router,private route:ActivatedRoute, private httpService: HttpClient) {
    this.param="";
    this.edit=false;
    this.view=false;
    this.resedit={};
    this.arrayurihija=[];
    this.Formulario = new FormGroup({
      nom:new FormControl(''),
      swest:new FormControl(null)
    });

   }

  ngOnInit(): void {
    this.traerURLSistema();
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    if(this.param?.substr(0,6)==="editar"){
      this.edit=true;
      this.view=false;
      var urlid=this.param.substr(6,this.param.length);
      this.data.obtenerPerfil(urlid).subscribe(
        (res:any)=>{


          this.resedit=res.perfil;
          this.listaURLSistema = res.permisos;
          console.log("perfiles traidos ",res.permisos);
          this.arrayurihija=[];
          //priemro organiza el contenido deacuerdo al ID y lo guarda en una lista nueva
          this.Formulario.patchValue({
            nom:res.nombrePerfil,
            swest:res.estadoPerfil
          })


          //console.log("perfiles traidos ",this.arrayurihija);
        });

    }else if(this.param?.substr(0,3)==="ver"){
      this.edit=false;
      this.view=true;
      var urlid=this.param.substr(3,this.param.length);
      this.data.obtenerPerfil(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          this.resedit=res;
          let listuri:Array<any>=res.uriXPerfilList;
          console.log("perfiles traidos ",listuri);
          this.arrayurihija=[];

          console.log("array de hijas : ",this.arrayurihija);
          console.log("array de hijas : ",this.arrayurihija.length);
        });
    }


  }
  /**
   * Desactiva el control dependiendo de el nombre de control que reciba
   * @param nom Nombre dle control a deshabilitar o habilitar.
   */
  desactivatecontrol(nom:string):void{
    console.log(nom);
    if(this.Formulario.get('list'+nom)?.value){
      this.Formulario.get('ver'+nom)?.enable();
      this.Formulario.get('edit'+nom)?.enable();
      this.Formulario.get('clon'+nom)?.enable();
    }else{
      this.Formulario.get('ver'+nom)?.setValue(false);
      this.Formulario.get('edit'+nom)?.setValue(false);
      this.Formulario.get('clon'+nom)?.setValue(false);
      this.Formulario.get('ver'+nom)?.disable();
      this.Formulario.get('edit'+nom)?.disable();
      this.Formulario.get('clon'+nom)?.disable();
    }

  }

  /**
   * Guarda el registro dependidendo si el Formulario es valido. De lo contrario no lo permite avanzar, dependiendo si es edit o crear
   */
  guardar(){
    let JSON:any={};
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid){
      console.log(this.Formulario);
    }else{
      if(this.edit){
        JSON.idPerfil=this.resedit.idPerfil;
        JSON.nombrePerfil=this.Formulario.get('nom')?.value;
        JSON.observacionesPerfil=this.Formulario.get('obs')?.value;
        JSON.estadoPerfil=this.Formulario.get('swest')?.value?1:0;
        let perflist=[];
        let urixPerfil = {};
        for (const padre of this.listaURLSistema)
        {
          console.log("padre : ",padre);
          for (const hijo of padre.urisHijas)
          {
            console.log("hijo : ",hijo);
            urixPerfil = {
              idUriXPerfil:hijo.uxp,
              accesoUriXPerfil:hijo.permiso==true?1:0,
              uriHija:{
                idUriHija:hijo.idUriHija
              },
              perfil:{
                idPerfil:this.resedit.idPerfil
              }
            }
            perflist.push(urixPerfil);
          }

        }


        JSON.uriXPerfilList=perflist;
        console.log(JSON);
        this.data.actualizarPerfil(JSON).subscribe(
          (res:any)=>{
            if(res.mensaje==1){
              Swal.fire({
                title: 'ÉXITO',
                text: 'Perfil Actualizado con Éxito',
                icon:'success',
                showConfirmButton:true
              }).then(respuesta =>{
                if(respuesta.isConfirmed)
                {
                  window.location.href = "/central/perfiles";
                }
              })
            }else{
              Swal.fire({
                title: 'Fatal',
                text: 'Error en la creación',
                icon:'error',
              });
            }
          }
        )
      }else{
        JSON.nombrePerfil=this.Formulario.get('nom')?.value;
        JSON.observacionesPerfil=this.Formulario.get('obs')?.value;
        JSON.estadoPerfil=this.Formulario.get('swest')?.value?1:0;
        let perflist=[];

        for (const padre of this.listaURLSistema)
        {
          console.log("padre : ",padre);
          for (const hijo of padre.urisHijas)
          {
            let urixPerfil = {
              accesoUriXPerfil:hijo.permiso==true?1:0,
              uriHija:{
                idUriHija:hijo.idUriHija
              }
            }
            perflist.push(urixPerfil);
          }
        }

        JSON.uriXPerfilList=perflist;
        console.log(JSON);
        this.data.crearPerfil(JSON).subscribe(
          (res:any)=>{
            if(res.mensaje==1){
              Swal.fire({
                title: 'ÉXITO',
                text: 'Perfil Creado con Éxito',
                icon:'success',
                showConfirmButton:true
              }).then(respuesta =>{
                if(respuesta.isConfirmed)
                {
                  window.location.href = "/central/perfiles";
                }
              })
            }else{
              Swal.fire({
                title: 'Fatal',
                text: 'Error en la creación',
                icon:'error',
              });
            }
          }
        );
      }
    }

  }

  traerURLSistema()
  {
    this.data.traerURLSistema().then(respuesta =>{
      console.log("url sistema : ",respuesta);
      this.listaURLSistema = respuesta;
    }).catch(error =>{
      console.log("error : ",error)
    })
  }

  cambiarEstado(padre:any,nombreHijo:any)
  {
    let indicePadre = this.listaURLSistema.findIndex(elemento =>elemento.idUriPadre == padre)
    let indiceHijo = this.listaURLSistema[indicePadre]?.urisHijas.findIndex(hijo => hijo.idUriHija == nombreHijo);
    if(this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo].permiso == true)
    {
      if(this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo].descripcionUriHija == "listar")
      {
        let indiceDependiente = this.listaURLSistema[indicePadre]?.urisHijas.findIndex(hijo => hijo.descripcionUriHija == "editar");
        let objetoDependiente = this.listaURLSistema[indicePadre]?.urisHijas[indiceDependiente];
        objetoDependiente.disable = true;
        objetoDependiente.permiso = false;
        this.listaURLSistema[indicePadre].urisHijas[indiceDependiente] = objetoDependiente;
      }
      let objeto = this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo];
      objeto.permiso = false;
      this.listaURLSistema[indicePadre].urisHijas[indiceHijo] = objeto;
    }else{
      if(this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo].descripcionUriHija == "listar")
      {
        let indiceDependiente = this.listaURLSistema[indicePadre]?.urisHijas.findIndex(hijo => hijo.descripcionUriHija == "editar");
        let objetoDependiente = this.listaURLSistema[indicePadre]?.urisHijas[indiceDependiente];
        objetoDependiente.disable = false;
      }
      console.log("url hija ",this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo]);
      let objeto = this.listaURLSistema[indicePadre]?.urisHijas[indiceHijo];
      objeto.permiso = true;
      this.listaURLSistema[indicePadre].urisHijas[indiceHijo] = objeto;
    }
  }

}
