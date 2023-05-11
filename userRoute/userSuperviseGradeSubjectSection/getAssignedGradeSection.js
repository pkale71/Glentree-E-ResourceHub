let db = require('./databaseQueryGradeSubjectSection')
let assignedGradeSection = require('../../models/assignedGradeSection')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let assignedSection = new assignedGradeSection()
let acaUuid;
let userUuid
let AssignGrade
let assignGradeList = []
let assignList = []
let assignGrade;

module.exports = require('express').Router().get('/:userUuid/:acaUuid',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        userUuid = req.params.userUuid
        assignGrade = await db.findGrade(userUuid,acaUuid)
        if(assignGrade.length == 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : 'No assigned section found',
                "status_name"   : getCode.getStatus(400)
            })
        }
        AssignGrade = await db.findSubjectGradeSection(userUuid,acaUuid)
        // return res.json({
        //     "status_code" : 400,
        //     "message"     : AssignGrade,
        //     "status_name"   : getCode.getStatus(400)
        // })
        if(AssignGrade.length == 0)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : 'No assigned section found',
                "status_name"   : getCode.getStatus(400)
            })
        }
        else
        {
            assignGradeList = []
            assignList = []
            gradeList = []
            Array.from(assignGrade).forEach((element,i)=>{
                gradeList.push(AssignGrade.filter(ele => ele.gradeId == element.gradeId))
            })
            Array.from(gradeList).forEach(( ele, j ) =>  
            {
                Array.from(ele).forEach(element => {
                    assignedSection.setAssignedSection(element)
                    assignGradeList.push(assignedSection.getAssignedSection()) 
                })
                if(gradeList[j].length > 0){
                    gradeList[j][0]['userAssignedSections'] = assignGradeList
                    assignedSection.setGrade(gradeList[j][0])
                    gradeList[j][0]['grade'] = assignedSection.getGrade()
                    assignedSection.setData(gradeList[j][0])
                    assignList.push(assignedSection.getData())
                }
                assignGradeList = []
            })
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'assignedSections' : assignList},
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
                    "message" : "Assigned section not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
