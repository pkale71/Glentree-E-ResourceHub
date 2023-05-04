let db = require('./databaseQuerySubjectChapter')
let commondb = require('../commonDatabaseQuery')
let subjectChapter = require('../../models/subjectChapter')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let chapter = new subjectChapter()
let uuid;
let chapUuid;
let gradeId;
let subject
let chapters;
let userId
let chapterList = []
let chapList = []
let token;

module.exports = require('express').Router().get('/:chapUuid',async(req,res)=>{
    try{

        chapUuid =  req.params.chapUuid
        chapterList = [];
        chapList = []
        chapters = await db.getSubjectChapters(0,chapUuid)
        if(chapters.length == 0){
            res.status(404)
            return res.json({
                "status_code" :404,
                "message"     : 'Chapter not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
       
          Array.from(chapters).forEach(async( ele ) =>  {
            chapter.setDataAll(ele)
              chapList.push(chapter.getDataAll()) 
  
              if(chapters.length == chapList.length){
                // chapList.sort(function(a, b){
                //     return a.id-b.id})
                //     chapList.forEach(ele=>{
                //     delete ele.id;
                // })
                
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'subjectChapters' : chapList[0]},
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
                    "message" : "Chapter not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
           
        }

})
