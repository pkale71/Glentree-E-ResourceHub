let db = require('./databaseQueryGradeSubject')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let subject;
let subjectId;
let subjectStatusChange;
let subjectUUID;


module.exports = require('express').Router().get('/:subjectUUID',async(req,res) =>  {
    try
    {
        subjectUUID = req.params.subjectUUID
        
        subject = await db.selectSubject(subjectUUID)
        if(subject.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Grade subject not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        subjectId = subject[0].id
        subjectStatusChange = await db.subjectStatusChange(subjectId)
        if(subjectStatusChange.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
