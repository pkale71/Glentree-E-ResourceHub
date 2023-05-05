let    db = require('./databaseQueryChapterTopic')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    topic;
let    topicId;
let    uuid;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        uuid = req.body.uuid
        accessToken = req.body.accessToken;
        topic = await db.selectTopic(uuid)
        if(topic.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Topic not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        topicId = topic[0].id
        let checkUsed = await db.checkChapterTopicUsed(topicId)
        if(checkUsed[0].isExist == 0){   
        // console.log(checkUsed,checkUsed[0])
            let deleteTopic = await db.deleteSubjectChapter(uuid)
        
                if (deleteTopic.affectedRows > 0) {
                    res.status(200);
                    return res.json({
                        "status_code": 200,
                        "message": "success",
                        status_name: getCode.getStatus(200)
                    });
                }
                else{
                    res.status(500);
                    return res.json({
                        "status_code": 500,
                        "message": "Topic not deleted",
                        status_name: getCode.getStatus(500)
                    });
                }
            
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Topic name '${topic[0].topic_name}' is in use`,
                status_name: getCode.getStatus(400)
            });
        }
        
        } catch(e){
            console.log(e)
            
            if(e.code == 'ER_DUP_ENTRY'){
                let msg = e.sqlMessage.replace('_UNIQUE', '');
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : msg,
                    status_name     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Topic not deleted",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
