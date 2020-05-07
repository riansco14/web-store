const {idade,date} = require('../../util/data');
const db = require('../../config/db');

module.exports ={
    all(callback){
        const query = `SELECT * FROM membros 
        ORDER BY name ASC`;

        db.query(query, function(err,results) {
            if(err) throw `Database error ${err}`
            callback(results.rows);
        });
    },
    create(data, callback){
        const query = `INSERT INTO membros(
            avatar_url,
            name,
            email,
            sexo,            
            data_nasc,						
            tipo_sangue,
            peso,
            altura,
            instrutor_id
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id`;

        const values= [
            data.avatar_url,
            data.name,
            data.email,
            data.sexo,
            date(data.data_nasc).iso,
            data.tipo_sangue,
            data.peso,
            data.altura,
            data.instrutor_id
        ];

        db.query(query, values, function(err,results){
            if(err) throw `Database error ${err}`
            callback(results.rows[0].id);
        })
    },
    find(id, callback){
        const query = `SELECT membros.*, instrutores.name as instrutor_name 
        FROM membros 
        LEFT JOIN instrutores ON(membros.instrutor_id=instrutores.id) 
        WHERE membros.id=$1`;
        const values=[id];
        
        db.query(query, values, function(err,results){
            if(err) throw `Database error ${err}`
            callback(results.rows[0]);
        });
    },
    update(data,callback){
        const query= `UPDATE membros SET 
        avatar_url=$1, 
        name=$2,
        email=$3,
        sexo=$4, 
        data_nasc=$5,
        tipo_sangue=$6,
        peso=$7,
        altura=$8,
        instrutor_id=$9
        WHERE id=$10
        RETURNING id
        `;

        const values=[
            data.avatar_url,
            data.name,
            data.email,
            data.sexo,
            date(data.data_nasc).iso,
            data.tipo_sangue,
            data.peso,
            data.altura,
            data.instrutor_id,
            data.id
        ];

        db.query(query,values,function(err,results) {
            if(err) throw `Database error ${err}`
            callback();
        });
    },
    delete(id, callback){
        const query = `DELETE FROM membros WHERE id = $1`;
        const values=[id];
        
        db.query(query, values, function(err,results) {
            if(err) throw `Database error ${err}`
            return callback();
        });
    },
    instrutorSelectOptions(callback){
        const query = `SELECT id,name FROM instrutores`;

        db.query(query,function(err,results){
            if(err) throw `Database error ${err}`;
            callback(results.rows);
        })
    }

}