export interface Vehiculointerface {
    idVehiculo: number,
    codigoInternoVehiculo: string,
    placaVehiculo: string,
    estadoVehiculo: number,
    disponibilidad: number,
    pignoradoVehiculo: null,
    modelo: string,
    cilindraje: number,
    numeroPasajerosVehiculo:number,
    numeroMotorVehiculo: string,
    serieMotorVehiculo: string,
    chasisVehiculo: string,
    fechaRegistroVehiculo: string,
    colorVehiculo: string,
    registradoPorVehiculo: number,
    lineaVehiculo: string,
    tarjetaPropiedadUnoVehiculo: string,
    tarjetaPropiedadDosVehiculo: string,
    frenteVehiculo: string,
    ladoVehiculo: string,
    fechaInicioExtintorVehiculo: string,
    fechaFinExtintorVehiculo: string,
    traseraVehiculo: null,
    clase: {
        idClase: number,
        clase: number,
        estadoClase: number
    },
    marca: {
        idMarca: number,
        marca: string,
        estadoMarca: number
    },
    tipoCombustible: {
        idTipoCombustible: number,
        tipoCombustible: string,
        estadoTipoCombustible: number
    },
    tipoVehiculo: {
        idTipoVehiculo: number,
        tipoVehiculo: string,
        estadoTipoVehiculo: number
    },
    propietario: {
        idPropietario: number,
        estadoPropietario: number,
        fechaRegistroPropietario: string,
        fechaActualizacionPropietario: string,
        registradoPorPropietario: number,
        actualizadoPorPropietario: string,
        persona: {
            idPersona: number,
            nombrePersona: string,
            apellidoPersona: string,
            tipoDocPersona: string,
            documentoPersona: number,
            ciudadPersona: number,
            direccionPersona: string,
            cargoPersona: string,
            observacionesPersona: string,
            fechaNacimientoPersona: string,
            correoPersona: string,
            celularUnoPersona: number,
            celularDosPersona: number,
            telefonoPersona: number,
            ciudadExpedicionPersona: number,
            documentoUnoPersona: string,
            documentoDosPersona: string,
            fotoPersona: string,
            idioma: {
                idIdioma: number,
                idioma: string
            }
        }
    },
    documentoVehiculo: string,
    revisionTecnicomecanicaList: [
        {
            idRevisionTecnicomecanica: number,
            fechaRevisionTecnicomecanica: string,
            fechaVencimientoRevisionTecnicomecanica: string,
            revisionTecnicomecanica: string
        }
    ],
    polizaContractualList: [
        {
            idPolizaContractual: number,
            fechaInicioPolizaContractual: string,
            fechaVencimientoPolizaContractual: string,
            numeroPolizaContractual: number,
            polizaContractual: string,
            aseguradora: {
                idAseguradora: number,
                nombreAseguradora: string,
                estadoAseguradora: number
            }
        }
    ],
    tarjetaOperacionList: [
        {
            idTarjetaOperacion: number,
            numeroTarjetaOperacion: number,
            fechaVencimientoTarjetaOperacion: string,
            fechaExpedicionTarjetaOperacion: string,
            unoTarjetaOperacion: string,
            dosTarjetaOperacion: string
        }
    ],
    revisionPreventivaList:[
        {
            idRevisionPreventiva: number,
            fechaInicioRevisionPreventiva: string,
            fechaVencimientoRevisionPreventiva: string,
            revisionPreventiva: string
        }
    ],
    soatList: [
        {
            idSoat: number,
            fechaInicioSoat: string,
            fechaVencimientoSoat: string,
            numeroSoat: number,
            soat: string,
            aseguradora: {
                idAseguradora: number,
                nombreAseguradora: string,
                estadoAseguradora: number
            }
        }
    ],
    polizaExtracontractualList: [
        {
            idPolizaExtracontractual: number,
            fechaInicioPolizaExtracontractual: string,
            fechaVencimientoPolizaExtracontractual: string,
            numeroPolizaExtracontractual: number,
            polizaExtracontractual: string,
            aseguradora: {
                idAseguradora: number,
                nombreAseguradora: string,
                estadoAseguradora: number
            }
        }
    ]

}
