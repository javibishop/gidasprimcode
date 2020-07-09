import { Institucion } from '../models/institucion.model';
import { Injectable } from '@angular/core';

export class InstitucionApi {

    constructor(
        public _id: string,
        public nombre: string,
        public provinciaId: string,
        public partidoId: string,
        public localidadId: string,
        public tipo: number,
        public telefono: string,
        public activo: boolean,
        public direccion: string
        )
        {}
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class InstitucionAdapter {
    constructor(
    ){}

    adapt(institucionApi: InstitucionApi) :Institucion {
        return new Institucion(institucionApi._id, institucionApi.nombre, institucionApi.provinciaId,  institucionApi.partidoId, 
            institucionApi.localidadId, institucionApi.tipo, institucionApi.telefono, institucionApi.activo , institucionApi.direccion);
    }

    adaptToApi(institucion: Institucion) :InstitucionApi {
        return new InstitucionApi(institucion.id, institucion.nombre, institucion.provinciaId,  institucion.partidoId, 
            institucion.localidadId, institucion.tipo, institucion.telefono, institucion.activo , institucion.direccion );
    }

    parseJsonDate(jsonDateString): Date {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }
}
