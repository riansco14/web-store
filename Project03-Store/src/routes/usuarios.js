const express=require('express');
const routes=express.Router();



//user register UserController
routes.get('/register', UsuarioController.registerForm)
routes.post('/register',UsuarioController.post)

routes.post('/',UsuarioController.show)
routes.put('/',UsuarioController.update)
routes.delete('/',UsuarioController.delete)

module.exports=routes;