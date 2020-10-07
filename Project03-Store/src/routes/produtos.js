const express=require('express');
const routes=express.Router();
const multer = require('../app/middlewares/multer')

const ProdutoController=require('../app/controllers/ProdutoController')
const SearchController=require('../app/controllers/SearchController')

const {onlyUsuario} = require('../app/middlewares/session')

routes.get('/search', SearchController.index)


routes.get('/create', onlyUsuario, ProdutoController.create);
routes.get('/:id', ProdutoController.show);
routes.get('/:id/edit',onlyUsuario, ProdutoController.edit);

routes.post('/',onlyUsuario, multer.array("fotos", 6) ,ProdutoController.post);
routes.put('/',onlyUsuario, multer.array("fotos", 6), ProdutoController.put);
routes.delete('/',onlyUsuario, ProdutoController.delete);

module.exports=routes;