import { EmpresaConvenio } from './empresa-convenio';

export interface Convenio { 
    idConvenio?:number,
    fechaInicioConvenio?:string,
    fechaFinConvenio?:string,
    licenciaConvenio?:string,
    convenio?:string,
    empresaConvenio?:EmpresaConvenio
}
