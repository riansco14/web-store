const express= require('express');
const nunjucks= require('nunjucks');
const routes=require('./routes');


const server = express();
server.use(express.urlencoded({extended: true})); //aceita o body do post do cadastro
server.use(express.static('public')); // arquivos da pasta public
server.use(routes); //rotas http do site
server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server, autoescape: false, noCache: true
})

server.use(routes)
server.listen(5000);