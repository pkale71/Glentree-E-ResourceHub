let db = require('./databaseQueryRole')
let roleObj = require('../../models/role')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let roles = new roleObj()
let role;
let roleList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        role = await db.getRole()
        roleList = []
        if(role.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'roles' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(role).forEach(ele  =>  {
            roles.setDataAll(ele)
            roleList.push(roles.getDataAll())
        })

        if(role.length == roleList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'roles' : roleList},
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
            "message"       :   "Role not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
