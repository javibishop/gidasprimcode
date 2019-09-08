const express = require('express')
const app = express()
const Provincia = require('../models/provincia')
const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/provincia/:paisId?', verificaToken, (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
   let hasta = Number(req.query.hasta || 500);
    let filtro = {paisId:1};
    if(req.params.paisId){
        filtro = {paisId:req.params.paisId};
    }

    Provincia.find(filtro)
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, provincias) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(provincias);
            
        }
    });     
})

app.post('/provincia', [verificaToken],  (req, res) => {
    let body = req.body;
    let provincia = new Provincia({
        nombre: body.nombre,
        paisId:body.paisId
    });
    
    provincia.save((err, paisDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: paisDB});
        }
    })
})


module.exports = app;