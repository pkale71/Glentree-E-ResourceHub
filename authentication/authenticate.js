let jwt = require('jsonwebtoken')
let db = require('./databaseQueryAuth')
let users = require('../models/user')
let useUser = new users()
let email;
let password;
module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
         email = req.body.email;
         password = req.body.password;
         user = await db.getUserByEmail(email);
         
        if(user.length == 0){
            return res.json({
                message: "Invalid email or password"
            })
        }
        user[0]['time'] = Date()
        console.log(user[0],email,password,user[0].password,(user[0].password==password))
        let isValidPassword = user[0].password == password
        if(isValidPassword){
            user.password = undefined;
            let mysqlDatetime = new Date(user[0].time).toISOString().slice(0, 19).replace('T', ' ');
            const jsontoken = jwt.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '30m'} );
            if(jsontoken != null || jsontoken != undefined){
                user[0]['access_token']=jsontoken
                let insert_lastLogin = await db.insertLastLogin(user[0].id,mysqlDatetime)
                useUser.setData(user[0])
                return res.json(useUser.getData())
            }
            
        }  else{
            return res.json({
                message: "Invalid email or password"
            });
        } 
     
        } catch(e){
            return res.json({
                'message'       :       `Unauthenticated Failed "${email}"`,
                'status_name'   :       'False',
                "status_code"   :       401
            });
        }

})
