let db = require('./databaseQueryUser')
let userUuid = require('uuid')
let users = require('../models/user')
let useUser = new users()
let user;
let email;
let password;
let accessToken;
let uuid;
let firstName
let lastName
let roleId
let userTypeId
let mobile
let userEmail
let gender
let userPassword
let createdById
let userUUid;
let schoolId;
let createdOn;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         email = req.body.email;
         uuid = req.body.uuid;
         password = req.body.password;
         accessToken = req.body.accessToken;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         roleId = req.body.roleId
         mobile = req.body.mobile
         userTypeId = req.body.userTypeId
         userEmail = req.body.userEmail
         userPassword = req.body.userPassword
         gender = req.body.gender
         userUUid = userUuid.v1()
         createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
            if(req.body.roleId==2 && !req.body.schoolId){
                return res.json({
                    "status_code" : 500,
                    "message" : "School Id Missing",
                    "status_name" : 'Failed'
                })
            }
         schoolId = req.body.roleId==2?req.body.schoolId:null
         user = await db.getUserByUuid(uuid)
         
         if(user.length == 0){
            console.log("1")
            return res.json({
                message: "Invalid email or password"
            })
        }
        createdById = user[0].id
        if(createdById){
        console.log(createdById,user[0].id)
            
           // console.log("***********",)
            let insertToken = await db.insertUser(userUUid,firstName,lastName,userEmail,userPassword,gender,createdById,userTypeId,roleId,mobile,schoolId,createdOn)
            console.log(insertToken)
                    if(insertToken.affectedRows > 0){
                        return res.json({
                            "status_code" : 200,
                            "message" : "Successfully Inserted",
                            "status_name" : 'ok'
                        })            
    
                    }
                    else{
                        return res.json({
                            "status_code" : 500,
                            "message" : "Insertion Failed",
                            "status_name" : 'Error'
                        }) 
                    }
        }
     
        
     
        } catch(e){
            return res.json({
                "status_code" : 500,
                "message" : "User not created",
                "status_name" : 'Error',
                "error"     :      e
            }) 
        }

})
