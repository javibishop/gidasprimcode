import { GestaActual } from '../models/consejeria.model';
import { Injectable } from '@angular/core';

export class GestaActualApi {
    constructor(
        public id :string,
        public enteroPorTestOrina :boolean,
        public enteroPorTestOrinaObservaciones :string,
        public enteroFecha: Date,
        public fum : Date,
        public egfum :Date,
        public intentoSuprimir :boolean,
        public intentoSuprimirObservaciones :string,
        public loComento :boolean,
        public loComentoAQuien :string,
        public causaSaludIntegral :boolean,
        public causaViolacion :boolean,
        public causaSinVE :boolean,
        public calendarioVacunacionCompleto :boolean,
        public calendarioVacunacionObservaciones :string,
        public cUMSPACO :boolean,
        public cUMSPDisfuncionHepaticaSevera :boolean,
        public cUMSPEmbarazoEctopico :boolean,
        public cUMSPAlergiaMisoDiclo :boolean,
        public factorRiesgoHb7 :boolean,
        public factorRiesgoCardiopatia :boolean,
        public factorRiesgoDIU :boolean,
        public factorRiesgoCardiovascular :boolean,
        public factorRiesgoCorticoterapia :boolean,
        public factorRiesgoOtros :string,
        public consejeriaId :string
    ){
    }
}

// si aca solo pongo @Injectable me da un error de que nadie lo provee, y se debe poner el en providers del module.ts Entonces se pone el root como abajo
@Injectable({
    providedIn: 'root'
  })

export class GestaActualAdapter {
    constructor(
    ){}

    adapt(gestaActualApi: GestaActualApi) :GestaActual {
        if(gestaActualApi){
        return new GestaActual(gestaActualApi.id, gestaActualApi.enteroPorTestOrina, gestaActualApi.enteroPorTestOrinaObservaciones, this.parseJsonDate(gestaActualApi.enteroFecha), 
            this.parseJsonDate(gestaActualApi.fum),this.parseJsonDate(gestaActualApi.egfum), gestaActualApi.intentoSuprimir, gestaActualApi.intentoSuprimirObservaciones, gestaActualApi.loComento, gestaActualApi.loComentoAQuien,
            gestaActualApi.causaSaludIntegral, gestaActualApi.causaViolacion, gestaActualApi.causaSinVE,gestaActualApi.calendarioVacunacionCompleto, gestaActualApi.calendarioVacunacionObservaciones,
            gestaActualApi.cUMSPACO, gestaActualApi.cUMSPDisfuncionHepaticaSevera, gestaActualApi.cUMSPEmbarazoEctopico, gestaActualApi.cUMSPAlergiaMisoDiclo, gestaActualApi.factorRiesgoHb7,
            gestaActualApi.factorRiesgoCardiopatia, gestaActualApi.factorRiesgoDIU, gestaActualApi.factorRiesgoCardiovascular, gestaActualApi.factorRiesgoCorticoterapia,gestaActualApi.factorRiesgoOtros, gestaActualApi.consejeriaId);
        } else return null;
    }

    adaptToApi(gestaActual: GestaActual) :GestaActualApi {
        return new GestaActualApi(gestaActual.id, gestaActual.enteroPorTestOrina, gestaActual.enteroPorTestOrinaObservaciones, gestaActual.enteroFecha, gestaActual.fum,
            gestaActual.egfum, gestaActual.intentoSuprimir, gestaActual.intentoSuprimirObservaciones, gestaActual.loComento, gestaActual.loComentoAQuien,
            gestaActual.causaSaludIntegral, gestaActual.causaViolacion, gestaActual.causaSinVE,gestaActual.calendarioVacunacionCompleto,gestaActual.calendarioVacunacionObservaciones,  gestaActual.cUMSPACO, 
            gestaActual.cUMSPDisfuncionHepaticaSevera, gestaActual.cUMSPEmbarazoEctopico, gestaActual.cUMSPAlergiaMisoDiclo, gestaActual.factorRiesgoHb7,
            gestaActual.factorRiesgoCardiopatia, gestaActual.factorRiesgoDIU, gestaActual.factorRiesgoCardiovascular, gestaActual.factorRiesgoCorticoterapia,gestaActual.factorRiesgoOtros, gestaActual.consejeriaId);
    }

    parseJsonDate(jsonDateString): Date {
        if(jsonDateString)
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        else
            return null;
    }
}
