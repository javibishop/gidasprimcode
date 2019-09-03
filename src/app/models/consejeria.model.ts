import { Usuaria } from './usuaria.model';
import { Usuarie } from './usuarie.model';

export class Consejeria {
    constructor(
        public _id :string,
        public numero :number,
        public fechaIngreso: Date,
        public observacion :string,
        public usuariaId :Usuaria,
        public usuarie1Id :Usuarie,
        public usuarie2Id :Usuarie
        )
        {}
}
export class EntrevistaPostAborto {
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
    ){}
}

export class EstudioComplementario {
    constructor (
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
  ){} 
}

export class GestaActual {
    constructor (
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
  ) {}
}

export class Antecedente{
    constructor (
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
      ){}
} 