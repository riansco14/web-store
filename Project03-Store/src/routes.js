const express=require('express');
const routes=express.Router();
const ProdutoController=require('./app/controllers/ProdutoController');


routes.get('/', function (req, res) {
    return res.render('layout');
});

routes.get('/produtos/create', ProdutoController.create);

routes.get('/ads/create')

module.exports=routes;