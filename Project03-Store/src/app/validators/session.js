const User = require('../model/User')
const {compare} = require('bcryptjs')


async function login(req, res, next){
    const { email, password } = req.body
    if(!email && !password){
        return res.render('session/index', {
            user: req.body,
            error: 'Preencha os campos'
        })
    }
    const user = await User.findOne({ where: {email} })

    if (!user) return res.render('session/index', {
        user: req.body,
        error: 'Usuário não cadastrado!'
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render('session/index', {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()

}


module.exports={
    login
}