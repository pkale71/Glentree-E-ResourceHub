let db = require('./databaseQuerySubjectChapter')
let commondb = require('../commonDatabaseQuery')
let subjectChapter = require('../../models/subjectChapter')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let chapter = new subjectChapter()
let uuid;
let subUuid;
let gradeId;
let subject
let chapters;
let userId
let chapterList = []
let chapList = []
let token;

module.exports = require('express').Router().get('/:subUuid',async(req,res)=>{
    try{

        subUuid =  req.params.subUuid
        subject = await db.getGradeSubject(subUuid)
        chapterList = [];
        chapList = []
        if(subject.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Grade subject not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }

        chapters = await db.getSubjectChapters(subject[0].id,0)
        if(chapters.length == 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'subjectChapters' : []},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        }
       
         // console.log(subject)
        //   subject.sort(function(a, b){
        //     return a.id-b.id})
          //console.log(subject)
          Array.from(chapters).forEach(async( ele ) =>  {
            chapter.setDataAll(ele)
              chapList.push(chapter.getDataAll()) 
  
              if(chapters.length == chapList.length){
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'subjectChapters' : chapList},
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
                    "message" : "Subject chapter not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
           
        }

})
