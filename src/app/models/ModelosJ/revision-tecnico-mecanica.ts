import { Vehiculo } from './vehiculo';

export interface RevisionTecnicoMecanica {
    idRevisionTecnicomecanica?:number,
    fechaRevisionTecnicomecanica?:string,
    fechaVencimientoRevisionTecnicomecanica?:string,
    revisionTecnicomecanica?:string,
    vehiculo?:Vehiculo
}
