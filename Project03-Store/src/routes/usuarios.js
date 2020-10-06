const express=require('express');
const routes=express.Router();
const UsuarioController=require("../app/controllers/UserController")
const UserValidator=require('../app/validators/user')

const SessionController= require('../app/controllers/SessionController')
const SessionValidator=require('../app/validators/session')

routes.get('/', UserValidator.show, UsuarioController.show)
routes.put('/',UserValidator.update ,UsuarioController.update)


routes.get('/register', UsuarioController.registerForm)
routes.post('/register',UserValidator.post, UsuarioController.post)





//login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

/*
routes.delete('/',UsuarioController.delete)
*/
module.exports=routes;