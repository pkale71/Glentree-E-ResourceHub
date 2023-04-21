let db = require('./databaseQueryUser')
let commondb = require('../common/commonDatabaseQuery')
let userUuid = require('uuid')
let errorCode = require('../common/errorCode')
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
let schoolUuid;
let schoolId;
let createdOn;
let authData
let userId

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
        console.log(req.body.email)
        if(req.body.email == undefined || req.body.password == undefined || req.body.firstName == undefined  || req.body.role.id == undefined || req.body.mobile == undefined || req.body.userType.id == undefined || req.body.gender == undefined || (req.body.role.id==2 && req.body.school == undefined)){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Provide all values",
                status_name : getCode.getStatus(404)
            })
        }
         email = req.body.email;
         password = req.body.password;
         accessToken = req.body.accessToken;
         firstName = req.body.firstName;
         lastName = req.body.lastName == '' ? null : req.body.lastName;
         roleId = req.body.role.id
         mobile = req.body.mobile
         userTypeId = req.body.userType.id
         gender = req.body.gender
         userUUid = userUuid.v1()
         createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        
         if(req.body.role.id==2 && !req.body.school.uuid){
            res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "School Uuid Missing",
                    status_name : getCode.getStatus(404)
                })
            }
         schoolUuid = req.body.role.id==2?req.body.school.uuid:null
        if(schoolUuid){
            schoolId = await db.selectSchool(schoolUuid)
            console.log(schoolId)
            schoolId = schoolId[0].id 
        }
        else{
            schoolId = null
        }
        authData = await commondb.selectToken(accessToken)
            userId = authData[0].userId
            if(userId){
    
                user = await commondb.getUserById(userId)
             
                if(user.length == 0){
                    res.status(401)
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
                            res.status(200)
                               return res.json({
                                   "status_code" : 200,
                                   "message" : "success",
                                   status_name : getCode.getStatus(200)
                               })            
           
                           }
                           else{
                            res.status(500)
                               return res.json({
                                   "status_code" : 500,
                                   "message" : "Insertion Failed",
                                   status_name : getCode.getStatus(500)
                               }) 
                           }
               
            }
        
        } catch(e){
            console.log(e)
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            if(e.code == 'ER_DUP_ENTRY'){
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : msg,
                    status_name : getCode.getStatus(500),
                    "error"     :    msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "User not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
