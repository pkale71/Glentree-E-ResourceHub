let db = require('./databaseQuerySuperviseGrade')
let unassignedGrade = require('../../models/unassignedGrade')
let errorCode = require('../../common/errorCode')
const school = require('../../models/school')
let getCode = new errorCode()
let grade = new unassignedGrade()
let topUuid;
let chapter
let grades;
let schoolUuid;
let acaUuid;
let gradeCategoryId
let ids
let gradeList = []

module.exports = require('express').Router().get('/:acaUuid/:schoolUuid/:gradeCategoryId',async(req,res)=>{
    try{
        acaUuid =  req.params.acaUuid
        schoolUuid = req.params.schoolUuid
        gradeCategoryId = req.params.gradeCategoryId
        ids = await db.findSchoolAndAcaId(acaUuid,schoolUuid,0)
        if(ids.length > 0){
            acaId = ids[0]['acaId']
            schoolId = ids[0]['schoolId']
            grades = await db.findUnAssignedGrade(acaId,schoolId,gradeCategoryId)
            if(grades.length == 0){
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message"     : 'No unassigned grade found',
                    "status_name"   : getCode.getStatus(400)
                })
            }
            else{
                gradeList = []
                Array.from(grades).forEach(async( ele ) =>  {
                    grade.setDataAll(ele)
                    gradeList.push(grade.getDataAll()) 
                      if(gradeList.length == grades.length){
                          res.status(200)
                          return res.json({
                              "status_code" : 200,
                              "data"        : {'unassignedGrades' : gradeList},
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
                "message"       : "Unassigned grade not found",
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
                    "message" : "Unassigned grade not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
        }
})
