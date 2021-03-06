const {idade,date} = require('../../lib/utils')
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
    paginate(params){

        params.callback(JSON.parse('[{"id":10,"avatar_url":"https://source.unsplash.com/collection/6800490/500x500","name":"Rico","gender":"M","birth":"2020-05-28T03:00:00.000Z","services":"VAPO, VAPO1","created_at":"2020-05-07T03:00:00.000Z","total":"18","total_alunos":"2"},{"id":10,"avatar_url":"https://source.unsplash.com/collection/6800490/500x500","name":"Rico","gender":"M","birth":"2020-05-28T03:00:00.000Z","services":"VAPO, VAPO1","created_at":"2020-05-07T03:00:00.000Z","total":"18","total_alunos":"2"}]'))
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