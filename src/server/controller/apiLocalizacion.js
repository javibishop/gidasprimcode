const express = require('express')
const app = express()
const { verificaToken } =  require('../middlewares/authentication');
const axios = require('axios');
const _ = require('underscore')
const Localidad = require('../models/localidad')
const Partido = require('../models/partido')
const Provincia = require('../models/provincia')

app.get('/provincias', verificaToken, async function (req, res){
    try{
        const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=300&orden=nombre`);
            return res.json(respuesta.data.provincias);
        }
        catch(e){
            return "Error al obtener temperatura";
        }
})

/*partidos */
app.get('/municipios/:provinciaId', verificaToken, async (req, res)  => {
    try{
        const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${req.params.provinciaId}&campos=id,nombre,provincia.id&max=300&orden=nombre`);
            return res.json(respuesta.data.municipios);
        }
        catch(e){
            return "Error al obtener temperatura";
        }
})


app.get('/localidades/:municipioId', verificaToken, async (req, res)  => {
    try{
        const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${req.params.municipioId}&campos=id,nombre,municipio.id&max=300&orden=nombre`);
            return res.json(respuesta.data.localidades);
        }
        catch(e){
            return "Error al obtener temperatura";
        }
})


//cada vez q hago un get, se ejecuta el middleware
// app.get('/migrardatos',  (req, res)  =>  {
//     try{
//      axios.get(`https://apis.datos.gob.ar/georef/api/provincias?id=22`)
//     .then(respuesta => {
//         _.each(respuesta.data.provincias, (prov) => {
//             let provincia = new Provincia({
//                 nombre: prov.nombre,
//                 paisId:req.body.paisId
//             });
//             let provinciaId = '';
//             provincia.save((err, provdb) => {
//                 if(err){
//                     return res.status(400).json({ok: false, err});
//                 }else{
//                     provinciaId = provdb._id;
                    
//                      axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=22&max=300`)
//                     .then(munis => {
//                         _.each(munis.data.municipios, (muni) => {
//                             let part = new Partido({
//                                 nombre: muni.nombre,
//                                 provinciaId: provinciaId,
//                             });
//                             let partidoId = '';
//                             part.save((err, partDB) => {
//                                 if(err){
//                                     return res.status(400).json({ok: false, err});
//                                 }else{
//                                     partidoId = partDB._id;
//                                     if(muni.nombre ==='Campo Largo'){
//                                         let ddd = '';
//                                     }
//                                      axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=22&municipio=220217&campos=id,nombre&max=300`)
//                                     .then(locals => {
//                                         _.each(locals.data.localidades, (loc) => {
//                                             let localidad = new Localidad({
//                                                 nombre: loc.nombre,
//                                                 partidoId: partidoId,
//                                                 cp:'s/n'
//                                             });
                                            
//                                             localidad.save((err, localidadDB) => {
//                                                 if(err){
//                                                     return res.status(400).json({ok: false, err});
//                                                 }
//                                             })
//                                         })

//                                         if(locals.data.localidades.length == 0){
//                                             let localidad = new Localidad({
//                                                 nombre: muni.nombre,
//                                                 partidoId: partidoId,
//                                                 cp:'s/n'
//                                             });
                                            
//                                             localidad.save((err, localidadDB) => {
//                                                 if(err){
//                                                     return res.status(400).json({ok: false, err});
//                                                 }
//                                             })
//                                         }
//                                     })
//                                     .catch(e => {
//                                         // Capturamos los errores
//                                     })
//                                 }
//                             })
                            
                           
//                         }
//                         );
//                     })
//                     .catch(e => {
//                         // Capturamos los errores
//                     })
//                 }
//             })


          
            
            
            
//         })
//     })
//     .catch(e => {
//         // Capturamos los errores
//     })

//     next();
// }
//         catch(e){
//             return "Error al obtener temperatura";
//         }
// })

// app.get('/migrardatos5', async function (req, res)  {
//     try{
//         var datos =  () => {
//             return new Promise((resolve, reject) => {
//                 axios.get(`https://apis.datos.gob.ar/georef/api/localidades?max=4142`)
//                 .then( respuesta => {
//                     resolve(respuesta);
//                 })
//                 .catch(err =>
//                 {
//                     reject(err); 
//                 })
//             });
//           };
          
//           var buscarProvincia = (provNombre) =>{
//             let filtroProv = {};
//             filtroProv = {nombre:provNombre};
//             return new Promise((resolve, reject) => {
//             Provincia.find(filtroProv)
//             .exec((err, provincias) => {
        
//                 if(err){
//                     reject(err);
//                 }else{
//                     resolve(provincias);
//                 }
//             });     
//           }
//         )};

//           var saveProvincia = (provincia) => {
//             return new Promise((resolve, reject) => {
//             provincia.save((err, provDd) => {
//                 if(err){
//                     reject(err);
//                 }else{
//                     resolve(provDd);
//                 }
//             })
//           })
//         }

//           var buscarPartido = (partNombre) =>{
//             let filtroPart = {};
//             filtroPart = {nombre:partNombre};
//             return new Promise((resolve, reject) => {
//             Partido.find(filtroPart)
//             .exec((err, partidos) => {
//                 if(err){
//                     reject(err);
//                 }else{
//                     resolve(partidos);
//                 }
//             });     
//           })}

//           var savePartido = (partido) => {
//             return new Promise((resolve, reject) => {
//             partido.save((err, partidoDd) => {
//                 if(err){
//                     reject(err);
//                 }else{
//                     resolve(partidoDd);
//                 }
//             })
//           })}

//           var saveLocalidad = (Localidad) => {
//             return new Promise((resolve, reject) => {
//                 Localidad.save((err, LocalidadDd) => {
//                 if(err){
//                     reject(err);
//                 }else{
//                     resolve(LocalidadDd);
//                 }
//             })
//           })}

//           var callDatos = async () => {
//             var result = await (datos());     
//             return result;
//          };

//          var callBuscarProvincia = async (provNombre) => {
//             var result = await (buscarProvincia(provNombre));     
//             return result;
//          };

//          var callBuscarPartido = async (partNombre) => {
//             var result = await (buscarPartido(partNombre));     
//             return result;
//          };

//          var callSaveProvincia = async (provincia) => {
//             var result = await (saveProvincia(provincia));     
//             return result;
//          };

//          var callSaveLocalidad = async (localidad) => {
//             var result = await (saveLocalidad(localidad));     
//             return result;
//          };

//          var callSavePartido = async (partido) => {
//             var result = await (savePartido(partido));     
//             return result;
//          };

//          callDatos().then(function(respuesta) {          
//             _.each(respuesta.data.localidades, (local) => {
//                 var provinciaId = '';
//                 var partidoId = '';
//                 callBuscarProvincia(local.provincia.nombre)
//                 .then(function(provincias){
//                     if(provincias.length == 0){
//                         let provincia = new Provincia({
//                             nombre: local.provincia.nombre,
//                             paisId:req.body.paisId
//                         });
                        
//                         callSaveProvincia(provincia)
//                         .then(function(provincia){
//                             provinciaId = provincia._id;
//    //partido
//                             var partidoNombre = local.municipio.nombre ?local.municipio.nombre : local.nombre;
//                             callBuscarPartido(partidoNombre)
//                             .then(function(partidos){
//                                 if(partidos.length == 0){
//                                     let part = new Partido({
//                                         nombre: partidoNombre,
//                                         provinciaId: provinciaId,
//                                     });
                                    
//                                     callSavePartido(part)
//                                     .then(function(partido){
//                                         partidoId = partido._id;

//                                         let loc = new Localidad({
//                                             nombre: local.nombre,
//                                             partidoId: partidoId,
//                                             cp: 's/n'
//                                         });
//                                         if(!partidoId){
//                                             var xxx = 1;
//                                         }
//                                         callSaveLocalidad(loc)
//                                         .then(function(localidad){
        
//                                         })

//                                     })
//                                 }else{
//                                     partidoId = partidos[0]._id;
//                                     let loc = new Localidad({
//                                         nombre: local.nombre,
//                                         partidoId: partidoId,
//                                         cp: 's/n'
//                                     });
//                                     if(!partidoId){
//                                         var xxx = 1;
//                                     }
//                                     callSaveLocalidad(loc)
//                                     .then(function(localidad){
    
//                                     })
//                                 }

                                

//                             })

//                         })
//                     }else{
//                         provinciaId = provincias[0]._id;

//                         //partido
//                         var partidoNombre = local.municipio.nombre ?local.municipio.nombre : local.nombre;
//                         callBuscarPartido(partidoNombre)
//                         .then(function(partidos){
//                             if(partidos.length == 0){
//                                 let part = new Partido({
//                                     nombre: partidoNombre,
//                                     provinciaId: provinciaId,
//                                 });
                                
//                                 callSavePartido(part)
//                                 .then(function(partido){
//                                     partidoId = partido._id;
//                                     let loc = new Localidad({
//                                         nombre: local.nombre,
//                                         partidoId: partidoId,
//                                         cp: 's/n'
//                                     });
//                                     if(!partidoId){
//                                         var xxx = 1;
//                                     }
//                                     callSaveLocalidad(loc)
//                                     .then(function(localidad){
                
//                                     })
//                                 })
//                             }else{
//                                 partidoId = partidos[0]._id;
//                                 let loc = new Localidad({
//                                     nombre: local.nombre,
//                                     partidoId: partidoId,
//                                     cp: 's/n'
//                                 });
//                                 if(!partidoId){
//                                     var xxx = 1;
//                                 }
//                                 callSaveLocalidad(loc)
//                                 .then(function(localidad){
            
//                                 })
//                             }

                            

//                         })
//                     }

                    
//                 })
//             })
//          });
//     }
//     catch{

//     }
// });

// app.get('/migrardatos3', async function (req, res)  {
//     try{
//      const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?max=4142`);
//      try{
//         _.each(respuesta.data.localidades, async (local) => {
//             let provinciaId = '';
//             let partidoId = '';

//             let filtroProv = {};
//             filtroProv = {nombre:local.provincia.nombre};
//             let provincias = await Provincia.find(filtroProv);
//             try{
//                 if(provincias.length == 0){
//                     let provincia = new Provincia({
//                         nombre: local.provincia.nombre,
//                         paisId:req.body.paisId
//                     });
                    
//                     await provincia.save((err, provDd) => {
//                         if(err){
//                             return res.status(400).json({ok: false, err});
//                         }else{
//                             provinciaId = provDd._id;
//                         }
//                     })
//                 }else{
//                     provinciaId = provincias[0]._id;
//                 }
             
                
        
//             }
//             catch
//             {

//             }

//             let filtroPartido = {};
//                     filtroPartido = {nombre:local.municipio.nombre};
//                 let partidos = await Partido.find(filtroPartido)
//                 try {
//                     if(partidos.length == 0){
//                         let part = new Partido({
//                             nombre: local.municipio.nombre,
//                             provinciaId: provinciaId,
//                         });
                        
//                         await part.save((err, parDd) => {
//                             if(err){
//                                 return res.status(400).json({ok: false, err});
//                             }else{
//                                 partidoId = parDd._id;
//                             }
//                         })
//                     }else{
//                         partidoId = partidos[0]._id;
//                     }
//                     let loc = new Localidad({
//                         nombre: local.nombre,
//                         partidoId: partidoId,
//                         cp: 's/n'
//                     });
                    
//                     await  loc.save(async (err, partDB) => {
//                         if(err){
//                             return res.status(400).json({ok: false, err});
//                         }else{
                            
//                         }
//                     })
           
//                      }
//                      catch{

//                      }

//                 if(err){
//                     return res.status(400).json({ok: false, err});
//                 }else{
                    

            
//                 }
//             });
//      }
//      catch{

//      }
     
            
            
            
        
//    }
//     catch(e){
//         return "Error al obtener temperatura";
//     }
// })


// //cada vez q hago un get, se ejecuta el middleware
// app.get('/migrardatos2', async function (req, res)  {
//     try{
//     const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias`);
//     _.each(respuesta.data.provincias, (prov) => {
//         let provincia = new Provincia({
//             nombre: prov.nombre,
//             paisId:req.body.paisId
//         });
//         let provinciaId = '';
//         provincia.save(async function (err, provdb)  {
//             try{
//             if(err){
//                 return res.status(400).json({ok: false, err});
//             }else{
//                 provinciaId = provdb._id;
//                 const munis = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${prov.id}&max=300`);
//                 _.each(munis.data.municipios, (muni) => {
//                     let part = new Partido({
//                         nombre: muni.nombre,
//                         provinciaId: provinciaId,
//                     });
//                     let partidoId = '';
//                     part.save(async function (err, partDB, next) {
//                         try{ 
//                         if(err){
//                             return res.status(400).json({ok: false, err});
//                         }else{
                           

//                             partidoId = partDB._id;
//                             if(muni.nombre ==='Campo Largo'){
//                                 let ddd = '';
//                             }
//                              const locals = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${prov.id}&municipio=${muni.id}&campos=id,nombre&max=300`);
//                             _.each(locals.data.localidades, (loc) => {
//                                 let localidad = new Localidad({
//                                     nombre: loc.nombre,
//                                     partidoId: partidoId,
//                                     cp:'s/n'
//                                 });
                                
//                                 localidad.save(async function (err, localidadDB) {
//                                     try{
//                                     if(err){
//                                         return res.status(400).json({ok: false, err});
//                                     }else{
                                        
//                                     }
//                                     }
//                                     catch(e){
//                                         return "Error al obtener temperatura";
//                                     }
//                                 })
//                             })

//                             if(locals.data.localidades.length == 0){
//                                 let localidad = new Localidad({
//                                     nombre: muni.nombre,
//                                     partidoId: partidoId,
//                                     cp:'s/n'
//                                 });
                                
//                                 localidad.save( async function (err, localidadDB)  {
//                                     try{

                                    
//                                     if(err){
//                                         return res.status(400).json({ok: false, err});
//                                     }else{
                                       
//                                     }
//                                 }
//                                 catch(e){
//                                     return "Error al obtener temperatura";
//                                 }
//                                 })
//                             }

                           
//                         }

//                     }
//                     catch(e){
//                         return "Error al obtener temperatura";
//                     }
//                     })            
                
//             })  
             
//             }
//         }
//         catch(e){
//             return "Error al obtener temperatura";
//         }
        
//     })

    
//     })
//     next();
//     }
//     catch(e){
//         return "Error al obtener temperatura";
//     }
// })


// //cada vez q hago un get, se ejecuta el middleware
// app.get('/migrardatos4', async function (req, res)  {
//     try{
//     const respuesta = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias`);
//     _.each(respuesta.data.provincias, async (prov) => {
//         let provincia = new Provincia({
//             nombre: prov.nombre,
//             paisId:req.body.paisId
//         });
//         let provinciaId = '';
//         await provincia.save(async function (err, provdb)  {
//             try{
//             if(err){
//                 return res.status(400).json({ok: false, err});
//             }else{
//                 provinciaId = provdb._id;
//                 const munis = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${prov.id}&max=300`);
//                 _.each(munis.data.municipios, async  (muni) => {
//                     let part = new Partido({
//                         nombre: muni.nombre,
//                         provinciaId: provinciaId,
//                     });
//                     let partidoId = '';
//                     await part.save(async function (err, partDB, next) {
//                         try{ 
//                         if(err){
//                             return res.status(400).json({ok: false, err});
//                         }else{
                           
                            
//                             partidoId = partDB._id;
//                             if(muni.nombre ==='Campo Largo'){
//                                 let ddd = '';
//                             }
//                              const locals = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${prov.id}&municipio=${muni.id}&campos=id,nombre&max=300`);
//                             await _.each(locals.data.localidades, async (loc) => {
//                                 let localidad = new Localidad({
//                                     nombre: loc.nombre,
//                                     partidoId: partidoId,
//                                     cp:'s/n'
//                                 });
                                
//                                 await localidad.save(async function (err, localidadDB) {
//                                     try{
//                                     if(err){
//                                         return res.status(400).json({ok: false, err});
//                                     }else{
                                        
//                                     }
//                                     }
//                                     catch(e){
//                                         return "Error al obtener temperatura";
//                                     }
//                                 })
//                             })

//                             if(locals.data.localidades.length == 0){
//                                 let localidad = new Localidad({
//                                     nombre: muni.nombre,
//                                     partidoId: partidoId,
//                                     cp:'s/n'
//                                 });
                                
//                                 await localidad.save( async function (err, localidadDB)  {
//                                     try{

                                    
//                                     if(err){
//                                         return res.status(400).json({ok: false, err});
//                                     }else{
                                       
//                                     }
//                                 }
//                                 catch(e){
//                                     return "Error al obtener temperatura";
//                                 }
//                                 })
//                             }

                           
//                         }

//                     }
//                     catch(e){
//                         return "Error al obtener temperatura";
//                     }
//                     })            
                
//             })  
             
//             }
//         }
//         catch(e){
//             return "Error al obtener temperatura";
//         }
        
//     })

    
//     })
//     next();
//     }
//     catch(e){
//         return "Error al obtener temperatura";
//     }
// })



/* info pagina gob
https://datosgobar.github.io/georef-ar-api/open-api/#/ 
https://datos.gob.ar/dataset/modernizacion-servicio-normalizacion-datos-geograficos/archivo/modernizacion_7.2
*/

module.exports = app;