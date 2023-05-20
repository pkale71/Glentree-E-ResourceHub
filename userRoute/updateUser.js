let db = require('./databaseQueryUser')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let accessToken;
let firstName
let lastName
let userTypeId
let gender
let schoolId;
let schoolUuid;
let uuid;
let email
let mobile

module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        
        if(!req.body.email  || !req.body.firstName?.trim()  || !req.body.role?.id  || !req.body.mobile  || !req.body.userType.id  || !req.body.gender  || (req.body.role?.id==2 && !req.body.school?.uuid)){
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message" : "Provide all values",
                "status_name" : getCode.getStatus(400)
            })
        }
         accessToken = req.body.accessToken;
         firstName = req.body.firstName?.trim() 
         lastName = req.body.lastName?.trim() 
         userTypeId = req.body.userType.id
         gender = req.body.gender?.trim()
         uuid   =   req.body.uuid
         email = req.body.email
         mobile = req.body.mobile
            if(req.body.role?.id==2 && !req.body.school?.uuid){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "School uuid Missing",
                    "status_name" : getCode.getStatus(404),
                })
            }
         schoolUuid = req.body.role?.id==2?req.body.school?.uuid:null
        if(schoolUuid){
            console.log("true")
            schoolId = await db.selectSchool(schoolUuid)
            if(schoolId.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "Provide valid school uuid number",
                    "status_name" : getCode.getStatus(404),
                })
            }
            schoolId = schoolId[0].id
        }
        else{
            schoolId = null
        }
        if(uuid.length == 0)
        {
            res.status(404)
            return res.json({
                message: "User not found",
                "status_code" : 404,
                "status_name" : getCode.getStatus(404),
            })
        }
        if(uuid)
        {
               let updateUser = await db.updateUser(uuid,firstName,lastName,gender,userTypeId,schoolId,email,mobile)
               console.log("***",updateUser)
                       if(updateUser.affectedRows > 0){
                        res.status(200)
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               "status_name" : getCode.getStatus(200),
                           })            
       
                       }
                       else{
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not updated",
                               "status_name" : getCode.getStatus(500),
                           }) 
                       }
           
        }
         
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code" : 500,
            "message" : "User not updated",
            "status_name" : getCode.getStatus(500),
            "error"     :      e.sqlMessage
        }) 
    }

})
