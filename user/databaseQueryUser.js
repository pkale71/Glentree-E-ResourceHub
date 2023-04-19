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

db.insertUser = (userUUid,firstName,lastName,email,password,gender,createdById,userTypeId,roleId,mobile,schoolId,createdOn) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('INSERT INTO user (uuid,first_name,last_name, role_id, user_type_id,mobile,email,gender,school_id,password,is_active,created_on,created_by_id) VALUES (?,  ?, ?, ?,  ?,  ?,  ?,  ?,  ?,  ?  ,?  ,?  ,?  )', [userUUid,firstName,lastName,roleId,userTypeId,mobile,email,gender,schoolId,password,1,createdOn,createdById], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e)
        {console.log(e)}
      
    });
};

db.deleteUser = (userId,deletedById) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE user SET is_active=?, deleted_on=SELECT NOW(), deleted_by_id=? WHERE id = ?', [0,deletedById,userId], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result);
        });
    });
};
 
 
db.updateUser = (userName, role, email, password, id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE User SET user_name = ?, role= ?, email= ?, password=? WHERE id = ?', [userName, role, email, password, id], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};
 

module.exports = db