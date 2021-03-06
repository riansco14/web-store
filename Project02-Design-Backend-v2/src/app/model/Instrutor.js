const {idade,date} = require('../../util/data');
const db = require('../../config/db');

module.exports ={
    all(callback){
        const query = `SELECT instrutores.*, count(membros) as total_alunos 
        FROM instrutores 
        LEFT JOIN membros ON (membros.instrutor_id=instrutores.id)
        GROUP BY instrutores."id"
        ORDER BY total_alunos DESC`;

        db.query(query, function(err,results) {
            if(err) throw `Database error ${err}`
            callback(results.rows);
        });
    },
    paginate(params,callback){
        const {filter,page,limit,offset} = params;
        let filterQuery="",
            totalQuery=`(SELECT count(*) FROM instrutores) AS total`
            
            
            
        if(filter){
            filterQuery=`WHERE instrutores.name ILIKE '${filter}%' 
            OR instrutores.servicos ILIKE '%${filter}%'`;
            
            totalQuery=`(
                SELECT count(*) FROM instrutores 
            ${filterQuery}
            ) AS total`;
        }

        let query = `SELECT instrutores.*, ${totalQuery} , count(membros) AS total_alunos 
        FROM instrutores 
        LEFT JOIN membros ON (membros.instrutor_id=instrutores.id) ${filterQuery} 
        GROUP BY instrutores."id"
        ORDER BY total_alunos DESC
        LIMIT $1 OFFSET $2`;

        

        db.query(query,[limit,offset] ,function(err,results) {
            if(err) throw `Database error ${err.stack}`
        
            
            callback(results.rows);
        });
    },
    create(data, callback){
        const query = `INSERT INTO instrutores (
            avatar_url,
            name,
            sexo,
            servicos,
            data_nasc,
            created_at
            ) VALUES($1,$2,$3,$4,$5,$6)
            RETURNING id`;

        const values= [
            data.avatar_url,
            data.name,
            data.sexo,
            data.servicos,
            date(data.data_nasc).iso,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err,results){
            if(err) throw `Database error ${err}`
            callback(results.rows[0].id);
        })
    },
    find(id, callback){
        const query = 'SELECT * FROM instrutores WHERE id=$1';
        const values=[id];
        
        db.query(query, values, function(err,results){
            if(err) throw `Database error ${err}`
            callback(results.rows[0]);
        });
    },
    findBy(filter,callback){
        const query = `SELECT instrutores.*, count(membros) as total_alunos 
        FROM instrutores 
        LEFT JOIN membros ON (membros.instrutor_id=instrutores.id)
        WHERE instrutores.name ILIKE '${filter}%' 
        OR instrutores.servicos ILIKE '%${filter}%'  
        GROUP BY instrutores."id"
        ORDER BY total_alunos DESC`;

        db.query(query, function(err,results) {
            if(err) throw `Database error ${err.stack}`
            callback(results.rows);
        });
    },
    update(data,callback){
        const query= `UPDATE instrutores SET 
        avatar_url=$1, 
        name=$2,
        sexo=$3, 
        servicos=$4,
        data_nasc=$5
        WHERE id=$6
        RETURNING id
        `;

        const values=[
            data.avatar_url,
            data.name,
            data.sexo,
            data.servicos,
            date(data.data_nasc).iso,
            data.id
        ];

        db.query(query,values,function(err,results) {
            if(err) throw `Database error ${err}`
            callback();
        });
    },
    delete(id, callback){
        const query = `DELETE FROM instrutores WHERE id = $1`;
        const values=[id];
        
        db.query(query, values, function(err,results) {
            if(err) throw `Database error ${err}`
            return callback();
        });
    }

}