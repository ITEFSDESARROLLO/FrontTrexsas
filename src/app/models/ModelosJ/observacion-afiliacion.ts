import { Persona } from './persona';
import { AfiliacionVehiculoInterface } from './afiliacion-vehiculo-interface';

export interface ObservacionAfiliacion {
    idObservacionAfiliacion: number,
    observacionAfiliacion: string,
    fechaRegistroObservacion: string,
    registradoPorObservacion: Persona,
    afiliacion: AfiliacionVehiculoInterface
}
