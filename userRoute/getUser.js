let db = require('./databaseQueryUser')
let users = require('../models/user')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let useUser = new users()
let user;
let userUUID;
let schools;
let schoolList = []
module.exports = require('express').Router().get('/:userUUID',async(req,res) => 
{
    try
    {
        accessToken = req.body.token    
        userUUID = req.params.userUUID
        schoolList = []
        if(userUUID.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "User not found",
                'status_name' : getCode.getStatus(404)
            })
        }
        schools = await db.getSchools(userUUID)
        if(schools.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "School not found",
                'status_name' : getCode.getStatus(404)
            })
        }
        user = await db.getUser(userUUID)
        if(user.length == 0)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"      :  { user : []},
                "message"    : 'success',
                "status_name" : getCode.getStatus(200)
            }) 
        }
        schools.forEach(element => {
            useUser.setSchool(element)
            schoolList.push(useUser.getSchool())
        }); 
        user[0]['schools'] = schoolList
        useUser.setDataAll(user[0])
        res.status(200)
        return res.json({
            "status_code" : 200,
            "data" :{ user : useUser.getDataAll()},
            "message" : 'success',
            "status_name" : getCode.getStatus(200)
        })               
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code" : 500,
            "message" : "User not found",
            "status_name" : getCode.getStatus(500),
            "error"     :      e.sqlMessage
        }) 
    }
})
