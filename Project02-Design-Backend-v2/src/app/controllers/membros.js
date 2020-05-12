const {idade,date} = require('../../util/data');
const Membro=require('../model/Membro');

module.exports={
    index(req,res){
        let {filter, page, limit} = req.query;

        page= page || 1;
        limit= limit || 2;
        let offset=limit*(page-1);

        const params={
            filter,
            page,
            limit,
            offset
        };

        Membro.paginate(params,function(membros){
            const pagination={
                total: Math.ceil(membros[0].total/limit),
                page
            }

            return res.render("membros/index", {membros, pagination, filter});
        });
    },
    create(req,res){
        Membro.instrutorSelectOptions(function(instrutores){
            return res.render("membros/cadastro",{ instrutoresOptions: instrutores});
        })
    },
    post(req,res){
        //["avatar_url","name","data_nasc","sexo","servicos"]
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os campos");
        }

        Membro.create(req.body,function(id){
            return res.redirect(`membros/${id}`);
        });

    },
    show(req,res){
        Membro.find(req.params.id, function(membroResult){
            if(!membroResult)
                return res.send("Membro Not Found");

            const membro = {
                ...membroResult,
                idade: date(membroResult.data_nasc).aniversario,
            };

            return res.render(`membros/show`, {membro});
        })
    },
    edit(req,res){
        Membro.find(req.params.id, function(membroResult){
            if(!membroResult)
                return res.send("Membro Not Found");
            const membro = {
                ...membroResult,
                data_nasc: date(membroResult.data_nasc).iso
            };
            Membro.instrutorSelectOptions(function(instrutores){
                return res.render(`membros/editar`, {membro, instrutoresOptions: instrutores});
            });
        });
        
    },
    put(req,res){
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os campos");
        }
        Membro.update(req.body, function (){
            return res.redirect(`membros/${req.body.id}`);
        });
    },
    delete(req,res){
        Membro.delete(req.params.id, function(){
            return res.redirect("/membros");
        });
    }
}
