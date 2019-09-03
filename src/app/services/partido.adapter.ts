import { Partido } from '../models/partido.model';
import { Injectable } from '@angular/core';

export class PartidoApi {
    constructor(
        public _id: number,
        public nombre: string,
        public provinciaId: number,
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class PartidoAdapter {
    constructor(
    ){}

    adapt(partidoApi: PartidoApi) :Partido {
        return new Partido(partidoApi._id, partidoApi.nombre, partidoApi.provinciaId);
    }

    adaptToApi(partido: Partido) :PartidoApi {
        return new PartidoApi(partido.id, partido.nombre, partido.provinciaId);
    }
}
