let db = require('./databaseQueryGradeSubjectSection')
let unassignedGradeSubjectSection = require('../../models/unassignedGradeSubjectSection')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let gradeSubjectSection = new unassignedGradeSubjectSection()
let sections;
let schoolUuid;
let acaUuid;
let gradeId
let ids
let sectionList = []
let subjectUuid
let subjectId

module.exports = require('express').Router().get('/:acaUuid/:gradeId/:subjectUuid/:schoolUuid',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        schoolUuid = req.params.schoolUuid
        gradeId = req.params.gradeId
        subjectUuid = req.params.subjectUuid
        ids = await db.findSchoolAndAcaId(acaUuid,schoolUuid,0,subjectUuid)
        if(ids.length > 0){
            acaId = ids[0]['acaId']
            schoolId = ids[0]['schoolId']
            subjectId = ids[0]['subjectId']
            console.log(acaId,schoolId,gradeId,subjectId)
            sections = await db.findUnAssignedGradeSubjects(acaId,schoolId,gradeId,subjectId)
            if(sections.length == 0){
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message"     : 'No unassigned grade subject section found',
                    "status_name"   : getCode.getStatus(400)
                })
            }
            else{
                sectionList = []
                Array.from(sections).forEach(async( ele ) =>  {
                    gradeSubjectSection.setDataAll(ele)
                    sectionList.push(gradeSubjectSection.getDataAll()) 
                      if(sectionList.length == sections.length){
                          res.status(200)
                          return res.json({
                              "status_code" : 200,
                              "data"        : {'unassignedGradeSubjectSections' : sectionList},
                              "message"     : 'success',
                              "status_name"   : getCode.getStatus(200)
                          })
                      } 
                  })
            }
        }
        else 
        {
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : "Unassigned grade subject section not found",
                "status_name"   : getCode.getStatus(500)
            }) 
        }
          
        } 
        catch(e)
        {
            console.log(e)
            res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Unassigned grade subject section not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
