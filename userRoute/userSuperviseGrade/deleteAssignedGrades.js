let    db = require('./databaseQueryAcademicYear')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    uuid;
let    deleteAcademicYear;


module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        uuid = req.body.uuid;
        if(!req.body.uuid)
        {
            res.status(404)
            return res.json({
                "status_code"   : 404,
                "message"       : "uuid not given",
                "status_name"     : getCode.getStatus(404)
            })
        }
        checkUsed = await db.checkAcademicYearUsed(uuid)
        if(checkUsed[0].Exist != 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : "Academic year is already in use",
                "status_name"   : getCode.getStatus(400)
            }) 
        }
        else 
        {
            deleteAcademicYear = await db.deleteAcademicYear(uuid);
            if(deleteAcademicYear.affectedRows > 0)
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
                    "message" : "Academic Year not deleted",
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
            "message"       :   "Academic Year not deleted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
