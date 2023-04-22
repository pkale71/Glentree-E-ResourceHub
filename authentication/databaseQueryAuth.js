let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getUserByUuid = (uuid) =>{
    return new Promise((resolve, reject)=>{
        try{
             pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.uuid = ?", [uuid], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });}
        catch(e)
        {
            console.log(e)
        }

       
    });
};

db.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id, u.is_active ,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.email = ?", [email], (error, users)=>{
                if(error){
                    return reject(error);
                }
                return resolve(users);
            });
        }catch(e){ console.log(e)}

      
    });
};
 
db.insertLastLogin = (userId, authTime) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE user SET last_login=? WHERE id = ?', [authTime,userId], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }catch(e){ console.log(e)}

       
    });
};

db.insertToken = (authtoken, userId, authTime) =>{
        return new Promise((resolve, reject)=>{
            try{
                pool.query('INSERT INTO auth_data (auth_token, user_id, auth_time) VALUES (?,  ?, ?)', [authtoken, userId, authTime], (error, result)=>{
                    if(error){
                        return reject(error);
                    }
                     
                      return resolve(result);
                });
            }catch(e){ console.log(e)}

           
        });
    };

db.deleteToken = (token) =>{
            return new Promise((resolve, reject)=>{
                try{
                    pool.query('DELETE FROM auth_data WHERE auth_token = ?', [token], (error, result)=>{
                        if(error){
                            return reject(error);
                        }
                         
                          return resolve(result);
                    });
                }catch(e){ console.log(e)}

              
            });
        };


        db.selectToken = (userId) =>{
                return new Promise((resolve, reject)=>{
                try{
                    pool.query('SELECT * FROM auth_data WHERE user_id = ?', [userId], (error, result)=>{
                        if(error){
                            return reject(error);
                        }
                         
                          return resolve(result);
                    });
                }catch(e){ console.log(e)}

                  
                });
            };

            db.updateUser = (userId,password) =>{
                return new Promise((resolve, reject)=>{
                try{
                    pool.query('UPDATE user SET password = ? WHERE id = ?', [password,userId], (error, result)=>{
                        if(error){
                            return reject(error);
                        }
                         
                          return resolve(result);
                    });
                }catch(e){ console.log(e)}
                    
                });
            };

module.exports = db