let pool = require('../../databaseConnection/createconnection');
let db = {};
 

// For dependent queries
// var pool = require('mysql').createPool(opts);

// pool.getConnection(function(err, conn) {
//     conn.query('select 1+1', function(err, res) {
//         conn.release();
//     });
// });

db.getMaterialTypes = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ''
            sql = `SELECT m.uuid, m.name, m.file_type_ids,DATE_FORMAT(m.created_on, '%m-%d-%Y') AS created_on, m.created_by_id
            FROM material_type m`

            if(uuid.length > 1)
            {
                sql = sql + ` WHERE m.uuid = '${uuid}'`
            }

            sql += ` 
            ORDER BY m.name `
            pool.query(sql, (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.getFileTypes = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ''
            sql = `SELECT id, name, mime_type
            FROM file_types WHERE id = ${id}`
            pool.query(sql, (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.insertMaterialType = (uuid,name,fileType, createdOn, createdById) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO material_type (uuid, name, file_type_ids, created_on, created_by_id) VALUES (?, ?,?,?, ?)", [uuid, name, fileType, createdOn,createdById], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.deleteMaterialType = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM material_type WHERE uuid = ?", [uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.checkMaterialTypeUsed = (material_type_id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT IF(count(material_type_id) > 0,1,0) AS Exist FROM curriculum_upload
            where material_type_id = ?`, [material_type_id], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.uniqueNameCheck = (name, uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT IF(count(id) > 0,1,0) AS Exist FROM material_type
            where UPPER(name) = UPPER(?) AND uuid != ?`, [name, uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.returnUuidMaterialType = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid FROM material_type
            where id = ?`, [id], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.updateMaterialType = (uuid, name, fileType) => {
    return new Promise((resolve, reject)=>{
        try{
            //console.log("p")
            pool.query(`UPDATE material_type set name = '${name}', file_type_ids = '${fileType}' WHERE uuid = ?`, [uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
               // console.log("e")
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};

module.exports = db

