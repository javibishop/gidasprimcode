
import { EntrevistaPostAborto } from '../models/consejeria.model';
import { Injectable } from '@angular/core';

export class EntrevistaApi {
    constructor(
        public id:string,
        public fecha: Date,
        public procedimientoObservaciones :string,
        public procedimientoHecho: boolean,
        public procedimientoNoContinua :boolean,
        public procedimientoNoAbortoEspontaneo :boolean,
        public procedimientoNoOtro :string,
        public procedimientoSiHecho: boolean,
        public procedimientoSiInformado :boolean,
        public procedimientoSiOtra :string,
        public procedimientoSiViaV :boolean,
        public procedimientoSiViaSL :boolean,
        public procedimientoSiOtro :string,
        public accedioPorFarmacia :boolean,
        public accedioPorConocido :boolean,
        public accedioPorInternet :boolean,
        public pccedioPorOrgSocial :boolean,
        public presentacionSuelto :boolean,
        public presentacionCaja20 :boolean,
        public presentacionCaja16 :boolean,
        public efectoAdversoNo :boolean,
        public efectoAdversoGastro :boolean,
        public efectoAdversoTemperatura :boolean,
        public efectoAdversoCafalea :boolean,
        public efectoAdversoOtro :string,
        public complicacionNo :boolean,
        public complicacionHemorragia :boolean,
        public complicacionInfeccion :boolean,
        public complicacionOtro :string,
        public indicacionGammaglobulina :boolean,
        public ecografiaPostFecha: Date,
        public ecografiaPostNoRealizo :boolean,
        public ecografiaPostAbortoCompleto :boolean,
        public ecografiaPostAbortoIncompleto :boolean,

        public ecografiaPostAbortoHMyR :boolean,

        public ecografiaPostEmbrionViable :boolean,
        public ecografiaPostNuevaConsejeria :boolean,
        public ecografiaPostDerivacion2Nivel :boolean,
        public ecografiaPostConductaExpectante :boolean,
        public consejeriaMACNo :boolean,
        public consejeriaMACACO :boolean,
        public consejeriaMACACI :boolean,
        public consejeriaMACDIU :boolean,
        public consejeriaMACPreservativo :boolean,
        public consejeriaMACImplanteHormonal :boolean,

        public consejeriaMACACOLactancia :boolean,

        public consejeriaId :string
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class EntrevistaAdapter {
    constructor(
    ){}

    adapt(entrevistaApi: EntrevistaApi) :EntrevistaPostAborto {
        if(entrevistaApi){
        return new EntrevistaPostAborto(entrevistaApi.id, this.parseJsonDate(entrevistaApi.fecha), entrevistaApi.procedimientoObservaciones, entrevistaApi.procedimientoHecho,
            entrevistaApi.procedimientoNoContinua, entrevistaApi.procedimientoNoAbortoEspontaneo, entrevistaApi.procedimientoNoOtro, entrevistaApi.procedimientoSiHecho, entrevistaApi.procedimientoSiInformado, entrevistaApi.procedimientoSiOtra,
            entrevistaApi.procedimientoSiViaV, entrevistaApi.procedimientoSiViaSL, entrevistaApi.procedimientoSiOtro, entrevistaApi.accedioPorFarmacia, entrevistaApi.accedioPorConocido,
            entrevistaApi.accedioPorInternet, entrevistaApi.pccedioPorOrgSocial, entrevistaApi.presentacionSuelto, entrevistaApi.presentacionCaja20,entrevistaApi.presentacionCaja16, entrevistaApi.efectoAdversoNo,
            entrevistaApi.efectoAdversoGastro, entrevistaApi.efectoAdversoTemperatura,entrevistaApi.efectoAdversoCafalea, entrevistaApi.efectoAdversoOtro, entrevistaApi.complicacionNo, 
            entrevistaApi.complicacionHemorragia, entrevistaApi.complicacionInfeccion, entrevistaApi.complicacionOtro, entrevistaApi.indicacionGammaglobulina, this.parseJsonDate(entrevistaApi.ecografiaPostFecha),
            entrevistaApi.ecografiaPostNoRealizo, entrevistaApi.ecografiaPostAbortoIncompleto, entrevistaApi.ecografiaPostAbortoIncompleto, entrevistaApi.ecografiaPostAbortoHMyR, entrevistaApi.ecografiaPostEmbrionViable, entrevistaApi.ecografiaPostNuevaConsejeria,
            entrevistaApi.ecografiaPostDerivacion2Nivel, entrevistaApi.ecografiaPostConductaExpectante, entrevistaApi.consejeriaMACNo, entrevistaApi.consejeriaMACACO, entrevistaApi.consejeriaMACACI, entrevistaApi.consejeriaMACDIU
            ,entrevistaApi.consejeriaMACPreservativo, entrevistaApi.consejeriaMACImplanteHormonal, entrevistaApi.consejeriaMACACOLactancia, entrevistaApi.consejeriaId);
        }else return null;
    }

    adaptToApi(entrevista: EntrevistaPostAborto) :EntrevistaApi {
        return new EntrevistaApi(entrevista.id, this.parseJsonDate(entrevista.fecha), entrevista.procedimientoObservaciones, entrevista.procedimientoHecho,
        entrevista.procedimientoNoContinua, entrevista.procedimientoNoAbortoEspontaneo, entrevista.procedimientoNoOtro, entrevista.procedimientoSiHecho, entrevista.procedimientoSiInformado, entrevista.procedimientoSiOtra,
        entrevista.procedimientoSiViaV, entrevista.procedimientoSiViaSL, entrevista.procedimientoSiOtro, entrevista.accedioPorFarmacia, entrevista.accedioPorConocido,
        entrevista.accedioPorInternet, entrevista.pccedioPorOrgSocial, entrevista.presentacionSuelto, entrevista.presentacionCaja20,entrevista.presentacionCaja16, entrevista.efectoAdversoNo,
        entrevista.efectoAdversoGastro, entrevista.efectoAdversoTemperatura,entrevista.efectoAdversoCafalea, entrevista.efectoAdversoOtro, entrevista.complicacionNo, 
        entrevista.complicacionHemorragia, entrevista.complicacionInfeccion, entrevista.complicacionOtro, entrevista.indicacionGammaglobulina, this.parseJsonDate(entrevista.ecografiaPostFecha),
        entrevista.ecografiaPostNoRealizo, entrevista.ecografiaPostAbortoIncompleto, entrevista.ecografiaPostAbortoIncompleto, entrevista.ecografiaPostAbortoHMyR, entrevista.ecografiaPostEmbrionViable, entrevista.ecografiaPostNuevaConsejeria,
        entrevista.ecografiaPostDerivacion2Nivel, entrevista.ecografiaPostConductaExpectante, entrevista.consejeriaMACNo, entrevista.consejeriaMACACO, entrevista.consejeriaMACACI, entrevista.consejeriaMACDIU
        ,entrevista.consejeriaMACPreservativo, entrevista.consejeriaMACImplanteHormonal, entrevista.consejeriaMACACOLactancia, entrevista.consejeriaId);
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
