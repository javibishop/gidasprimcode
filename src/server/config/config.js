/*
Puerto
*/

process.env.PORT = process.env.PORT || 3000;

/*VARIABLE que establece heroku */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB ;
let URLFront ;
let baseUrl;
if(process.env.NODE_ENV === 'dev'){
    //urlDB = 'mongodb://localhost:27017/ts';
    urlDB = 'mongodb+srv://tsvarela:hQ3KjYlIx7YYHna5@cluster0-cltbj.mongodb.net/tsvarela';
    URLFront = 'http://localhost:4200/';
}else{
    urlDB = process.env.URLDB;
    URLFront= process.env.URLFront;
    baseUrl = process.env.baseUrl;
}


//TOKEN
//vigencia de 1 mes
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//firma de var config heroku o hardcode para generar tokens.
process.env.SEED = process.env.SEED || 'este-es-el-sing';

process.env.USER_MANAGER_ROLE = 'ADMIN_ROLE';

process.env.URLDB = urlDB;

process.env.URLFront = URLFront;

process.env.baseUrl = baseUrl;