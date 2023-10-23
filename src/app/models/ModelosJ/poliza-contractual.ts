import { Aseguradora } from './aseguradora';
import { Vehiculo } from './vehiculo';
export interface PolizaContractual {
    idPolizaContractual?:number,
    fechaInicioPolizaContractual?:string,
    fechaVencimientoPolizaContractual?:string,
    numeroPolizaContractual?:number,
    polizaContractual?:string,
    aseguradora?:Aseguradora,
    vehiculo?:Vehiculo
}
