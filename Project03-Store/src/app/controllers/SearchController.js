const Utils=require('../../util/data')

const Produto=require('../model/Produto')
const File=require('../model/File')
const Categoria = require('../model/Categoria')

module.exports = {
    async index(req,res){
        try {
            let results,
                params={};
            
            const {filter, categoria} = req.query

            if(!filter) return res.redirect("/")

            params.filter=filter

            if(categoria)
                params.categoria=categoria
            
            results = await Produto.search(params)
            
            async function getImages(produtoId){
                let results = await Produto.files(produtoId)
                const files = results.rows.map(
                    file =>`${req.protocol}://${req.headers.host}/${file.path.replace('public\\',"").replace("\\","/")}`
                    )
                return files[0]
            }

            let produtosPromise = results.rows.map(async produto => {
                produto.img = await getImages(produto.id)
                produto.preco=Utils.formatPreco(produto.preco)
                produto.oldPreco=Utils.formatPreco(produto.old_preco)
                return produto
            })

            const produtos = await Promise.all(produtosPromise)
            const search ={
                term: filter,
                total: produtos.length
            }

            const categorias=produtos.map(produto=>({
                id: produto.categoria_id,
                nome: produto.categoria_nome
            })).reduce((categoriasFiltered,categoria)=>{
                const found = categoriasFiltered.some(cat=> cat.id==categoria.id)
                if(!found)
                    categoriasFiltered.push(categoria)
                return categoriasFiltered
            },[])
            return res.render("search/index", {produtos: produtos, search: search, categorias: categorias })
        } catch (error) {
            console.log(error);
        }
    }

}