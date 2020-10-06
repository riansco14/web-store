function onlyUsuario(req,res,next){
    if(!req.session.userId){
        return res.redirect('/usuario/login')
    }

    next()
}

module.exports={
    onlyUsuario
}