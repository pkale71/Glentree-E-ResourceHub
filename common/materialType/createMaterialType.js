let db = require('./databaseQueryMaterialType')
let commondb = require('../commonDatabaseQuery')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let createUuid = require('uuid')
let uuid;
let name;
let fileType;
let accessToken;
let createdOn;
let createdById;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.name || !req.body.fileType)
        {
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(400)
            });
        }
        uuid = createUuid.v1()
        name = req.body.name
        fileType = req.body.fileType
        accessToken = req.body.accessToken
        let authData = await commondb.selectToken(accessToken)
        createdById = authData[0].userId
        createdOn = new Date()
        let uniqueNameCheck = await db.uniqueNameCheck(name, uuid)
        if(uniqueNameCheck[0].Exist != 0)
        {
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Material Name Already Exist`,
                "status_name": getCode.getStatus(400)
            });
        }
        let insertMaterialType = await db.insertMaterialType(uuid, name, fileType, createdOn, createdById)
        if(insertMaterialType.affectedRows > 0)
        {
            let returnUuid = await db.returnUuidMaterialType(insertMaterialType.insetId)
            res.status(200);
            return res.json({
                "status_code": 200,
                "message": "success",
                "data" : {"uuid" : returnUuid[0].uuid},
                "status_name": getCode.getStatus(200)
            });
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "Material Type not created",
                "status_name" : getCode.getStatus(500)
            })  
        }
    }
    catch(e)
    {
        console.log(e)
        if(e.code == 'ER_DUP_ENTRY')
        {
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : msg,
                "status_name"     : getCode.getStatus(500),
                "error"         : msg
            }) 
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "Material Type not created",
                "status_name" : getCode.getStatus(500),
                "error"     :      e.sqlMessage
            }) 
        }   
    }
})