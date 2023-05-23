let    db = require('./databaseQueryChapterTopic')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    topic;
let    chapterId;
let    topicId;
let    uuid;
let    name;
let    chapterUuid;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.subjectChapter?.uuid || !req.body.name || !req.body.uuid)
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }
        chapterUuid = req.body.subjectChapter?.uuid;
        chapterData = await db.getSubjectChapter(chapterUuid)
        if(chapterData.length == 0)
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Chapter not found`,
                "status_name": getCode.getStatus(404)
            });
        }
        chapterId = chapterData[0].id
        name = req.body.name?.trim();
        isActive = 1;
        uuid = req.body.uuid
        accessToken = req.body.accessToken;
        let checkValid = await db.getChapterTopicDetails(uuid , chapterId)
        if(checkValid.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Provide valid data',
                "status_name"   :   getCode.getStatus(404),
            })
        }
        topic = await db.selectTopic(uuid)
        if(topic.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Chapter topic not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        topicId = topic[0].id
        let checkUsed = await db.checkChapterTopicUsed(topicId)
        if(checkUsed[0].isExist == 0)
        {
            let check = await db.findTopic(name,chapterId,uuid)
            console.log(check)
            if(check[0].Exist != 0)
            {
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Topic name already present for chapter`,
                    "status_name": getCode.getStatus(400)
                });
            }
            else
            {
                let updateTopic = await db.updateChapterTopic(name,uuid, chapterId)
        
                if (updateTopic.affectedRows > 0)
                {
                    res.status(200);
                    return res.json({
                        "status_code": 200,
                        "message": "success",
                        "status_name": getCode.getStatus(200)
                    });
                }
                else
                {
                    res.status(500);
                    return res.json({
                        "status_code": 500,
                        "message": "Chapter topic not updated",
                        "status_name": getCode.getStatus(500)
                    });
                }
            }
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Topic name is already in use`,
                "status_name": getCode.getStatus(400)
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
                    "status_name"     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Chapter topic not updated",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
