const express = require('express')
const app = express()
const Partido = require('../models/partido')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/partido/:provinciaId', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);
    let filtro = {};
    if(req.params.provinciaId){
        filtro = {provinciaId:req.params.provinciaId};
    }

    Partido.find(filtro)
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, partidos) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(partidos);
            
        }
    });     
})

app.post('/partido', [verificaToken],  (req, res) => {
    
    let body = req.body;
    let part = new Partido({
        nombre: body.nombre,
        provinciaId: body.provinciaId,
    });
    
    part.save((err, partDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: partDB});
        }
    })
})


module.exports = app;