let db = require('./databaseQueryAuth')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let users = require('../models/user')
let generate_token = require('./tokenGenerate')
let useUser = new users()
let email;
let password;
let userId
module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         email = req.body.email;
         password = req.body.password;
         user = await db.getUserByEmail(email);
        if(user.length == 0){
            return res.json({
                status_code : 401,
                message: "Invalid email or password",
                status_name : getCode.getStatus(401)
            })
        }
        user[0]['time'] = Date()
        userId = user[0].id
        console.log(user[0],email,password,user[0].password,(user[0].password==password))
        let isValidPassword = user[0].password == password
        if(isValidPassword){
            user.password = undefined;
            let mysqlDatetime = new Date(user[0].time).toISOString().slice(0, 19).replace('T', ' ');
            const jsontoken = generate_token(56)
            console.log(jsontoken)
            if(jsontoken != null || jsontoken != undefined){
                user[0]['access_token']=jsontoken
                let insertToken = await db.insertToken(jsontoken, userId, mysqlDatetime)
                let insert_lastLogin = await db.insertLastLogin(userId,mysqlDatetime)
                useUser.setData(user[0])
                return res.json(useUser.getData())
            }
            
        }  else{
            return res.json({
                status_code : 401,
                message: "Invalid email or password",
                status_name : getCode.getStatus(401)
            });
        } 
     
        } catch(e){
            return res.json({
                status_code : 401,
                message: "Invalid email or password",
                status_name : getCode.getStatus(401)
            });
        }

})
