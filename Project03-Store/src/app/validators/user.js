const User = require('../model/User')

module.exports={
    async post(req,res,next){
        for(key of Object.keys(req.body)){
            if(req.body[key]=="")
                return res.render('usuario/register',{user: req.body ,error:'Preencha todos os campos'})
        }

        //se usuario existe, [email,cpf] 
        const {email, cpf_cnpj,password,passwordRepeat} = req.body
        console.log(req.body);
        
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
}