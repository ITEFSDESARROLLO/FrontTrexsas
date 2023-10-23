import { Ciudad } from './ciudad';
import { Persona } from './persona';

export interface Ruta { 
    idRuta?:number,
    regresoRuta?:number,
    descripcionRecorridoRuta?:string,
    estadoRuta?:number,
    fechaRegistroRuta?:string,
    fechaActualizacionRuta?:string,
    registradoPorRuta?:Persona,
    actualizadoPorRuta?:Persona,
    ciudadOrigen?:Ciudad,
    ciudadDestino?:Ciudad,
    codigoRuta?:number
}
