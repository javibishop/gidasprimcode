const express = require('express')
const app = express()
const Usuarie = require('../models/usuarie')
const bcrypt = require('bcrypt');
const _ = require('underscore')
const { verificaToken, verificaRol } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/usuarie', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 5);

    //usuarie.find({google:true}) filtro por google = true
    let filtro = {estado:true};
    Usuarie.find(filtro, 'nombre apellido userName especialidadId estado')
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, usuaries) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarieDB.password = null;
            // Usuarie.count(filtro, (err, cantidad) =>{
            //     return res.json(usuaries);
            // })
            
            return res.json(usuaries);
        }
    });     
})

app.get('/usuarie/:id', verificaToken, (req, res)  => {
    Usuarie.findById(req.params.id)
    .exec((err, usuarie) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // Usuarie.count((err, cantidad) =>{
            //     return res.json(usuarie);
            // })
            return res.json(usuarie);
        }
    });   
})

//  app.post('/usuarie', [verificaToken, verificaRol],  (req, res) => {
app.post('/usuarie', verificaToken, (req, res) => {
    //req.body es lo que parseo el body parser.
    let body = req.body;
    //console.log(body);

    let usuarie = new Usuarie({
        nombre: body.nombre,
        apellido: body.apellido,
        userName: body.userName,
        password: bcrypt.hashSync( body.password, 10),
        especialidadId: body.especialidadId
    });
    
    usuarie.save((err, usuarieDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarieDB.password = null;
            return res.json({ok: true, usuarie: usuarieDB});
        }
    })
})

app.put('/usuarie/:id', verificaToken,  (req, res) => {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    //una forma de quitar el pass y el role para que no se modifiquen es:
    // delete body.password;
    // delete body.google;
    //o con underscore

    let body = _.pick(req.body, ['nombre, apellido, userName, especialidadId, estado']);

    //new, es para que retorne el usuarie actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query'
    }
    Usuarie.findByIdAndUpdate(id, body, optionsMongoose, (err, usuarieDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarieDB.password = null;
            return res.json({ok: true, usuarie: usuarieDB});
        }
    })
    
})

app.delete('/usuarie/fisico/:id', verificaToken,  (req, res) =>{
    let id = req.params.id;
    Usuarie.findByIdAndRemove(id, (err, usuarieBorrado) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            if(usuarieBorrado){
                return res.json({ok: true, mensaje: 'usuarie eliminado!.', usuarieBorrado});
            }else{
                return res.json({ok: true, mensaje: 'usuarie no encontrado'});
            }
            
        }
    })
})

app.delete('/usuarie/:id', verificaToken,  (req, res) => {
    let id = req.params.id;
    let optionsMongoose = {
        new: true, 
        runValidators:true
    }
    Usuarie.findByIdAndUpdate(id, {estado:false}, optionsMongoose, (err, usuarieDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarieDB.password = null;
            return res.json({ok: true, usuarie: usuarieDB});
        }
    })
})

module.exports = app;