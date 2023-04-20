let pool = require('../databaseConnection/createconnection')
let db = {};
 

db.insertUser = (userUuid,firstName,lastName,email,password,gender,userId,userTypeId,roleId,mobile,schoolId,createdOn) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('INSERT INTO user (uuid,first_name,last_name, role_id, user_type_id,mobile,email,gender,school_id,password,is_active,created_on,created_by_id) VALUES (?,  ?, ?, ?,  ?,  ?,  ?,  ?,  ?,  ?  ,?  ,?  ,?  )', [userUuid,firstName,lastName,roleId,userTypeId,mobile,email,gender,schoolId,password,1,createdOn,userId], (error, result)=>{
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

db.deleteUser = (uuid,userId,deletedOn) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE user SET is_active=?, deleted_on=?, deleted_by_id=? WHERE uuid = ?', [0,deletedOn,userId,uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }
        catch(e){
            console.log(e)
        }
      
    });
};
 
 
db.updateUser = (uuid,firstName,lastName,gender,userTypeId,schoolId) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE user SET first_name = ?,last_name = ?, user_type_id= ?, gender= ?, schoolId=? WHERE uuid = ?', [firstName,lastName,userTypeId,gender,schoolId,uuid], (error)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve();
            });
        }
        catch(e){ console.log(e)}
       
    });
};

db.getUsers = () =>{
    return new Promise((resolve, reject)=>{
        try{pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',u.last_name) AS fullName,u.role_id,r.name AS role_name, u.user_type_id,u.email,u.mobile, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code, u.is_active AS isActive, u.created_by_id AS createdById, u.deleted_by_id,uc.uuid AS createdbyUuid, CONCAT(uc.first_name,' ',uc.last_name) AS createdfullName, ud.uuid AS deletedbyUuid, CONCAT(ud.first_name,' ',ud.last_name) AS deletedfullName FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id  LEFT JOIN user uc ON (u.created_by_id = uc.id) LEFT JOIN user ud ON (u.deleted_by_id = ud.id)WHERE u.id != 1", (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
    };


db.getUser = (uuid) => {
        return new Promise((resolve, reject) => {
            try{
                pool.query("SELECT u.uuid, CONCAT(u.first_name,' ',u.last_name) AS fullName, u.role_id,r.name AS role_name, u.user_type_id,u.email,u.mobile,  u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code, u.is_active AS isActive, u.created_by_id AS createdById, u.deleted_by_id,uc.uuid AS createdbyUuid, CONCAT(uc.first_name,' ',uc.last_name) AS createdfullName, ud.uuid AS deletedbyUuid, CONCAT(ud.first_name,' ',ud.last_name) AS deletedfullName FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id  LEFT JOIN user uc ON (u.created_by_id = uc.id) LEFT JOIN user ud ON (u.deleted_by_id = ud.id) WHERE u.id !=1 AND u.uuid = ?",[uuid] ,(error, result)=>{
                if(error){
                return reject(error);
                 }          
                return resolve(result);
                });
            }
            catch(e){ console.log(e)}
            
        });
    }; 

module.exports = db