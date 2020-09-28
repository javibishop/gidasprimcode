const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

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
        public fecha: Date,

let Shcema = mongoose.Schema;
let otroSchema = new Shcema({
    violenciaDGTipo:{
        type:Number,
        default:0
    },
    fecha:{
        type:Date,
        required: [true, 'La fecha es requerida']
    },
    violenciaDG:{
        type:Boolean,
        default:false
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
