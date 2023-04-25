const mysql = require('mysql');
 
  let obj = {
 
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
}
  
const pool = mysql.createPool(obj);
 // console.log(obj)
   
  
// let db = {};
 
// // ***Requests to the User table ***
 
// //*****SELECT USER***** */

// db.getUserByEmail = (email) =>{
//    // console.log("************ ", obj)
//    // 
//     return new Promise((resolve, reject)=>{
//       //console.log("************ ", mysql.Types)
//         pool.query("SELECT u.uuid,CONCAT(u.first_name,' ',u.last_name) AS fullName,u.role_id,r.name AS role_name, u.user_type_id, u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code FROM user u LEFT JOIN role r ON u.role_id = r.id LEFT JOIN user_type ut ON ut.id = u.user_type_id WHERE u.email = ?", [email], (error, users)=>{
//             if(error){
//                 return reject(error);
//             }
//     //console.log("************ ", users)

//             return resolve(users);
//         });
//     });
// };

// db.getUserDataByEmail = (email) =>{
//     // console.log("************ ", obj)
//     // 
//      return new Promise((resolve, reject)=>{
//        //  console.log("************ ", pool)
//          pool.query('SELECT * FROM user WHERE email = ?', [email], (error, users)=>{
//              if(error){
//                  return reject(error);
//              }
//      //console.log("************ ", users)
 
//              return resolve(users);
//          });
//      });
//  };
//  db.selectToken = (userId) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM auth_data WHERE user_id = ?', [userId], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result);
//         });
//     });
// };
 
// db.insertToken = (authtoken, userId, authTime) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('INSERT INTO auth_data (auth_token, user_id, auth_time) VALUES (?,  ?, ?)', [authtoken, userId, authTime], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result);
//         });
//     });
// };

// db.deleteToken = (userId) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('DELETE FROM auth_data WHERE user_id = ?', [userId], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result);
//         });
//     });
// };

// db.insertLastLogin = (userId, authTime) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('UPDATE user SET last_login=? WHERE id = ?', [authTime,userId], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result);
//         });
//     });
// };

// db.deleteUsers = (userId,deletedById) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('UPDATE user SET is_active=?, deleted_on=SELECT NOW(), deleted_by_id=? WHERE id = ?', [0,deletedById,userId], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result);
//         });
//     });
// };
 
 
// db.updateUser = (userName, role, email, password, id) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('UPDATE User SET user_name = ?, role= ?, email= ?, password=? WHERE id = ?', [userName, role, email, password, id], (error)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve();
//         });
//     });
// };
 
 
 
// db.deleteUser = (id) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('DELETE FROM User WHERE id = ?', [id], (error)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(console.log("User deleted"));
//         });
//     });
// };
 
 
 
    
module.exports = pool