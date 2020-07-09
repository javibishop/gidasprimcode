
import { EstudioComplementario } from '../models/consejeria.model';
import { Injectable } from '@angular/core';

export class EstudioApi {
    constructor(
        public id :string,
        public eco1Observacion :string,
        public eco1Fecha: Date,
        public eco1EG :string,
        public eco1LFC :boolean,
        public eco1Embrion :number,
        public eco1Saco :boolean,
        public eco1Ubicacion :string,
        public eco1Normoincerto :boolean,
        public eco1Ectopico :boolean,
        public eco1HMR :boolean,
        public eco2Observacion :string,
        public eco2Fecha: Date,
        public eco2EG :string,
        public eco2LFC :boolean,
        public eco2Embrion :number,
        public eco2Saco :boolean,
        public eco2Ubicacion :string,
        public eco2Normoincerto :boolean,
        public eco2Ectopico :boolean,
        public eco2HMR :boolean,
        public labFecha: Date,
        public labGB :string,
        public labGR :string,
        public labHb :string,
        public labHto :string,
        public labGrupo :string,
        public labFactor :string,
        public consejeriaId :string,
        public fecha: Date
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class EstudioComplementarioAdapter {
    constructor(
    ){}

    adapt(estudioApi: EstudioApi) :EstudioComplementario {
        if(estudioApi){
        return new EstudioComplementario(estudioApi.id, estudioApi.eco1Observacion, this.parseJsonDate(estudioApi.eco1Fecha), estudioApi.eco1EG,  estudioApi.eco1LFC,
            estudioApi.eco1Embrion, estudioApi.eco1Saco, estudioApi.eco1Ubicacion, estudioApi.eco1Normoincerto, estudioApi.eco1Ectopico, estudioApi.eco1HMR,
            estudioApi.eco2Observacion, this.parseJsonDate(estudioApi.eco2Fecha), estudioApi.eco2EG,  estudioApi.eco2LFC, estudioApi.eco2Embrion, estudioApi.eco2Saco,
            estudioApi.eco2Ubicacion, estudioApi.eco2Normoincerto, estudioApi.eco2Ectopico, estudioApi.eco2HMR, this.parseJsonDate(estudioApi.labFecha), estudioApi.labGB,
            estudioApi.labGR, estudioApi.labHb,estudioApi.labHto,estudioApi.labGrupo,estudioApi.labFactor, estudioApi.consejeriaId, estudioApi.fecha);
        }else return null;
    }

    adaptToApi(estudioComplementario: EstudioComplementario) :EstudioApi {
        return new EstudioApi(estudioComplementario.id, estudioComplementario.eco1Observacion, this.parseJsonDate(estudioComplementario.eco1Fecha), estudioComplementario.eco1EG,  estudioComplementario.eco1LFC,
        estudioComplementario.eco1Embrion, estudioComplementario.eco1Saco, estudioComplementario.eco1Ubicacion, estudioComplementario.eco1Normoincerto, estudioComplementario.eco1Ectopico, estudioComplementario.eco1HMR,
        estudioComplementario.eco2Observacion, this.parseJsonDate(estudioComplementario.eco2Fecha), estudioComplementario.eco2EG,  estudioComplementario.eco2LFC, estudioComplementario.eco2Embrion, estudioComplementario.eco2Saco,
        estudioComplementario.eco2Ubicacion, estudioComplementario.eco2Normoincerto, estudioComplementario.eco2Ectopico, estudioComplementario.eco2HMR, this.parseJsonDate(estudioComplementario.labFecha), estudioComplementario.labGB,
        estudioComplementario.labGR, estudioComplementario.labHb,estudioComplementario.labHto,estudioComplementario.labGrupo,estudioComplementario.labFactor, estudioComplementario.consejeriaId, estudioComplementario.fecha);
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
