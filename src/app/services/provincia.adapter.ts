import { Provincia } from '../models/provincia.model';
import { Injectable } from '@angular/core';

export class ProvinciaApi {
    constructor(
        public _id: number,
        public nombre: string,
        public paisId: number,
    ){
    }
}

export class ProvinciaApiGob {
    constructor(
        public id: number,
        public nombre: string
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class ProvinciaAdapter {
    constructor(
    ){}

    adapt(paisApi: ProvinciaApi) :Provincia {
        return new Provincia(paisApi._id, paisApi.nombre, paisApi.paisId);
    }

    adaptFromGob(probApiGob: ProvinciaApiGob) :Provincia {
        return new Provincia(probApiGob.id, probApiGob.nombre, 0);
    }

    adaptToApi(provincia: Provincia) :ProvinciaApi {
        return new ProvinciaApi(provincia.id, provincia.nombre, provincia.paisId);
    }
}
