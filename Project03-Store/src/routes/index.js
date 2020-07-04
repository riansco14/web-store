const express=require('express');
const routes=express.Router();
const multer = require('../app/middlewares/multer')
const HomeController= require('../app/controllers/HomeController')
//sconst Usuarios=require('./usuarios')
const Produtos=require('./produtos')


routes.get('/', HomeController.index);
//routes.use('/usuarios', Usuarios)
routes.use('/produtos', Produtos)
routes.get('/ads/create')

//Search



/*
//login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionController.login)
routes.post('/logout', SessionController.logout)

// reset password /forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/password-reset', SessionController.reset)

//user register UserController
routes.get('/register', UsuarioController.registerForm)
routes.post('/register',UsuarioController.post)

routes.post('/',UsuarioController.show)
routes.put('/',UsuarioController.update)
routes.delete('/',UsuarioController.delete)
*/
module.exports=routes;