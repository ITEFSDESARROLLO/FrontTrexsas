import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit 
{
  labels:any;
  formulario:FormGroup;
  idCC:number;
  ocultar=false;
  msm:string;
  view:boolean;
  edit:boolean;
  registrador:any;
  fecha:string;
  param:string;
  tipoNotificacion:string;
  perfilesNotificacionesMasivas:any[]=[];
  perfilesSeleccionados:any[]=[];
  res:any[] =[];
  usuarioSeleccionado:any ={};
  perfilSeleccionadoIndividual:string;
  estadoNotificacion:any;
  selected="option1";
  urlid:any;
  notificacionesRecibidasModificar:any;
  idPerfilIndividual:number;
  constructor(private data:CentralService, private router:Router, private route:ActivatedRoute,private httpService:HttpClient)
  {
    this.param="";
    this.msm="";
    this.view=false;
    this.edit=false;
    this.fecha="";
    this.registrador=null;
    this.formulario=new FormGroup({
      txtTituloNotificacion:new FormControl( null,[Validators.required]),
      txtDescripcionNotificacion:new FormControl( null,[Validators.required]),
      tipoNotificacion:new FormControl( null,[Validators.required,Validators.maxLength(45)]),
      permisoPerfil:new FormControl( null,[Validators.required])
    });
    this.perfilesNotificacionesMasivas = [
      {idPerfil:"2",nombrePerfil:"Conductor"},
      {idPerfil:"3",nombrePerfil:"Propietario"},
      {idPerfil:"7",nombrePerfil:"Pasajero"},
      {idPerfil:"8",nombrePerfil:"Cliente"}
    ]
  }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    this.param = this.route.snapshot.params['id'];
    console.log("valor obtenido : ",this.param);
    if(this.param?.substr(0,6)==="editar")
    {
      this.urlid=this.param.substr(6,this.param.length);
      this.edit=true;
      this.view=false;
      this.idCC=+urlid;
      this.data.obtenerNotificacion(this.urlid).subscribe(
        (res:any)=>{
          console.log(res.notificacion);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            let notificacion = res.notificacion;
            this.estadoNotificacion = notificacion.estadoNotificacion;
            console.log("der : ",notificacion)
            switch (notificacion.tipoNotificacion) 
            {
              case 2:
                this.perfilesNotificacionesMasivas = [
                  {idPerfil:"2",nombrePerfil:"Conductor"},
                  {idPerfil:"3",nombrePerfil:"Propietario"},
                  {idPerfil:"7",nombrePerfil:"Pasajero"},
                  {idPerfil:"8",nombrePerfil:"Cliente"}
                ]
                this.tipoNotificacion=notificacion.tipoNotificacion.toString();
                let perfilesNotificacionEditar = notificacion.perfilesNotificacion;
                this.notificacionesRecibidasModificar = perfilesNotificacionEditar;
                console.log("perfiles recibidos en notificaciones : ",perfilesNotificacionEditar);
                //this.perfilesSeleccionados=notificacion.perfilesNotificacion;
                
                for (const iterator of perfilesNotificacionEditar)
                {
                  for (let index = 0; index < this.perfilesNotificacionesMasivas.length; index++)
                  {
                    if(this.perfilesNotificacionesMasivas[index].idPerfil == iterator.perfil)
                    {
                      console.log("guardado : ",this.perfilesNotificacionesMasivas[index]);
                      this.perfilesSeleccionados.push(this.perfilesNotificacionesMasivas[index]);
                      this.perfilesNotificacionesMasivas.splice(index,1);
                      break;
                    } 
                  }
                }
                console.log("perfiles seleccionados de objeto a modificar : ",this.perfilesSeleccionados);
                console.log("notificaciones Masivas : ",this.perfilesNotificacionesMasivas);
                
                //this.perfilesSeleccionados = res.perfilesNotificacion;
                console.log("redser :",notificacion.perfilesNotificacion)
                this.formulario.patchValue({
                txtTituloNotificacion:notificacion.tituloNotificacion,
                txtDescripcionNotificacion:notificacion.descripcionNotificacion
                });
                
                break;
                case 1:
                  console.log("persona a buscar : ",this.urlid);
                  console.log("notificacion recibida : ",notificacion.perfilesNotificacion);
                  //perfilesNotificacionEditar = notificacion.perfilesNotificacion;
                  this.idPerfilIndividual = notificacion.perfilesNotificacion[0].id;
                  this.tipoNotificacion=notificacion.tipoNotificacion.toString();
                  this.perfilSeleccionadoIndividual = notificacion.perfilesNotificacion[0].perfil.toString();
                  this.estadoNotificacion = notificacion.estadoNotificacion;
                  this.traerUsuarioPerfiles(Number(this.perfilSeleccionadoIndividual));
                  console.log("prer : ",notificacion.perfilesNotificacion[0].perfil.toString())
                  //this.perfilSeleccionadoIndividual = '2';
                  console.log("persona a buscar : ",this.urlid)
                  //this.traerUsuarioPerfiles(Number(this.perfilSeleccionadoIndividual));
                  this.traerUsuario();
                  console.log("notificacion individual : ",this.usuarioSeleccionado);
                  this.formulario.patchValue({
                  txtTituloNotificacion:notificacion.tituloNotificacion,
                  txtDescripcionNotificacion:notificacion.descripcionNotificacion
                  });
                  
                  break;
            
              default:
                break;
            }
          }
        });
    }

    if(this.param?.substr(0,3)==="ver"){
      var urlid=this.param.substr(3,this.param.length);
      this.edit=false;
      this.view=true;
      this.idCC=+urlid;
      this.data.obtenerCuentaCobro(urlid).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.mensaje === 3){
            this.router.navigate(['central']);
          }else{
            this.fecha=res.fechaCuentaCobro;
            this.registrador=res.registradoPorCuentaCobro;
            this.formulario.patchValue({
              txtTituloNotificacion:res.tituloNotificacion,
              txtDescripcionNotificacion:res.descripcionNotificacion,
              tipoNotificacion:res.tipoNotificacion,
              permisoPerfil:res.perfilNotificacion
            });
            this.formulario.disable();
          }
        });
    }
  }

  guardarPerfilSeleccionado(perfil:any)
  {
    console.log("perfil a guardar : ",perfil)
    let arrayTemporalPerfiles = [];
    if(this.edit)
    {
      for (const perfilArreglo of this.perfilesNotificacionesMasivas)
      {
        console.log("redfasdf  ",perfilArreglo)
        if(perfilArreglo.idPerfil == perfil.idPerfil)
        {
          console.log("encontrado : ",perfilArreglo)
          this.perfilesSeleccionados.push(perfil);
        }else{
          arrayTemporalPerfiles.push(perfilArreglo);
        }
      }
    }else{
      for (const perfilArreglo of this.perfilesNotificacionesMasivas)
      {
        console.log("redfasdf  ",perfilArreglo)
        if(perfilArreglo.id == perfil.id)
        {
          console.log("encontrado : ",perfilArreglo)
          this.perfilesSeleccionados.push(perfil);
        }else{
          arrayTemporalPerfiles.push(perfilArreglo);
        }
      }
    }
    
    this.perfilesNotificacionesMasivas = [];
    this.perfilesNotificacionesMasivas = arrayTemporalPerfiles;
    console.log("perfil : ",this.perfilesSeleccionados);
    console.log("restantes : ",this.perfilesNotificacionesMasivas);
  }

  borrarPerfilLista(perfil:any)
  {
    console.log("perfil a eliminar : ",perfil)
    let arrayTemporalPerfiles = this.perfilesSeleccionados;
    this.perfilesNotificacionesMasivas.push(perfil);
    if(this.edit)
    {
      for (let index = 0; index < arrayTemporalPerfiles.length; index++)
    {
      if(arrayTemporalPerfiles[index].idPerfil == perfil.idPerfil)
      {
        console.log("encontrado : ",arrayTemporalPerfiles[index].id)
        arrayTemporalPerfiles.splice(index,1);
        
      }
    }
    }else{
      for (let index = 0; index < arrayTemporalPerfiles.length; index++)
    {
      if(arrayTemporalPerfiles[index].id == perfil.id)
      {
        console.log("encontrado : ",arrayTemporalPerfiles[index].id)
        arrayTemporalPerfiles.splice(index,1);
        
      }
    }
    }
    
    this.perfilesSeleccionados = [];
    this.perfilesSeleccionados = arrayTemporalPerfiles;
    console.log("restantes : ",this.perfilesSeleccionados);
    console.log("perfiles : ",this.perfilesNotificacionesMasivas);
  }

  crearListaPerfilesNotificacioneMasivas()
  {
    this.perfilesSeleccionados = [];
    this.perfilesNotificacionesMasivas = [
      {id:"2",perfil:"Conductor"},
      {id:"3",perfil:"Propietario"},
      {id:"7",perfil:"Pasajero"},
      {id:"8",perfil:"Cliente"}
    ]
    this.res = [];
    this.usuarioSeleccionado = undefined;
  }

  crearNotificacionIndividual()
  {
    //this.usuarioSeleccionado = undefined;
    this.perfilesSeleccionados = [];
    this.perfilesNotificacionesMasivas = [
      {id:"2",perfil:"Conductor"},
      {id:"3",perfil:"Propietario"},
      {id:"7",perfil:"Pasajero"},
      {id:"8",perfil:"Cliente"}
    ]
  }

  traerUsuarioPerfiles(perfil:number)
  {
    switch (perfil)
    {
      case 2:
        this.data.obtenerConductoresNotificacion().then(res =>
          {
            console.log("notificasdasdasd : ",this.notificacionesRecibidasModificar);
            this.res = res.conductores;
            console.log("res : ",res);
          }).catch(error =>
            {
              console.log("error : ",error);
            })
        console.log("perfil a buscar : ",perfil);
        break;
      case 3:
        this.data.obtenerPropietariosNotificacion().then(res =>
          {
            console.log("notificasdasdasd : ",this.notificacionesRecibidasModificar);
            this.res = res.propietarios;
            console.log("res : ",res);
          }).catch(error =>
            {
              console.log("error : ",error);
            })
        console.log("perfil a buscar : ",perfil);
        break;
      case 7:
        this.data.obtenerPasajerosNotificacion().then(res =>
          {
            console.log("notificasdasdasd : ",this.notificacionesRecibidasModificar);
            this.res = res.pasajeros;
            console.log("res : ",res);
          }).catch(error =>
            {
              console.log("error : ",error);
            })
        console.log("perfil a buscar : ",perfil);
        break;
      case 8:
        this.data.obtenerClientesNotificacion().then(res =>
          {
            this.res = res.clientes;
            console.log("res : ",res);
          }).catch(error =>
            {
              console.log("error : ",error);
            })
        console.log("perfil a buscar : ",perfil);
        break;
      default:
        break;
    }
    
  }

  guardar(){
    this.formulario.markAllAsTouched();
    if(this.formulario.valid)
    {
      let mapaNotificacion:any={};
      var notificacionJSON:any={};
      notificacionJSON.tituloNotificacion=this.formulario.get("txtTituloNotificacion")?.value;
      notificacionJSON.descripcionNotificacion=this.formulario.get("txtDescripcionNotificaion")?.value;
      notificacionJSON.tipoNotificacion=this.formulario.get("tipoNotificacion")?.value;
      notificacionJSON.permisoPerfil=this.formulario.get("permisoPerfil")?.value;
      if(this.perfilesSeleccionados.length >0 )
      {

      }else{

      }
      console.log(notificacionJSON);
      if(this.edit){
        //JSON.idCuentaCobro=this.idCC;
        this.data.actualizarCuentaCobro(notificacionJSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="ACTUALIZADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }else{
        this.data.crearCuentaCobro(notificacionJSON).subscribe((res:any)=>{
          if(res.mensaje==1){
            this.ocultar=true;
            this.msm+="CREADO SATISFACTORIAMENTE";
          }else{
            this.ocultar=false;
            this.msm+=res.mensaje;
          }
        });
      }
    }
  }

  editarIndividual()
  {
    this.formulario.markAllAsTouched();
    var notificacionJSON:any={};
    notificacionJSON.tituloNotificacion=this.formulario.get("txtTituloNotificacion")?.value;
    notificacionJSON.descripcionNotificacion=this.formulario.get("txtDescripcionNotificacion")?.value;
    notificacionJSON.tipoNotificacion=this.tipoNotificacion;
    console.log("tipo notificacion : ",this.tipoNotificacion)
    console.log("perfiles seleccionados : ",this.perfilesSeleccionados);
    let perfilesMasivo = this.perfilesSeleccionados;
    let arreglo:any[] = [];
    console.log("1 estao",this.estadoNotificacion);
    //perfilesMasivo = this.perfilesSeleccionados;
    console.log("perfil seleccionado individual ",this.perfilSeleccionadoIndividual);
    let arregloPerfiles:any[] = [];
    console.log("usuario seleccionado : ",this.usuarioSeleccionado.idPersona);
    for (const iterator of this.perfilesNotificacionesMasivas) 
    {
      if(iterator.idPerfil == Number(this.perfilSeleccionadoIndividual))
      {
        let perfil = {
          id:this.idPerfilIndividual,
          perfil: iterator.idPerfil,
          persona:this.usuarioSeleccionado.idPersona
        }
        console.log("esd 123 : ",perfil);
        arregloPerfiles.push(perfil);
      }
    }
    console.log("objeto : ",this.usuarioSeleccionado);
    notificacionJSON.estadoNotificacion = this.estadoNotificacion;
    notificacionJSON.perfilesNotificacion = arregloPerfiles;
    //notificacionJSON.persona = this.usuarioSeleccionado;
    console.log("reds : ",arregloPerfiles)
    notificacionJSON.id = this.urlid;
    console.log("objeto editar: ",notificacionJSON);
    this.data.editarNotificacion(notificacionJSON).subscribe(res =>
    {
      console.log("redse individual ",res);
    })
  }

  guardar2(){
    this.formulario.markAllAsTouched();
    var notificacionJSON:any={};
    notificacionJSON.tituloNotificacion=this.formulario.get("txtTituloNotificacion")?.value;
    notificacionJSON.descripcionNotificacion=this.formulario.get("txtDescripcionNotificacion")?.value;
    notificacionJSON.tipoNotificacion=this.tipoNotificacion;
    console.log("tipo notificacion : ",this.tipoNotificacion)
    console.log("perfiles seleccionados : ",this.perfilesSeleccionados);
    let perfilesMasivo = this.perfilesSeleccionados;
    let arreglo:any[] = [];
    if(this.edit)
    {
      switch (this.tipoNotificacion)
      {
        case "2":
          console.log("2 seee",notificacionJSON);
          console.log("perfiles nuevos : ",perfilesMasivo);
          console.log("tipo de notificacion a modificar : ",this.tipoNotificacion);
          notificacionJSON.id = this.param.substr(6,this.param.length);
          let arreglo:any[] = [];
      
          //for (const iterator of perfilesMasivo)
          for (let index = 0; index < perfilesMasivo.length; index++)
          {
            console.log(" 1 eliminado : ",perfilesMasivo[index])
            for(const perfilAntiguo of this.notificacionesRecibidasModificar)
            {
              console.log(" 2 eliminado : ",perfilesMasivo[index])
              if(perfilAntiguo.perfil == perfilesMasivo[index].idPerfil)
              {
                console.log(" 3 eliminado : ",perfilesMasivo[index])
                let perfil = {
                  id: perfilAntiguo.id,
                  perfil: perfilesMasivo[index].idPerfil,
                  persona:null
                }
                arreglo.push(perfil)
                break;
              }
            }
          }
          console.log("arreglo parcial : ",arreglo);
          
            for (const iterator of perfilesMasivo)
            {
              let encontrado = false;
              for(const it of arreglo)
              {
                if(it.perfil == iterator.idPerfil)
                {
                  encontrado = true;
                  break;
                }
              }
              if(encontrado == false)
              {
                let perfil = {
                id: null,
                perfil: iterator.idPerfil,
                persona:null
                }
                arreglo.push(perfil)
              }
              
            }
          

          notificacionJSON.perfilesNotificacion = arreglo;
          notificacionJSON.estadoNotificacion = this.estadoNotificacion;
          console.log("1 ",notificacionJSON);
          this.data.editarNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse ",res);
          });
          break;
        case "1":
          console.log("1 estao",this.estadoNotificacion);
          //perfilesMasivo = this.perfilesSeleccionados;
          console.log("perfil seleccionado individual ",this.perfilSeleccionadoIndividual);
          let arregloPerfiles:any[] = [];
          console.log("usuario seleccionado : ",this.usuarioSeleccionado.idPersona);
          for (const iterator of this.perfilesNotificacionesMasivas) 
          {
            if(iterator.idPerfil == Number(this.perfilSeleccionadoIndividual))
            {
              let perfil = {
                id:this.idPerfilIndividual,
                perfil: iterator.idPerfil,
                persona:this.usuarioSeleccionado.idPersona
              }
              console.log("esd 123 : ",perfil);
              arregloPerfiles.push(perfil);
            }
          }
          console.log("objeto : ",this.usuarioSeleccionado);
          notificacionJSON.estadoNotificacion = this.estadoNotificacion;
          notificacionJSON.perfilesNotificacion = arregloPerfiles;
          //notificacionJSON.persona = this.usuarioSeleccionado;
          console.log("reds : ",arregloPerfiles)
          notificacionJSON.id = this.urlid;
          console.log("objeto editar: ",notificacionJSON);
          this.data.editarNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse individual ",res);
          })
          break;
        default:
          break;
      }
      
    }else{
      switch (this.tipoNotificacion) 
      {
        case "2":
          let perfilesMasivo = this.perfilesSeleccionados;
          let arreglo:any[] = [];
          notificacionJSON.perfilesNotificacion = perfilesMasivo;
          console.log("1 ",notificacionJSON);
          for (const iterator of perfilesMasivo)
          {
            let perfil = {
              perfil: iterator.id,
            }
            arreglo.push(perfil)
          }
          notificacionJSON.perfilesNotificacion = arreglo;
          this.data.crearNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse ",res);
            if(res['mensaje']==1){
              this.ocultar=true;
              this.msm="CREADO SATISFACTORIAMENTE";
              console.log("3",res);
            }else{
              this.ocultar=false;
              
              this.msm=res['mensaje'];
              console.log("4",res);
            }
          })
        break;
        case "1":
          console.log("1 ",notificacionJSON);
          //perfilesMasivo = this.perfilesSeleccionados;
          console.log("perfil seleccionado individual ",this.perfilSeleccionadoIndividual);
          let arregloPerfiles:any[] = [];
          for (const iterator of this.perfilesNotificacionesMasivas) 
          {
            
            if(iterator.id == this.perfilSeleccionadoIndividual)
            {
              console.log("encontrado : ",this.usuarioSeleccionado)
              console.log("encontrado 1s: ",iterator.id)
              let perfil = {
                perfil: iterator.id,
                persona:this.perfilSeleccionadoIndividual!="8"?this.usuarioSeleccionado.id:this.usuarioSeleccionado.idCliente
              }
              console.log("encontrado 2s : ",perfil)
              arregloPerfiles.push(perfil);
            }
          }
          console.log("objeto : ",arregloPerfiles);
          notificacionJSON.perfilesNotificacion = arregloPerfiles;
          //notificacionJSON.persona = this.usuarioSeleccionado;
          notificacionJSON.estadoNotificacion = 1;
          console.log("objeto 2 : ",notificacionJSON);
          console.log("usuario seleccionado : ",this.usuarioSeleccionado)
          if(this.perfilSeleccionadoIndividual=="8")
          {
            this.data.crearNotificacionCliente(notificacionJSON,this.usuarioSeleccionado.idCliente).subscribe(res =>
              {
                console.log("redse individual ",res);
                if(res['mensaje']==1){
                  Swal.fire({
                    title:"ÉXITO",
                    text:"Notificación Enviada",
                    icon:'success',
                    showConfirmButton:true
                  }).then(respuesta =>
                    {
                      if(respuesta.isConfirmed)
                      {
                        window.location.href = "/central/notificaciones";
                      }
                    })
                }else{
                  Swal.fire({
                    title:'FATAL',
                    text:'Error en el servidor',
                    icon:'error'
                  })
                  console.log("4",res);
                }
              })
          }else{
            this.data.crearNotificacion(notificacionJSON).subscribe(res =>
              {
                console.log("redse individual ",res);
                if(res['mensaje']==1){
                  Swal.fire({
                    title:"ÉXITO",
                    text:"Notificación Enviada",
                    icon:'success',
                    showConfirmButton:true
                  }).then(respuesta =>
                    {
                      if(respuesta.isConfirmed)
                      {
                        window.location.href = "/central/notificaciones";
                      }
                    })
                }else{
                  Swal.fire({
                    title:'FATAL',
                    text:'Error en el servidor',
                    icon:'error'
                  })
                  console.log("4",res);
                }
              })
          }
          
        break;
      default:
        break;
      }
    }
  }

  guardarPrueba()
  {
    this.formulario.markAllAsTouched();
    var notificacionJSON:any={};
    notificacionJSON.tituloNotificacion=this.formulario.get("txtTituloNotificacion")?.value;
    notificacionJSON.descripcionNotificacion=this.formulario.get("txtDescripcionNotificacion")?.value;
    notificacionJSON.tipoNotificacion=this.tipoNotificacion;
    console.log("tipo notificacion : ",this.tipoNotificacion)
    console.log("perfiles seleccionados : ",this.perfilesSeleccionados);
    let perfilesMasivo = this.perfilesSeleccionados;
    let arreglo:any[] = [];
    if(this.edit)
    {
      switch (this.tipoNotificacion)
      {
        case "2":
          console.log("2 seee",notificacionJSON);
          console.log("perfiles nuevos : ",perfilesMasivo);
          console.log("tipo de notificacion a modificar : ",this.tipoNotificacion);
          notificacionJSON.id = this.param.substr(6,this.param.length);
          let arreglo:any[] = [];
      
          //for (const iterator of perfilesMasivo)
          for (let index = 0; index < perfilesMasivo.length; index++)
          {
            console.log(" 1 eliminado : ",perfilesMasivo[index])
            for(const perfilAntiguo of this.notificacionesRecibidasModificar)
            {
              console.log(" 2 eliminado : ",perfilesMasivo[index])
              if(perfilAntiguo.perfil == perfilesMasivo[index].idPerfil)
              {
                console.log(" 3 eliminado : ",perfilesMasivo[index])
                let perfil = {
                  id: perfilAntiguo.id,
                  perfil: perfilesMasivo[index].idPerfil,
                  persona:null
                }
                perfilesMasivo.splice(index,1);
                arreglo.push(perfil)
                break;
              }
            }
          }
          console.log("arreglo parcial : ",arreglo);
          if(perfilesMasivo.length >0)
          {
            for (const iterator of perfilesMasivo)
            {
              let perfil = {
                id: null,
                perfil: iterator.idPerfil,
                persona:null
              }
              arreglo.push(perfil)
            }
          }

          notificacionJSON.perfilesNotificacion = arreglo;
          notificacionJSON.estadoNotificacion = this.estadoNotificacion;
          console.log("1 ",notificacionJSON);
          /*this.data.editarNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse ",res);
          });*/
          break;
        case "1":
          console.log("1 estao",this.estadoNotificacion);
          //perfilesMasivo = this.perfilesSeleccionados;
          console.log("perfil seleccionado individual ",this.perfilSeleccionadoIndividual);
          let arregloPerfiles:any[] = [];
          for (const iterator of this.perfilesNotificacionesMasivas) 
          {
            if(iterator.idPerfil == Number(this.perfilSeleccionadoIndividual))
            {
              let perfil = {
                perfil: iterator.id,
                persona:this.usuarioSeleccionado.id
              }
              arregloPerfiles.push(perfil);
            }
          }
          console.log("objeto : ",this.usuarioSeleccionado);
          notificacionJSON.estadoNotificacion = this.estadoNotificacion;
          notificacionJSON.perfilesNotificacion = arregloPerfiles;
          notificacionJSON.persona = this.usuarioSeleccionado;
          console.log("persona seleccionada : ",this.usuarioSeleccionado)
          notificacionJSON.id = this.urlid;
          console.log("objeto editar: ",notificacionJSON);
          this.data.editarNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse individual ",res);
          })
          break;
        default:
          break;
      }
      
    }else{
      switch (this.tipoNotificacion) 
      {
        case "2":
          let perfilesMasivo = this.perfilesSeleccionados;
          let arreglo:any[] = [];
          notificacionJSON.perfilesNotificacion = perfilesMasivo;
          console.log("1 ",notificacionJSON);
          for (const iterator of perfilesMasivo)
          {
            let perfil = {
              perfil: iterator.id,
            }
            arreglo.push(perfil)
          }
          notificacionJSON.perfilesNotificacion = arreglo;
          this.data.crearNotificacion(notificacionJSON).subscribe((res:any) =>
          {
            console.log("redse ",res);
            
            console.log("verificando")
            
              
            
          })
        break;
        case "1":
          console.log("1 ",notificacionJSON);
          //perfilesMasivo = this.perfilesSeleccionados;
          console.log("perfil seleccionado individual ",this.perfilSeleccionadoIndividual);
          let arregloPerfiles:any[] = [];
          for (const iterator of this.perfilesNotificacionesMasivas) 
          {
            console.log("encontrado : ",iterator)
            if(iterator.id == this.perfilSeleccionadoIndividual)
            {
              console.log("encontrado 1s: ",iterator.id)
              let perfil = {
                perfil: iterator.id,
                persona:this.usuarioSeleccionado.id
              }
              arregloPerfiles.push(perfil);
            }
          }
          console.log("objeto : ",arregloPerfiles);
          notificacionJSON.perfilesNotificacion = arregloPerfiles;
          notificacionJSON.persona = this.usuarioSeleccionado;
          notificacionJSON.estadoNotificacion = 1;
          console.log("objeto 2 : ",notificacionJSON);
          console.log("usuario seleccionado : ",this.usuarioSeleccionado)
          this.data.crearNotificacion(notificacionJSON).subscribe(res =>
          {
            console.log("redse individual ",res);
          })
        break;
      default:
        break;
      }
    }
    
  }

  traerUsuario()
  {
    console.log("persona a buscar : ",this.urlid)
    let id = Number(this.urlid);
    this.data.obtenerPersonaNotificacion(id).subscribe((res:any) =>
      {
        console.log("recibido : ",res.persona.nombrePersona+" "+res.persona.apellidoPersona);
        this.usuarioSeleccionado = res.persona;
        console.log("recibido usuario: ",this.usuarioSeleccionado);

      })
  }

}
