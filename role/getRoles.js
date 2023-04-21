let db = require('./databaseQueryRole')
let roleObj = require('../models/gradeCategory')
let errorCode = require('../common/errorCode')
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
            return res.json({
                "status_code"   :   404,
                "data"          :   {'roles' : []},
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        await Array.from(role).forEach(ele  =>  {
            roles.setDataAll(ele)
            roleList.push(roles.getDataAll())
        })

        if(role.length == roleList.length){
            return res.json({
                "status_code" : 200,
                "data"        : {'roles' : roleList},
                status_name   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        return res.json({
            "status_code"   :   500,
            "message"       :   "Role not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e
        })     
    }
})
