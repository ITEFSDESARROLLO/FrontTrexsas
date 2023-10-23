import { Conductor } from './conductor';

export interface Licencia {
    idLicencia: number,
    fechaExpedicionLicencia: string,
    fechaVencimientoLicencia: string,
    numeroLicencia: string,
    categoriaLicencia: string,
    documentoUnoLicencia: string,
    documentoDosLicencia: string,
    conductor: Conductor
}
