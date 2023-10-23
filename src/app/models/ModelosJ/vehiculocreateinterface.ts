import { Vehiculo } from './vehiculo';
import { Convenio } from './convenio';
import { Soat } from './soat';
import { PolizaExtracontractual } from './poliza-extracontractual';
import { TarjetaOperacion } from './tarjeta-operacion';
import { RevisionTecnicoMecanica } from './revision-tecnico-mecanica';
import { RevisionPreventiva } from './revision-preventiva';
import { PolizaContractual } from './poliza-contractual';
export interface Vehiculocreateinterface {
    vehiculo?:Vehiculo
    revisionPreventiva?:RevisionPreventiva,
    tarjetaOperacion?:TarjetaOperacion,
    
    revisionTecnicomecanica?:RevisionTecnicoMecanica,
    
    polizaExtracontractual?:PolizaExtracontractual,
    
    polizaContractual?:PolizaContractual,
    soat?:Soat,
    convenio?:Convenio,

}
