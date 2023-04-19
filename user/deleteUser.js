let db = require('./databaseQueryUser')
let commondb = require('../commonFunction/common')
let user;
let accessToken;
let uuid;
let userId;
let authData;
let deletedOn;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         accessToken = req.body.accessToken;
         uuid = req.body.uuid;
         deletedOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
         authData = await commondb.selectToken(accessToken)
         userId = authData[0].userId
         if(userId){

            user = await commondb.getUserById(userId)
         
            if(user.length == 0){
               return res.json({
                   message: "User Not Found",
                   "status_code" : 401,
                   "status_name"  : "Error"
               })
           }
               let deleteUser = await db.deleteUser(uuid,userId,deletedOn)
               console.log(deleteUser)
                       if(deleteUser.affectedRows > 0){
                           return res.json({
                               "status_code" : 200,
                               "message" : "Successfully Deleted",
                               "status_name" : 'ok'
                           })            
       
                       }
                       else{
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not deleted",
                               "status_name" : 'Error'
                           }) 
                       }
           
        
           
         }
        
     
        } catch(e){
            return res.json({
                "status_code" : 500,
                "message" : "User not deleted",
                "status_name" : 'Error',
                "error"     :      e
            }) 
        }

})
