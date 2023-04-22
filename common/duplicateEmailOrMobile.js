let commondb = require('./commonDatabaseQuery')
let errorCode = require('./errorCode')
let getCode = new errorCode()
let checkFor;
let value;
let duplicate;
let uuid;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try
    {
        checkFor = req.body.checkFor;
        value = req.body.value;
        uuid = req.body.uuid;

        duplicate = checkFor == 'Email' ? await commondb.dupEmail(value) : await commondb.dupMobile(value)
        if(duplicate[0].Exist == 1 && uuid != duplicate[0].uuid){
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : `Duplicate ${checkFor}`,
                status_name : getCode.getStatus(500)
            })            

        }
        else{
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message" : "success",
                status_name : getCode.getStatus(200)
            }) 
        } 
    
    } 
    catch(e)
    {
        console.log()
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Cannot check",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
