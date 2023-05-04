let db = require('./databaseQueryGradeSubject')
let commondb = require('../commonDatabaseQuery')
let gradeSubject = require('../../models/gradeSubject')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let subjects = new gradeSubject()
let uuid;
let subject
let userId
let subjectList = []
let token;

module.exports = require('express').Router().get('/:uuid',async(req,res)=>{
    try{
          uuid =  req.params.uuid
          subject = await db.getGradeSubject(uuid)
          subjectList = [];
          if(subject.length == 0){
              res.status(200)
              return res.json({
                  "status_code"   :   200,
                  "message"       :   'Grade subject not found',
                  "status_name"   :   getCode.getStatus(200),
              })   
          }
          await Array.from(subject).forEach(async( ele ) =>  {
            let subjectCheck = await db.checkUsedSubject(ele.id)
            //   let curriculumcheck = await db.getSchoolCurriculumSearch(ele.id)
            //   let userCheck = await db.getSchoolUserSearch(ele.id)
              ele['isExist'] = (subjectCheck[0].Exist == 0) ? 0 :1
            //   subjects.setGradeSubject(ele)
            //   ele['gradeSubject'] = subjects.getGradeSubject()
             
            //   subjects.setGrade(ele)
            //   ele['grade'] = subjects.getGrade()
            // subList.sort(function(a, b){return a.id-b.id})
            // subList.forEach(ele=>{delete ele.id;})
              subjects.setDataAll(ele)
              subjectList.push(subjects.getDataAll())
              delete subjectList[0].id
              if(subject.length == subjectList.length){
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'gradeSubject' : subjectList[0]},
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
