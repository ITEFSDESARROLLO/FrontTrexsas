import { Constants } from './../../../constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { CentralService } from 'src/app/services/central.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  descripcionPregunta:string ="";
  descripcionOpcion:string ="";
  listaPreguntas:any[] = [];
  listaOpcionPreguntas:any[] = [];
  nombreEncuesta:string;
  perfilSeleccionado:string="";
  msm:string="";
  ocultar = false;
  parametros:string;
  edita:boolean = false;
  ver:boolean = false;
  encuesta:any;
  preguntaModificacion:any;
  preguntaModificar:any;
  constructor(private data:CentralService, private router:Router, private route:ActivatedRoute,private httpService: HttpClient) { }

  ngOnInit(): void 
  {
    this.parametros = this.route.snapshot.params['id'];
    console.log("param :",this.parametros);
    if(this.parametros?.substr(0,6)==="editar")
    {
      var urlid = this.parametros.substr(6,this.parametros.length);
      this.edita = true;
      this.ver = true;
      this.data.obtenerEncuesta(urlid).then(respuesta =>
        {
          console.log("encuesta : ",respuesta);
          this.encuesta = respuesta;
          this.nombreEncuesta = this.encuesta.nombreEncuesta;
          
          this.perfilSeleccionado = this.encuesta?.perfilUsuario;
          console.log("perfil Encuesta : ",this.perfilSeleccionado);
          this.listaPreguntas = this.encuesta.preguntasEncuesta;
        }).catch(error =>
          {
            console.log("error ",error);
          })
    }

  }

  crearPregunta()
  {
    if(!this.edita)
    {
      if(this.preguntaModificar?.id!=undefined)
      {
        let pregunta = {
          id:this.preguntaModificar.id,
          descripcion:this.descripcionPregunta,
          opcionesPregunta:this.listaOpcionPreguntas
        }
        this.listaOpcionPreguntas = [];
        this.descripcionPregunta = "";
        this.descripcionOpcion = "";
        this.listaPreguntas.push(pregunta);
      }else{
        let pregunta = {
          descripcion:this.descripcionPregunta,
          opcionesPregunta:this.listaOpcionPreguntas
        }
        this.listaOpcionPreguntas = [];
        this.descripcionPregunta = "";
        this.descripcionOpcion = "";
        this.listaPreguntas.push(pregunta);
      }
      this.preguntaModificar = undefined;
    }else{
      if(this.preguntaModificar?.id!=undefined)
      {
        let pregunta = {
          id:this.preguntaModificar.id,
          descripcion:this.descripcionPregunta,
          opcionesPregunta:this.listaOpcionPreguntas
        }

        this.listaOpcionPreguntas = [];
        this.descripcionPregunta = "";
        this.descripcionOpcion = "";
        this.listaPreguntas.push(pregunta);
        this.preguntaModificar = undefined;
        
      }else{
        let pregunta = {
          descripcion:this.descripcionPregunta,
          opcionesPregunta:this.listaOpcionPreguntas
        }

        this.data.crearPregunta(pregunta,this.encuesta.id).then(respuesta =>
          {
            console.log("respuesta  : ",respuesta);
            if(respuesta.mensaje==1)
            {
              this.listaOpcionPreguntas = [];
              this.descripcionPregunta = "";
              this.descripcionOpcion = "";
              this.listaPreguntas.push(pregunta);
              Swal.fire({
                title:'ÉXITO',
                text:'pregunta creada',
                icon:'success'
              })
            }
          }).catch(error =>
            {
              Swal.fire({
                title:'FATAL',
                text:'ERROR EN EL SERVIDOR',
                icon:'error'
              })
              console.log("error en el sistema : ",error);
            })
      }
      this.preguntaModificar = undefined;
      }
  }

  crearOpcionPregunta()
  {
    if(!this.edita)
    {
      let opcion = {
        descripcion:this.descripcionOpcion
      }
      this.descripcionOpcion = "";
      this.listaOpcionPreguntas.push(opcion);
    }else{
      if(this.preguntaModificar!=undefined)
      {
        let opcion = {
          descripcion:this.descripcionOpcion
        }
        this.data.crearOpcion(opcion, this.preguntaModificar?.id).then(respuesta =>
          {
            console.log("respuesta  : ",respuesta);
            if(respuesta.mensaje==1)
            {
              this.descripcionOpcion = "";
              
              Swal.fire({
                title:'ÉXITO',
                text:'opción creada',
                icon:'success'
              })
              this.listaOpcionPreguntas.push(opcion);
            }
          }).catch(error =>
            {
              Swal.fire({
                title:'FATAL',
                text:'ERROR EN EL SERVIDOR',
                icon:'error'
              })
              console.log("error en el sistema : ",error);
            })
      }else{
        let opcion = {
          descripcion:this.descripcionOpcion
        }
        this.listaOpcionPreguntas.push(opcion);
        this.descripcionOpcion = "";
      }
      
    }
    
  }

  borrarOpcion(opcion:any)
  {
    if(!this.edita)
    {
      let arreglo = this.listaOpcionPreguntas;
      for (let index = 0; index < arreglo.length; index++)
      {
        if(arreglo[index].descripcion == opcion.descripcion)
        {
          this.listaOpcionPreguntas.splice(index,1);
        }
      
      }
    }else{
      if(opcion.id == undefined)
      {
        let arreglo = this.listaOpcionPreguntas;
        for (let index = 0; index < arreglo.length; index++)
        {
          if(arreglo[index].descripcion == opcion.descripcion)
          {
            this.listaOpcionPreguntas.splice(index,1);
          }
      
        }
      }else{
        this.data.eliminarOpcion(opcion.id).then(respuesta =>
          {
            console.log("respuesta : ",respuesta)
            if(respuesta.mensaje == 1)
            {
              Swal.fire({
                title:'ÉXITO',
                text:'Opcion Borrada',
                icon:'success'
              })
              let arreglo = this.listaOpcionPreguntas;
              for (let index = 0; index < arreglo.length; index++)
              {
                if(arreglo[index].descripcion == opcion.descripcion)
                {
                  this.listaOpcionPreguntas.splice(index,1);
                }
              }
            }
          }).catch(error =>{
            Swal.fire({
              title:'FATAL',
              text:'ERROR EN EL SERVIDOR',
              icon:'error'
            })
            console.log("error en el sistema : ",error);
          })
      }
      
    }
    
  }

  

  borrarPregunta(pregunta:any)
  {
    if(!this.edita)
    {
      let arreglo = this.listaPreguntas;
      for (let index = 0; index < arreglo.length; index++)
      {
        if(arreglo[index].descripcion == pregunta.descripcion)
        {
          console.log("encontrado");
          this.listaPreguntas.splice(index,1);
        }
      }
    }else{
      if(pregunta.id == undefined)
      {
        let arreglo = this.listaPreguntas;
        for (let index = 0; index < arreglo.length; index++)
        {
          if(arreglo[index].descripcion == pregunta.descripcion)
          {
            console.log("encontrado");
            this.listaPreguntas.splice(index,1);
          }
        }
      }else{
        this.data.eliminarPregunta(pregunta.id).then(respuesta =>
          {
            console.log("respuesta : ",respuesta)
            if(respuesta.mensaje == 1)
            {
              Swal.fire({
                title:'ÉXITO',
                text:'Opcion Borrada',
                icon:'success'
              })
              let arreglo = this.listaPreguntas;
              for (let index = 0; index < arreglo.length; index++)
              {
                if(arreglo[index].descripcion == pregunta.descripcion)
                {
                  console.log("encontrado");
                  this.listaPreguntas.splice(index,1);
                }
              }
            }
          }).catch(error =>
            {
              Swal.fire({
                title:'FATAL',
                text:'ERROR EN EL SERVIDOR',
                icon:'error'
              })
              console.log("error en el sistema : ",error);
            })
      }
    }
    
  }

  modificarPregunta(pregunta:any)
  {
    if(pregunta.id!=undefined)
    {
      this.preguntaModificar = pregunta;
      console.log("pregunta a modificar : ",pregunta);
      this.descripcionPregunta = pregunta.descripcion;
      this.listaOpcionPreguntas = pregunta.opcionesPregunta;
      let arreglo = this.listaPreguntas;
      for (let index = 0; index < arreglo.length; index++)
      {
        if(arreglo[index].descripcion == pregunta.descripcion)
        {
          console.log("encontrado");
          this.listaPreguntas.splice(index,1);
        }
      }
    }else{
      this.preguntaModificar = pregunta;
      console.log("pregunta a modificar : ",pregunta);
      this.descripcionPregunta = pregunta.descripcion;
      this.listaOpcionPreguntas = pregunta.opcionesPregunta;
      let arreglo = this.listaPreguntas;
      for (let index = 0; index < arreglo.length; index++)
      {
        if(arreglo[index].descripcion == pregunta.descripcion)
        {
          console.log("encontrado");
          this.listaPreguntas.splice(index,1);
        }
      }
    }
  }

  guardarCuestionario()
  {
    let fecha = new Date();
    let encuesta = {
      nombreEncuesta:this.nombreEncuesta,
      fechaPublicacion:fecha.getFullYear()+":"+(fecha.getMonth()+1)+":"+fecha.getDate(),
      perfilUsuario:Number(this.perfilSeleccionado),
      preguntasEncuesta:this.listaPreguntas
    }

    if(this.edita)
    {
      encuesta['id'] = this.encuesta.id;
      console.log("encuesta : ",encuesta);
      let arreglo = encuesta.preguntasEncuesta;
      for (const iterator of arreglo)
      {
        iterator['encuesta'] = this.encuesta.id;
      }
      this.data.ediatarEncuesta(encuesta).then(respuesta =>
        {
          console.log("respuesta ",respuesta);
          this.ocultar = true;
          Swal.fire({
            title:'ÉXITO',
            text:"ENCUESTA GUARDADA CON ÉXITO",
            icon:'success',
            showConfirmButton:true
          }).then(respuesta =>
            {
              if(respuesta.isConfirmed)
              {
                window.location.replace("/central/encuestas")
              }
            })
        }).catch(error =>
          {
            console.log("error ",error)
            Swal.fire({
              title:'FATAL',
              text:'ERROR EN EL SERVIDOR',
              icon:'error'
            })
          })
    }else{
      console.log("encuesta : ",encuesta);
    this.data.crearEncuesta(encuesta).subscribe((respuesta:any) =>
      {
        console.log("respuesta : ",respuesta);
        if(respuesta.mensaje == 1)
        {
          this.ocultar = true;
          Swal.fire({
            title:'ÉXITO',
            text:"ENCUESTA GUARDADA CON ÉXITO",
            icon:'success',
            showConfirmButton:true
          }).then(respuesta =>
            {
              if(respuesta.isConfirmed)
              {
                window.location.replace("/central/encuestas")
              }
            })
        }else{
          Swal.fire({
            title:'FATAL',
            text:'ERROR EN EL SERVIDOR',
            icon:'error'
          })
          this.ocultar = false;
        }
        
      });
    }

    
    
  }

}
