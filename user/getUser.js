let db = require('./databaseQueryUser')
let commondb = require('../commonFunction/common')
let users = require('../models/user')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
let useUser = new users()
let user;
let authData
let userId
let token;
let userUUID;
module.exports = require('express').Router().get('/:userUUID',async(req,res)=>{
    try{
        let tokenReceived = req.headers['authorization']
        if(typeof tokenReceived !== 'undefined'){
           tokenArr = tokenReceived.split(" ")
           token = tokenArr[1]
           token = token.toString()
        }

        if(token.length == 0){
           return res.json({
               message: "Invalid token provided",
               status_name : getCode.getStatus(401),
               "status_code"  :       401
           })
       }     
         authData = await commondb.selectToken(token)
         if(authData.length == 0){
            return res.json({
                "status_code" : 401,
                "message" : "Invalid token",
                status_name : getCode.getStatus(401),
                }) 
         }
         userUUID = req.params.userUUID
         if(userUUID.length == 0){
            return res.json({
                "status_code" : 404,
                "message" : "No record found",
                status_name : getCode.getStatus(404)
            })
         }
         userId = authData[0].userId
        if(userId){

            user = await db.getUser(userUUID)
            if(user.length == 0){
                return res.json({
                    "status_code" : 404,
                    "message" : "No record found",
                    status_name : getCode.getStatus(404)
                })
            }
                useUser.setDataAll(user[0])
                return res.json({
                    "status_code" : 200,
                    "data" :{ user : useUser.getDataAll()},
                    "status_name" : 'ok'
                })
               
        }
        } catch(e){
            console.log(e)
           
                return res.json({
                    "status_code" : 500,
                    "message" : "Error not found",
                    status_name : getCode.getStatus(500),
                    "error"     :      e
                }) 
           
        }

})
