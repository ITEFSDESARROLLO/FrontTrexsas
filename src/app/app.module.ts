import { ChartModule } from 'primeng/chart';
import { ConfiguracionesEncuestaComponent } from './components/central/configuraciones-encuesta/configuraciones-encuesta.component';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
//
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID,NgModule } from '@angular/core';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { PassrecupComponent } from './components/passrecup/passrecup.component';
import { PlantillaComponent } from './components/central/plantilla/plantilla.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { AfiliacionComponent } from './components/afiliacion/afiliacion.component';
import { AfiliacionlistComponent } from './components/central/afiliacionlist/afiliacionlist.component';
import { VehiculoComponent } from './components/central/vehiculo/vehiculo.component';
import { VehiculolistComponent } from './components/central/vehiculolist/vehiculolist.component';
import { PropietarioComponent } from './components/central/propietario/propietario.component';
import { PropietariolistComponent } from './components/central/propietariolist/propietariolist.component';
import { ConductorlistComponent } from './components/central/conductorlist/conductorlist.component';
import { UsuariolistComponent } from './components/central/usuariolist/usuariolist.component';
import { RutalistComponent } from './components/central/rutalist/rutalist.component';
import { PerfillistComponent } from './components/central/perfillist/perfillist.component';
import { ConductorComponent } from './components/central/conductor/conductor.component';
import { RutaComponent } from './components/central/ruta/ruta.component';
import { UsuarioComponent } from './components/central/usuario/usuario.component';
import { PerfilComponent } from './components/central/perfil/perfil.component';
import { PasajerolistComponent } from './components/central/pasajerolist/pasajerolist.component';
import { ClientelistComponent } from './components/central/clientelist/clientelist.component';
import { UltimoingresolistComponent } from './components/central/ultimoingresolist/ultimoingresolist.component';
import { UltimoingresoComponent } from './components/central/ultimoingreso/ultimoingreso.component';
import { ConfiguracionComponent } from './components/central/configuracion/configuracion.component';
import { TipocombustiblelistComponent } from './components/central/tipocombustiblelist/tipocombustiblelist.component';
import { TipovehiculolistComponent } from './components/central/tipovehiculolist/tipovehiculolist.component';
import { MarcalistComponent } from './components/central/marcalist/marcalist.component';
import { ClaselistComponent } from './components/central/claselist/claselist.component';
import { AseguradoralistComponent } from './components/central/aseguradoralist/aseguradoralist.component';
import { EmpresaconveniolistComponent } from './components/central/empresaconveniolist/empresaconveniolist.component';
import { FondopensioneslistComponent } from './components/central/fondopensioneslist/fondopensioneslist.component';
import { CajacompensacionlistComponent } from './components/central/cajacompensacionlist/cajacompensacionlist.component';
import { ArllistComponent } from './components/central/arllist/arllist.component';
import { EpslistComponent } from './components/central/epslist/epslist.component';
import { ObjetocontratolistComponent } from './components/central/objetocontratolist/objetocontratolist.component';
import { ObjetocontratoComponent } from './components/central/objetocontrato/objetocontrato.component';
import { ArlComponent } from './components/central/arl/arl.component';
import { EpsComponent } from './components/central/eps/eps.component';
import { FondopensionesComponent } from './components/central/fondopensiones/fondopensiones.component';
import { CajacompensacionComponent } from './components/central/cajacompensacion/cajacompensacion.component';
import { EmpresaconvenioComponent } from './components/central/empresaconvenio/empresaconvenio.component';
import { AseguradoraComponent } from './components/central/aseguradora/aseguradora.component';
import { ClaseComponent } from './components/central/clase/clase.component';
import { MarcaComponent } from './components/central/marca/marca.component';
import { TipovehiculoComponent } from './components/central/tipovehiculo/tipovehiculo.component';
import { TipocombustibleComponent } from './components/central/tipocombustible/tipocombustible.component';
import { ClienteComponent } from './components/central/cliente/cliente.component';
import { PasajeroComponent } from './components/central/pasajero/pasajero.component';
import {PermanenteComponent} from './components/central/contratos/permanente/permanente.component';
import {OcasionalComponent} from './components/contratos/ocasional/ocasional.component';
import {ButtonComponent} from './components/commons/button/button.component';
import { HomeComponent } from './components/central/home/home.component';
import { PermanentelistComponent } from './components/central/contratos/permanentelist/permanentelist.component';
import { OcasionallistComponent } from './components/central/contratos/ocasionallist/ocasionallist.component';
import { OcasionalgComponent } from './components/central/contratos/ocasionalg/ocasionalg.component';
import { NavbarComponent } from './components/central/plantilla/navbar/navbar.component';
import { SidebarComponent } from './components/central/plantilla/sidebar/sidebar.component';
import { FooterComponent } from './components/central/plantilla/footer/footer.component';
import { StatusafiliacionComponent } from './components/statusafiliacion/statusafiliacion.component';
import { FueclistComponent } from './components/central/fueclist/fueclist.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FuecsaludComponent } from './components/central/fuecsalud/fuecsalud.component';

