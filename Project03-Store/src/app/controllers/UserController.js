const User = require('../model/User')

module.exports={
    registerForm(req,res){
        return res.render("usuario/register")
    },
    show(req,res){
        return res.send("ok, cadastrado")
    },
    async post(req,res){
        //passou por validator antes daqui

        const userId = User.create(req.body)

        return res.redirect("/usuario")
    }
}