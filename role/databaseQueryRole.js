let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getRole = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * from role",(error, result) => 
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

db.deleteRole = (id) => {
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

db.insertRole = (name) => {
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

