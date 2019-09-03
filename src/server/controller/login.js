const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarie = require('../models/usuarie');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuarie.findOne({email:body.userName}, (err, usuarioDB) => {
        if(err){
            return res.status(500).json({ok: false, err});
        }else{
            if(!usuarioDB){
                return res.status(400).json({ok: false, err : { message:'Usuario o contraseña incorrectos.'}});
            }

            //compara las claves.
            if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                return res.status(400).json({ok: false, err : { message:'Usuario o contraseña incorrectos.'}});
            }else{
                let token = jwt.sign({
                    usuario: usuarioDB
                }, 
                process.env.SEED,
                {expiresIn: process.env.CADUCIDAD_TOKEN}
                )
                res.json({ok:true, usuarioDB, token});
            }
        }
    });
    
})
//le agrego a app de express lo que voy a hacer aca.
module.exports = app;



