import { Cliente } from './cliente';
import { Persona } from './persona';

export interface Pasajero { 
    idPasajero?: number,
    estadoPasajero?: number,
    nitCliente?: string, 
    fechaRegistroPasajero?: string,
    fechaActualizacionPasajero?: string,
    registradoPorPasajero?: Persona,
    actualizadoPorPasajero?: Persona,
    persona?: Persona,
    cliente?: Cliente
}
