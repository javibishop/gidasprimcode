const express = require('express')
const app = express()
const _ = require('underscore')
const Antecedente = require('../models/antecedente')
const { verificaToken } =  require('../middlewares/authentication');
//cada vez q hago un get, se ejecuta el middleware
app.get('/antecedente/:id', verificaToken, (req, res)  => {
    Antecedente.findById(req.params.id)
    .exec((err, Antecedente) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(Antecedente);   
        }
    });   
})

app.get('/antecedente/porconsejeria/:id', verificaToken, (req, res)  => {
    Antecedente.findOne({consejeriaId: req.params.id})
    .exec((err, Antecedente) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(Antecedente);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/antecedente', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Antecedente.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, antecedente) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedente);
        }
    });     
})

app.post('/antecedente', verificaToken,  (req, res) => {
    let antecedente = new Antecedente({
         gestas :req.body.gestas,
         partosVaginal :req.body.partosVaginal,
         cesareas :req.body.cesareas,
         abortoEspontaneo :req.body.abortoEspontaneo,
         abortoVoluntario :req.body.abortoVoluntario,
         mACNoUsa :req.body.mACNoUsa,
         mACACO :req.body.mACACO,
         mACACI :req.body.mACACI,
         mACDIU :req.body.mACDIU,
         mCPreservativo :req.body.mCPreservativo,
         mACImplanteHormonal :req.body.mACImplanteHormonal,
         falloMAC :req.body.falloMAC,
         noUsoMAC :req.body.noUsoMAC,
         aHEMAC :req.body.aHEMAC,
         observaciones: req.body.observaciones,
         consejeriaId :req.body.consejeriaId,
         fecha: req.body.fecha,
         antecedentesPersonales: req.body.antecedentesPersonales
    });
    
    antecedente.save((err, antecedenteDb) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDb);
        }
    })
})

app.put('/antecedente/:id', verificaToken,  (req, res) => {
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
    
    Antecedente.findByIdAndUpdate(id, req.body, optionsMongoose, (err, antecedenteDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDB);
        }
    })
    
})

module.exports = app;