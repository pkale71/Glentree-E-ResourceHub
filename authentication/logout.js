let db = require('./databaseQueryAuth')
let token;
module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
              token = req.body.accessToken
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
