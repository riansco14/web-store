const db=require('../../config/db')
const { create } = require('browser-sync')
const { hash } = require('bcryptjs')

module.exports={
    async findOne(filters){
        let query=`SELECT * FROM usuarios`

        Object.keys(filters).map(key =>{
            // WHERE | or | AND
            query = `${query} 
            ${key}`

            Object.keys(filters[key]).map(field =>{
                query= `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        
        return results.rows[0]
    },
    async create(data){
        const query = `
        INSERT INTO usuarios(nome, email, password, cpf_cnpj, cep, endereco) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING id`

        let {nome, email, password, cpf_cnpj, cep, endereco} = data

        //criptografar string, força do algoritmo
        const passwordHash = await hash(password, 8)

        values = [nome, email, passwordHash, cpf_cnpj, cep, endereco]

        return db.query(query,values)
    }
}