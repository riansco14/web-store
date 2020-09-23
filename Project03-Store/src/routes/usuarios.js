const express=require('express');
const routes=express.Router();
const UsuarioController=require("../app/controllers/UserController")
const Validator=require('../app/validators/user')

//user register UserController
routes.get('/register', UsuarioController.registerForm)
routes.post('/register',Validator.post, UsuarioController.post)


routes.get('/', Validator.show, UsuarioController.show)

routes.put('/',Validator.update ,UsuarioController.update)
/*
routes.delete('/',UsuarioController.delete)
*/
module.exports=routes;