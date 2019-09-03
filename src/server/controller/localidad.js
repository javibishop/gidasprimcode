const express = require('express')
const app = express()
const Localidad = require('../models/localidad')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/localidad/:partidoId', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);
    let filtro = {};
    if(req.params.partidoId){
        filtro = {partidoId:req.params.partidoId};
    }

    Localidad.find(filtro)
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, localidades) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(localidades);
            
        }
    });     
})

app.post('/localidad', [verificaToken],  (req, res) => {
    let body = req.body;
    let loc = new Localidad({
        nombre: body.nombre,
        partidoId: body.partidoId,
        cp:body.cp
    });
    
    loc.save((err, partDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: partDB});
        }
    })
    
})


module.exports = app;