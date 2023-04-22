let pool = require('../../databaseConnection/createconnection')
let db = {};
 
db.getAllUserTypes = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT ut.id , ut.name, ut.code, ut.is_active, ut.role_id, r.name AS roleName FROM user_type ut LEFT JOIN role r ON r.id = ut.role_id WHERE ut.code NOT LIKE 'SUADM'",(error, result) => 
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

db.getUserTypes = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM user_type",(error, result) => 
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

db.deleteUserTypes = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus WHERE id = ?", [id], (error, result) => 
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

db.insertUserTypes = (name) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus (name) VALUES (?)", [name], (error, result) => 
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

db.selectSchool = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM school WHERE syllabus_id = ?", [id], (error, result) => 
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

module.exports = db

