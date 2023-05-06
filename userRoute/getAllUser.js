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

module.exports = require('express').Router().get('/:roleId?*',async(req,res)=>{
    try
    {
        token = req.body.access_token;
        roleId = req.params['roleId'];
        let param = req.params['0']
        let paramArr = param.split('/')
        usertypeId = paramArr[1];
        userList = []
        console.log(roleId,usertypeId,paramArr[1],paramArr[2],paramArr)
        // authData = await commondb.selectToken(token)
        // if(authData.length == 0)
        // {
        //     res.status(401)
        //     return res.json({
        //         "status_code" : 401,
        //         "message" : "Invalid token",
        //         'status_name' : getCode.getStatus(401),
        //         }) 
        // }
        // userId = authData[0].userId

        if(usertypeId && roleId)
        {
            user = await db.getUsers(roleId, usertypeId)
                if(user.length == 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data" : {'users' : []},
                        "message" : 'success',
                        "status_name" : getCode.getStatus(200)
                    })
                }
                userList = []
                await Array.from(user).forEach(ele=>{
                    useUser.setDataAll(ele)
                    userList.push(useUser.getDataAll())
                })
    
                if(user.length == userList.length){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data" : {'users' : userList},
                        "message" : 'success',
                        "status_name" : getCode.getStatus(200)
                    })
                }
        }
        else if(roleId && !usertypeId)
        {
            user = await db.getUsers(roleId,0)
                if(user.length == 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data" : {'users' : []},
                        "message" : 'success',
                        "status_name" : getCode.getStatus(200)
                    })
                }
                userList = []
                await Array.from(user).forEach(ele=>{
                    useUser.setDataAll(ele)
                    userList.push(useUser.getDataAll())
                })
    
                if(user.length == userList.length){
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
                if(user.length == 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data" : {'users' : []},
                        "message" : 'success',
                        "status_name" : getCode.getStatus(200)
                    })
                }
                userList = []
                await Array.from(user).forEach(ele=>{
                    useUser.setDataAll(ele)
                    userList.push(useUser.getDataAll())
                })
    
                if(user.length == userList.length){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data" : {'users' : userList},
                        "message" : 'success',
                        "status_name" : getCode.getStatus(200)
                    })
                }     
            
        }
        } catch(e){
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
