import { Aseguradora } from './aseguradora';
import { Vehiculo } from './vehiculo';
export interface Soat {
    idSoat?:number,
    fechaInicioSoat?:string,
    fechaVencimientoSoat?:string,
    numeroSoat?:number,
    soat?:string,
    aseguradora?:Aseguradora,
    vehiculo?:Vehiculo
}
