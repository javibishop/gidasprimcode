import { Antecedente } from '../models/consejeria.model';
import { Injectable } from '@angular/core';

export class AntecedenteApi {
    constructor(
        public id :string,
        public gestas :number,
        public partosVaginal :number,
        public cesareas :number,
        public abortoEspontaneo :number,
        public abortoVoluntario :number,
        public mACNoUsa :boolean,
        public mACACO :boolean,
        public mACACI :boolean,
        public mACDIU :boolean,
        public mCPreservativo :boolean,
        public mACImplanteHormonal :boolean,
        public falloMAC :boolean,
        public noUsoMAC :boolean,
        public aHEMAC :number,
        public observaciones: string,
        public consejeriaId :string,
        public fecha: Date,
        public antecedentesPersonales: string 
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class AntecedentesAdapter {
    constructor(
    ){}
    
    adapt(antecedenteApi: AntecedenteApi) :Antecedente {
        if(antecedenteApi){
        return new Antecedente(antecedenteApi.id, antecedenteApi.gestas, antecedenteApi.partosVaginal, antecedenteApi.cesareas, 
            antecedenteApi.abortoEspontaneo, antecedenteApi.abortoVoluntario, antecedenteApi.mACNoUsa, antecedenteApi.mACACO, antecedenteApi.mACACI,
            antecedenteApi.mACDIU, antecedenteApi.mCPreservativo, antecedenteApi.mACImplanteHormonal, antecedenteApi.falloMAC, antecedenteApi.noUsoMAC, antecedenteApi.aHEMAC,
            antecedenteApi.observaciones, antecedenteApi.consejeriaId, this.parseJsonDate(antecedenteApi.fecha), antecedenteApi.antecedentesPersonales);
        }else return null;
    }

    adaptToApi(antecedente: Antecedente) :AntecedenteApi {
        return new AntecedenteApi(antecedente.id, antecedente.gestas, antecedente.partosVaginal, antecedente.cesareas, 
            antecedente.abortoEspontaneo, antecedente.abortoVoluntario, antecedente.mACNoUsa, antecedente.mACACO, antecedente.mACACI,
            antecedente.mACDIU, antecedente.mCPreservativo, antecedente.mACImplanteHormonal, antecedente.falloMAC, antecedente.noUsoMAC, antecedente.aHEMAC,
            antecedente.observaciones, antecedente.consejeriaId, this.parseJsonDate(antecedente.fecha), antecedente.antecedentesPersonales);
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
