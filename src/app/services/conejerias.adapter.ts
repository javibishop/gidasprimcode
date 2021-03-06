import { Consejeria, SeguimientoConsejeria } from '../models/consejeria.model';
import { Injectable, OnInit } from '@angular/core';
import {Usuarie } from '../models/usuarie.model';
import {Usuaria } from '../models/usuaria.model';

import {UsuarieHttpService} from './usuarie-http.service';
import {UsuariaHttpService} from './usuaria-http.service';
import { StateService } from './state.service';

export class SeguimientoConsejeriaApi {
    constructor(
        public fecha: Date,
        public procedimientoNoOtro :string,
        public usuarieId:string)
    {}
}

export class ConsejeriaApi {
    constructor(
        public _id :string,
        public numero :number,
        public fechaIngreso: Date,
        public observacion :string,
        public usuariaId :Usuaria,
        public usuarie1Id :Usuarie,
        public usuarie2Id :Usuarie,
        public seguimiento : SeguimientoConsejeria []
    ){}
}

export class ConsejeriaList {
    constructor(
        public _id :string,
        public numero :number,
        public fechaIngreso: Date,
        public observacion :string,
        public usuariaNombre :string,
        public usuarie1Nombre :string,
        public usuarie2Nombre :string,
        public usuariaApellido :string,
        public usuarie1Apellido :string,
        public usuarie2Apellido :string
    ){
       
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class ConsejeriasAdapter implements OnInit{
    private profesionales : Usuarie [];
    constructor(private usuariaHttpService : UsuariaHttpService, private stateService : StateService, private usuarieHttpService: UsuarieHttpService)
    {
        this.stateService.usuaries$.subscribe(usuaries => this.profesionales = usuaries);
    }

    ngOnInit() {
        
    }
    adapt(consejeriasApi: ConsejeriaApi) :Consejeria {
        return new Consejeria(consejeriasApi._id, consejeriasApi.numero, consejeriasApi.fechaIngreso, consejeriasApi.observacion, consejeriasApi.usuariaId, 
            consejeriasApi.usuarie1Id, consejeriasApi.usuarie2Id, consejeriasApi.seguimiento);
    }

    adaptToList(consejeriasApi: ConsejeriaApi) : ConsejeriaList {
        /*TODO ESTO DE OBTENER DATOS SE TIENE QUE RESOLVER EN EL SERVER */
        return new ConsejeriaList(consejeriasApi._id, consejeriasApi.numero, consejeriasApi.fechaIngreso, consejeriasApi.observacion, consejeriasApi.usuariaId.nombre, 
        consejeriasApi.usuarie1Id.nombre, consejeriasApi.usuarie2Id.nombre, consejeriasApi.usuariaId.apellido, consejeriasApi.usuarie1Id.apellido, consejeriasApi.usuarie2Id.apellido);
                    
        // return  consejeriaList;
        // this.usuarieHttpService.getById(consejeriasApi.usuarie1Id).subscribe(usuariaApi => usuarie1 = usuariaApi);
        // this.usuarieHttpService.getById(consejeriasApi.usuarie2Id).subscribe(usuariaApi => usuarie2 = usuariaApi);;
    }

    adaptToApi(consejeria: Consejeria) :ConsejeriaApi {
        return new ConsejeriaApi(consejeria._id, consejeria.numero, consejeria.fechaIngreso, consejeria.observacion, consejeria.usuariaId, 
            consejeria.usuarie1Id, consejeria.usuarie2Id, consejeria.seguimiento);
    }
    
    
    getProfesional(id : string) : Usuarie {
        return this.profesionales.find(c => c.id === id);
    }
    
     parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
