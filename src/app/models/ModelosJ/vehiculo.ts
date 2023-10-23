import { Persona } from './persona';
import { ClaseVehiculoInterface } from './clase-vehiculo';
import { MarcaVehiculoInterface } from './marca-vehiculo-interface';
import { TipoCombustibleInterface } from './tipo-combustible';
import { TipoVehiculoInterface } from './tipo-vehiculo-interface';
import { Propietario } from './propietario';
import { DocumentoVehiculo } from './documento-vehiculo';
import { RevisionTecnicoMecanica } from './revision-tecnico-mecanica';
import { PolizaContractual } from './poliza-contractual';
import { TarjetaOperacion } from './tarjeta-operacion';
import { RevisionPreventiva } from './revision-preventiva';
import { PolizaExtracontractual } from './poliza-extracontractual';
import { Conductor } from './conductor';


export interface Vehiculo {
    idVehiculo?:number,
    codigoInternoVehiculo?:string,
    placaVehiculo?:string,
    enConvenioVehiculo?:number,
    estadoVehiculo?:number,
    disponibilidad?:number,
    modelo?:number,
    cilindraje?:number,
    numeroPasajerosVehiculo?:number,
    colorVehiculo?:string,
    fechaRegistroVehiculo?:string,
    fechaActualizacionVehiculo?:string,
    registradoPorVehiculo?:Persona,
    actualizadoPorVehiculo?:Persona,
    tarjetaPropiedadUnoVehiculo?:string,
    tarjetaPropiedadDosVehiculo?:string,
    frenteVehiculo?:string,
    traseraVehiculo?:string,
    ladoVehiculo?:string,
    fechaInicioExtintorVehiculo?:string,
    fechaFinExtintorVehiculo?:string,
    clase?:ClaseVehiculoInterface,
    marca?:MarcaVehiculoInterface,
    tipoCombustible?:TipoCombustibleInterface,
    tipoVehiculo?:TipoVehiculoInterface,
    propietario?:Propietario,
    documentoVehiculo?:DocumentoVehiculo,
    revisionTecnicomecanicaList?:Array<RevisionTecnicoMecanica> ,
    polizaContractualList?:Array<PolizaContractual> ,
    tarjetaOperacionList?:Array<TarjetaOperacion> ,
    revisionPreventivaList?:Array<RevisionPreventiva> ,
    polizaExtracontractualList?:Array<PolizaExtracontractual> ,
    conductorList?:Array<Conductor> 
}
