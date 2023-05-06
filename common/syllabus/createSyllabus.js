let db = require('./databaseQuerySyllabus')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let insertSyllabus;
let name;

module.exports = require('express').Router().post('/',async(req,res) => {
    try
    {
        name = req.body.name?.trim()
        if(!req.body.name){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Provide data to insert",
                "status_name" : getCode.getStatus(404)
            })
        }
        insertSyllabus = await db.insertSyllabus(name);
        if(insertSyllabus.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message" : "success",
                "data" : {"id" : insertSyllabus.insertId},
                'status_name' : getCode.getStatus(200)
            })            

        }
        else{
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : "Syllabus not inserted",
                "status_name"   : getCode.getStatus(404)
            }) 
        }
    } 
    catch(e)
    {
        if(e.code == 'ER_DUP_ENTRY'){
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : msg,
                "status_name"     : getCode.getStatus(500),
                "error"         : msg
            }) 
        }else{
            res.status(500)
            return res.json({
                "status_code"   :   500,
                "message"       :   "Syllabus not inserted",
                "status_name"   :   getCode.getStatus(500),
                "error"         :   e.sqlMessage
            })
        }     
    }
})
