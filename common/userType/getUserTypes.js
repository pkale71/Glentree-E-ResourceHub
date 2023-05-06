let db = require('./databaseQueryUserType')
let userTypeObj = require('../../models/userType')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let userTypes = new userTypeObj()
let userType;
let userTypeList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        userType = await db.getAllUserTypes()
        userTypeList = [];
        if(userType.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'userTypes' : []},
                "message"       : 'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(userType).forEach(ele  =>  {
            userTypes.setDataAll(ele)
            userTypeList.push(userTypes.getDataAll())
        })

        if(userType.length == userTypeList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'userTypes' : userTypeList},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "User Type not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
