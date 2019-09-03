const express = require('express')
const app = express()
const Usuaria = require('../models/usuaria')
const bcrypt = require('bcrypt');
const _ = require('underscore')
const { verificaToken, verificaRol } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/usuaria', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuaria);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 5);

    //usuaria.find({google:true}) filtro por google = true
    let filtro = {estado:true};
    Usuaria.find(filtro)
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, usuarias) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuariaDB.password = null;
            usuaria.count(filtro, (err, cantidad) =>{
                return res.json(usuarias);
            })
            
        }
    });     
})

app.get('/usuaria/:id', verificaToken, (req, res)  => {
    Usuaria.findById(req.params.id)
    .exec((err, usuaria) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(usuaria);
        }
    });   
})

app.get('/usuaria/porconsejeria/:id', verificaToken, (req, res)  => {
    Usuaria.findOne({consejeriaId: req.params.id})
    .exec((err, usuaria) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(usuaria);   
        }
    });   
})

//  app.post('/usuaria', [verificaToken, verificaRol],  (req, res) => {
app.post('/usuaria', verificaToken, (req, res) => {
    //req.body es lo que parseo el body parser.
    let body = req.body;
    //console.log(body);

    let usuaria = new Usuaria({
        nombre : body.nombre,
        apellido : body.apellido,
        edad : body.edad,
        activo : body.activo,
        fechaNacimiento : body.fechaNacimiento,
        nacionalidadId : body.nacionalidadId,
        telefono : body.telefono,
        direccion : body.direccion,
        documento : body.documento,
        provinciaId : body.provinciaId,
        partidoId : body.partidoId,
        usuarioCentroSalud : body.usuarioCentroSalud,
        parejaConViviente : body.parejaConViviente,
        parejaNoConViviente : body.parejaNoConViviente,
        sinPareja : body.sinPareja,
        conocePorConocido : body.conocePorConocido,
        conocePorUS : body.conocePorUS,
        conocePorOrganizacion : body.conocePorOrganizacion,
        conocePorMedios : body.conocePorMedios,
        conocePorUsuarioConsejeria : body.conocePorUsuarioConsejeria, 
        conocePorInsititucionSalud  : body.conocePorInsititucionSalud,
        conocePorReferente : body.conocePorReferente,
        conocePorInsititucionSaludObs : body.conocePorInsititucionSaludObs,
        conocePorOtro : body.conocePorOtro,
        nivelInstruccion : body.nivelInstruccion,
        nivelInstruccionEstado : body.nivelInstruccionEstado,
        localidadId : body.localidadId
    });
    
    usuaria.save((err, usuariaDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuariaDB.password = null;
            return res.json({ok: true, usuaria: usuariaDB});
        }
    })
})

app.put('/usuaria/:id', verificaToken, (req, res) => {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    //una forma de quitar el pass y el role para que no se modifiquen es:
    // delete body.password;
    // delete body.google;
    //o con underscore

    //let body = _.pick(req.body, ['nombre, apellido, userName, especialidadId, estado']);

    //new, es para que retorne el usuaria actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query'
    }
    Usuaria.findByIdAndUpdate(id, req.body, optionsMongoose, (err, usuariaDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuariaDB.password = null;
            return res.json({ok: true, usuaria: usuariaDB});
        }
    })
    
})

app.delete('/usuaria/fisico/:id', [verificaToken, verificaRol],  (req, res) =>{
    let id = req.params.id;
    Usuaria.findByIdAndRemove(id, (err, usuariaBorrado) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            if(usuariaBorrado){
                return res.json({ok: true, mensaje: 'usuaria eliminado!.', usuariaBorrado});
            }else{
                return res.json({ok: true, mensaje: 'usuaria no encontrado'});
            }
            
        }
    })
})

app.delete('/usuaria/:id', [verificaToken, verificaRol],  (req, res) => {
    let id = req.params.id;
    let optionsMongoose = {
        new: true, 
        runValidators:true
    }
    Usuaria.findByIdAndUpdate(id, {estado:false}, optionsMongoose, (err, usuariaDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuariaDB.password = null;
            return res.json({ok: true, usuaria: usuariaDB});
        }
    })
})

module.exports = app;