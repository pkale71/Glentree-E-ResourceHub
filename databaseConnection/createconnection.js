const mysql = require('mysql');
 
  let obj = {
    connectionLimit: process.env.CONNECTION_LIMIT,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
}
  
const pool = mysql.createPool(obj);
    
   
  
let db = {};
 
// ***Requests to the User table ***
 

 
 
db.getUserByEmail = (email) =>{
   // console.log("************ ", obj)
   // 
    return new Promise((resolve, reject)=>{
      //  console.log("************ ", pool)
        pool.query('SELECT * FROM user WHERE email = ?', [email], (error, users)=>{
            if(error){
                return reject(error);
            }
    //console.log("************ ", users)

            return resolve(users);
        });
    });
};
 
 
 
db.insertUser = (userName, email, password) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO User (user_name, email, password) VALUES (?,  ?, ?)', [userName, email, password], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
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
 
 
 
db.deleteUser = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM User WHERE id = ?', [id], (error)=>{
            if(error){
                return reject(error);
            }
            return resolve(console.log("User deleted"));
        });
    });
};
 
 
 
    
module.exports = db