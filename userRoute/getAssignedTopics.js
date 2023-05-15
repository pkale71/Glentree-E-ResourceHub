let db = require('./databaseQueryUser')
let chapterTopic = require('../models/chapterTopic')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let topic = new chapterTopic()
let topUuid;
let chapter
let topics;
let topicList = []
let topList = []

module.exports = require('express').Router().get('/:topUuid',async(req,res)=>{
    try{
        topUuid =  req.params.topUuid
        // chapter = await db.getSubjectChapter(topUuid)
        topicList = [];
        topList = []
        // if(chapter.length == 0){
        //     res.status(404)
        //     return res.json({
        //         "status_code"   :   404,
        //         "message"       :   'Chapter not found',
        //         "status_name"   :   getCode.getStatus(404),
        //     })   
        // }
        topics = await db.getChapterTopics(topUuid)
        if(topics.length == 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'chapterTopics' : []},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        }
          Array.from(topics).forEach(async( ele ) =>  {
            topic.setDataAll(ele)
              topList.push(topic.getDataAll()) 
              if(topics.length == topList.length){
                  res.status(200)
                  return res.json({
                      "status_code" : 200,
                      "data"        : {'chapterTopics' : topList},
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
