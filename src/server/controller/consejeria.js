const express = require('express')
const app = express()
const _ = require('underscore')
const Consejeria = require('../models/consejeria')
const { verificaToken } =  require('../middlewares/authentication');
const mongoose = require('mongoose');
//cada vez q hago un get, se ejecuta el middleware
app.get('/consejeria/:id', verificaToken, (req, res)  => {
    Consejeria.findById(req.params.id)
    .populate('usuariaId')
    .populate('usuarie1Id')
    .populate('usuarie2Id')
    .exec((err, consejeria) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // consejeria.count((err, cantidad) =>{
            //     return res.json(consejeria);
            // })
            return res.json(consejeria);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/consejeria', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Consejeria.find()
    .populate('usuariaId')
    .populate('usuarie1Id')
    .populate('usuarie2Id')
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, consejeria) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(consejeria);
            
        }
    });     
})

app.post('/consejeria', verificaToken,  (req, res) => {
    let body = req.body;
    let consejeria = new Consejeria({
        numero: body.numero,
        fechaIngreso: body.fechaIngreso,
        observacion: body.observacion,
        usuariaId: new mongoose.Types.ObjectId(body.usuariaId.id),
        usuarie1Id: new mongoose.Types.ObjectId(body.usuarie1Id.id),
        usuarie2Id: new mongoose.Types.ObjectId(body.usuarie2Id.id),
        estado: body.estado
    });
    
    consejeria.save((err, consejeriaDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(consejeriaDB);
        }
    })
})

app.put('/consejeria/:id', verificaToken, (req, res) => {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    
    //new, es para que retorne el usuario actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query'
    }
    let consejeria = req.body;
    consejeria.usuariaId = consejeria.usuariaId.id;
    consejeria.usuarie1Id = consejeria.usuarie1Id.id;
    consejeria.usuarie2Id = consejeria.usuarie2Id.id;
    Consejeria.findByIdAndUpdate(id, consejeria,optionsMongoose, (err, consejeriaDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json(consejeriaDB);
        }
    })
    
})

module.exports = app;