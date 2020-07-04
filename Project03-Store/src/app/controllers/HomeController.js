const Utils=require('../../util/data')

const Produto=require('../model/Produto')
const File=require('../model/File')

module.exports = {
    async index(req,res){
        let produtos = (await Produto.all()).rows

        if(!produtos) return res.send("Produtos not found")

        async function getImages(produtoId){
            let results = await Produto.files(produtoId)
            const files = results.rows.map(
                file =>`${req.protocol}://${req.headers.host}/${file.path.replace('public\\',"").replace("\\","/")}`
                )
            return files[0]
        }

        const produtosImagesPromise=produtos.map(async produto => {
            produto.img = await getImages(produto.id)
            produto.preco=Utils.formatPreco(produto.preco)
            produto.oldPreco=Utils.formatPreco(produto.old_preco)
            return produto
        })

        const lastAdded = await Promise.all(produtosImagesPromise)

        return res.render("home/index", {produtos: lastAdded})
    }

}