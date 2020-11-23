const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let otroSchema = new Shcema({
    violenciaDGTipo:{
        type:[Number]
    },
    fecha:{
        type:Date,
        required: [true, 'La fecha es requerida']
    },
    violenciaDG:{
        type:Boolean,
        default:false
    },
    violenciaDGObservaciones:{
        type:String
    },
    violenciaIDeQuien:{
        type:String
    },
    violenciaIComo:{
        type:String
    },
    violenciaI:{
        type:Boolean,
        default:false
    },
    acompaniamiento:{
        type:Boolean,
        default:false
    },
    acompaniamientoLugar:{
        type:String
    },
    acompaniamientoDispositivo:{
        type:String
    },
    abusoSexual:{
        type:Boolean,
        default:false
    },
    abusoSexualDJurada:{
        type:Boolean,
        default:false
    },
    abusoSexualDPenal:{
        type:Boolean,
        default:false
    },
    circuitoActual:{
        type:Boolean,
        default:false
    },
    circuitoAnterior:{
        type:Boolean,
        default:false
    },
    circuitoObservaciones:{
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
// antecedenteSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

otroSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Otros', otroSchema);
