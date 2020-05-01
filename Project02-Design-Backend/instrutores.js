const fs = require('fs');
const data = require('./data.json');
const dataUtils = require('./util/data');

//index
exports.index= function (req,res){
    return res.render("instrutores/index",{instrutores: data.instrutores})
}

//create
exports.post = function (req, res) {
    //["avatar_url","name","data_nasc","sexo","servicos"]
    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Preencha todos os campos");
    }
    const { avatar_url, name, sexo, servicos } = req.body;
    data.instrutores.push({
        id: Number(data.instrutores.length + 1),
        avatar_url,
        name,
        data_nasc: Date.parse(req.body['data_nasc']),
        sexo,
        servicos,
        created_at: Date.now()
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Falhou escrita");
        return res.redirect("/instrutores");
    });
}
//find 
exports.findByPK = function (req, res, next) {
    const { id } = req.params;
    const instrutorFounded = data.instrutores.find(function (instrutor) {
        if (instrutor.id == id)
            return true;
    });
    if (!instrutorFounded)
        return res.send("Instrutor not found");

    const instrutor = {
        ...instrutorFounded,
        idade: dataUtils.dateAniversarioParser(instrutorFounded.data_nasc),
        dataNascHTML: dataUtils.dateFormarterHTML(instrutorFounded.data_nasc).iso,
        sexo: instrutorFounded.sexo == "M" ? "Masculino" : "Feminino",
        servicos: instrutorFounded.servicos.split(","),
        created_at: dataUtils.dateFormarter(instrutorFounded.created_at)
    }

    req.instrutor = instrutor;
    return next();
}
//update
exports.put = function (req, res) {

    const { id } = req.body;
    console.log("passou aqui update");
    const { avatar_url, name, sexo, servicos } = req.body;

    const instrutorFounded = data.instrutores.find(function (instrutor) {
        if (instrutor.id == id) {
            return true
        }
    });

    instrutor = {
        ...instrutorFounded,
        avatar_url,
        name,
        data_nasc: Date.parse(req.body['data_nasc']),
        sexo,
        servicos,
    }
    data.instrutores[data.instrutores.indexOf(instrutorFounded)]= instrutor;
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Falhou escrita");
        return res.redirect(`/instrutores/${id}`);
    });

if (!instrutorFounded)
    return res.send("Instrutor not found");


}

//delete
exports.delete = function (req, res) {
    const {id}= req.params;
    console.log("passou aqui delete"+String(id));
    
    if(!id){
        return res.send("Bad request");
    }

    for(var i =0; data.instrutores.length>i;i++){
        if(data.instrutores[i].id==id)
            data.instrutores.splice(i,1);
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Falhou escrita");
        return res.redirect("/instrutores");
    });


}

