let db = require('./databaseQuerySyllabus')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let deleteSyllabus;
let isInSchool;
let id;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try
    {
        id = req.body.id;
        if(!id){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Id not given",
                status_name : getCode.getStatus(404)
            })
        }
        isInSchool = await db.selectSchool(id)
        if(isInSchool.length > 0){
            res.status(1063)
            return res.json({
                "status_code" : 1063,
                "message" : "Syllabus already linked with some schools",
                status_name : getCode.getStatus(1063)
            }) 
        }
        deleteSyllabus = await db.deleteSyllabus(id);
        if(deleteSyllabus.affectedRows > 0){
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
                "message" : "Syllabus not deleted",
                status_name : getCode.getStatus(404)
            }) 
        } 
    
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Syllabus not deleted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
