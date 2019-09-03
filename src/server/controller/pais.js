const express = require('express')
const app = express()
const Pais = require('../models/pais')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/pais', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Pais.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, paises) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(paises);
        }
    });     
})

app.post('/pais', [verificaToken],  (req, res) => {
    let body = req.body;
    let pais = new Pais({
        nombre: body.nombre
    });
    
    pais.save((err, paisDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: paisDB});
        }
    })
})

module.exports = app;