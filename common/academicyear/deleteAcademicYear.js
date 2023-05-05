let    db = require('./databaseQueryAcademicYear')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    name;
let    gradeCategoryId
let    id


module.exports = require('express').Router().post('/',async(req,res)=>
{
    try
    {
        uuid = req.body.uuid.trim();
        if(!uuid){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "uuid not given",
                status_name : getCode.getStatus(404)
            })
        }
        // isInSchool = await db.selectSchool(id)
        // if(isInSchool.length > 0){
        //     res.status(1063)
        //     return res.json({
        //         "status_code" : 1063,
        //         "message" : "Syllabus alreay linked with some schools",
        //         status_name : getCode.getStatus(1063)
        //     }) 
        // }
        deleteAcademicYear = await db.deleteAcademicYear(uuid);
        if(deleteAcademicYear.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message" : "success",
                status_name : getCode.getStatus(200)
            })            

        }
        else{
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Academic Year not deleted",
                status_name : getCode.getStatus(404)
            }) 
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
