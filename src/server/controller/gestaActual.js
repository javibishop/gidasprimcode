const express = require('express')
const app = express()
const _ = require('underscore')
const GestaActual = require('../models/gestaActual')
const { verificaToken } =  require('../middlewares/authentication');
//cada vez q hago un get, se ejecuta el middleware
app.get('/gestaactual/:id', verificaToken, (req, res)  => {
    GestaActual.findById(req.params.id)
    .exec((err, GestaActual) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(GestaActual);   
        }
    });   
})

app.get('/gestaactual/porconsejeria/:id', verificaToken, (req, res)  => {
    GestaActual.findOne({consejeriaId: req.params.id})
    .exec((err, gesta) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(gesta);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/gestaactual', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    GestaActual.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, gestaactual) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(gestaactual);
        }
    });     
})

app.post('/gestaactual', verificaToken,  (req, res) => {
    let gestaactual = new GestaActual({
        enteroPorTestOrina :req.body.enteroPorTestOrina,
        enteroPorTestOrinaObservaciones :req.body.enteroPorTestOrinaObservaciones,
        enteroFecha: req.body.enteroFecha,
        fum : req.body.fum,
        egfum :req.body.egfum,
        intentoSuprimir :req.body.intentoSuprimir,
        intentoSuprimirObservaciones :req.body.intentoSuprimirObservaciones,
        loComento :req.body.loComento,
        loComentoAQuien :req.body.loComentoAQuien,
        causaSaludIntegral :req.body.causaSaludIntegral,
        causaViolacion :req.body.causaViolacion,
        causaSinVE :req.body.causaSinVE,
        calendarioVacunacionCompleto :req.body.calendarioVacunacionCompleto,
        calendarioVacunacionObservaciones :req.body.calendarioVacunacionObservaciones,
        cUMSPACO :req.body.cUMSPACO,
        cUMSPDisfuncionHepaticaSevera :req.body.cUMSPDisfuncionHepaticaSevera,
        cUMSPEmbarazoEctopico :req.body.cUMSPEmbarazoEctopico,
        cUMSPAlergiaMisoDiclo :req.body.cUMSPAlergiaMisoDiclo,
        factorRiesgoHb7 :req.body.factorRiesgoHb7,
        factorRiesgoCardiopatia :req.body.factorRiesgoCorticoterapia,
        factorRiesgoDIU :req.body.factorRiesgoDIU,
        factorRiesgoCardiovascular :req.body.factorRiesgoCardiovascular,
        factorRiesgoCorticoterapia :req.body.factorRiesgoCardiopatia,
        factorRiesgoOtros :req.body.factorRiesgoOtros,
        consejeriaId :req.body.consejeriaId
    });
    
    gestaactual.save((err, gesta) => {
        if(err){
            return res.status(400).json({ok: false, error: err});
        }else{
            return res.json(gesta);
        }
    })
})

app.put('/gestaactual/:id', verificaToken,  (req, res) => {
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
    
    // delete req.body.id;
    // delete req.body._id;

    GestaActual.findByIdAndUpdate(id, req.body, optionsMongoose, (err, antecedenteDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDB);
        }
    })
    
})

module.exports = app;