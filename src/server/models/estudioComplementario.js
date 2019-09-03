const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let estudioComplementarioSchema = new Shcema({
    eco1Observacion:{
        type:String
    },
    eco1Fecha:{
        type:Date,
        required: [true, 'La eco1Fecha es requerida']
    },
    eco1EG:{
        type:String
    },
    eco1LFC:{
        type:Boolean,
        default:false
    },
    eco1Embrion:{
        type:Number,
        default:0
    },
    eco1Saco:{
        type:Boolean,
        default:false
    },
    eco1Ubicacion:{
        type:String
    },
    eco1Normoincerto:{
        type:Boolean,
        default:false
    },
    eco1Ectopico:{
        type:Boolean,
        default:false
    },
    eco1HMR:{
        type:Boolean,
        default:false
    },
    eco2Observacion:{
        type:String
    },
    eco2Fecha:{
        type:Date,
        required: [true, 'La eco2Fecha es requerida']
    },
    eco2EG:{
        type:String
    },
    eco2LFC:{
        type:Boolean,
        default:false
    },
    eco2Embrion:{
        type:Number,
        default:0
    },
    eco2Saco:{
        type:Boolean,
        default:false
    },
    eco2Ubicacion:{
        type:String
    },
    eco2Normoincerto:{
        type:Boolean,
        default:false
    },
    eco2Ectopico:{
        type:Boolean,
        default:false
    },
    eco2HMR:{
        type:Boolean,
        default:false
    },
    labFecha:{
        type:Date,
        required: [true, 'La labFecha es requerida']
    },
    labGB:{
        type:String
    },
    labGR:{
        type:String
    },
    labHb:{
        type:String
    },
    labHto:{
        type:String
    },
    labGrupo:{
        type:String
    },
    labFactor:{
        type:String
    },
    fecha:{
        type:Date,
        required: [true, 'La Fecha es requerida']
    },
    consejeriaId:{
        type:String
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// estudioComplementarioSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

estudioComplementarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('EstudiosComplementarios', estudioComplementarioSchema);
