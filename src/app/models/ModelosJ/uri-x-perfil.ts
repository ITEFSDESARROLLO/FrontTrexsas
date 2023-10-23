
import { UriHija } from './uri-hija';
import { Perfil } from './perfil';

export interface UriXPerfil {
    idUriXPerfil: number,
    accesoUriXPerfil: number,
    uriHija: UriHija,
    perfil?:Perfil
}
