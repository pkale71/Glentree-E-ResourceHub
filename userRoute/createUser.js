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
let schoolUuids;
let createdOn;
let authData
let userId

module.exports = require('express').Router().post('/',async(req,res) => 
{
    try
    {
        if(!req.body.email  || !req.body.password || !req.body.firstName?.trim()  || !req.body.role?.id  || !req.body.mobile  || !req.body.userType.id  || !req.body.gender  || !req.body.schools || (req.body.schools?.length == 0))
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message" : "Provide all values",
                "status_name" : getCode.getStatus(400)
            })
        }
        email = req.body.email;
        password = req.body.password;
        accessToken = req.body.accessToken;
        firstName = req.body.firstName?.trim();
        lastName = req.body.lastName == '' ? null : req.body.lastName?.trim();
        roleId = req.body.role.id
        mobile = req.body.mobile
        userTypeId = req.body.userType.id
        gender = req.body.gender?.trim()
        userUUid = userUuid.v1()
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        schoolUuids = req.body.schools.split(',')
        authData = await commondb.selectToken(accessToken)
        userId = authData[0].userId
        if(userId)
        {
            let insertUser = await db.insertUser(userUUid,firstName,lastName,email,password,gender,userId,userTypeId,roleId,mobile,createdOn)
            if(insertUser.affectedRows > 0)
            {
                let insertUserTypeChangeHistory = await db.insertUserTypeChangeHistory(insertUser.insertId,null, userTypeId,createdOn, userId)
                let sql = `INSERT INTO user_school (user_id, school_id)  VALUES  `
                schoolUuids.forEach((element,i) => 
                {
                    sql = sql + `(${insertUser.insertId},(SELECT id FROM school WHERE uuid = '${element}'))` 
                    if(schoolUuids.length != i+1)
                    {
                        sql = sql+`,`
                    }
                });
                let insertUserSchool = await db.insertUserSchools(sql)
                let returnUuid = await db.getUserUuid(insertUser.insertId) 
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message" : "success",
                    "data" : { "uuid" : returnUuid[0].uuid},
                    "status_name" : getCode.getStatus(200)
                })            
            }
            else
            {
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "User not created",
                    "status_name" : getCode.getStatus(500)
                }) 
            }        
        }
    } 
    catch(e)
    {
        console.log(e)
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
