let pool = require('../databaseConnection/createconnection')
let db = {};
 

db.insertUser = (userUuid,firstName,lastName,email,password,gender,userId,userTypeId,roleId,mobile,schoolId,createdOn) =>{
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
 
 
db.updateUser = (userId,firstName,lastName,gender,userTypeId,schoolId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE user SET first_name = ?,last_name = ?, user_type_id= ?, gender= ?, schoolId=? WHERE userUuid = ?', [firstName,lastName,userTypeId,gender,schoolId,userId], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};
 

module.exports = db