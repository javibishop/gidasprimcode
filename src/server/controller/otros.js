const express = require('express')
const app = express()
const _ = require('underscore')
const Otro = require('../models/otro')
const { verificaToken } =  require('../middlewares/authentication');
//cada vez q hago un get, se ejecuta el middleware
app.get('/otro/:id', verificaToken, (req, res)  => {
    Otro.findById(req.params.id)
    .exec((err, Otro) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(Otro);   
        }
    });   
})

app.get('/otro/porconsejeria/:id', verificaToken, (req, res)  => {
    Otro.findOne({consejeriaId: req.params.id})
    .exec((err, Otro) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(Otro);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/otro', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
   let hasta = Number(req.query.hasta || 500);

    Otro.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, otro) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(otro);
        }
    });     
})

app.post('/otro', verificaToken,  (req, res) => {
    let otro = new Otro({
         violenciaDG :req.body.violenciaDG,
         violenciaDGTipo :req.body.violenciaDGTipo,
         violenciaDGObservaciones: req.body.violenciaDGObservaciones,
         violenciaI :req.body.violenciaI,
         violenciaIDeQuien :req.body.violenciaIDeQuien,
         violenciaIComo :req.body.violenciaIComo,
         acompaniamiento :req.body.acompaniamiento,
         acompaniamientoLugar :req.body.acompaniamientoLugar,
         acompaniamientoDispositivo :req.body.acompaniamientoDispositivo,
         abusoSexual :req.body.abusoSexual,
         abusoSexualDJurada :req.body.abusoSexualDJurada,
         abusoSexualDPenal :req.body.abusoSexualDPenal,
         circuitoActual :req.body.circuitoActual,
         circuitoAnterior :req.body.circuitoAnterior,
         circuitoObservaciones: req.body.circuitoObservaciones,
         consejeriaId :req.body.consejeriaId,
         fecha: req.body.fecha,
    });
    
    otro.save((err, otroDb) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(otroDb);
        }
    })
})

app.put('/otro/:id', verificaToken,  (req, res) => {
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
    
    Otro.findByIdAndUpdate(id, req.body, optionsMongoose, (err, otroDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(otroDB);
        }
    })
    
})

module.exports = app;