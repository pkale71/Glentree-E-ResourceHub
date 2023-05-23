let db = require('./databaseQuerySchool')
let gradeObj = require('../models/grade')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let grade = new gradeObj()
let grades;
let gradeList = [];
let uuid;

module.exports = require('express').Router().get('/:uuid',async(req,res) =>  {
    try
    {
        uuid = req.params.uuid
        grades = await db.getGrades(uuid)
        gradeList = [];
        if(grades.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'grades' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        Array.from(grades).forEach(ele  =>  {
            grade.setData(ele)
            gradeList.push(grade.getData())
        })
        if(grades.length == gradeList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'grades' : gradeList},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})