let    db = require('./databaseQueryChapterTopic')
let    errorCode = require('../errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
let    isActive;
let    uuid;
let    name;
let    chapterUuid;
let    chapterId;
let    chapter;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.subjectChapter?.uuid ||!req.body.name){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                status_name: getCode.getStatus(404)
            });
        }
        chapterUuid = req.body.subjectChapter?.uuid;
        chapter = await db.getSubjectChapter(chapterUuid)
        console.log(chapter)
        if(chapter.length == 0){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Chapter not found`,
                status_name: getCode.getStatus(404)
            });
        }
        chapterId = chapter[0].id
        name = req.body.name;
        isActive = 1;
        uuid = createUuid.v1()
        accessToken = req.body.accessToken;
        console.log(name,chapterId)

        let check = await db.findTopic(name,chapterId)

        if(check[0].Exist != 0){
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Topic name '${name}' already present for chapter`,
                status_name: getCode.getStatus(400)
            });
        }
        else{
           
        let insertTopic = await db.insertChapterTopic(uuid, chapterId, name, isActive)
    
            if (insertTopic.affectedRows > 0) {
                let returnUuid = await db.returnUuidTopic(insertTopic.insertId)
                // let insertTopics = await db.insertChapterTopics(createUuid.v1(), insertChapter.insertId, "All-Topics", isActive)
                res.status(200);
                return res.json({
                    "status_code": 200,
                    "message": "success",
                    "data" :{ "uuid" : returnUuid[0].uuid},
                    status_name: getCode.getStatus(200)
                });
            }
            else{
                res.status(500);
                return res.json({
                    "status_code": 500,
                    "message": "Topic not created",
                    status_name: getCode.getStatus(500)
                });
            }
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
                    "message" : "Topic not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
