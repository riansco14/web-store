const dataUtils = require('../../util/data');


module.exports={
    index(req,res){
        return res.render("membros/index")
    },
    create(req,res){
        return res.render("membros/cadastro");
    },
    post(req,res){
        //["avatar_url","name","data_nasc","sexo","servicos"]
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os campos");
        }
        const { avatar_url, name, sexo, servicos } = req.body;

        return;
    },
    show(req,res){
        return;
    },
    edit(req,res){
        return;
    },
    put(req,res){
        return;
    },
    delete(req,res){
        return;
    }
}
