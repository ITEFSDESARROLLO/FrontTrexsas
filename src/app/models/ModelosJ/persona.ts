import { Idioma } from './idioma';
import { Ciudad } from './ciudad';

export interface Persona { 
    idPersona?: number,
    nombrePersona?: string,
    apellidoPersona?: number, 
    tipoDocPersona?: string,
    documentoPersona?: string,
    ciudadPersona?: Ciudad,
    direccionPersona?: string,
    observacionesPersona?: string,
    fechaNacimientoPersona?: string,
    correoPersona?: string,
    celularUnoPersona?: string,
    celularDosPersona?: string,
    telefonoPersona?: string,
    ciudadExpedicionPersona?: string,
    documentoUnoPersona?: string,
    documentoDosPersona?: string,
    fotoPersona?: string,
    idioma?: Idioma
}
