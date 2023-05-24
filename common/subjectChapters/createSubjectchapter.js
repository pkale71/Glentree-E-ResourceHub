let    db = require('./databaseQuerySubjectChapter')
let    errorCode = require('../errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
let    isActive;
let    uuid;
let    name;
let    syllabusGradeSubjectUuid;
let    syllabusGradeSubjectId;
let    subject;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.syllabusGradeSubject?.uuid ||!req.body.name)
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }
        syllabusGradeSubjectUuid = req.body.syllabusGradeSubject?.uuid;
        subject = await db.getGradeSubject(syllabusGradeSubjectUuid)
        if(subject.length == 0){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Grade subject not found`,
                "status_name": getCode.getStatus(404)
            });
        }
        syllabusGradeSubjectId = subject[0].id
        name = req.body.name?.trim();
        isActive = 1;
        uuid = createUuid.v1()
        accessToken = req.body.accessToken;

        let check = await db.findChapter(name,syllabusGradeSubjectId,0)

        if(check[0].Exist != 0){
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Chapter name '${name}' already present for subject`,
                "status_name": getCode.getStatus(400)
            });
        }
        else{
           
        let insertChapter = await db.insertSubjectChapter(uuid, syllabusGradeSubjectId, name, isActive)
    
            if (insertChapter.affectedRows > 0) {
                let returnUuid = await db.returnUuidChapter(insertChapter.insertId)
                let insertTopics = await db.insertChapterTopics(createUuid.v1(), insertChapter.insertId, "All-Topics", isActive)
                res.status(200);
                return res.json({
                    "status_code": 200,
                    "message": "success",
                    "data" :{ "uuid" : returnUuid[0].uuid},
                    "status_name": getCode.getStatus(200)
                });
            }
            else{
                res.status(500);
                return res.json({
                    "status_code": 500,
                    "message": "Chapter not created",
                    "status_name": getCode.getStatus(500)
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
                    "status_name"     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Chapter not created",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
