const express=require('express');
const routes=express.Router();
const multer = require('../app/middlewares/multer')

const ProdutoController=require('../app/controllers/ProdutoController')
const SearchController=require('../app/controllers/SearchController')



routes.get('/search', SearchController.index)


routes.get('/create', ProdutoController.create);
routes.get('/:id', ProdutoController.show);
routes.get('/:id/edit', ProdutoController.edit);
routes.post('/', multer.array("fotos", 6) ,ProdutoController.post);
routes.put('/', multer.array("fotos", 6), ProdutoController.put);
routes.delete('/', ProdutoController.delete);

module.exports=routes;