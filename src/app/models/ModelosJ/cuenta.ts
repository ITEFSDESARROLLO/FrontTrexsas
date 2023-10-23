import { Persona } from './persona';
import { Cliente } from './cliente';

export interface Cuenta { 
    idCuenta?:number,
    usuarioCuenta?:String,
    estadoCuenta?:number,
    fechaRegistroCuenta?:string,
    fechaActualizacionCuenta?:string,
    registradoPorCuenta?:Persona,
    actualizadoPorCuenta?:Persona,
    claveCuenta?:string,
    persona?:Persona,
    cliente?:Cliente
}
