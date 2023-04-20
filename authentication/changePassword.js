let db = require('./databaseQueryAuth')
let commondb = require('../commonFunction/common')
let user;
let oldPassword;
let newPassword;
let authData
let userId

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         oldPassword = req.body.oldPassword;
         newPassword = req.body.newPassword;
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

            user = await commondb.getUserById(userId)
         
            if(user.length == 0){
               return res.json({
                   message: "User Not Found"
               })
           }
           let isValidPassword = user[0].password == oldPassword
       if(isValidPassword){
        let updateUser = await db.updateUser(userId,newPassword)
        console.log(updateUser)
                if(insertUser.affectedRows > 0){
                    return res.json({
                        "status_code" : 200,
                        "message" : "Successfully Updated",
                        "status_name" : 'ok'
                    })            

                }
                else{
                    return res.json({
                        "status_code" : 500,
                        "message" : "Password not changed",
                        "status_name" : 'Error'
                    }) 
                }
       }
       else{
        return res.json({
            "status_code" : 401,
            "message" : "Password not matched",
            "status_name" : 'Error',
            
        }) 
    }
                
        }
        } catch(e){
            console.log(e)
           
                return res.json({
                    "status_code" : 500,
                    "message" : "Password not changed",
                    "status_name" : 'Error',
                    "error"     :      e
                }) 
           
        }

})
