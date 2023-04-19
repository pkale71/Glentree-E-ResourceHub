let db = require('./databaseQueryAuth')
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
            console.log("1")
            return res.json({
                message: "Invalid Token",
                "status_name": "Access Denied! Unauthorized User",
                "status_code"   :       401
            })
        }        
                let deletedToken = await db.deleteToken(token)
                console.log(deletedToken)
                if(deletedToken.affectedRows > 0){
                    return res.json({
                        "status_code" : 200,
                        "message" : "Successfully Logout",
                        "status_name" : 'ok'
                    })            

                }
                else{
                    return res.json({
                        "status_code" : 200,
                        "message" : "Logout Failed, user not found",
                        "status_name" : 'ok'
                    }) 
                }   
        } catch(e){
            return res.json({
                "status_code" : 200,
                "message" : "Logout Failed",
                "status_name" : 'ok',
                "error"     : e
            }) 
        }

})
