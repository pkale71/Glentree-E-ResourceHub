let db = require('./databaseQueryUser')
let commondb = require('../common/commonDatabaseQuery')
let users = require('../models/user')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let useUser = new users()
let user;
let authData
let userId
let userList = []
let token;
let roleId;
let usertypeId;
let schoolUuid

module.exports = require('express').Router().get('/:roleId?*',async(req,res) => 
{
    try
    {
        if(req.params['0'].length > 0 &&  req.params['0'] != '/')
        {
            let a = req.params['0'].split('/')
            if(a.length == 3)
            {
                roleId = req.params['roleId'] + a[0]
                usertypeId = a[1]
                schoolUuid = a[2]
            }
            else if(a.length == 2) 
            {
                roleId = req.params['roleId'] + a[0]
                usertypeId = a[1]
            }
            else if(a.length == 1) 
            {
                roleId = req.params['roleId'] + a[0]
            }
        }
        else
        {
            roleId = req.params['roleId']
        }
        token = req.body.access_token;
        userList = []
        if(schoolUuid)
        {
            user = await db.getUsers(roleId, usertypeId)
            if(user.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : []},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
            userList = []
            Array.from(user).forEach(ele=>{
                useUser.setDataAll(ele)
                userList.push(useUser.getDataAll())
            })
            if(user.length == userList.length)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : userList},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
        }
        else if(usertypeId)
        {
            user = await db.getUsers(roleId, usertypeId)
            if(user.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : []},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
            userList = []
            Array.from(user).forEach(ele=>{
                useUser.setDataAll(ele)
                userList.push(useUser.getDataAll())
            })
            if(user.length == userList.length)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : userList},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
        }
        else if(roleId)
        {
            user = await db.getUsers(roleId,0)
            if(user.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : []},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
            userList = []
            Array.from(user).forEach(ele => {
                useUser.setDataAll(ele)
                userList.push(useUser.getDataAll())
            })
            if(user.length == userList.length)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : userList},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
        }
        else
        {
            user = await db.getUsers(0,0)
            if(user.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : []},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
            userList = []
            Array.from(user).forEach(ele=>{
                useUser.setDataAll(ele)
                userList.push(useUser.getDataAll())
            })
            if(user.length == userList.length)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : userList},
                    "message" : 'success',
                    "status_name" : getCode.getStatus(200)
                })
            }
        }
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
