let db = require('./databaseQuerySyllabus')
let errorCode = require('../commonFunction/errorCode')
let getCode = new errorCode()
let insertSyllabus;
let id;
let name;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try
    {
        id = req.body.id;
        name = req.body.name
        insertSyllabus = await db.insertSyllabus(id, name);
        if(insertSyllabus.affectedRows > 0){
            return res.json({
                "status_code" : 200,
                "message" : "success",
                status_name : getCode.getStatus(200)
            })            

        }
        else{
            return res.json({
                "status_code" : 404,
                "message" : "Syllabus not inserted",
                status_name : getCode.getStatus(404)
            }) 
        }
    } 
    catch(e)
    {
        console.log(e)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Syllabus not inserted",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e
        })     
    }
})
