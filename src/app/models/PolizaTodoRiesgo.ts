export interface PolizaTodoRiesgo
{
    id?:number,
    fechaInicio?:string,
    fechaFin?:string,
    numeroPoliza?:number,
    nombreArchivoPoliza?:string,
    aseguradora?:{
        idAseguradora?:number
    }
}