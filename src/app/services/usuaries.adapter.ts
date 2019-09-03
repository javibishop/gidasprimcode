import { Usuarie } from '../models/usuarie.model';
import { Injectable } from '@angular/core';

export class UsuarieApi {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public estado: boolean,
        public userName: string,
        public password: string,
        public especialidadId: number,
        public token: string
    ){}
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class UsuariesAdapter {
    constructor(
    ){}

    adapt(usuariesApi: UsuarieApi) :Usuarie {
        return new Usuarie(usuariesApi._id, usuariesApi.nombre, usuariesApi.apellido,  usuariesApi.estado, 
            usuariesApi.userName, usuariesApi.password, usuariesApi.especialidadId, usuariesApi.token );
    }

    adaptToApi(usuarie: Usuarie) :UsuarieApi {
        return new UsuarieApi(usuarie.id, usuarie.nombre, usuarie.apellido, usuarie.activo, usuarie.userName,
             usuarie.password, usuarie.especialidadId, usuarie.token );
    }

    parseJsonDate(jsonDateString): Date {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }
}
