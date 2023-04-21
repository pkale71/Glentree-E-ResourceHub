let pool = require('../databaseConnection/createconnection')
let commondb = {};
 
commondb.getUserById = (userId) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.id = ?", [userId], (error, users)=>{
                if(error){
                    return reject(error);
                }
                return resolve(users);
            });
        }catch(e){ console.log(e)}
       
    });
};

commondb.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.email = ?", [email], (error, users)=>{
                if(error){
                    return reject(error);
                }
                return resolve(users);
            });
        }catch(e){ console.log(e)}
       
    });
};
 



commondb.selectToken = (authToken) =>{
    return new Promise((resolve, reject)=>{
        try{pool.query('SELECT user_id AS userId, auth_token AS authToken, auth_time AS authTime FROM auth_data WHERE auth_token = ?', [authToken], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
    };

module.exports = commondb