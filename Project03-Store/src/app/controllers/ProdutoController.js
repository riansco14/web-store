const Categoria=require('../model/Categoria')
const Produto=require('../model/Produto')
const Utils=require('../../util/data')
const File=require('../model/File')
module.exports={
    create(req,res){
        Categoria.all().then(function(results) {
            const categorias=results.rows
            return res.render('produtos/create',{categorias:categorias})
        }).catch(function(err){
            throw new Error(err)
        })

    },
    async show(req,res){
        const {id} = req.params
        const produto = (await Produto.findById(id)).rows[0]

        if(!produto){
            return res.send("Produto not found")
        }
        const {dia,
            mes,
            hora,
            minutos}= Utils.date(produto.update_at)

        produto.published= {
            dia: `${dia}/${mes}`,
            hora: `${hora}h${minutos}`
        }

         produto.old_preco=Utils.formatPreco(produto.old_preco)
         produto.preco=Utils.formatPreco(produto.preco)

        const categorias = (await Categoria.all()).rows
        
        //get images
        let files = (await Produto.files(id)).rows
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}/${file.path.replace('public\\',"")}`
        }))

        res.render('produtos/show', {produto, categorias, files})
    },
    async post(req,res){
        
        for(key of Object.keys(req.body)){
            if(req.body[key]=="")
                return res.send("Preencha todos os campos")
        }
        
        if(req.files.length == 0){
            return res.send("Envie ao menos uma imagem")
        }

        
        let results=await Produto.create(req.body)
        const produtoId= results.rows[0].id
        
        const filesPromise=req.files.map(file=>File.create({...file,produto_id: produtoId}))
        await Promise.all(filesPromise)

        const categorias=(await Categoria.all()).rows

        return res.redirect(`/produtos/${produtoId}/edit`)
        //return res.render('produtos/create',{ produto:produto, categorias:categorias })
    },
    async edit(req,res){
        const {id} = req.params
        const produto = (await Produto.findById(id)).rows[0]
        
        if(!produto){
            return res.send("Não encontrado")
        }
        produto.preco=Utils.formatPreco(produto.preco.toString())
        const categorias = (await Categoria.all()).rows

        //get images
        let files = (await Produto.files(id)).rows
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}/${file.path.replace('public\\',"")}`
        }))

        


        return res.render('produtos/edit',{ produto:produto, categorias:categorias, files })
    },
    async put(req,res){
        
        for(key of Object.keys(req.body)){
            if(req.body[key]=="" && key != "removed_files")
                return res.send("Preencha todos os campos")
        }
        if(req.files.length != 0){
            const newFilesPromise = req.files.map(file => File.create({...file, produto_id: req.body.id}))
            await Promise.all(newFilesPromise)
        }

        if(req.body.removed_files){
            const removedFiles=req.body.removed_files.split(",")
            const lastIndex = removedFiles.length
            removedFiles.splice(lastIndex, 1)

            const RemovedFilesPromiseAll = removedFiles.map(id => File.delete(id))
        }

        req.body.preco=req.body.preco.replace(/\D/g , "")

        const oldProduto = (await Produto.findById(req.body.id)).rows[0]
        req.body.old_preco=oldProduto.preco
        
        await Produto.update(req.body)

        return res.redirect(`/produtos/${req.body.id}/edit`)
        
    },
    async delete(req,res){
        await Produto.delete(req.body.id)
        return res.redirect('/produtos')
    }

}