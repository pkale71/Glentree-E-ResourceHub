let express = require('express')
let dotenv = require('dotenv')
let cors = require('cors')
let bodyparser = require('body-parser')
let    errorCode = require('./common/errorCode')
let    getCode = new errorCode()

let app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
dotenv.config();

// let db = require('./databaseConnection/createconnection')
// let email;
// let password;
// let userTypeCode;
// let token;

app.listen(8082,()=>{
    console.log("server is listing on port no 8082")
})



// async function  verifyToken  (req, res, next){
//     try {
//         console.log(req.body)
//         email = req.body.email;
//         password = req.body.password;
//         user = await db.getUserByEmail(email);
//        // console.log("************",user)
//        if(user.length == 0){
//            console.log("1")
//            return res.json({
//                message: "Invalid email or password"
//            })
//        }
//        userTypeCode = user[0].user_type_code
//        let isValidPassword = user[0].password == password
//        if(isValidPassword){
//            console.log("2")

//            user.password = undefined;
//            let select_response = await db.selectToken(user[0].id)
//            if(select_response.length > 0){
//                token = select_response[0].auth_token
               
//                if(token === undefined  ){
        
//                    return res.json({
//                        message: "Access Denied! Unauthorized User",
//                        "status_code"   :       401
//                      });
//            } else{
//                const verified = jwt.verify(token,process.env.SECRET_KEY);

//        if(verified){
//            console.log("3")

//            if(userTypeCode == 'SUADM'){
//            console.log("4")

//                console.log(userTypeCode)

//                next()
//            }
//            else {
//            console.log("5")

//                return res.json({
//                    'message'       :       `Access denied, you are not super admin`,
//                    'status_name'   :       'false',
//                    "status_code"   :       401
//                });
//            }
//        }
//        else{
//            console.log("6")

//            // Access Denied
//            return res.json({
//                'message'       :       `Unauthenticated User "${email}"`,
//                'status_name'   :       'Access Denied',
//                "status_code"   :       401
//            });
//        }
         
//            }
         
//        } 
//        else{
//            console.log("7")

//            return res.json({
//                'message'       :       `Unauthenticated User "${email}"`,
//                'status_name'   :       'Access Denied',
//                "status_code"   :       401
//            });
//        }

//        }  else{
//            console.log("8")

//            return res.json({
//                message: "Invalid email or password"
//            });
//        }
       
//    } catch (error) {
//        console.log("9")

//        // Access Denied
//        return res.json({
//            'message'       :       `Unauthenticated User "${email}"`,
//            'status_name'   :       'Access Denied',
//            "status_code"   :       401
//        });
//    }
// }



app.use('/authenticate',require('./authentication/authenticate'));
// app.use('/validateToken',require('./authentication/postValidateToken'));
app.use('/logout',require('./authentication/validateToken'),require('./authentication/logout'));
app.use('/changePassword',require('./authentication/validateToken'),require('./authentication/changePassword'));
app.use('/user',require('./userRoute/userRoute'))
app.use('/common',require('./common/commonRoute'))
app.use('/school',require('./school/schoolRoute'))

app.use('/',(req,res,next)=>{
    console.log(req.baseUrl)
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})
