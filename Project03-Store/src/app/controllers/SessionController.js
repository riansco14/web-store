const crypto = require('crypto')
const User = require('../model/User')
const mailer = require('../../util/mailer')

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
    },
    forgotForm(req,res){
        return res.render('session/forgot-password')
    },
    async forgot(req,res){

        try {
        let user = req.user
        //token para esse usuario
        const token = crypto.randomBytes(20).toString('hex')

        //criar expiração
        let now = new Date()
        now = now.setHours(now.getHours() + 1)


        await User.update(user.id,{...user,
            reset_token: token,
            reset_token_expires: now,
        })

        //enviar um  email com um link de recuperação
        await mailer.sendMail({
            to: user.email,
            from: 'no-reply@launchstore.com',
            subject: 'Recuperação de Senha',
            html: `<h2>Perdeu a chave ?</h2>
            <p> Clique no link abaixo para recuperar a senha </p>
            <p> 
                <a href="http://localhost.com:3000/usuario/password-reset?token=${token}" target="_blank">Recuperar Senha<a/>
            `
        })

        //avisar o usuario que enviamos o email
        return res.render("session/forgot-password",{
            success: "Verifique seu email para resetar sua senha"
        })


            
        } catch (error) {
            return res.render("session/forgot-password",{
                error: error
            })
        }


        


    }

}