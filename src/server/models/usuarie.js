const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let roles = {
    values:['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
};

//definicion del schema.
let usuarieSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    apellido:{
        type:String,
        required: [true, 'El apellido es requerido']
    },
    userName:{
        type:String,
        unique:true,
        required: [true, 'El usuario es requerido']
    },
    password:{
        type:String,
        required: [true, 'La clave es requerido']
    },
    especialidadId:{
        type:String,
        required: [true, 'La especialidad es requerida']
    },
    role:{
        type:String,
        default:'USER_ROLE',
        required: [true, 'El role es requerido'],
        enum: roles
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

usuarieSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarieSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuaries', usuarieSchema);
