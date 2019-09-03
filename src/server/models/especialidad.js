const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let especialidadSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// especialidadSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

especialidadSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});
module.exports = mongoose.model('Especialidades', especialidadSchema);
