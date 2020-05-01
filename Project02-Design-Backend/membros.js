const fs = require('fs');
const data = require('./data.json');
const dataUtils = require('./util/data');

//index
exports.index= function (req,res){
    return res.render("membros/index",{membros: data.membros})
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
    data.membros.push({
        id: Number(data.membros.length + 1),
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
        return res.redirect("/membros");
    });
    return res.send(keys);
}
//find 
exports.findByPK = function (req, res, next) {
    const { id } = req.params;
    const membroFounded = data.membros.find(function (membro) {
        if (membro.id == id)
            return true;
    });
    if (!membroFounded)
        return res.send("Membro not found");

    const membro = {
        ...membroFounded,
        idade: dataUtils.dateAniversarioParser(membroFounded.data_nasc),
        dataNascHTML: dataUtils.dateFormarterHTML(membroFounded.data_nasc),
        sexo: membroFounded.sexo == "M" ? "Masculino" : "Feminino",
        servicos: membroFounded.servicos.split(","),
        created_at: dataUtils.dateFormarter(membroFounded.created_at)
    }

    req.membro = membro;
    return next();
}
//update
exports.put = function (req, res) {

    const { id } = req.body;
    console.log("passou aqui update");
    const { avatar_url, name, sexo, servicos } = req.body;

    const membroFounded = data.membros.find(function (membro) {
        if (membro.id == id) {
            return true
        }
    });

    membro = {
        ...membroFounded,
        avatar_url,
        name,
        data_nasc: Date.parse(req.body['data_nasc']),
        sexo,
        servicos,
    }
    data.membros[data.membros.indexOf(membroFounded)]= membro;
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Falhou escrita");
        return res.redirect(`/membros/${id}`);
    });

if (!membroFounded)
    return res.send("membro not found");


}

//delete
exports.delete = function (req, res) {
    const {id}= req.params;
    console.log("passou aqui delete"+String(id));
    
    if(!id){
        return res.send("Bad request");
    }

    for(var i =0; data.membros.length>i;i++){
        if(data.membros[i].id==id)
            data.membros.splice(i,1);
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Falhou escrita");
        return res.redirect("/membros");
    });


}

