module.exports={
    loginForm(req,res){
        return res.render('session/index')
},
    login(req,res){
        // faz as verificações de existencia e senha
        req.session.userId = req.user.id
        return res.redirect('/usuario')
    },
    logout(req,res){
        req.session.destroy()
        return res.redirect('/')
    }

}