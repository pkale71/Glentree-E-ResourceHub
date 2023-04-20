let db = require('./databaseQueryUser')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
let accessToken;
let firstName
let lastName
let userTypeId
let gender
let schoolId;
let uuid;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         accessToken = req.body.accessToken;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         userTypeId = req.body.userType.id
         gender = req.body.gender
         uuid   =   req.body.uuid
            if(req.body.role.id==2 && !req.body.school.id){
                return res.json({
                    "status_code" : 404,
                    "message" : "School Id Missing",
                    status_name : getCode.getStatus(404),
                })
            }
         schoolId = req.body.role.id==2?req.body.school.id:null
        //  authData = await commondb.selectToken(accessToken)
        //  userId = authData[0].userId
        if(uuid.length == 0){
            return res.json({
                message: "uuid not passed",
                "status_code" : 404,
                status_name : getCode.getStatus(404),
            })
        }
         if(uuid){
            //user = await commondb.getUserById(userId)
         
            

               let updateUser = await db.updateUser(uuid,firstName,lastName,gender,userTypeId,schoolId)
               console.log(updateUser)
                       if(updateUser.affectedRows > 0){
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               status_name : getCode.getStatus(200),
                           })            
       
                       }
                       else{
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not updated",
                               status_name : getCode.getStatus(500),
                           }) 
                       }
           
         }
         
        } catch(e){
            return res.json({
                "status_code" : 500,
                "message" : "User not updated",
                status_name : getCode.getStatus(500),
                "error"     :      e
            }) 
        }

})
