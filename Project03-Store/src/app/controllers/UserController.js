const User = require('../model/User')
const {formatCpfCnpj, formatCep} = require('../../util/data')
const user = require('../validators/user')

module.exports={
    registerForm(req,res){
        return res.render("usuario/register")
    },
    async show(req,res){
        user= req.user
        console.log(user.cpf_cnpj)
        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)

        return res.render("usuario/index",{user})
    },
    async post(req,res){
        //passou por validator antes daqui

        const userId = await User.create(req.body)
        console.log(userId);
        req.session.userId = userId

        return res.redirect("/usuario")
    },
    async update(req,res){
        //verificar todos campos
        try {
            const user= req.user
            let {nome, email, cpf_cnpj, cep, endereco} = req.body

            cpf_cnpj=cpf_cnpj.replace(/\D/g, "")
            cep=cep.replace(/\D/g, "")

            await User.update(user.id, {
                nome, email, cpf_cnpj, cep, endereco
            })

            return res.render('usuario/index',{
                user: req.body,
                success: "Conta atualizada com sucesso"
            })

        } catch (error) {
            console.log(error)
            return res.render("usuario/index",{
                user: user,
                error: "Algum erro aconteceu"
            })
        }

        //preencheu senha


        //senha match



    }
}