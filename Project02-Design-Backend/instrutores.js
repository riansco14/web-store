const fs = require('fs');
const data = require('./data.json');

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
exports.findByPK = function (req, res) {
    const { id } = req.params;
    const instrutor = data.instrutores.find(function (instrutor) {
        if (instrutor.id == id)
            return true;
    });
    if(!instrutor)
        return res.send("Instrutor not found");
    return res.json(instrutor);
}
//update

//delete


