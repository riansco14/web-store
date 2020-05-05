const {idade,date} = require('../../util/data');
const db = require('../../config/db');

module.exports ={
    all(callback){
        const query = 'SELECT * FROM instrutores';

        db.query(query, function(err,results) {
            if(err) throw `Database error ${err}`
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