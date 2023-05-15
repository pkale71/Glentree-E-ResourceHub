let db = require('./databaseQueryTeachGradeSubject')
let gradeSubject = require('../../models/gradeSubject')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let subjects = new gradeSubject()
let uuid;
let syllabusId;
let gradeId;
let subject
let userId
let subjectList = []
let subList = []
let token;
let userUuid;

module.exports = require('express').Router().get('/:userUuid/:gradeId',async(req,res)=>{
    try
    {
        userUuid = req.params.userUuid
        gradeId =  req.params.gradeId
        subject = await db.getGradeSubjectList(userUuid,gradeId)
          subjectList = [];
          subList = []
          if(subject.length == 0)
          {
              res.status(200)
              return res.json({
                  "status_code"   :   200,
                  "message"       :   'success',
                  "data"        : {'gradeSubjects' : []},
                  "status_name"   :   getCode.getStatus(200),
              })   
          }
        
          Array.from(subject).forEach(async( ele ) => 
           {
           
              subjects.setData(ele)
              subList.push(subjects.getData()) 
  
              if(subject.length == subList.length)
              {
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'gradeSubjects' : subList},
                      "message"     : 'success',
                      "status_name"   : getCode.getStatus(200)
                  })
              } 
          })
      
        
        } catch(e){
            console.log(e)
            res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade subject not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
           
        }

})
