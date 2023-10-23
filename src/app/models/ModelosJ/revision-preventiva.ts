import { Vehiculo } from './vehiculo';

export interface RevisionPreventiva {
    idRevisionPreventiva?:number,
    fechaVencimientoRevisionPreventiva?:string
    fechaInicioRevisionPreventiva?:string,
    revisionPreventiva?:string,
    vehiculo?:Vehiculo
}
