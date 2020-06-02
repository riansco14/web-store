const db=require('../../config/db')
const fs=require('fs')
module.exports={
    create(data){
        const query=`INSERT INTO files(nome,path,produto_id) 
        VALUES($1,$2,$3)
        RETURNING id`
        let {filename,path,produto_id}=data
        const values=[
            filename,
            path,
            produto_id
        ]
        return db.query(query,values)
    },
    async delete(id){
        
        
        try {
            const result= await db.query(`SELECT * FROM files WHERE id = $1`,[id])
            const file = result.rows[0]
            fs.unlink(file.path, (err)=> {
                if(err) throw err
                
                const query=`DELETE FROM files WHERE id = $1`
                return db.query(query,[id])
            
            })

            
            
        } catch (error) {
            console(error)
        }


        
    }
}