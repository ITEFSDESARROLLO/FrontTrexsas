import { Ciudad } from './ciudad';

export interface Cliente { 
    idCliente?: number,
    razonSocialCliente?: string,
    nitCliente?: string, 
    direccionCliente?: string,
    noShowTrexTipo?: number,
    noShowTrexValor?: number,
    noShowConductorTipo?: number,
    noShowConductorValor?: number,
    porcentajeValorConductor?: number,
    finalizarServicioCliente?: number,
    envioProgramacionCliente?: string,
    ciudadCliente?: Ciudad,
    logoCliente?: string,
    correoCliente?: string,
    celularUnoCliente?: string,
    celularDosCliente?: string,
}
