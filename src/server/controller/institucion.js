const express = require('express')
const app = express()
const _ = require('underscore')
const Institucion = require('../models/institucion')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/institucion/:id', verificaToken, (req, res)  => {
    Institucion.findById(req.params.id)
    .exec((err, institucion) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(institucion);
            
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/institucion', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
   let hasta = Number(req.query.hasta || 500);

    Institucion.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, instituciones) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // Especialidad.count((err, cantidad) =>{
            //     return res.json(institucion);
            // })
            return res.json(instituciones);
        }
    });     
})

app.post('/institucion', [verificaToken],  (req, res) => {
    let body = req.body;
    let institucion = new Institucion({
        nombre: body.nombre,
        telefono : body.telefono,
        direccion : body.direccion,
        provinciaId : body.provinciaId,
        partidoId : body.partidoId,
        localidadId : body.localidadId,
        tipo : body.tipo
    });
    
    institucion.save((err, institucionDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: institucionDB});
        }
    })
})

app.put('/institucion/:id', [verificaToken], (req, res) => {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);
    //new, es para que retorne el usuario actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query'
    }
    Institucion.findByIdAndUpdate(id, req.body, optionsMongoose, (err, institucionDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: institucionDB});
        }
    })
    
})

module.exports = app;