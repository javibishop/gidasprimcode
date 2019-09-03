const jwt = require('jsonwebtoken');

let verificaToken =  (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if(err) {
            return res.status(401).json({ok: false, err : {err, mensaje:'Token no valido'}});
        }else{
            //info correcta. 
            req.usuario = decode.usuario;
            //ejecuta lo que sigue.
            next();
        }
    });
};

/* middleware para verificacion de rol de usuario para acciones de administracion de usuarios */
let verificaRol = (req, res, next) => {
    let usuario = req.usuario;
    if(usuario.role === process.env.USER_MANAGER_ROLE)
        next();
    else
        return res.status(401).json({ok: false, mensaje:'Usuario no tiene permisos para manejar usuarios'});

}
module.exports = {verificaToken, verificaRol};