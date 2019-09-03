import { Pais } from '../models/pais.model';
import { Injectable } from '@angular/core';

export class PaisApi {
    constructor(
        public _id: number,
        public nombre: string
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class PaisAdapter {
    constructor(
    ){}

    adapt(paisApi: PaisApi) :Pais {
        return new Pais(paisApi._id, paisApi.nombre);
    }

    adaptToApi(usuarie: Pais) :PaisApi {
        return new PaisApi(usuarie.id, usuarie.nombre);
    }
}
