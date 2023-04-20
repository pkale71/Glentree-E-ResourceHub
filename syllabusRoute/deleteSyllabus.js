let db = require('./databaseQuerySyllabus')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
let deleteSyllabus;
let isInSchool;
let id;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try
    {
        id = req.body.id;
        if(!id){
            return res.json({
                "status_code" : 404,
                "message" : "Id not given",
                status_name : getCode.getStatus(404)
            })
        }
        isInSchool = await db.selectSchool(id)
        if(isInSchool.length > 0){
            return res.json({
                "status_code" : 1063,
                "message" : "Syllabus alreay linked with some schools",
                status_name : getCode.getStatus(1063)
            }) 
        }
        deleteSyllabus = await db.deleteSyllabus(id);
        if(deleteSyllabus.affectedRows > 0){
            return res.json({
                "status_code" : 200,
                "message" : "success",
                status_name : getCode.getStatus(200)
            })            

        }
        else{
            return res.json({
                "status_code" : 404,
                "message" : "Syllabus not deleted",
                status_name : getCode.getStatus(404)
            }) 
        } 
    
    } 
    catch(e)
    {
        console.log(e)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Syllabus not deleted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e
        })     
    }
})
