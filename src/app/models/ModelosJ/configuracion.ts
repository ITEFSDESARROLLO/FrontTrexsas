
import { Correo } from './correo';

export interface Configuracion {
    idConfiguraciones: number,
    maximoDuracionContrato: number,
    maximoInicioContrato: number,
    correoList:Array<Correo>
}
