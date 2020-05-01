const express=require('express');
const routes=express.Router();

const instrutores=require("./instrutores");
const membros=require("./membros");

routes.get('/', function (req, res) {
    return res.redirect('/instrutores');
});

routes.get('/instrutores',  instrutores.index);
routes.get('/instrutores/cadastro', function(req,res) {
    return res.render("instrutores/cadastro");
});
routes.get('/instrutores/:id', instrutores.findByPK, function(req,res){
    const instrutor=req.instrutor;
    return res.render("instrutores/show", {instrutor});
});
routes.get('/instrutores/:id/editar', instrutores.findByPK, function(req,res){
    const instrutor=req.instrutor;
    return res.render("instrutores/editar",{instrutor});
});
routes.post('/instrutores', instrutores.post);
routes.put('/instrutores', instrutores.put);
routes.delete('/instrutores/:id', instrutores.delete);

routes.get('/membros',  membros.index);
routes.get('/membros/cadastro', function(req,res) {
    return res.render("membros/cadastro");
});
routes.get('/membros/:id', membros.findByPK, function(req,res){
    const membro=req.membro;
    return res.render("membros/show", {membro});
});
routes.get('/membros/:id/editar', membros.findByPK, function(req,res){
    const membro=req.membro;
    return res.render("membros/editar",{membro});
});
routes.post('/membros', membros.post);
routes.put('/membros', membros.put);
routes.delete('/membros/:id', membros.delete);

module.exports=routes;