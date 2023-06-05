let db = require('./databaseQueryMaterialType')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let uuid;
let name;
let fileType;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.uuid || !req.body.name || !req.body.fileTypes)
        {
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(400)
            });
        }
        uuid = req.body.uuid
        name = req.body.name
        fileType = req.body.fileTypes
        checkUsed = await db.checkMaterialTypeUsed(uuid)
        if(checkUsed[0].Exist != 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : "Material Type is already in use",
                "status_name"   : getCode.getStatus(400)
            }) 
        }
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
        let updateMaterialType = await db.updateMaterialType(uuid, name, fileType)
        if(updateMaterialType.affectedRows > 0)
        {
            res.status(200);
            return res.json({
                "status_code": 200,
                "message": "success",
                "status_name": getCode.getStatus(200)
            });
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "Material Type not updated",
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
                "message" : "Material Type not updated",
                "status_name" : getCode.getStatus(500),
                "error"     :      e.sqlMessage
            }) 
        }   
    }
})