const { render } = require('nunjucks')
const User = require('../model/User')
const {compare} = require('bcryptjs')


function checkAllFields(body){
    keys = Object.keys(body)
    for(key of keys){
        if(body[key]=="")
            return {user: body ,error:'Preencha todos os campos'}
    }
}

async function show(req, res, next){
    const {userId: id} = req.session
        if(!id) return res.render("usuario/register", {error: "Usuario não encontrado"})

        const user = await User.findOne({where: id})

        if(!user) return res.render("usuario/register", {error: "Usuario não encontrado"})

    req.user = user

    next()
}
async function post(req,res,next){

    const verificarCampos = checkAllFields(req.body)

    if(verificarCampos)
        return res.render('usuario/register', verificarCampos)

    //se usuario existe, [email,cpf] 
    const {email, cpf_cnpj,password,passwordRepeat} = req.body
    
    
    const user = await User.findOne({
        where: {email},
        or:{cpf_cnpj}
    })
    
    if(user) return res.render('usuario/register',{user: req.body ,error:'Usuario já existe'})

    //senhas sao iguais

    if(password != passwordRepeat){
        return res.render('usuario/register',{user: req.body ,error:'Senhas não correspondem'})
    }

    next()
}

async function update(req,res,next){
    const verificarCampos = checkAllFields(req.body)

    if(verificarCampos)
        return res.render('usuario/index', verificarCampos)
        

    const {id, password} = req.body

    if(!password) return res.render("usuario/index",{
        user: req.body,
        error: "Coloque sua senha para atualizar o cadastro"
    })

    const user = await User.findOne({where: {id}})

    const checkPassword = await compare(password, user.password)

    if(!checkPassword) return res.render("usuario/index",{
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user
    
    next()
}
module.exports={
    post,
    show,
    update
}