const express = require('express')
const app = express()
const _ = require('underscore')
const EstudioComplementario = require('../models/estudioComplementario')
const { verificaToken } =  require('../middlewares/authentication');
//cada vez q hago un get, se ejecuta el middleware
app.get('/estudiocomplementario/:id', verificaToken, (req, res)  => {
    EstudioComplementario.findById(req.params.id)
    .exec((err, EstudioComplementario) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(EstudioComplementario);   
        }
    });   
})

app.get('/estudiocomplementario/porconsejeria/:id', verificaToken, (req, res)  => {
    EstudioComplementario.findOne({consejeriaId: req.params.id})
    .exec((err, estudio) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(estudio);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/estudiocomplementario', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
   let hasta = Number(req.query.hasta || 500);

    EstudioComplementario.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, estudiocomplementario) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(estudiocomplementario);
        }
    });     
})

app.post('/estudiocomplementario', verificaToken,  (req, res) => {
    let estudiocomplementario = new EstudioComplementario({
        eco1Observacion :req.body.eco1Observacion,
        eco1Fecha: req.body.eco1Fecha,
        eco1EG :req.body.eco1EG,
        eco1LFC :req.body.eco1LFC,
        eco1Embrion :req.body.eco1Embrion,
        eco1Saco :req.body.eco1Saco,
        eco1Ubicacion :req.body.eco1Ubicacion,
        eco1Normoincerto :req.body.eco1Normoincerto,
        eco1Ectopico :req.body.eco1Ectopico,
        eco1HMR :req.body.eco1HMR,
        eco2Observacion :req.body.eco2Observacion,
        eco2Fecha: req.body.eco2Fecha,
        eco2EG :req.body.eco2EG,
        eco2LFC :req.body.eco2LFC,
        eco2Embrion :req.body.eco2Embrion,
        eco2Saco :req.body.eco2Saco,
        eco2Ubicacion :req.body.eco2Ubicacion,
        eco2Normoincerto :req.body.eco2Normoincerto,
        eco2Ectopico :req.body.eco2Ectopico,
        eco2HMR :req.body.eco2HMR,
        labFecha: req.body.labFecha,
        labGB :req.body.labGB,
        labGR :req.body.labGR,
        labHb :req.body.labHb,
        labHto :req.body.labHto,
        labGrupo :req.body.labGrupo,
        labFactor :req.body.labFactor,
        consejeriaId :req.body.consejeriaId,
        fecha: req.body.fecha
    });
    
    estudiocomplementario.save((err, antecedenteDb) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDb);
        }
    })
})

app.put('/estudiocomplementario/:id', verificaToken,  (req, res) => {
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
    
    EstudioComplementario.findByIdAndUpdate(id, req.body, optionsMongoose,(err, antecedenteDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDB);
        }
    })
    
})

module.exports = app;