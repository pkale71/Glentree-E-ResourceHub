let    db = require('./databaseQueryGradeSubjectSection')
let    errorCode = require('../../common/errorCode');
let    getCode = new errorCode()
let    uuid;
let    deleteAssignedGradeSection;


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
        //checkUsed = await db.checkAcademicYearUsed(uuid)
        checkUsed = [[]]
        checkUsed[0]['Exist'] = 0
        if(checkUsed[0].Exist != 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : "Assigned grade section is already in use",
                "status_name"   : getCode.getStatus(400)
            }) 
        }
        else 
        {
            deleteAssignedGradeSection = await db.deleteAssignedGradeSection(uuid);
            if(deleteAssignedGradeSection.affectedRows > 0)
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
                    "message" : "Assigned grade section not found",
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
            "message"       :   "Assigned grade section not deleted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
