const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let antecedenteSchema = new Shcema({
    gestas:{
        type:Number,
        default:0
    },
    partosVaginal:{
        type:Number,
        default:0
    },
    cesareas:{
        type:Number,
        default:0
    },
    abortoEspontaneo:{
        type:Number,
        default:0
    },
    abortoVoluntario:{
        type:Number,
        default:0
    },
    fecha:{
        type:Date,
        required: [true, 'La fecha es requerida']
    },
    mACNoUsa:{
        type:Boolean,
        default:false
    },
    mACACO:{
        type:Boolean,
        default:false
    },
    mACACI:{
        type:Boolean,
        default:false
    },
    mACDIU:{
        type:Boolean,
        default:false
    },
    mCPreservativo:{
        type:Boolean,
        default:false
    },
    mACImplanteHormonal:{
        type:Boolean,
        default:false
    },
    falloMAC:{
        type:Boolean,
        default:false
    },
    noUsoMAC:{
        type:Boolean,
        default:false
    },
    aHEMAC:{
        type:Number,
        default:0
    },
    antecedentesPersonales:{
        type:String
    },
    observaciones:{
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

antecedenteSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Antecedentes', antecedenteSchema);
