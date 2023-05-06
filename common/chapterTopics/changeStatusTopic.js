let db = require('./databaseQueryChapterTopic')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let topic;
let topicId;
let topicStatusChange;
let topicUUID;

module.exports = require('express').Router().get('/:topicUUID',async(req,res) =>  {
    try
    {
        topicUUID = req.params.topicUUID
        
        topic = await db.selectTopic(topicUUID)
        if(topic.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Topic not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        topicId = topic[0].id
        topicStatusChange = await db.topicStatusChange(topicId)
        console.log(topicStatusChange)
        if(topicStatusChange.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
