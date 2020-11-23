const express = require('express')
const app = express()
const _ = require('underscore')
const EntrevistaPostAborto = require('../models/entrevistaPostAborto')
const { verificaToken } =  require('../middlewares/authentication');
//cada vez q hago un get, se ejecuta el middleware
app.get('/entrevistapostaborto/:id', verificaToken, (req, res)  => {
    EntrevistaPostAborto.findById(req.params.id)
    .exec((err, EntrevistaPostAborto) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(EntrevistaPostAborto);   
        }
    });   
})

app.get('/entrevistapostaborto/porconsejeria/:id', verificaToken, (req, res)  => {
    EntrevistaPostAborto.findOne({consejeriaId: req.params.id})
    .exec((err, entrevista) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(entrevista);   
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/entrevistapostaborto', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
   let hasta = Number(req.query.hasta || 500);

    EntrevistaPostAborto.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, entrevistapostaborto) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(entrevistapostaborto);
        }
    });     
})

app.post('/entrevistapostaborto', verificaToken,  (req, res) => {
    let entrevistapostaborto = new EntrevistaPostAborto({
            fecha: req.body.fecha,
            procedimientoObservaciones :req.body.procedimientoObservaciones,
            procedimientoHecho: req.body.procedimientoHecho,
            procedimientoNoContinua :req.body.procedimientoNoContinua,
            procedimientoNoAbortoEspontaneo :req.body.procedimientoNoAbortoEspontaneo,
            procedimientoNoOtro :req.body.procedimientoNoOtro,
            procedimientoSiHecho: req.body.procedimientoSiHecho,
            procedimientoSiInformado :req.body.procedimientoSiInformado,
            procedimientoSiOtra :req.body.procedimientoSiOtra,
            procedimientoSiViaV :req.body.procedimientoSiViaV,
            procedimientoSiViaSL :req.body.procedimientoSiViaSL,
            procedimientoSiOtro :req.body.procedimientoSiOtro,
            accedioPorFarmacia :req.body.accedioPorFarmacia,
            accedioPorConocido :req.body.accedioPorConocido,
            accedioPorInternet :req.body.accedioPorInternet,
            pccedioPorOrgSocial :req.body.pccedioPorOrgSocial,
            pccedioPorSecretariaSalud :req.body.pccedioPorSecretariaSalud,
            presentacionSuelto :req.body.presentacionSuelto,
            presentacionCaja20 :req.body.presentacionCaja20,
            presentacionCaja16 :req.body.presentacionCaja16,
            efectoAdversoNo :req.body.efectoAdversoNo,
            efectoAdversoGastro :req.body.efectoAdversoGastro,
            efectoAdversoTemperatura :req.body.efectoAdversoTemperatura,
            efectoAdversoCafalea :req.body.efectoAdversoCafalea,
            efectoAdversoOtro :req.body.efectoAdversoOtro,
            complicacionNo :req.body.complicacionNo,
            complicacionHemorragia :req.body.complicacionHemorragia,
            complicacionInfeccion :req.body.complicacionInfeccion,
            complicacionOtro :req.body.complicacionOtro,
            indicacionGammaglobulina :req.body.indicacionGammaglobulina,
            ecografiaPostFecha: req.body.ecografiaPostFecha,
            ecografiaPostNoRealizo :req.body.ecografiaPostNoRealizo,
            ecografiaPostAbortoCompleto :req.body.ecografiaPostAbortoCompleto,
            ecografiaPostAbortoIncompleto :req.body.ecografiaPostAbortoCompleto,
            ecografiaPostAbortoHMyR :req.body.ecografiaPostAbortoHMyR,
            ecografiaPostEmbrionViable :req.body.ecografiaPostEmbrionViable,
            ecografiaPostNuevaConsejeria :req.body.ecografiaPostNuevaConsejeria,
            ecografiaPostDerivacion2Nivel :req.body.ecografiaPostDerivacion2Nivel,
            ecografiaPostConductaExpectante :req.body.ecografiaPostConductaExpectante,
            consejeriaMACNo :req.body.consejeriaMACNo,
            consejeriaMACACO :req.body.consejeriaMACACO,
            consejeriaMACACI :req.body.consejeriaMACACI,
            consejeriaMACDIU :req.body.consejeriaMACDIU,
            consejeriaMACPreservativo :req.body.consejeriaMACPreservativo,
            consejeriaMACImplanteHormonal :req.body.consejeriaMACImplanteHormonal,
            consejeriaMACACOLactancia :req.body.consejeriaMACACOLactancia,
            consejeriaId :req.body.consejeriaId
    });
    
    entrevistapostaborto.save((err, antecedenteDb) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDb);
        }
    })
})

app.put('/entrevistapostaborto/:id', verificaToken, (req, res) => {
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
    
    EntrevistaPostAborto.findByIdAndUpdate(id, req.body, optionsMongoose, (err, antecedenteDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(antecedenteDB);
        }
    })
    
})

module.exports = app;