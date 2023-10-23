export interface Convenio { 
    idConvenio?:number,
    fechaInicioConvenio?:string,
    fechaFinConvenio?:string,
    licenciaConvenio?:string,
    convenio?:string,
    empresaConvenio?:{
        idEmpresaConvenio?:number
    }
}
