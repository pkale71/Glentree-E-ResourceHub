let db = require('./databaseQueryGrade')
let gradeObj = require('../../models/grade')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let grades = new gradeObj()
let grade;
let gradeList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        grade = await db.getGrades()
        gradeList = [];
        if(grade.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'grades' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
     
         Array.from(grade).forEach(async(ele)  =>  {
           // console.log("24***************",ele)
            let checkSyllabus = await db.selectUsedGrade(ele.id)
            let checkSection = await db.selectUsedGradeSection(ele.id)
             console.log("24*****",ele.id, "**********",checkSyllabus[0].Exist,"***",checkSection[0].Exist)
            ele['isExist'] = (checkSyllabus[0].Exist == 0 && checkSection[0].Exist == 0) ? 0 : 1;
            grades.setDataAll(ele)
            gradeList.push(grades.getDataAll())
            if(grade.length == gradeList.length){
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'grades' : gradeList},
                    "message"     : 'success',
                    status_name   : getCode.getStatus(200)
                })
            } 
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
