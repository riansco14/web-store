function onlyUsuario(req,res,next){
    if(!req.session.userId){
        return res.redirect('/usuario/login')
    }

    next()
}

function isLoggedRedirectToUsers(req, res, next){
    if(req.session.userId)
        return res.redirect('/usuario')
    next()
}

module.exports={
    onlyUsuario,
    isLoggedRedirectToUsers
}