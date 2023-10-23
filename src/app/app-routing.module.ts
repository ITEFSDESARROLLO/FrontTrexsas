import { InformacionFuecQRComponent } from './components/informacion-fuec-qr/informacion-fuec-qr.component';
import { CalificacionesConductoresComponent } from './components/central/calificaciones-conductores/calificaciones-conductores.component';
import { OrdenesConductorComponent } from './components/central/ordenes-conductor/ordenes-conductor.component';
import { ConfiguracionesEncuestaComponent } from './components/central/configuraciones-encuesta/configuraciones-encuesta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ConfiguracionPQRComponent } from './components/central/configuracion-pqr/configuracion-pqr.component';
import { AcceSSOrdenServicioGuard } from './guards/acce-ssorden-servicio.guard';
import { PQRListComponent } from './components/central/pqrlist/pqrlist.component';
import { CapacitacionesListComponent } from './components/central/capacitaciones-list/capacitaciones-list.component';
import { NotificacionesListComponent } from './components/central/notificaciones-list/notificaciones-list.component';
import { EncuestasListComponent } from './components/central/encuestas-list/encuestas-list.component';
import { StatusafiliacionComponent } from './components/statusafiliacion/statusafiliacion.component';
import { OcasionalgComponent } from './components/central/contratos/ocasionalg/ocasionalg.component';

import { HomeComponent } from './components/central/home/home.component';
import { PasajeroComponent } from './components/central/pasajero/pasajero.component';
import { ClienteComponent } from './components/central/cliente/cliente.component';
import { AccesochildGuard } from './guards/accesochild.guard';
import { PerfilComponent } from './components/central/perfil/perfil.component';
import { UsuarioComponent } from './components/central/usuario/usuario.component';
import { RutaComponent } from './components/central/ruta/ruta.component';
import { ConductorComponent } from './components/central/conductor/conductor.component';
import { PropietarioComponent } from './components/central/propietario/propietario.component';
import { VehiculoComponent } from './components/central/vehiculo/vehiculo.component';
import { VehiculolistComponent } from './components/central/vehiculolist/vehiculolist.component';
import { PropietariolistComponent } from './components/central/propietariolist/propietariolist.component';
import { ConductorlistComponent } from './components/central/conductorlist/conductorlist.component';
import { UltimoingresolistComponent } from './components/central/ultimoingresolist/ultimoingresolist.component';
import { TipocombustiblelistComponent } from './components/central/tipocombustiblelist/tipocombustiblelist.component';
import { TipocombustibleComponent } from './components/central/tipocombustible/tipocombustible.component';
import { TipovehiculolistComponent } from './components/central/tipovehiculolist/tipovehiculolist.component';
import { TipovehiculoComponent } from './components/central/tipovehiculo/tipovehiculo.component';
import { MarcalistComponent } from './components/central/marcalist/marcalist.component';
import { MarcaComponent } from './components/central/marca/marca.component';
import { ClaselistComponent } from './components/central/claselist/claselist.component';
import { ClaseComponent } from './components/central/clase/clase.component';
import { CajacompensacionlistComponent } from './components/central/cajacompensacionlist/cajacompensacionlist.component';
import { CajacompensacionComponent } from './components/central/cajacompensacion/cajacompensacion.component';
import { FondopensioneslistComponent } from './components/central/fondopensioneslist/fondopensioneslist.component';
import { FondopensionesComponent } from './components/central/fondopensiones/fondopensiones.component';
import { EpslistComponent } from './components/central/epslist/epslist.component';
import { EpsComponent } from './components/central/eps/eps.component';
import { ArllistComponent } from './components/central/arllist/arllist.component';
import { ArlComponent } from './components/central/arl/arl.component';
import { AseguradoralistComponent } from './components/central/aseguradoralist/aseguradoralist.component';
import { AseguradoraComponent } from './components/central/aseguradora/aseguradora.component';
import { EmpresaconveniolistComponent } from './components/central/empresaconveniolist/empresaconveniolist.component';
import { EmpresaconvenioComponent } from './components/central/empresaconvenio/empresaconvenio.component';
import { ObjetocontratolistComponent } from './components/central/objetocontratolist/objetocontratolist.component';
import { ObjetocontratoComponent } from './components/central/objetocontrato/objetocontrato.component';
import { UltimoingresoComponent } from './components/central/ultimoingreso/ultimoingreso.component';
import { ConfiguracionComponent } from './components/central/configuracion/configuracion.component';
import { ClientelistComponent } from './components/central/clientelist/clientelist.component';
import { PasajerolistComponent } from './components/central/pasajerolist/pasajerolist.component';
import { UsuariolistComponent } from './components/central/usuariolist/usuariolist.component';
import { RutalistComponent } from './components/central/rutalist/rutalist.component';
import { PerfillistComponent } from './components/central/perfillist/perfillist.component';
import { AfiliacionlistComponent } from './components/central/afiliacionlist/afiliacionlist.component';
import { FueclistComponent } from './components/central/fueclist/fueclist.component';
import { AfiliacionComponent } from './components/afiliacion/afiliacion.component';
import { PassrecupComponent } from './components/passrecup/passrecup.component';
import { AccesocentralGuard } from './guards/accesocentral.guard';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { PlantillaComponent } from './components/central/plantilla/plantilla.component';
import { OcasionallistComponent } from './components/central/contratos/ocasionallist/ocasionallist.component';
import { PermanentelistComponent } from './components/central/contratos/permanentelist/permanentelist.component';
import { PermanenteComponent } from './components/central/contratos/permanente/permanente.component';
import { EncuestasComponent } from './components/central/encuestas/encuestas.component';
import { NotificacionesComponent } from './components/central/notificaciones/notificaciones.component';
import { CapacitacionesComponent } from './components/central/capacitaciones/capacitaciones.component';
import { PQRComponent } from './components/central/pqr/pqr.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { FuecsaludComponent } from './components/central/fuecsalud/fuecsalud.component';

