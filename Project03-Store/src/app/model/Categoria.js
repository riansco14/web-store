const db=require('../../config/db')

module.exports={
    all(){
        const query=`SELECT * FROM categorias`
        return db.query(query)
    }
}