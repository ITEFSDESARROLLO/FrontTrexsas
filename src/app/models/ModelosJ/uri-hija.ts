
import { UriPadre } from './uri-padre';

export interface UriHija {
    idUriHija: number,
    uriHija: string,
    descripcionUriHija: string,
    uriPadre?:UriPadre
}
