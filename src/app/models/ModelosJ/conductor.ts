import { Persona } from './persona';
import { FondoPensiones } from './fondo-pensiones';
import { Eps } from './eps';
import { Arl } from './arl';
import { EstadoCivil } from './estado-civil';
import { Vehiculo } from './vehiculo';
import { Licencia } from './licencia';
import { CajaCompensacion } from './caja-compensacion';
import { DocumentoConductor } from './documento-conductor';

export interface Conductor { 
    idConductor?: number,
    rhConductor?: string,
    estadoConductor?: number, 
    planillaAportesConductor?: string,
    examenesMedicosConductor?: string,
    inicioEpsConductor?: string,
    finEpsConductor?: string,
    inicioArlConductor?: string,
    finArlConductor?: string,
    fechaRegistroConductor?: string,
    fechaActualizacionConductor?: string,
    registradoPorConductor?: Persona,
    actualizadoPorConductor?: Persona,
    generoConductor?: string,
    documentoConductor?: DocumentoConductor,
    cajaCompensacion?: CajaCompensacion,
    fondoPensiones?: FondoPensiones,
    eps?: Eps,
    arl?: Arl,
    estadoCivil?: EstadoCivil,
    persona?: Persona,
    vehiculoList?: Array<Vehiculo>,
    licenciaList?: Array<Licencia>,
}
