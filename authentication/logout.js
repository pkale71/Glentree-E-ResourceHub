let db = require('./databaseQueryAuth')
let token;
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
module.exports = require('express').Router().get('/',async(req,res)=>{
    try{
        let tokenReceived = req.headers['authorization']
         if(typeof tokenReceived !== 'undefined'){
            tokenArr = tokenReceived.split(" ")
            token = tokenArr[1]
            token = token.toString()
         }

         if(token.length == 0){
            console.log("1")
            res.status(401)
            return res.json({
                message: "Invalid token provided",
                status_name : getCode.getStatus(401),
                "status_code"  :       401
            })
        }        
                let deletedToken = await db.deleteToken(token)
                console.log(deletedToken)
                if(deletedToken.affectedRows > 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message" : "success",
                        "status_name" : 'ok'
                    })            

                }
                else{
                    res.status(404)
                    return res.json({
                        "status_code" : 404,
                        "message" : "Logout Failed, user not found",
                        status_name : getCode.getStatus(404)
                    }) 
                }   
        } catch(e){
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "Logout Failed",
                 status_name : getCode.getStatus(500),
                "error"     : e.sqlMessage
            }) 
        }

})
