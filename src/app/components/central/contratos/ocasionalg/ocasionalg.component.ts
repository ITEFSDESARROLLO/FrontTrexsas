import { Ciudad } from 'src/app/models/ciudad';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/app-constants';
import * as moment from 'moment';

@Component({
  selector: 'app-ocasionalg',
  templateUrl: './ocasionalg.component.html',
  styleUrls: ['./ocasionalg.component.css']
})
export class OcasionalgComponent implements OnInit {
  fechact:Date;
  fechaini:Date;
  fechafin:Date;
  dayfin:number;
  stract:string;
  strini:string;
  strfin:string;
  strinifin:string;
  labels: any;
  Formulario: FormGroup;
  ocultar=false;
  msm="";
  edit:boolean;
  view:boolean;
  vehiculos:Array<any>;
  alertveh:boolean=false;
  idvehi:number;
  resveh:any;
  resvehdef:any;
  ciudades:Array<Ciudad>;
  clientes:Array<any>;
  objcontratos:Array<any>;
  pasajeros:Array<any>;
  pas:Array<any>;
  selectpas:Array<any>;
  responsable:Array<any>;
  cond:Array<any>;
  conductores:Array<any>;
  selectcond:Array<any>;
  pertenencias:Array<any>;
  rutas:Array<any>;
  idres:number;
  constructor(private LoginService:LoginService,private data: CentralService,private router:Router, private fb: FormBuilder,private route:ActivatedRoute, private httpService: HttpClient) {
    this.ciudades=[];
    this.fechact=new Date();
    this.stract=""+moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).format('YYYY-MM-DD');
    this.strinifin="";
    this.strini="";
    this.strfin="";
    this.dayfin=0;
    this.rutas=[];
    this.cond=[];
    this.conductores=[];
    this.selectcond=[];
    this.selectpas=[];
    this.pas=[];
    this.pertenencias=[];
    this.responsable=[];
    this.pasajeros=[];
    this.objcontratos=[];
    this.idres=-1;
    this.clientes=[];
    this.edit=false;
    this.view=false;
    this.vehiculos=[];
    this.resveh={};
    this.resvehdef={};
    this.idvehi=-1;
    var numberpattern='[0-9]+';
    console.log(this.resveh.placa);
    this.Formulario = new FormGroup({
      pl:new FormControl('',[Validators.required,Validators.minLength(6)]),
      numcont:new FormControl( '',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(numberpattern)]),
      valcont:new FormControl( '',[Validators.required,Validators.pattern(numberpattern)]),
      objc:new FormControl( null,[Validators.required]),
      cli:new FormControl( null,[Validators.required]),
      pasaj:new FormControl( null),
      ciudad:new FormControl( null,[Validators.required]),
      doc:new FormControl( '',[Validators.required]),
      nomres:new FormControl( '',[Validators.required]),
      telres:new FormControl( '',[Validators.required]),
      dirres:new FormControl( '',[Validators.required]),
      fechaini:new FormControl( '',[Validators.required]),
      fechafin:new FormControl( '',[Validators.required]),
      ruta:new FormControl( null,[Validators.required]),
      conduc:new FormControl( null),
      //perten:this.fb.array([]),
      nompert:new FormControl( ''),
      valpert:new FormControl( ''),



      /**
      selectedCO:new FormControl( ''),
      selectedCD:new FormControl( ''),
      descripcion:new FormControl( '',[Validators.required]),
      swest:new FormControl(false),
      regreso:new FormControl( false),*/

    },{
      validators:[this.checkFechahas.bind(this),this.checkValid.bind(this)]
    });

    this.obtenerPl();
    this.obtenerCiudades();
    this.obtenerClientes();
    this.obtenerPasajeros();
    this.obtenerRes();
    this.obtenerRuta();
    this.obtenerObjeto();
    this.obtenerConfig();

   }

  ngOnInit(): void {
    this.httpService.get(Constants.URL_LABELS).subscribe(
      data => {
        this.labels = data;
      }
    );
    var id=this.route.snapshot.params['id'];
    if(id.substr(0,3)==="ver"){
      var urlid=id.substr(3,id.length);
      this.Formulario.get('pl').clearValidators();
      this.Formulario.get('pl').updateValueAndValidity({emitEvent:false, onlySelf:true});
      this.data.obtenerOcasional(urlid).subscribe((res:any) => {
        console.log(res);
        this.Formulario.patchValue({
          pl:"MPP007",
          numcont:res.contrato.numeracionContrato,
          valcont:res.contrato.valorContrato,
          objc:res.contrato.objetoContrato.idObjetoContrato,
          cli:res.contrato.cliente.idCliente,
          ciudad:res.ciudadContrato.idCiudad,
          doc:res.contrato.responsableContrato.idResponsableContrato,
          nomres:res.contrato.responsableContrato.nombreResponsableContrato,
          telres:res.contrato.responsableContrato.telefonoResponsableContrato,
          dirres:res.contrato.responsableContrato.direccionResponsableContrato,
          //fechaini:res.,
          //fechafin:res.,
          //ruta:res.,
          //perten:res.,
          //nompert:res.,
          //valpert:res.,
        });
        for(var i=0;i<res.contrato.pasajeroList.length;i++){
          this.pas.push(res.contrato.pasajeroList[i].persona);
          //(<any>this.Formulario.get('pas')).controls[i].controls.pasaj.setValue(res.contrato.pasajeroList[i].idPasajero);
          //(<any>this.Formulario.get('pas')).controls[i].controls.pasaj.disable();
        }
        for(var i=0;i<res.pertenenciaPasajeroList.length;i++){
          this.pertenencias.push({nompert:res.pertenenciaPasajeroList[i].pertenenciaPasajero,valpert:res.pertenenciaPasajeroList[i].costoEstimadoPertenenciaPasajero});
        }
        console.log(res);
        this.Formulario.disable();
        this.view=true;
        this.fijar();

      });

    }

  }

  /**
   * Agregar un pasajero y vuelve el control nulo, al mismo tiempo rellena el select para mostrar la nueva lista
   */
  onagregarpas() {
    if(this.Formulario.get("pasaj")?.value!=null){

      var pos=this.pasajeros.find(element=>element.idPasajero==this.Formulario.get("pasaj")?.value);

      this.pas.push(pos);
      console.log(this.pas)
      this.Formulario.get("pasaj")?.setValue(null);
      this.selectpas=[];
      for(var i=0;i<this.pasajeros.length;i++){
        if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
          this.selectpas.push(this.pasajeros[i]);
        }

      }
    }
  }

  /**
   * Remueve el pasajero por medio de la pocision, y vuelve  a rrellenar el select
   * @param i Pocision a eliminar
   */
  removerpas(i:number) {
    console.log(i);
    this.pas.splice(i,1);
    this.selectpas=[];
      for(var i=0;i<this.pasajeros.length;i++){
        if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
          this.selectpas.push(this.pasajeros[i]);
        }

    }
    this.Formulario.get("pasaj")?.setValue(null);
  }

  /**
   * Obtiene la configuracion para luego modificar los maximos y minimos y asi  limitarlo visualmente en el HTML
   */
  obtenerConfig(){
    this.data.obtenerConfiguracion(''+1).subscribe(
      (res:any)=>{
        console.log(res);
        var dini=moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).add(res.maximoInicioContrato, 'days');
        var dfin=moment({year :this.fechact.getFullYear(), month :this.fechact.getMonth(), date :this.fechact.getDate()}).add(res.maximoDuracionContrato, 'days');
        this.fechaini=dini.toDate();
        this.fechafin=dfin.toDate();
        this.strini=""+dini.format('YYYY-MM-DD');
        this.strfin=""+dfin.format('YYYY-MM-DD');
        this.dayfin=res.maximoDuracionContrato;
        /**
        this.Formulario.patchValue({
          maxDuracion:res.maximoDuracionContrato,
          maxInicio:res.maximoInicioContrato
        });*/
      });
  }


  /**
   * agrega un conductor y vuelve a recargar el select de conductores
   */
  onagregarcond() {
    if(this.Formulario.get("conduc")?.value!=null){

      var pos=this.conductores.find(element=>element.idConductor==this.Formulario.get("conduc")?.value);

      this.cond.push(pos);
      console.log(this.cond)
      this.Formulario.get("conduc")?.setValue(null);
      this.selectcond=[];
      for(var i=0;i<this.conductores.length;i++){
        if( this.cond.findIndex(element=>element.idConductor==this.conductores[i].idConductor)==-1 ){
          this.selectcond.push(this.conductores[i]);
        }

      }
    }
  }

  /**
   * Remueve el conductor por medio de la pocision, y vuelve  a rellenar el select
   * @param i Pocision a eliminar
   */
  removercond(i:number) {
    this.cond.splice(i,1);
    this.selectcond=[];
    for(var i=0;i<this.conductores.length;i++){
      if( this.cond.findIndex(element=>element.idConductor==this.conductores[i].idConductor)==-1 ){
        this.selectcond.push(this.conductores[i]);
      }

    }
    this.Formulario.get("conduc")?.setValue(null);
  }

  /**
   * Agrega pertenencias
   */
  agregarpert(){
    if(this.Formulario.get("nompert")?.value.length>2 && this.Formulario.get('valpert')?.value!=""){
      this.pertenencias.push({nompert:this.Formulario.get("nompert")?.value,valpert:this.Formulario.get('valpert')?.value});
      this.Formulario.get("nompert")?.setValue('');
      this.Formulario.get('valpert')?.setValue('');
    }

  }

  /**
   * Remueve una pertenencia dependiendo de la pocision
   * @param i
   */
  removerpert(i:number){
    this.pertenencias.splice(i,1);
  }


  /**
   * Obtiene las ciudades
   */
  obtenerCiudades(){
    this.LoginService
      .ObtenerCiudad()
      .subscribe((ciudad:Array<Ciudad>) => {
        this.ciudades = ciudad;
      });
  }

  /**
   * Obtiene los Clientes
   */
  obtenerClientes(){
    this.data
      .obtenerBasicCli()
      .subscribe((res:Array<any>) => {
        console.log(res);
        this.clientes = res;
      });
  }

  /**
   * Obtiene y rellena el select de pasajeros
   */
  obtenerPasajeros(){
    this.data
      .obtenerBasicPas()
      .subscribe((res:Array<any>) => {
        console.log(res);
        this.pasajeros = res;
        this.selectpas=[];
        for(var i=0;i<this.pasajeros.length;i++){
          if( this.pas.findIndex(element=>element.idPasajero==this.pasajeros[i].idPasajero)==-1 ){
            this.selectpas.push(this.pasajeros[i]);
          }

        }
      });
  }

  /**
   * Obtiene los objetos del contrato
   */
  obtenerObjeto(){
    this.data
      .obtenerBasicObjeto()
      .subscribe((res:Array<any>) => {
        console.log(res);
        this.objcontratos = res;
      });
  }

  /**
   * Obtener Placas, para asi obtener su ID y la informacion principal
   */
  obtenerPl(){
    this.data
      .obtenerPlacasTurismo()
      .subscribe((res: Array<any>) => {
        console.log(res);
        this.vehiculos=res;
      });
  }

  /**
   * Obtener Responsables de Contrato
   */
  obtenerRes(){
    this.data
      .obtenerResContrato()
      .subscribe((res: Array<any>) => {
        this.responsable=res;
      });
  }


  /**
   * Obtienen las rutas
   */
  obtenerRuta(){
    this.data
      .obtenerBasicRutas()
      .subscribe((res: Array<any>) => {
        console.log(res);
        this.rutas=res;
      });
  }


  /**
   * Segun el responsable, si ya esta, lo autorrellena y vuelve los controladores deshabilitados. De lo contrario los habilita
   */
  cambioDoc(){
    console.log(this.responsable);
    var found1 = this.responsable.find(element =>element.cedulaResponsableContrato==this.Formulario.get('doc')?.value);
    if(found1!==undefined){
      this.Formulario.get('nomres')?.setValue(found1.nombreResponsableContrato);
      this.Formulario.get('telres')?.setValue(found1.telefonoResponsableContrato);
      this.Formulario.get('dirres')?.setValue(found1.direccionResponsableContrato);
      this.Formulario.get('nomres')?.disable();
      this.Formulario.get('telres')?.disable();
      this.Formulario.get('dirres')?.disable();
      this.idres=found1.idResponsableContrato;
    }else{
      this.idres=-1;
      this.Formulario.get('nomres')?.enable();
      this.Formulario.get('telres')?.enable();
      this.Formulario.get('dirres')?.enable();
    }
  }

  /**
   * Busca la placa que se introdujo y luego si la encuentra rellena y muestra los datos del vehiculo, de lo contrario, muestra un alert arrojando que no se encontro la placa.
   * Tambien se encarga de validar los espacios del vehiculo y del conductor.
   */
  fijar(){
    var found1 = this.vehiculos.find(element =>element.placaVehiculo==(this.Formulario.get('pl')?.value).toUpperCase());
    if(found1!==undefined){
      this.alertveh=false;
      this.data.obtenerVehiculo(found1.idVehiculo).then(
        (res:any)=>{
          console.log(res);
          this.resvehdef={};
          this.resveh={};
          this.resvehdef=res;
          this.conductores=res.conductorList;
          this.selectcond=[];
          for(var i=0;i<res.conductorList.length;i++){
            this.selectcond.push(res.conductorList[i]);
          }
          this.resveh={
            placa:res.placaVehiculo,
            cilindraje:res.cilindraje,
            convenio:res.convenioList.length!=0?res.convenioList[res.convenioList.length-1].empresaConvenio.nombreEmpresaConvenio:"",
            tarjop:res.tarjetaOperacionList.length!=0?res.tarjetaOperacionList[res.tarjetaOperacionList.length-1].numeroTarjetaOperacion:"",
            //Vencimiento
            fechtarjop:res.tarjetaOperacionList.length!=0?res.tarjetaOperacionList[res.tarjetaOperacionList.length-1].fechaVencimientoTarjetaOperacion:"",
            validto:res.tarjetaOperacionList.length!=0?new Date(res.tarjetaOperacionList[res.tarjetaOperacionList.length-1].fechaVencimientoTarjetaOperacion)<new Date():true,
            fechrevtec:res.revisionTecnicomecanicaList.length!=0?res.revisionTecnicomecanicaList[res.revisionTecnicomecanicaList.length-1].fechaVencimientoRevisionTecnicomecanica:"",
            validrevtec :res.revisionTecnicomecanicaList.length!=0?new Date(res.revisionTecnicomecanicaList[res.revisionTecnicomecanicaList.length-1].fechaVencimientoRevisionTecnicomecanica)<new Date():true,
            fechSOAT:res.soatList.length!=0?res.soatList[res.soatList.length-1].fechaVencimientoSoat:"",
            validSOAT :res.soatList.length!=0?new Date(res.soatList[res.soatList.length-1].fechaVencimientoSoat)<new Date():true,
            fechpolcontr:res.polizaContractualList.length!=0?res.polizaContractualList[res.polizaContractualList.length-1].fechaVencimientoPolizaContractual:"",
            validpolcontr :res.polizaContractualList.length!=0?new Date(res.polizaContractualList[res.polizaContractualList.length-1].fechaVencimientoPolizaContractual)<new Date():true,
            fechpolex:res.polizaExtracontractualList.length!=0?res.polizaExtracontractualList[res.polizaExtracontractualList.length-1].fechaVencimientoPolizaExtracontractual:"",
            validpolex :res.polizaExtracontractualList.length!=0?new Date(res.polizaExtracontractualList[res.polizaExtracontractualList.length-1].fechaVencimientoPolizaExtracontractual)<new Date():true,
            fechconv:res.convenioList.length!=0 && res.enConvenioVehiculo?res.convenioList[res.convenioList.length-1].fechaFinConvenio:"",
            validconv :res.convenioList.length!=0 && res.enConvenioVehiculo?new Date(res.convenioList[res.convenioList.length-1].fechaFinConvenio)<new Date():false,
            fechrevprev:res.revisionPreventivaList.length!=0?res.revisionPreventivaList[res.revisionPreventivaList.length-1].fechaVencimientoRevisionPreventiva:"",
            validrevprev :res.revisionPreventivaList.length!=0?new Date(res.revisionPreventivaList[res.revisionPreventivaList.length-1].fechaVencimientoRevisionPreventiva)<new Date():true,


          };
          this.fechafin=this.fechafin>new Date(this.resveh.fechtarjop) && new Date(this.resveh.fechtarjop)>new Date()?new Date(this.resveh.fechtarjop):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechrevtec) && new Date(this.resveh.fechrevtec)>new Date()?new Date(this.resveh.fechrevtec):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechSOAT) && new Date(this.resveh.fechSOAT)>new Date()?new Date(this.resveh.fechSOAT):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechpolcontr) && new Date(this.resveh.fechpolcontr)>new Date()?new Date(this.resveh.fechpolcontr):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechpolex) && new Date(this.resveh.fechpolex)>new Date()?new Date(this.resveh.fechpolex):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechconv) && new Date(this.resveh.fechconv)>new Date()?new Date(this.resveh.fechconv):this.fechafin;
          this.fechafin=this.fechafin>new Date(this.resveh.fechrevprev) && new Date(this.resveh.fechrevprev)>new Date()?new Date(this.resveh.fechrevprev):this.fechafin;
          this.resveh.cond=[];
          for(var i=0;i<res.conductorList.length;i++){
            this.resveh.cond.push({
              id:res.conductorList[i].idConductor,
              nom:(res.conductorList[i].persona.nombrePersona+" "+res.conductorList[i].persona.apellidoPersona).toUpperCase(),
              fecharl:res.conductorList[i].finArlConductor!=null?res.conductorList[i].finArlConductor:"",
              validarl :res.conductorList[i].finArlConductor!=null?new Date(res.conductorList[i].finArlConductor)<new Date():true,
              fecheps:res.conductorList[i].finEpsConductor!=null?res.conductorList[i].finEpsConductor:"",
              valideps :res.conductorList[i].finEpsConductor!=null?new Date(res.conductorList[i].finEpsConductor)<new Date():true,
            })

            this.fechafin=this.fechafin>new Date(res.conductorList[i].finEpsConductor) && new Date(res.conductorList[i].finEpsConductor)>new Date()?new Date(res.conductorList[i].finEpsConductor):this.fechafin;
            this.fechafin=this.fechafin>new Date(res.conductorList[i].finArlConductor) && new Date(res.conductorList[i].finArlConductor)>new Date()?new Date(res.conductorList[i].finArlConductor):this.fechafin;
          }
          this.strfin=moment({year :this.fechafin.getFullYear(), month :this.fechafin.getMonth(), date :this.fechafin.getDate()}).format('YYYY-MM-DD');
          this.strini=this.strfin;
          console.log(this.resveh);
        }
      )
    }else{
      this.alertveh=true;
    }
    console.log(found1);

  }

  /**
   * Vuelve el control Mayusculas
   * @param nom Nombre del control
   */
  mayus(nom:string):void{
    this.Formulario.get(nom)?.setValue((this.Formulario.get(nom)?.value).toUpperCase());
  }

  /**
   * Guarda el Contrato ocasional, revisando primero si el Formulario es Valido, d elo contrario, no  lo permite crear
   */
  guardar(){
    this.Formulario.markAllAsTouched();
    if(!this.Formulario.valid ){
      console.log("Campos Pendientes");
      console.log(this.Formulario);
    }else{
      var JSON:any={};
      JSON.responsableContrato={};
      if(this.idres!=-1){
        JSON.responsableContrato.idResponsableContrato=this.idres;
      }else{
        JSON.responsableContrato.nombreResponsableContrato=this.Formulario.get('doc')?.value;
        JSON.responsableContrato.cedulaResponsableContrato=this.Formulario.get('nomres')?.value;
        JSON.responsableContrato.telefonoResponsableContrato=this.Formulario.get('telres')?.value;
        JSON.responsableContrato.direccionResponsableContrato=this.Formulario.get('dirres')?.value;
      }
      JSON.contrato={};
      JSON.contrato.numeracionContrato=""+this.Formulario.get("numcont")?.value;
      JSON.contrato.estadoContrato=1;
      JSON.contrato.valorContrato=this.Formulario.get("valcont")?.value;
      JSON.contrato.objetoContrato={};
      JSON.contrato.objetoContrato.idObjetoContrato=this.Formulario.get("objc")?.value;
      JSON.contrato.cliente={};
      JSON.contrato.cliente.idCliente=this.Formulario.get("cli")?.value;
      JSON.contrato.pasajeroList=[];
      for(var a=0;a<this.pas.length;a++){
        JSON.contrato.pasajeroList.push({idPasajero:this.pas[a].idPasajero});
      }
      JSON.contratoOcasional={};
      JSON.contratoOcasional.ciudadContrato={};
      JSON.contratoOcasional.ciudadContrato.idCiudad=this.Formulario.get("ciudad")?.value;
      JSON.fuec={};
      JSON.fuec.fechaInicioFuec=this.Formulario.get("fechaini")?.value;
      JSON.fuec.fechaFinFuec=this.Formulario.get("fechafin")?.value;
      JSON.fuec.ruta={};
      JSON.fuec.ruta.idRuta=this.Formulario.get("ruta")?.value;
      JSON.fuec.vehiculo={};
      JSON.fuec.vehiculo.idVehiculo=this.resvehdef.idVehiculo;
      JSON.fuec.conductorList=[];
      JSON.fuec.pasajeroList=[];
      for(var a=0;a<this.pas.length;a++){
        JSON.fuec.pasajeroList.push({idPasajero:this.pas[a].idPasajero});
      }
      for(var a=0;a<this.cond.length;a++){
        JSON.fuec.conductorList.push({idConductor:this.cond[a].idConductor});
      }
      JSON.pertenenciasPasajero=[];
      for(var a=0;a<this.pertenencias.length;a++){
        JSON.pertenenciasPasajero.push({//{nompert:this.Formulario.get("nompert")?.value,valpert:this.Formulario.get('valpert')?.value}
          costoEstimadoPertenenciaPasajero:this.pertenencias[a].valpert,
          pertenenciaPasajero:this.pertenencias[a].nompert
        });
      }
      console.log(JSON);
      this.data.crearContratoOcas(JSON).subscribe((res:any)=>{
        if(res.mensaje==1){
          this.ocultar=true;
          this.msm+=" "+"CREADO SATISFACTORIAMENTE";
        }else{
          this.ocultar=false;
          this.msm+=res.mensaje;
        }
      });
    }

  }

  /**
   * Checkea las fechas para validar que no se pase de los limites de configuracion ni de inicio
   * @param group
   * @returns
   */
  checkFechahas: ValidationErrors = (group: FormGroup): ValidationErrors | null=> { // here we have the 'passwords' group
    var hasta = group.controls.fechafin.value;
    var desde =  group.controls.fechaini.value;
    var res=true;
    var fecdes=new Date(group.controls.fechaini.value+" 23:59:59");
    var fechast=new Date(group.controls.fechafin.value+" 23:59:59");
    //console.log(fecdes);
    this.strinifin=""+moment({year :fecdes.getFullYear(), month :fecdes.getMonth(), date :fecdes.getDate()}).format('YYYY-MM-DD');
    var dfin=moment({year :fecdes.getFullYear(), month :fecdes.getMonth(), date :fecdes.getDate()}).add(this.dayfin, 'days');
    this.strfin=fechast>=dfin.toDate()?""+dfin.format('YYYY-MM-DD'):this.strfin;

    if(new Date(desde)>new Date(hasta) || new Date(hasta)>new Date(this.strfin)){
      group.controls['fechafin'].setErrors({checkfech:true});
    }else{
      group.controls['fechafin'].setValidators([Validators.required]);
      group.controls['fechafin'].updateValueAndValidity({emitEvent:false, onlySelf:true});
    }

    if(new Date()>=new Date(fecdes)){
      group.controls['fechaini'].setErrors({checkfech:true});
    }

    return null
  }

  /**
   * Checkea que sea una placa contenida dentro de la lista de placas
   * @param group recibe el FormGroup
   * @returns retorna si es valida la placa, y muetra un alert
   */
  checkPL: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{

    var CO=group.controls.pl.value;
    var verf=this.vehiculos.findIndex(element =>element.placaVehiculo==(CO).toUpperCase());
    if(verf!=-1){
      return null;
    }else{
      return {validpl:true};
    }
  }

  /**
   * Checkea la validez de los valid, para luego sino alertar al usuario de que no cumple los requeriminetos para generar un contrato ocasional.
   * @param group Recibe el FormGroup
   * @returns retorna si encuentra algun error dentro del vehiculo o conductores.
   */
  checkValid: ValidationErrors = (group: FormGroup): ValidationErrors | null=>{
    var mn:any={};
    if(this.resveh.validto || this.resveh.validto
      || this.resveh.validrevtec
      || this.resveh.validSOAT
      || this.resveh.validpolcontr
      || this.resveh.validpolex
      || this.resveh.validconv
      || this.resveh.validrevprev){
        mn.validveh=true;
    }
    if(this.cond.length==0){
      mn.validltcond=true;
    }else{
      for(var x=0;x<this.cond.length;x++){
        console.log(this.cond);
        console.log(this.resveh.cond);
        var ent= this.resveh.cond.find(element=>element.id==this.cond[x].idConductor);
        console.log(ent);
        console.log(ent.validarl);
        console.log(ent.valideps);
        if(ent.validarl){
          mn.validcond=true;
        }
        if(ent.valideps){
          mn.validcond=true;
        }
      }

    }
    if(this.pas.length==0){
      mn.validltpas=true;
    }
    if(mn.validcond || mn.validveh || mn.validltcond || mn.validltpas){
      return mn;
    }else{
      return null;
    }
  }
}
