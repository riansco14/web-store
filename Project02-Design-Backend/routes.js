const express=require('express');
const routes=express.Router();

routes.get('/', function (req, res) {
    return res.redirect('/intrutores');
});

routes.get('/intrutores', function(req,res) {
    return res.render("intrutores/index");
});

routes.get('/membros', function(req,res) {
    return res.send("M");
});

module.exports=routes;