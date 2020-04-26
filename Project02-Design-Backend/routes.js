const express=require('express');
const routes=express.Router();

const instrutores=require("./instrutores")

routes.get('/', function (req, res) {
    return res.redirect('/instrutores');
});

routes.get('/instrutores', function(req,res) {
    return res.render("instrutores/index");
});

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

routes.get('/membros', function (req, res) {
    return res.send("M");
});

module.exports=routes;