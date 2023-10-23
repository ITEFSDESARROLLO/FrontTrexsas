import { Cuenta } from './cuenta';
import { Persona } from './persona';
import { UriXPerfil } from './uri-x-perfil';

export interface Perfil { 
    idPerfil?:number,
    observacionesPerfil?:string,
    nombrePerfil?:string,
    estadoPerfil?:number,
    fechaRegistroPerfil?:string,
    fechaActualizacionPerfil?:string,
    registradoPorPerfil?:Persona,
    actualizadoPorPerfil?:Persona,
    cuentaList?:Array<Cuenta>,
    uriXPerfilList?:Array<UriXPerfil>
}
