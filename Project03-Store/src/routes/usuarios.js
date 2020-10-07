const express=require('express');
const routes=express.Router();
const UsuarioController=require("../app/controllers/UserController")
const UserValidator=require('../app/validators/user')

const SessionController= require('../app/controllers/SessionController')
const SessionValidator=require('../app/validators/session')

const {isLoggedRedirectToUsers, onlyUsuario} = require('../app/middlewares/session')

routes.get('/', UserValidator.show, UsuarioController.show)
routes.put('/',UserValidator.update ,UsuarioController.update)


routes.get('/register', onlyUsuario, UsuarioController.registerForm)
routes.post('/register',UserValidator.post, UsuarioController.post)





//login/logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)


//esqueci senha/reset password
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password',SessionValidator.forgot,  SessionController.forgot)
//routes.get('/password-reset', isLoggedRedirectToUsers, SessionController.loginForm)
//routes.post('/password-reset', SessionValidator.login, SessionController.login)

/*
routes.delete('/',UsuarioController.delete)
*/
module.exports=routes;