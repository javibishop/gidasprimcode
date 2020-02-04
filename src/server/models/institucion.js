const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let institucionSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
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
    tipo:{
        type:String
    },
    telefono:{
        type:String
    },
    direccion:{
        type:String
    }
});

institucionSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Insituciones', institucionSchema);
