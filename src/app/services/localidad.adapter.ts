import { Localidad } from '../models/localidad.model';
import { Injectable } from '@angular/core';

export class LocalidadApi {
    constructor(
        public _id: number,
        public nombre: string,
        public cp: string,
        public partidoId: number,
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class LocalidadAdapter {
    constructor(
    ){}

    adapt(localidadApi: LocalidadApi) :Localidad {
        return new Localidad(localidadApi._id, localidadApi.nombre,localidadApi.cp, localidadApi.partidoId);
    }

    adaptToApi(localidad: Localidad) :LocalidadApi {
        return new LocalidadApi(localidad.id, localidad.nombre, localidad.cp, localidad.partidoId);
    }
}