import { OrdenservicioComponent } from './components/central/ordenservicio/ordenservicio.component';
import { OrdenserviciolistComponent } from './components/central/ordenserviciolist/ordenserviciolist.component';
import { FacturaComponent } from './components/central/factura/factura.component';
import { FacturalistComponent } from './components/central/facturalist/facturalist.component';
import { CuentacobroComponent } from './components/central/cuentacobro/cuentacobro.component';
import { CuentacobrolistComponent } from './components/central/cuentacobrolist/cuentacobrolist.component';
import { AccesopasajeroGuard } from './guards/accesopasajero.guard';
import { AccesoparametrizacionGuard } from './guards/accesoparametrizacion.guard';
import { ReservalistComponent } from './components/central/reservalist/reservalist.component';
import { ReservaComponent } from './components/central/reserva/servicio.component';
import { ReservasPasajeroComponent } from './components/central/reservas-pasajero/servicios-pasajero.component';


const routes: Routes = [
  {path: "",component: LoginComponent},
  {path:"encuesta",component:EncuestaComponent},
  {path:"fuecInfo/:qr",component:InformacionFuecQRComponent},
  {path: "recoverypass",component: PassrecupComponent},
  {path: "changepass/:id",component: ChangepassComponent},
  {path: "vinculacion",component: AfiliacionComponent},
  {path: "vinculacion/estado/:id",component: StatusafiliacionComponent},
  {path: "central", component: PlantillaComponent,canActivate:[AccesocentralGuard],
    children:[
      {
        path:"",
        children:[
          {path: "",component: HomeComponent},
          {path: "vinculaciones",component: AfiliacionlistComponent,canActivate:[AccesochildGuard]},
          {path: "vinculaciones/:id",component: AfiliacionComponent,canActivate:[AccesochildGuard]},
          {path: "vehiculos",component: VehiculolistComponent,canActivate:[AccesochildGuard]},
          {path: "vehiculos/:id",component: VehiculoComponent,canActivate:[AccesochildGuard]},
          {path: "propietarios",component: PropietariolistComponent,canActivate:[AccesochildGuard]},
          {path: "propietarios/:id",component: PropietarioComponent,canActivate:[AccesochildGuard]},
          {path: "conductores",component: ConductorlistComponent,canActivate:[AccesochildGuard]},
          {path: "conductores/:id",component: ConductorComponent,canActivate:[AccesochildGuard]},
          {path: "usuarios",component: UsuariolistComponent,canActivate:[AccesochildGuard]},
          {path: "usuarios/:id",component: UsuarioComponent,canActivate:[AccesochildGuard]},
          {path: "perfiles",component: PerfillistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "perfiles/:id",component: PerfilComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "clientes",component: ClientelistComponent,canActivate:[AccesochildGuard]},
          {path: "clientes/:id",component: ClienteComponent,canActivate:[AccesochildGuard]},
          {path: "pasajeros/:id",component: PasajerolistComponent,canActivate:[AccesopasajeroGuard]},
          {path: "pasajero/:id",component: PasajeroComponent,canActivate:[AccesopasajeroGuard]},
          {path: "ultimosingresos",component: UltimoingresolistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "ultimosingresos/:id",component: UltimoingresoComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "configuraciones",component: ConfiguracionComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "configuracionesPQR",component: ConfiguracionPQRComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "configuracionesEncuesta",component: ConfiguracionesEncuestaComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "tiposcombustible",component: TipocombustiblelistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "tiposcombustible/:id",component: TipocombustibleComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "tiposvehiculo",component: TipovehiculolistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "tiposvehiculo/:id",component: TipovehiculoComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "marcas",component: MarcalistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "marcas/:id",component: MarcaComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "clases",component: ClaselistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "clases/:id",component: ClaseComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "aseguradoras",component: AseguradoralistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "aseguradoras/:id",component: AseguradoraComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "empresasconvenio",component: EmpresaconveniolistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "empresasconvenio/:id",component: EmpresaconvenioComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "cajascompensacion",component: CajacompensacionlistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "cajascompensacion/:id",component: CajacompensacionComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "fondospensiones",component: FondopensioneslistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "fondospensiones/:id",component: FondopensionesComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "epss",component: EpslistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "epss/:id",component: EpsComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "arls",component: ArllistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "arls/:id",component: ArlComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "objetoscontrato",component: ObjetocontratolistComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "objetoscontrato/:id",component: ObjetocontratoComponent,canActivate:[AccesoparametrizacionGuard]},
          {path: "fuecs",component: FueclistComponent,canActivate:[AccesochildGuard]},
          {path: "fuecs/:id",component: FuecsaludComponent,canActivate:[AccesochildGuard]},
          {path: "contratos",component: PermanentelistComponent,canActivate:[AccesochildGuard]},
          {path: "contratos/:id",component: PermanenteComponent,canActivate:[AccesochildGuard]},
          {path: "reservas",component: ReservalistComponent,canActivate:[AccesochildGuard]},
          {path: "reservas/:id",component: ReservaComponent,canActivate:[AccesochildGuard]},
          {path: "ordenesservicio",component: OrdenserviciolistComponent,canActivate:[AccesochildGuard]},
          {path: "ordenesservicio/:id",component: OrdenservicioComponent,canActivate:[AcceSSOrdenServicioGuard]},
          {path: "facturas",component: FacturalistComponent,canActivate:[AccesochildGuard]},
          {path: "facturas/:id",component: FacturaComponent,canActivate:[AccesochildGuard]},
          {path: "cuentascobro",component: CuentacobrolistComponent,canActivate:[AccesochildGuard]},
          {path: "cuentascobro/:id",component: CuentacobroComponent,canActivate:[AccesochildGuard]},
          {path:"encuestas",component:EncuestasListComponent,canActivate:[AccesocentralGuard]},
          {path:"encuestas/:id",component:EncuestasComponent,canActivate:[AccesocentralGuard]},
          {path:"notificaciones",component:NotificacionesListComponent,canActivate:[AccesocentralGuard]},
          {path:"notificaciones/:id",component:NotificacionesComponent,canActivate:[AccesocentralGuard]},
          {path:"capacitaciones",component:CapacitacionesListComponent,canActivate:[AccesocentralGuard]},
          {path:"capacitaciones/:id",component:CapacitacionesComponent,canActivate:[AccesocentralGuard]},
          {path:"pqr",component:PQRListComponent,canActivate:[AccesocentralGuard]},
          {path:"pqr/:id",component:PQRComponent,canActivate:[AccesocentralGuard]},
          {path:"ordenesConductor",component:OrdenesConductorComponent,canActivate:[AccesocentralGuard]},
          {path:"calificacionesConductores",component:CalificacionesConductoresComponent,canActivate:[AccesocentralGuard]},
          {path:"reservasPasajeros",component:ReservasPasajeroComponent,canActivate:[AccesocentralGuard]},
          {path: "**",component: Pagina404Component}
        ]
      }
    ]
  },
  {path: "**",component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
