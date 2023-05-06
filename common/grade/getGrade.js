let db = require('./databaseQueryGrade')
let gradeObj = require('../../models/grade')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let grades = new gradeObj()
let grade;
let gradeId;

module.exports = require('express').Router().get('/:Id',async(req,res) =>  {
    try
    {   gradeId = req.params.Id
        grade   = await db.getGrade(gradeId)

        if(grade.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Grade not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }

        grades.setDataAll(grade[0])
        res.status(200)
        return res.json({
            "status_code"   : 200,
            "data"          : {'grade' : grades.getDataAll()},
            "message"       : 'success',
            "status_name"   : getCode.getStatus(200)
        })
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
