const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let partidoSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    provinciaId:{
        type:String,
        required: [true, 'La Provincia es requerida']
    }
});

// partidoSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

partidoSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Partidos', partidoSchema);
