let db = require('./databaseQuerySuperviseGradeSubject')
let unassignedGradeSubject = require('../../models/unassignedGradeSubject')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let gradeSubject = new unassignedGradeSubject()
let topUuid;
let chapter
let subjects;
let schoolUuid;
let acaUuid;
let gradeCategoryId
let ids
let subjectList = []

module.exports = require('express').Router().get('/:acaUuid/:gradeId/:schoolUuid',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        schoolUuid = req.params.schoolUuid
        gradeId = req.params.gradeId
        ids = await db.findSchoolAndAcaId(acaUuid,schoolUuid)
        if(ids.length > 0){
            acaId = ids[0]['acaId']
            schoolId = ids[0]['schoolId']
            subjects = await db.findUnAssignedGradeSubjects(acaId,schoolId,gradeId)
            if(subjects.length == 0){
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message"     : 'No unassigned grade subject found',
                    "status_name"   : getCode.getStatus(400)
                })
            }
            else{
                Array.from(subjects).forEach(async( ele ) =>  {
                    gradeSubject.setDataAll(ele)
                    subjectList.push(gradeSubject.getDataAll()) 
                      if(subjectList.length == subjects.length){
                          res.status(200)
                          return res.json({
                              "status_code" : 200,
                              "data"        : {'unassignedGradeSubjects' : subjectList},
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
                "message"       : "Unassigned grade subject not found",
                "status_name"   : getCode.getStatus(500)
            }) 
        }
       
        
        // topicList = [];
        // topList = []
        // if(chapter.length == 0){
        //     res.status(404)
        //     return res.json({
        //         "status_code"   :   404,
        //         "message"       :   'Chapter not found',
        //         "status_name"   :   getCode.getStatus(404),
        //     })   
        // }
        // topics = await db.getChapterTopics(chapter[0].id,0)
        // if(topics.length == 0){
        //     res.status(200)
        //     return res.json({
        //         "status_code" : 200,
        //         "data"        : {'chapterTopics' : []},
        //         "message"     : 'success',
        //         "status_name"   : getCode.getStatus(200)
        //     })
        // }
          
        } 
        catch(e)
        {
            console.log(e)
            res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Unassigned grade subject not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
