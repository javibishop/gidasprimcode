const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let provinciaSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    paisId:{
        type:String,
        required: [true, 'El Pais es requerida']
    }
});

// provinciaSchema.methods.toJSON = function (){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

provinciaSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Provincia', provinciaSchema);
