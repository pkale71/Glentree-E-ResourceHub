let db = require('./databaseQueryUser')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let user;
let userStatusChange;
let userUUID;

module.exports = require('express').Router().get('/:userUUID',async(req,res) =>  {
    try
    {
        userUUID = req.params.userUUID
        
        user = await db.getUser(userUUID)
        if(user.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'User not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        userStatusChange = await db.userStatusChange(userUUID)
        if(userStatusChange.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
