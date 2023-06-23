let db = require('./databaseQueryGradeSubjectSection')
let assignedGradeSection = require('../../models/assignedGradeSection')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let assignedSection = new assignedGradeSection()
let acaUuid;
let schoolUuid;
let userUuid
let gradeId
let AssignGrade
let assignGradeList = []
let assignList = []
let assignGrade;

module.exports = require('express').Router().get('/:userUuid/:acaUuid/:schoolUuid/:gradeId?*',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        userUuid = req.params.userUuid
        schoolUuid = req.params.schoolUuid
        if(req.params['0'].length > 0 &&  req.params['0'] != '/')
        {
            let a = req.params['0'].split('/')
            if(a.length > 1)
            {
                schoolUuid = req.params.schoolUuid + a[0]
                gradeId = a[1]
            }
            else if(a.length == 1) 
            {
                schoolUuid = req.params.schoolUuid + a[0]
                gradeId = 0
            }
        }
        else
        {
            schoolUuid = req.params.schoolUuid
            gradeId = req.params['gradeId']
        }

            assignGrade = await db.findGrade(userUuid,acaUuid, schoolUuid, gradeId)
            if(assignGrade.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message"     : 'success',
                    "data"      :   {'assignedSections' : []},
                    "status_name"   : getCode.getStatus(200)
                })
            }
            AssignGrade = await db.findSubjectGradeSection(userUuid,acaUuid, schoolUuid, gradeId)
            if(AssignGrade.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message"     : 'success',
                    "data"      :   {'assignedSections' : []},
                    "status_name"   : getCode.getStatus(200)
                })
            }
            else
            {
                assignGradeList = []
                assignList = []
                gradeList = []
            
                Array.from(assignGrade).forEach((element,i)=>{
                    gradeList.push(AssignGrade.filter(ele => (parseInt(ele.gradeId) == parseInt(element.gradeId) && parseInt(ele.id) == parseInt(element.id))))
                })
                
            gradeList.forEach( (ele)=>{
                    ele.sort(function(a, b){
                        return a.sectionId-b.sectionId})
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
