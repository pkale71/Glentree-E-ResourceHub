let jwt = require('jsonwebtoken')
let db = require('../databaseConnection/createconnection')
module.exports = require('express').Router().get('/',(req,res)=>{
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log("V jwsk ",jwtSecretKey,"V jwsk ",tokenHeaderKey)
  
    try {
        const token = req.header(tokenHeaderKey);
        console.log("V token ",token)
  
        const verified = jwt.verify(token, jwtSecretKey);
        console.log("V verified ",verified)

        if(verified){
            let user = db.getUserByEmail('testoauth80@gmail.com')
           user.then(res1=>{res.json(res1)})
            // if(user){
            //     return res.send({"status":"Successfully Verified",
            //     "user":user});
            // }
           
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }


})