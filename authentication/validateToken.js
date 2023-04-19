let jwt = require('jsonwebtoken')
let db = require('./databaseQueryAuth')
let email;
let password;
let userTypeCode;
let accessToken;
let uuid
module.exports = require('express').Router().post('/',async (req,res,next)=>{

    try {
         email = req.body.email;
         password = req.body.password;
         accessToken = req.body.accessToken;
         uuid = req.body.uuid
         if(accessToken.length == 0){
            console.log("1")
            return res.json({
                message: "Invalid Token",
                "status_name": "Access Denied! Unauthorized User",
                "status_code"   :       401
            })
        }
         user = await db.getUserByUuid(uuid);
        // console.log("************",user)
        if(user.length == 0){
            console.log("1")
            return res.json({
                message: "Invalid email or password"
            })
        }
        userTypeCode = user[0].user_type_code
        let isValidPassword = user[0].password == password
        if(isValidPassword){
            console.log("2")
            user.password = undefined;
                const verified = jwt.verify(accessToken,process.env.SECRET_KEY);

        if(verified){
            console.log("3")

            if(userTypeCode == 'SUADM'){
            console.log("4")

                console.log(userTypeCode)

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


        }  else{
            console.log("8")

            return res.json({
                message: "Invalid email or password"
            });
        }
        
    } catch (error) {
        console.log("9")

        // Access Denied
        return res.json({
            'message'       :       `Unauthenticated User "${email}"`,
            'status_name'   :       'Access Denied',
            "status_code"   :       401
        });
    }


})