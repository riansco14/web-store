const db=require('../../config/db')

module.exports={
    all(){

    },
    create(data){
        const query=`INSERT INTO produtos(categoria_id,usuario_id,nome,descricao,old_preco,preco,quantidade,status) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING id`
        let {categoria_id,usuario_id,nome,descricao,old_preco,preco,quantidade,status}=data
        preco=preco.replace(/\D/g,"")
        values=[
            categoria_id,
            usuario_id || 1,
            nome,
            descricao,
            old_preco || preco,
            preco,
            quantidade,
            status || 1
        ]
        return db.query(query,values)
    },
    findById(id){
        const query=`SELECT * FROM produtos WHERE id=$1`
        return db.query(query,[id])
    },
    update(data){
        const query=`UPDATE produtos 
        SET 
            categoria_id=$1,
            usuario_id=$2,
            nome=$3,
            descricao=$4,
            old_preco=$5,
            preco=$6,
            quantidade=$7,
            status=$8
        WHERE id=$9
        `
        let {categoria_id,
            usuario_id,
            nome,
            descricao,
            old_preco,
            preco,
            quantidade,
            status,
            id} = data
        
        const values=[
                categoria_id,
                usuario_id,
                nome,
                descricao,
                old_preco,
                preco,
                quantidade,
                status,
                id
        ]
        console.log(values);
        
        return db.query(query, values)
    },
    delete(id){
        const query=`DELETE FROM produtos WHERE id=$1`
        return db.query(query,[id])
    },
    files(id){
        return db.query(`SELECT * FROM files WHERE produto_id = $1`,[id])
    }
}