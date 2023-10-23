import { Vehiculo } from './vehiculo';

export interface DocumentoVehiculo { 
    idDocumentoVehiculo?:number,
    enReglaDocumentoVehiculo?:number,
    soatDocumentoVehiculo?:number,
    polizaExtraDocumentoVehiculo?:number,
    polizaDocumentoVehiculo?:number,
    tecnicomecanicaDocumentoVehiculo?:number,
    preventivaDocumentoVehiculo?:number,
    vehiculo?:Vehiculo
}
