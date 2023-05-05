let db = require('./databaseQueryChapterTopic')
let commondb = require('../commonDatabaseQuery')
let chapterTopic = require('../../models/chapterTopic')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let topic = new chapterTopic()
let uuid;
let topUuid;
let gradeId;
let subject
let topics;
let userId
let topicList = []
let topList = []
let token;

module.exports = require('express').Router().get('/:topUuid',async(req,res)=>{
    try{

        topUuid =  req.params.topUuid
        topicList = [];
        topList = []
        topics = await db.getChapterTopics(0,topUuid)
        if(topics.length == 0){
            res.status(404)
            return res.json({
                "status_code" :404,
                "message"     : 'Topic not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
       
          Array.from(topics).forEach(async( ele ) =>  {
            topic.setDataAll(ele)
              topList.push(topic.getDataAll()) 
  
              if(topics.length == topList.length){
                // chapList.sort(function(a, b){
                //     return a.id-b.id})
                //     chapList.forEach(ele=>{
                //     delete ele.id;
                // })
                
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'chapterTopic' : topList[0]},
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
                    "message" : "Topic not found",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
           
        }

})
