let pool = require('../databaseConnection/createconnection')
let commondb = {};
 
commondb.getUserById = (userId) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query(`SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName,u.role_id,r.name AS role_name,
            u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code
                       FROM user u 
                       LEFT JOIN role r ON u.role_id = r.id 
                       LEFT JOIN user_type ut ON ut.id = u.user_type_id
                       WHERE u.id = ? AND u.is_active = 1`, [userId], (error, users)=>{
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
        try{
            pool.query('SELECT user_id AS userId, auth_token AS authToken, auth_time AS authTime FROM auth_data WHERE auth_token = ?', [authToken], (error, result)=>{
            if(error)
            {
                return reject(error);
            }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
    };

commondb.dupEmail = (email) => {
    return new Promise((resolve, reject)=>{
        try{pool.query(`SELECT COUNT(email) AS Exist , uuid FROM user WHERE UPPER(email) LIKE UPPER(?)`, [email], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
}


commondb.dupMobile = (mob) => {
    return new Promise((resolve, reject)=>{
        try{pool.query(`SELECT COUNT(mobile) AS Exist , uuid FROM user WHERE mobile LIKE ?`, [mob], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
}

module.exports = commondb