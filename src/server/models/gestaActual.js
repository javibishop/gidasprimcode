const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let gestaActualSchema = new Shcema({
    enteroPorTestOrina:{
        type:Boolean,
        default:false
    },
    enteroPorTestOrinaObservaciones:{
        type:String
    },
    enteroFecha:{
        type:Date,
        required: [true, 'La enteroFecha es requerida']
    },
    fum:{
        type:Date,
        required: [true, 'La enteroFecha es requerida']
    },
    egfum:{
        type:Date,
        required: [true, 'La enteroFecha es requerida']
    },
    intentoSuprimirObservaciones:{
        type:String
    },
    intentoSuprimir:{
        type:Boolean,
        default:false
    },
    loComento:{
        type:Boolean,
        default:false
    },
    loComentoAQuien:{
        type:String
    },
    causaSaludIntegral:{
        type:Boolean,
        default:false
    },
    causaViolacion:{
        type:Boolean,
        default:false
    },
    causaSinVE:{
        type:Boolean,
        default:false
    },
    calendarioVacunacionCompleto:{
        type:Boolean,
        default:false
    },
    calendarioVacunacionObservaciones:{
        type:String
    },
    cUMSPACO:{
        type:Boolean,
        default:false
    },
    cUMSPDisfuncionHepaticaSevera:{
        type:Boolean,
        default:false
    },
  
    cUMSPEmbarazoEctopico:{
        type:Boolean,
        default:false
    },
    cUMSPAlergiaMisoDiclo:{
        type:Boolean,
        default:false
    },
    factorRiesgoHb7:{
        type:Boolean,
        default:false
    },
    factorRiesgoCardiopatia:{
        type:Boolean,
        default:false
    },
    factorRiesgoDIU:{
        type:Boolean,
        default:false
    },
    factorRiesgoCardiovascular:{
        type:Boolean,
        default:false
    },
    factorRiesgoCorticoterapia:{
        type:Boolean,
        default:false
    },
    factorRiesgoOtros:{
        type:String
    },
    consejeriaId:{
        type:String
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// gestaActualSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

gestaActualSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('GestasActuales', gestaActualSchema);