import { OrdenservicioComponent } from './components/central/ordenservicio/ordenservicio.component';
import { OrdenserviciolistComponent } from './components/central/ordenserviciolist/ordenserviciolist.component';
import { FacturaComponent } from './components/central/factura/factura.component';
import { FacturalistComponent } from './components/central/facturalist/facturalist.component';
import { CuentacobroComponent } from './components/central/cuentacobro/cuentacobro.component';
import { CuentacobrolistComponent } from './components/central/cuentacobrolist/cuentacobrolist.component';
//import { GoogleMapsModule } from '@angular/google-maps';


import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { EncuestasComponent } from './components/central/encuestas/encuestas.component';
import { CapacitacionesComponent } from './components/central/capacitaciones/capacitaciones.component';
import { NotificacionesComponent } from './components/central/notificaciones/notificaciones.component';
import { PQRComponent } from './components/central/pqr/pqr.component';
import { EncuestasListComponent } from './components/central/encuestas-list/encuestas-list.component';
import { NotificacionesListComponent } from './components/central/notificaciones-list/notificaciones-list.component';
import { CapacitacionesListComponent } from './components/central/capacitaciones-list/capacitaciones-list.component';
import { PQRListComponent } from './components/central/pqrlist/pqrlist.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfiguracionPQRComponent } from './components/central/configuracion-pqr/configuracion-pqr.component';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { OrdenesConductorComponent } from './components/central/ordenes-conductor/ordenes-conductor.component';
import { CalificacionesConductoresComponent } from './components/central/calificaciones-conductores/calificaciones-conductores.component'
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {ProgressBarModule} from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import {ToastModule} from 'primeng/toast';
import { ReservalistComponent } from './components/central/reservalist/reservalist.component';
import { ReservaComponent } from './components/central/reserva/servicio.component';
import { ReservasPasajeroComponent } from './components/central/reservas-pasajero/servicios-pasajero.component';
import {FileUploadModule} from 'primeng/fileupload';
import {BadgeModule} from 'primeng/badge';
import {Dialog, DialogModule} from 'primeng/dialog';
import { InformacionFuecQRComponent } from './components/informacion-fuec-qr/informacion-fuec-qr.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PanelMenuModule} from 'primeng/panelmenu';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangepassComponent,
    PassrecupComponent,
    PlantillaComponent,
    Pagina404Component,
    AfiliacionComponent,
    AfiliacionlistComponent,
    VehiculoComponent,
    VehiculolistComponent,
    PropietarioComponent,
    PropietariolistComponent,
    ConductorlistComponent,
    UsuariolistComponent,
    RutalistComponent,
    PerfillistComponent,
    ConductorComponent,
    RutaComponent,
    UsuarioComponent,
    PerfilComponent,
    PasajerolistComponent,
    ClientelistComponent,
    UltimoingresolistComponent,
    UltimoingresoComponent,
    ConfiguracionComponent,
    TipocombustiblelistComponent,
    TipovehiculolistComponent,
    MarcalistComponent,
    ClaselistComponent,
    AseguradoralistComponent,
    EmpresaconveniolistComponent,
    FondopensioneslistComponent,
    CajacompensacionlistComponent,
    ArllistComponent,
    EpslistComponent,
    ObjetocontratolistComponent,
    ObjetocontratoComponent,
    ArlComponent,
    EpsComponent,
    FondopensionesComponent,
    CajacompensacionComponent,
    EmpresaconvenioComponent,
    AseguradoraComponent,
    ClaseComponent,
    MarcaComponent,
    TipovehiculoComponent,
    TipocombustibleComponent,
    ClienteComponent,
    PasajeroComponent,
    OcasionalComponent,
    PermanenteComponent,
    ButtonComponent,
    HomeComponent,
    PermanentelistComponent,
    OcasionallistComponent,
    OcasionalgComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    StatusafiliacionComponent,
    FueclistComponent,
    FuecsaludComponent,
    ReservalistComponent,
    ReservaComponent,
    OrdenservicioComponent,
    OrdenserviciolistComponent,
    FacturaComponent,
    FacturalistComponent,
    CuentacobroComponent,
    CuentacobrolistComponent,
    EncuestasComponent,
    CapacitacionesComponent,
    NotificacionesComponent,
    PQRComponent,
    EncuestasListComponent,
    NotificacionesListComponent,
    CapacitacionesListComponent,
    PQRListComponent,
    ConfiguracionPQRComponent,
    EncuestaComponent,
    OrdenesConductorComponent,
    CalificacionesConductoresComponent,
    ReservasPasajeroComponent, ConfiguracionesEncuestaComponent, InformacionFuecQRComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxrsjnbsXfLMXjwGz6q5xqtkNRTJ7PWXA',
      libraries: ['places','geometry']
    }),
    AgmDirectionModule,
    ClipboardModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule, MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    NgxCaptchaModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    AutoCompleteModule,
    MatMenuModule,
    InputTextareaModule,
    TableModule,
    ScrollPanelModule,
    DropdownModule,
    PasswordModule,
    ProgressBarModule,
    TagModule,
    ToastModule,
    FileUploadModule,
    BadgeModule,
    DialogModule,
    SplitButtonModule,
    PanelMenuModule,
    GoogleChartsModule,
    NgChartsModule
  ],exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ScrollPanelModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true },CookieService ,{ provide: LOCALE_ID, useValue: "es" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
