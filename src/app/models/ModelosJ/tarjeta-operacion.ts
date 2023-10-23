import { Vehiculo } from './vehiculo';

export interface TarjetaOperacion {
    idTarjetaOperacion?:number,
    numeroTarjetaOperacion?:number,
    fechaVencimientoTarjetaOperacion?:string,
    fechaExpedicionTarjetaOperacion?:string,
    dosTarjetaOperacion?:string,
    unoTarjetaOperacion?:string,
    vehiculo?:Vehiculo
}
