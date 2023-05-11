let db = require('./databaseQuerySuperviseGrade')
let assignedGrade = require('../../models/assignedGrade')
let errorCode = require('../../common/errorCode')
const school = require('../../models/school')
let getCode = new errorCode()
let assignGrade = new assignedGrade()
let acaUuid;
let userUuid
let AssignGrade
let assignGradeList = []
let assignList = []

module.exports = require('express').Router().get('/:userUuid/:acaUuid',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        userUuid = req.params.userUuid
        AssignGrade = await db.findSchoolGradeCategory(userUuid,acaUuid)
        if(AssignGrade.length == 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : 'No assigned grade found',
                "status_name"   : getCode.getStatus(400)
            })
        }
        else
        {
            assignGradeList = []
            assignList = []
            Array.from(AssignGrade).forEach(( ele ) =>  
            {
                assignGrade.setSuperviseGrade(ele)
                assignGradeList.push(assignGrade.getSuperviseGrade())   
            })
            
            AssignGrade[0]['userSuperviseGrades'] = assignGradeList
            assignGrade.setData(AssignGrade[0])
            assignList.push(assignGrade.getData())
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'assignedGrades' : assignList},
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
                    "status_code" : 500,
                    "message" : "Assigned grade not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
