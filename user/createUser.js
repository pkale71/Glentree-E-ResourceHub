let db = require('./databaseQueryUser')
let commondb = require('../commonFunction/common')
let userUuid = require('uuid')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
let user;
let email;
let password;
let accessToken;
let firstName
let lastName
let roleId
let userTypeId
let mobile
let gender
let userUUid;
let schoolId;
let createdOn;
let authData
let userId

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         email = req.body.email;
         password = req.body.password;
         accessToken = req.body.accessToken;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         roleId = req.body.role.id
         mobile = req.body.mobile
         userTypeId = req.body.userType.id
         gender = req.body.gender
         userUUid = userUuid.v1()
         createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
            if(req.body.role.id==2 && !req.body.school.id){
                return res.json({
                    "status_code" : 404,
                    "message" : "School Id Missing",
                    status_name : getCode.getStatus(404)
                })
            }
         schoolId = req.body.role.id==2?req.body.school.id:null

         authData = await commondb.selectToken(accessToken)
        userId = authData[0].userId
        if(userId){

            user = await commondb.getUserById(userId)
         
            if(user.length == 0){
               return res.json({
                "status_code" : 401,
                "message" : "Invalid token",
                status_name : getCode.getStatus(401)
               })
           }
     
              // console.log("***********",)
               let insertUser = await db.insertUser(userUUid,firstName,lastName,email,password,gender,userId,userTypeId,roleId,mobile,schoolId,createdOn)
               console.log(insertUser)
                       if(insertUser.affectedRows > 0){
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               status_name : getCode.getStatus(200)
                           })            
       
                       }
                       else{
                           return res.json({
                               "status_code" : 500,
                               "message" : "Insertion Failed",
                               status_name : getCode.getStatus(500)
                           }) 
                       }
           
        }
        } catch(e){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                return res.json({
                    "status_code" : 500,
                    "message" : "User not created",
                    status_name : getCode.getStatus(500),
                    "error"     :     "Duplicate Entry"
                }) 
            }else{
                return res.json({
                    "status_code" : 500,
                    "message" : "User not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e
                }) 
            }
           
        }

})
