let db = require('./databaseQueryUser')
let commondb = require('../commonFunction/common')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
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
                   message: "User not dound",
                   "status_code" : 404,
                   status_name : getCode.getStatus(404),
               })
           }
               let deleteUser = await db.deleteUser(uuid,userId,deletedOn)
               console.log(deleteUser)
                       if(deleteUser.affectedRows > 0){
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               status_name : getCode.getStatus(200),
                           })            
       
                       }
                       else{
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not deleted",
                               status_name : getCode.getStatus(500),
                           }) 
                       }
           
        
           
         }
        
     
        } catch(e){
            return res.json({
                "status_code" : 500,
                "message" : "User not deleted",
                status_name : getCode.getStatus(500),
                "error"     :      e
            }) 
        }

})
