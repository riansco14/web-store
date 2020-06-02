const express=require('express');
const routes=express.Router();
const multer = require('./app/middlewares/multer')
const ProdutoController=require('./app/controllers/ProdutoController');


routes.get('/', function (req, res) {
    return res.render('layout');
});

routes.get('/produtos/create', ProdutoController.create);
routes.get('/produtos/:id/edit', ProdutoController.edit);
routes.post('/produtos', multer.array("fotos", 6) ,ProdutoController.post);
routes.put('/produtos', multer.array("fotos", 6), ProdutoController.put);
routes.delete('/produtos', ProdutoController.delete);

routes.get('/ads/create')

module.exports=routes;