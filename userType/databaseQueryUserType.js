let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getAllUserTypes = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT u.id , u.name, u.code, u.is_active AS isActive , r.role_id, r.role_name FROM user_type u LEFT JOIN role r ON r.id = u.role_id",(error, result) => 
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

