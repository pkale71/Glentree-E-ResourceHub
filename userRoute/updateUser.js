let db = require('./databaseQueryUser')
let errorCode = require('../common/errorCode')
let commondb = require('../common/commonDatabaseQuery')
let getCode = new errorCode()
let accessToken;
let firstName
let lastName
let userTypeId
let gender
let schoolId;
let schoolUuids;
let uuid;
let email
let mobile
let deleteUserTypeId

module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        if(!req.body.email  || !req.body.firstName?.trim()  || !req.body.role?.id  || !req.body.mobile  || !req.body.userType.id  || !req.body.gender  || !req.body.schools || (req.body.schools?.length == 0))
        {
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
         schoolUuids = req.body.schools.split(',')
         createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        if(uuid.length == 0)
        {
            res.status(404)
            return res.json({
                message: "User not found",
                "status_code" : 404,
                "status_name" : getCode.getStatus(404),
            })
        }
        authData = await commondb.selectToken(accessToken)
        let createdById = authData[0].userId
        if(uuid)
        {
            let userId = await db.getUserId(uuid)
            db.insertUserTypeChangeHistory(userId[0].id, userTypeId,createdOn, createdById, 'update').then(async(res1) => 
            {
                if(res1)
                {
                    deleteUserTypeId = res1.insertId
                    let updateUser = await db.updateUser(uuid,firstName,lastName,gender,userTypeId,email,mobile)
                       if(updateUser.affectedRows > 0)
                       {
                        let deleteUserSchool = await db.deleteSchools(uuid)
                        let sql = `INSERT INTO user_school (user_id, school_id)  VALUES  `
                        schoolUuids.forEach((element,i) => 
                        {
                            sql = sql + `(${userId[0].id},(SELECT id FROM school WHERE uuid = '${element}'))` 
                            if(schoolUuids.length != i+1)
                            {
                                sql = sql+`,`
                            }
                        });
                        let insertUserSchool = await db.insertUserSchools(sql)
                        res.status(200)
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               "status_name" : getCode.getStatus(200),
                           })            
       
                       }
                       else
                       {
                        let deleteUserTypeHistory = await db.deleteUserTypeChangeHistory(deleteUserTypeId)
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not updated",
                               "status_name" : getCode.getStatus(500),
                           }) 
                       }
                }
            }) 
        }
         
    } 
    catch(e)
    {
        let deleteUserTypeHistory = await db.deleteUserTypeChangeHistory(deleteUserTypeId)
        console.log(e,deleteUserTypeHistory,deleteUserTypeId)
        if(e.code == 'ER_DUP_ENTRY')
        {
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : msg,
                "status_name" : getCode.getStatus(500),
                "error"     :    msg
            }) 
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "User not created",
                "status_name" : getCode.getStatus(500),
                "error"     :      e.sqlMessage
            }) 
        } 
    }

})
