let db = require('./databaseQueryUser')
let commondb = require('../commonFunction/common')
let users = require('../models/user')
let useUser = new users()
let user;
let authData
let userId
let userList = []

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         accessToken = req.body.accessToken;
         authData = await commondb.selectToken(accessToken)
         if(authData.length == 0){
            return res.json({
                "status_code" : 401,
                "message" : "User unauthenticated",
                "status_name" : 'Error',
                }) 
         }
         userId = authData[0].userId
        if(userId){

            user = await db.getUsers()
            console.log(user[0])
            if(user.length == 0){
                return res.json({
                    "status_code" : 500,
                    "message" : "No record found",
                    "status_name" : 'Failed'
                })
            }
            userList = []
            await Array.from(user).forEach(ele=>{
                useUser.setData(ele)
                userList.push(useUser.getData())
            })

            if(user.length == userList.length){
                return res.json({
                    "status_code" : 200,
                    "data" : user,
                    "status_name" : 'ok'
                })
            }     
        }
        } catch(e){
            console.log(e)
           
                return res.json({
                    "status_code" : 500,
                    "message" : "Error not found",
                    "status_name" : 'Error',
                    "error"     :      e
                }) 
           
        }

})
