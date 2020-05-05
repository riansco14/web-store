const express=require('express');
const routes=express.Router();

const instrutores=require("./app/controllers/instrutores");
const membros=require("./app/controllers/membros");

routes.get('/', function (req, res) {
    return res.redirect('/instrutores');
});

routes.get('/instrutores',  instrutores.index);
routes.get('/instrutores/cadastro', instrutores.create );
routes.get('/instrutores/:id', instrutores.show);
routes.get('/instrutores/:id/editar', instrutores.edit);
routes.post('/instrutores', instrutores.post);
routes.put('/instrutores', instrutores.put);
routes.delete('/instrutores/:id', instrutores.delete);

routes.get('/membros',  membros.index);
routes.get('/membros/cadastro', membros.create);
routes.get('/membros/:id', membros.show);
routes.get('/membros/:id/editar', membros.edit);
routes.post('/membros', membros.post);
routes.put('/membros', membros.put);
routes.delete('/membros/:id', membros.delete);

module.exports=routes;