import { Persona } from './persona';

export interface Propietario {
    idPropietario?: number,
    estadoPropietario?: number, 
    fechaRegistroPropietario?: string,
    fechaActualizacionPropietario?: string,
    registradoPorPropietario?: Persona,
    actualizadoPorPropietario?: Persona,
    persona?: Persona

}
