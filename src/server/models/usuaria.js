const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let usuariaSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    apellido:{
        type:String,
        required: [true, 'El apellido es requerido']
    },
    edad:{
        type:Number,
        required: [true, 'La edad es requerida']
    },
    fechaNacimiento:{
        type:Date,
        required: [true, 'La fechaNacimiento es requerida']
    },
    nacionalidadId:{
        type:String,
        required: [true, 'La nacionalidad es requerida']
    },
    provinciaId:{
        type:String,
        required: [true, 'La provincia es requerida']
    },
    partidoId:{
        type:String,
        required: [true, 'El partido es requerida']
    },
    localidadId:{
        type:String,
        required: [true, 'La Localidad es requerida']
    },
    documento:{
        type:String,
        required: [true, 'El documento es requerido']
    },
    telefono:{
        type:String
    },
    direccion:{
        type:String
    },
    usuarioCentroSalud:{
        type:Boolean,
        default:false
    },
    parejaConViviente:{
        type:Boolean,
        default:false
    },
    parejaNoConViviente:{
        type:Boolean,
        default:false
    },
    sinPareja:{
        type:Boolean,
        default:false
    },
    conocePorConocido:{
        type:Boolean,
        default:false
    },
    conocePorUS:{
        type:Boolean,
        default:false
    },
    conocePorOrganizacion:{
        type:Boolean,
        default:false
    },
    conocePorMedios:{
        type:Boolean,
        default:false
    },
    conocePorUsuarioConsejeria:{
        type:Boolean,
        default:false
    },
    conocePorInsititucionSalud:{
        type:Boolean,
        default:false
    },
    conocePorReferente:{
        type:Boolean,
        default:false
    },
    conocePorInsititucionSaludObs:{
        type:String
    },
    conocePorOtro:{
        type:String
    },
    nivelInstruccion:{
        type:Number
    },
    nivelInstruccionEstado:{
        type:Number
    },
    estado:{
        type:Boolean,
        default:true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// usuariaSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

usuariaSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuarias', usuariaSchema);
