let db = require('./databaseQueryAuth')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let users = require('../models/user')
let generate_token = require('./tokenGenerate')
let useUser = new users()
let email;
let password;
let userId
let user
let schools;
let schoolList = []
module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        email = req.body.email;
        password = req.body.password;
        schoolList = []
        schools = await db.getSchools(email)
        user = await db.getUserByEmail(email);
        if(user.length == 0)
        {
            res.status(401)
            return res.json({
                "status_code" : 401,
                "message"     : "Invalid email or password",
                "status_name" : getCode.getStatus(401)
            })
        }
        if((user[0].user_type_code != 'SUADM') && (schools.length == 0))
        {
            res.status(401)
            return res.json({
                "message"       : "School is not active",
                "status_name"   : getCode.getStatus(401),
                "status_code"   : 401
            })
        }
        user[0]['time'] = Date()
        userId = user[0].id
        let isValidPassword = user[0].password == password
        if(isValidPassword && user[0].is_active == 1)
        {
            user.password = undefined;
            let mysqlDatetime = new Date(user[0].time).toISOString().slice(0, 19).replace('T', ' ');
            const jsontoken = generate_token(56)
            if(jsontoken != null || jsontoken != undefined)
            {
                user[0]['access_token']=jsontoken
                let insertToken = await db.insertToken(jsontoken, userId, mysqlDatetime)
                let insert_lastLogin = await db.insertLastLogin(userId,mysqlDatetime)
                schools.forEach(element => {
                    useUser.setSchool(element)
                    schoolList.push(useUser.getSchool())
                }); 
                user[0]['schools'] = schoolList
                useUser.setData(user[0])
                res.status(200)
                return res.json(useUser.getData())
            } 
        }  
        else
        {
            res.status(401)
            return res.json({
                "status_code" : 401,
                "message": "Invalid email or password",
                "status_name" : getCode.getStatus(401)
            });
        } 
    } 
    catch(e)
    {
        res.status(401)
        return res.json({
            "status_code" : 401,
            "message"     : "Invalid email or password",
            "status_name" : getCode.getStatus(401),
            "errror"      : e.sqlMessage
        });
    }
})
