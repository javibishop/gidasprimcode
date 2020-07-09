const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Usuaria = require('../models/usuaria');
const Usuarie = require('../models/usuarie');
let Shcema = mongoose.Schema;
let consejeriaSchema = new Shcema({
    numero:{
        type:String,
        required: [true, 'El Numero es requerido']
    },
    fechaIngreso:{
        type:Date,
        required: [true, 'La fechaIngreso es requerido']
    },
    observacion:{
        type:String
    },
    usuariaId:{type: mongoose.Schema.ObjectId, ref: Usuaria},
    usuarie1Id:{type: mongoose.Schema.ObjectId, ref: Usuarie },
    usuarie2Id:{type: mongoose.Schema.ObjectId, ref: Usuarie },
    estado:{
        type:Boolean,
        default:true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// consejeriaSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

consejeriaSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Consejerias', consejeriaSchema);
