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

module.exports = require('express').Router().get('/',async(req,res)=>{
    try{
        let tokenReceived = req.headers['authorization']
        if(typeof tokenReceived !== 'undefined'){
           tokenArr = tokenReceived.split(" ")
           token = tokenArr[1]
           token = token.toString()
        }

        if(token.length == 0){
            res.status(401)
           return res.json({
               message: "Invalid token provided",
               status_name : getCode.getStatus(401),
               "status_code"  :       401
           })
       }     
         authData = await commondb.selectToken(token)
         if(authData.length == 0){
            res.status(401)
            return res.json({
                "status_code" : 401,
                "message" : "Invalid token",
                status_name : getCode.getStatus(401),
                }) 
         }
         userId = authData[0].userId
        if(userId){

            user = await db.getUsers()
            if(user.length == 0){
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data" : {'users' : []},
                    "message" : 'success',
                    status_name : getCode.getStatus(200)
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
                    status_name : getCode.getStatus(200)
                })
            }     
        }
        } catch(e){
            console.log(e)
            res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "User not found",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
           
        }

})
