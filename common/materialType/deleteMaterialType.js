let    db = require('./databaseQueryMaterialType')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    uuid;


module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        if(!req.body.uuid)
        { 
            
            res.status(400)
            return res.json({
                "status_code"   : 400,
                "message"       : "Provide all values",
                "status_name"     : getCode.getStatus(400)
            })
        }
        uuid = req.body.uuid;
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
        else 
        {
            let deleteMaterialType = await db.deleteMaterialType(uuid);
            if(deleteMaterialType.affectedRows > 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message" : "success",
                    "status_name" : getCode.getStatus(200)
                })            
            }
            else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Material Type not deleted",
                    "status_name" : getCode.getStatus(500)
                }) 
            } 
        }
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Material Type not deleted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
