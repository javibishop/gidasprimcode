import { Consejeria } from '../models/consejeria.model';
import { Injectable, OnInit } from '@angular/core';
import {Usuarie } from '../models/usuarie.model';
import {Usuaria } from '../models/usuaria.model';

import {UsuarieHttpService} from './usuarie-http.service';
import {UsuariaHttpService} from './usuaria-http.service';
import { StateService } from './state.service';

export class ConsejeriaApi {
    constructor(
        public _id :string,
        public numero :number,
        public fechaIngreso: Date,
        public observacion :string,
        public usuariaId :Usuaria,
        public usuarie1Id :Usuarie,
        public usuarie2Id :Usuarie
        // ,
        // public usuariaNombre :String,
        // public usuarie1Nombre :String,
        // public usuarie2Nombre :String
    ){
       
    }
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
        return new Consejeria(consejeriasApi._id, consejeriasApi.numero, this.parseJsonDate(consejeriasApi.fechaIngreso), consejeriasApi.observacion, consejeriasApi.usuariaId, 
            consejeriasApi.usuarie1Id, consejeriasApi.usuarie2Id);
    }

    adaptToList(consejeriasApi: ConsejeriaApi) : ConsejeriaList {
        /*TODO ESTO DE OBTENER DATOS SE TIENE QUE RESOLVER EN EL SERVER */
        // let usuarie1 = this.getProfesional(consejeriasApi.usuarie1Id);
        // let usuarie2 = this.getProfesional(consejeriasApi.usuarie2Id);
        
        //  let usuarie1 : Usuarie;
        //  let usuarie2 : Usuarie;
        //  let usuaria : Usuaria;
        //  let consejeriaList: ConsejeriaList;
        //  this.usuarieHttpService.getById(consejeriasApi.usuarie1Id).toPromise().then(data => {
        //     usuarie1 = data;
        //     this.usuarieHttpService.getById(consejeriasApi.usuarie1Id).toPromise().then(data2 => {
        //         usuarie2 = data2
        //         this.usuariaHttpService.getById(consejeriasApi.usuariaId).toPromise().then(data3 => {
        //             usuaria = data3;
        //             consejeriaList = new ConsejeriaList(consejeriasApi._id, consejeriasApi.numero, this.parseJsonDate(consejeriasApi.fechaIngreso), consejeriasApi.observacion, usuaria.nombre, 
        //             usuarie1.nombre, usuarie2.nombre, usuaria.apellido, usuarie1.apellido, usuarie2.apellido);
        //         });
        //     });
        //   });

        return new ConsejeriaList(consejeriasApi._id, consejeriasApi.numero, this.parseJsonDate(consejeriasApi.fechaIngreso), consejeriasApi.observacion, consejeriasApi.usuariaId.nombre, 
        consejeriasApi.usuarie1Id.nombre, consejeriasApi.usuarie2Id.nombre, consejeriasApi.usuariaId.apellido, consejeriasApi.usuarie1Id.apellido, consejeriasApi.usuarie2Id.apellido);
                    
        // return  consejeriaList;
        // this.usuarieHttpService.getById(consejeriasApi.usuarie1Id).subscribe(usuariaApi => usuarie1 = usuariaApi);
        // this.usuarieHttpService.getById(consejeriasApi.usuarie2Id).subscribe(usuariaApi => usuarie2 = usuariaApi);;
    }

    adaptToApi(consejeria: Consejeria) :ConsejeriaApi {
        return new ConsejeriaApi(consejeria._id, consejeria.numero, consejeria.fechaIngreso, consejeria.observacion, consejeria.usuariaId, 
            consejeria.usuarie1Id, consejeria.usuarie2Id);
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
