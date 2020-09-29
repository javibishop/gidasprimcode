import { Otro } from '../models/consejeria.model';
import { Injectable } from '@angular/core';

export class OtroApi {
    constructor(
        public id :string,
        public violenciaDG :boolean,
        public violenciaDGTipo :number,
        public violenciaDGObservaciones: string,
        public violenciaI :boolean,
        public violenciaIDeQuien :string,
        public violenciaIComo :string,
        public acompaniamiento :boolean,
        public acompaniamientoLugar :string,
        public acompaniamientoDispositivo :string,
        public abusoSexual :boolean,
        public abusoSexualDJurada :boolean,
        public abusoSexualDPenal :boolean,
        public circuitoActual :boolean,
        public circuitoAnterior :boolean,
        public circuitoObservaciones: string,
        public consejeriaId :string,
        public fecha: Date
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class OtrosAdapter {
    constructor(
    ){}
    
    adapt(otroApi: OtroApi) :Otro {
        if(otroApi){
        return new Otro(otroApi.id, otroApi.violenciaDG, otroApi.violenciaDGTipo, otroApi.violenciaDGObservaciones, 
            otroApi.violenciaI, otroApi.violenciaIDeQuien, otroApi.violenciaIComo, otroApi.acompaniamiento, otroApi.acompaniamientoLugar,
            otroApi.acompaniamientoDispositivo, otroApi.abusoSexual, otroApi.abusoSexualDJurada, otroApi.abusoSexualDPenal, otroApi.circuitoActual, otroApi.circuitoAnterior,
            otroApi.circuitoObservaciones, otroApi.consejeriaId, this.parseJsonDate(otroApi.fecha));
        }else return null;
    }

    adaptToApi(otro: Otro) :OtroApi {
        return {...otro} as OtroApi;
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
