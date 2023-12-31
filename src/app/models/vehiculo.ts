export interface Vehiculo {
    idVehiculo?:number,
    codigoInternoVehiculo?:string,
    placaVehiculo?:string,
    enConvenioVehiculo?:number,
    disponibilidad?:number,
    estadoVehiculo?:number,
    modelo?:number,
    cilindraje?:number,
    numeroPasajerosVehiculo?:number,
    colorVehiculo?:string,
    personaIdPersona?:number,
    registradoPorVehiculo?:string,
    tarjetaPropiedadUnoVehiculo?:string,
    tarjetaPropiedadDosVehiculo?:string,
    frenteVehiculo?:string,
    traseraVehiculo?:string,
    ladoVehiculo?:string,
    numeroMotorVehiculo?:string,
    chasisVehiculo?:string,
    numeroVin?:string,
    carroceriaVehiculo?:string,
    tipoServicio?:string,
    entidadTransito?:string,
    linea?:string,
    numeroLicenciaTransito?:string,
    fechaMatricula?:string,
    fechaFinMatricula?:string,
    numeroSerie?:string,
    numeroRevisionTecnicoMecanica?:string,
    clase?:{
        idClase?:number
    },
    marca?:{
        idMarca?:number
    },
    tipoCombustible?:{
        idTipoCombustible?:number
    },
    tipoVehiculo?:{
        idTipoVehiculo?:number
    },
    propietario?:{
        idPersona?:number
    }
}
