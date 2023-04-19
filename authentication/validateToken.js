let jwt = require('jsonwebtoken')
let db = require('./databaseQueryAuth')
let commondb = require('../commonFunction/common')
let userTypeCode;
let accessToken;
let userId;
let authData;
let tokenArr;
let email
module.exports = require('express').Router().post('/',async (req,res,next)=>{
    try {
         let token = req.headers['authorization']
         if(typeof token !== 'undefined'){
            tokenArr = token.split(" ")
            accessToken = tokenArr[1]
            accessToken = accessToken.toString()
         }

         if(accessToken.length == 0){
            console.log("1")
            return res.json({
                message: "Invalid Token",
                "status_name": "Access Denied! Unauthorized User",
                "status_code"   :       401
            })
        }
        authData = await commondb.selectToken(accessToken)
        userId = authData[0].userId
        if(userId){
            user = await commondb.getUserById(userId);
            email = user[0].email
            if(user.length == 0){
                console.log("1")
                return res.json({
                    message: "Invalid token"
                })
            }
            userTypeCode = user[0].user_type_code

            const verified = (accessToken === authData[0].authToken)
    
            if(verified){
                console.log("3", req.baseUrl)
                if(req.baseUrl !=  '/user/createUser'){
                    req.body.accessToken = accessToken
                    next()
                }
               else if((userTypeCode == 'SUADM'||userTypeCode == 'HDOFA') &&  req.baseUrl ==  '/user/createUser'){
                console.log("4")
    
                    console.log(userTypeCode)
                    req.body.accessToken = accessToken
                    next()
                }
                else {
                console.log("5")
    
                    return res.json({
                        'message'       :       `Access denied, you are not super admin`,
                        'status_name'   :       'false',
                        "status_code"   :       401
                    });
                }
            }
            else{
                console.log("6")
    
                // Access Denied
                return res.json({
                    'message'       :       `Unauthenticated User "${email}"`,
                    'status_name'   :       'Access Denied Invalid Token',
                    "status_code"   :       401
                });
            }
    
    
              
        }
        else{
            console.log("8")

            return res.json({
                'message'       :       `Unauthenticated User "${email}"`,
                'status_name'   :       'Access Denied',
                "status_code"   :       401
            });
        }
    } catch (error) {
        console.log("9")

        // Access Denied
        return res.json({
            'message'       :       `Unauthenticated User "${email}"`,
            'status_name'   :       'Access Denied',
            "status_code"   :       401,
            "error"         :       error
        });
    }


})