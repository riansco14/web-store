const fs = require('fs');
const data = require('./data.json');
const dataUtils=require('./util/data');
//create
exports.post = function (req, res) {
    //["avatar_url","name","data_nasc","sexo","servicos"]
    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Preencha todos os campos");
    }
    const { avatar_url, name, sexo, servicos } = req.body
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
    return res.send(keys);
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
        dataNascHTML: dataUtils.dateFormarterHTML(instrutorFounded.data_nasc),
        sexo: instrutorFounded.sexo=="M"?"Masculino":"Feminino",
        servicos: instrutorFounded.servicos.split(","),
        created_at: dataUtils.dateFormarter(instrutorFounded.created_at)
    }

    req.instrutor=instrutor;
    return next();
}
//update

//delete


