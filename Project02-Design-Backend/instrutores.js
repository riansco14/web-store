const fs= require('fs');
//create
exports.post = function (req, res) {
    //["avatar_url","name","data_nasc","sexo","servicos"]
    const keys = Object.keys(req.body);
    fs.writeFile("data.json",JSON.stringify(req.body), function(err){
        if(err) 
            return res.send("Falhou escrita");
        return res.redirect("/instrutores");
    });
    for (key of keys) {
        if (req.body[key] == "");
        return res.send("Preencha todos os campos"+req.body[key]);
    }

    return res.send(keys);
}
//update

//delete


