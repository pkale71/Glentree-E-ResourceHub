let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let userTypeCode;
let accessToken;
let userId;
let authData;
let tokenArr;
let email

module.exports = require('express').Router().get('/:UUID',async (req,res,next)=>{
    try {
        console.log("PARAM")
         let token = req.headers['authorization']
         if(!token){
            res.status(401)
            return res.json({
                message: "Provide Token",
                status_name : getCode.getStatus(401),
                "status_code"   :  401
            })
         }
         if(typeof token !== 'undefined'){
            tokenArr = token.split(" ")
            accessToken = tokenArr[1]
            accessToken = accessToken.toString()
         }

         if(accessToken.length == 0){
            res.status(401)
            return res.json({
                message: "Invalid Token",
                status_name : getCode.getStatus(401),
                "status_code"   :  401
            })
        }

        authData = await commondb.selectToken(accessToken)
        if(authData.length == 0){
            res.status(401)
            return res.json({
                message: "Invalid Token",
                status_name : getCode.getStatus(401),
                "status_code"   :  401
            })
        }

        userId = authData[0].userId
        if(userId){
            user = await commondb.getUserById(userId);
            email = user[0].email
            if(user.length == 0){
                console.log("1")
                res.status(401)
                return res.json({
                    message: "Invalid Token",
                    status_name : getCode.getStatus(401),
                    "status_code"   :  401
                })
            }
            userTypeCode = user[0].user_type_code

            const verified = (accessToken === authData[0].authToken)
    
            if(verified){
                console.log("3", req.baseUrl,userTypeCode)
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
                res.status(401)
                    return res.json({
                        'message'       :       `Token not matched`,
                        status_name     :        getCode.getStatus(401),
                        "status_code"   :        401
                    });
                }
            }
            else{
                console.log("6")
                res.status(401)
                // Access Denied
                return res.json({
                    'message'       :       `Unauthenticated User "${email}"`,
                    status_name : getCode.getStatus(401),
                    "status_code"   :       401
                });
            }
    
    
              
        }
        else{
            console.log("8")
            res.status(401)
            return res.json({
                'message'       :       `Unauthenticated User "${email}"`,
                status_name : getCode.getStatus(401),
                "status_code"   :       401
            });
        }
    } catch (error) {
        console.log("9****", req.method)

        // Access Denied
        res.status(401)
        return res.json({
            'message'       :       `Unauthoried User "${email}"`,
            status_name     :       getCode.getStatus(401),
            "status_code"   :       401,
            "error"         :       error
        });
    }


})