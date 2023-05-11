let db = require('./databaseQueryGrade')
let gradeObj = require('../../models/grade')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let grade = new gradeObj()
let grades;
let gradeList = [];

module.exports = require('express').Router().get('/:gradeCategoryId?*',async(req,res) =>  {
    try
    {
        gradeCategoryId = req.params['gradeCategoryId']
        if(gradeCategoryId)
        {
            grades = await db.getGrades(gradeCategoryId)
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
                grade.setDataAll(ele)
                gradeList.push(grade.getDataAll())
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
        else
        {
            grades = await db.getGrades(0)
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
                grade.setDataAll(ele)
                gradeList.push(grade.getDataAll())
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
