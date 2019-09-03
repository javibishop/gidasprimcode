import { Especialidad } from '../models/especialidad.model';
import { Injectable } from '@angular/core';

export class EspecialidadApi {
    constructor(
        public _id: string,
        public nombre: string
    ){}
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class EspecialidadesAdapter {
    constructor(
    ){}

    adapt(usuariesApi: EspecialidadApi) :Especialidad {
        return new Especialidad(usuariesApi._id, usuariesApi.nombre);
    }

    adaptToApi(usuarie: Especialidad) :EspecialidadApi {
        return new EspecialidadApi(usuarie.id, usuarie.nombre);
    }

    parseJsonDate(jsonDateString): Date {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }
}
