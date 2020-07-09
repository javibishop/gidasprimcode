const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let localidadSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    partidoId:{
        type:String,
        required: [true, 'El Partido es requerido']
    },
    cp:{
        type:String,
        required: [true, 'El CP es requerido']
    }
});

// localidadSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

localidadSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Localidades', localidadSchema);
