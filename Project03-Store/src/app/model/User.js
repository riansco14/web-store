const db=require('../../config/db')
const { hash } = require('bcryptjs')
const { update } = require('../controllers/UserController')

module.exports={
    async findOne(filters) {
        let query = 'SELECT * FROM usuarios'
        Object.keys(filters).map(key => {
            query = `${query} ${key}`

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
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

        const results = await db.query(query,values)
        
        return results.rows[0]
    },
    async update(id, fields){
        let query = `
        UPDATE usuarios SET nome =$1, email=$2, cpf_cnpj = $3, cep = $4, endereco = $5
        WHERE id=${id}
        `

        const {nome, email, cpf_cnpj, cep, endereco} = fields

        values = [nome, email, cpf_cnpj, cep, endereco]
        await db.query(query, values)
        return
    }
}