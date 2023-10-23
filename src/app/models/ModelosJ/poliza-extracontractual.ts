import { Aseguradora } from './aseguradora';
import { Vehiculo } from './vehiculo';
export interface PolizaExtracontractual {
    idPolizaExtracontractual?:number,
    fechaInicioPolizaExtracontractual?:string,
    fechaVencimientoPolizaExtracontractual?:string,
    numeroPolizaExtracontractual?:number,
    polizaExtracontractual?:string,
    aseguradora?:Aseguradora,
    vehiculo?:Vehiculo
}
