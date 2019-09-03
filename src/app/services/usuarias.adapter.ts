import { Usuaria } from '../models/usuaria.model';
import { Injectable } from '@angular/core';

export class UsuariaApi {
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public edad: number,
        public activo: boolean,
        public fechaNacimiento: Date,
        public nacionalidadId: string,
        public telefono: string,
        public direccion: string,
        public documento: string,
        public provinciaId: string,
        public partidoId: string,
        public usuarioCentroSalud: boolean,
        public parejaConViviente : boolean,
        public parejaNoConViviente : boolean,
        public sinPareja : boolean,
        public conocePorConocido : boolean,
        public conocePorUS : boolean,
        public conocePorOrganizacion : boolean,
        public conocePorMedios : boolean,
        public conocePorUsuarioConsejeria: boolean, 
        public conocePorInsititucionSalud : boolean,
        public conocePorReferente : boolean,
        public conocePorInsititucionSaludObs : string,
        public conocePorOtro : string,

        public nivelInstruccion : number,
        public nivelInstruccionEstado : number,
        public localidadId: string,
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class UsuariasAdapter {
    constructor(
    ){}

    adapt(usuariaApi: UsuariaApi) :Usuaria {
        if(usuariaApi){
            return new Usuaria(usuariaApi.id, usuariaApi.nombre, usuariaApi.apellido, usuariaApi.edad, usuariaApi.activo, 
            this.parseJsonDate(usuariaApi.fechaNacimiento), usuariaApi.nacionalidadId, usuariaApi.documento, usuariaApi.provinciaId, usuariaApi.partidoId,usuariaApi.telefono, usuariaApi.direccion, usuariaApi.usuarioCentroSalud, usuariaApi.parejaConViviente,
            usuariaApi.parejaNoConViviente, usuariaApi.sinPareja, usuariaApi.conocePorConocido, usuariaApi.conocePorUS, usuariaApi.conocePorOrganizacion, usuariaApi.conocePorMedios,
            usuariaApi.conocePorUsuarioConsejeria, usuariaApi.conocePorUsuarioConsejeria, usuariaApi.conocePorReferente, usuariaApi.conocePorInsititucionSaludObs, usuariaApi.conocePorOtro,
            usuariaApi.nivelInstruccion, usuariaApi.nivelInstruccionEstado, usuariaApi.localidadId);
        }else return null;
    }

    adaptToApi(usuaria: Usuaria) :UsuariaApi {
        return new UsuariaApi (usuaria.id, usuaria.nombre, usuaria.apellido, usuaria.edad, usuaria.activo, 
            this.parseJsonDate(usuaria.fechaNacimiento), usuaria.nacionalidadId, usuaria.telefono, usuaria.direccion, usuaria.documento, usuaria.provinciaId, usuaria.partidoId,usuaria.usuarioCentroSalud, usuaria.parejaConViviente,
            usuaria.parejaNoConViviente, usuaria.sinPareja, usuaria.conocePorConocido, usuaria.conocePorUS, usuaria.conocePorOrganizacion, usuaria.conocePorMedios,
            usuaria.conocePorUsuarioConsejeria, usuaria.conocePorUsuarioConsejeria, usuaria.conocePorReferente, usuaria.conocePorInsititucionSaludObs, usuaria.conocePorOtro,
            usuaria.nivelInstruccion, usuaria.nivelInstruccionEstado, usuaria.localidadId);
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
