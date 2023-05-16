let db = require('./databaseQuerySuperviseGradeSubject')
let assignedSubject = require('../../models/assignedSubject')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let assignedSubjects = new assignedSubject()
let acaUuid;
let userUuid
let AssignSubject
let assignGradeList = []
let assignList = []
let assignGrade;
let gradeId;

module.exports = require('express').Router().get('/:userUuid/:acaUuid',async(req,res)=>{
    try{
        console.log(req.params)
        acaUuid =  req.params.acaUuid
        userUuid = req.params.userUuid
        
            assignGrade = await db.findGrade(userUuid,acaUuid)
            if(assignGrade.length == 0)
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message"     : 'No assigned subject found',
                    "status_name"   : getCode.getStatus(400)
                })
            }
            AssignSubject = await db.findSubjectGradeSubject(userUuid,acaUuid)
            // return res.json({
            //     "status_code" : 400,
            //     "message"     : AssignSubject,
            //     "status_name"   : getCode.getStatus(400)
            // })
            if(AssignSubject.length == 0)
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message"     : 'No assigned subject found',
                    "status_name"   : getCode.getStatus(400)
                })
            }
            else
            {
                assignGradeList = []
                assignList = []
                gradeList = []
                Array.from(assignGrade).forEach((element,i)=>{
                    gradeList.push(AssignSubject.filter(ele => (ele.gradeId == element.gradeId)))
                })
                Array.from(gradeList).forEach(( ele, j ) =>  
                {
                    Array.from(ele).forEach(element => {
                        assignedSubjects.setAssignedSubjects(element)
                        assignGradeList.push(assignedSubjects.getAssignedSubjects()) 
                    })
                    if(gradeList[j].length > 0){
                        gradeList[j][0]['userAssignedSubjects'] = assignGradeList
                        assignedSubjects.setData(gradeList[j][0])
                        assignList.push(assignedSubjects.getData())
                    }
                    assignGradeList = []
                })
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'assignedSubjects' : assignList},
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
                    "message" : "Assigned subject not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
