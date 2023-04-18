let jwt = require('jsonwebtoken')
let request = require('request');
let db = require('../databaseConnection/createconnection')
let email;
let password;
module.exports = require('express').Router().post('/',async(req,res)=>{
    let jwtSecretKey1 = process.env.JWT_SECRET_KEY;
  

    try{
         email = req.body.email;
         password = req.body.password;
         user = await db.getUserByEmail(email);
         user[0]['time'] = Date()
         
        if(!user){
            return res.json({
                message: "Invalid email or password"
            })
        }
        console.log(email,password,user[0].password)
     let isValidPassword = user[0].password == password
        if(isValidPassword){
            user.password = undefined;
            const jsontoken = jwt.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '30m'} );
            user[0]['access-token']=jsontoken
            return res.json(user)
        }  else{
            return res.json({
                message: "Invalid email or password"
            });
        } 
     
        } catch(e){
            console.log(e);
        }

  //  request.get(
  //   `http://localhost:8080/validateToken`,
  //   {
  //     headers: {
  //       password: token,
  //     },
  //     },
  //   function (error, response, body) {
  //      console.log("********* ",body)
  //      res.send(body)
  //     console.log("********* ",response.statusCode)
  //      console.log("********* ",error)
  // });
  
})
