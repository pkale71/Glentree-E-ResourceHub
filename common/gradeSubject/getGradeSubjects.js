let db = require('./databaseQueryGradeSubject')
let commondb = require('../commonDatabaseQuery')
let gradeSubject = require('../../models/gradeSubject')
let errorCode = require('../errorCode')
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

module.exports = require('express').Router().get('/:syllabusId/:gradeId',async(req,res)=>{
    try{

        syllabusId =  req.params.syllabusId
        gradeId =  req.params.gradeId
        subject = await db.getGradeSubjectList(syllabusId,gradeId)
          subjectList = [];
          subList = []
          if(subject.length == 0){
              res.status(200)
              return res.json({
                  "status_code"   :   200,
                  "message"       :   'success',
                  "data"        : {'gradeSubjects' : []},
                  "status_name"   :   getCode.getStatus(200),
              })   
          }
         // console.log(subject)
          subject.sort(function(a, b){
            return a.id-b.id})
          //console.log(subject)
          Array.from(subject).forEach(async( ele ) =>  {
            let subjectCheck = await db.checkUsedSubject(ele.id)
            //   let curriculumcheck = await db.getSchoolCurriculumSearch(ele.id)
            //   let userCheck = await db.getSchoolUserSearch(ele.id)
              ele['isExist'] = (subjectCheck[0].Exist == 0) ? 0 :1
              //console.log("*********",ele)
              subjects.setDataAll(ele)
              subList.push(subjects.getDataAll()) 
  
              if(subject.length == subList.length){
                subList.sort(function(a, b){
                    return a.id-b.id})
                subList.forEach(ele=>{
                    delete ele.id;
                })
                // ele['gradeSubject'] = subList
                // // subjects.setGrade(ele)
                // // ele['grade'] = subjects.getGrade()
                // subjects.setDataAll(ele)
                // subjectList.push(subjects.getDataAll())
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
