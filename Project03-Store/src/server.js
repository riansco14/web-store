const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const session = require('./config/session')

const server = express();
server.use(session)
server.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})//adiciona a sessão as response

server.use(express.urlencoded({ extended: true })); //aceita o body do post do cadastro
server.use(express.static('public')); // arquivos da pasta public
server.use(methodOverride('_method')); //faz o formulário aceitar PUT e DELETE com o uso do query ?_method=PUT
server.use(routes); //rotas http do site

server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
    express: server, autoescape: false, noCache: true
})

server.use(routes)
server.listen(5000);