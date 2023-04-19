let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getUserByUuid = (uuid) =>{
    return new Promise((resolve, reject)=>{
        pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',u.last_name) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.uuid = ?", [uuid], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });
    });
};

db.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',u.last_name) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.email = ?", [email], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });
    });
};
 
db.insertLastLogin = (userId, authTime) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE user SET last_login=? WHERE id = ?', [authTime,userId], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result);
        });
    });
};

module.exports = db