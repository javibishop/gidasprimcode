const express = require('express')
const app = express()
const _ = require('underscore')
const Especialidad = require('../models/especialidad')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/especialidad/:id', verificaToken, (req, res)  => {
    Especialidad.findById(req.params.id)
    .exec((err, especialidad) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(especialidad);
            
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/especialidad', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Especialidad.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, especialidades) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // Especialidad.count((err, cantidad) =>{
            //     return res.json(especialidad);
            // })
            return res.json(especialidades);
        }
    });     
})

app.post('/especialidad', [verificaToken],  (req, res) => {
    let body = req.body;
    let especialidad = new Especialidad({
        nombre: body.nombre
    });
    
    especialidad.save((err, especialidadDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: especialidadDB});
        }
    })
})

app.put('/especialidad/:id', [verificaToken], (req, res) => {
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
    Especialidad.findByIdAndUpdate(id, body, optionsMongoose, (err, especialidadDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: especialidadDB});
        }
    })
    
})

module.exports = app;