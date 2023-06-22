let db = require('./databaseQueryTeachGradeSubject')
let gradeObj = require('../../models/grade')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let grade = new gradeObj()
let grades;
let gradeList = [];
let userUuid;
let schoolUuid;

module.exports = require('express').Router().get('/:userUuid/:schoolUuid',async(req,res) =>  {
    try
    {
        userUuid = req.params.userUuid
        schoolUuid = req.params.schoolUuid
        if(userUuid)
        {
            grades = await db.getGrades(userUuid, schoolUuid)
            gradeList = [];
            if(grades.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "data"          :   {'grades' : [] },
                    "message"       :   'success',
                    "status_name"   :   getCode.getStatus(200),
                })   
            }
            Array.from(grades).forEach(async(ele)  =>  
            {
                grade.setData(ele)
                gradeList.push(grade.getData())
                if(grades.length == gradeList.length)
                {
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'grades' : gradeList},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
            })
        }
      
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
