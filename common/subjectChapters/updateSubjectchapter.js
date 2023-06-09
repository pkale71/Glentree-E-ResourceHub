let    db = require('./databaseQuerySubjectChapter')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    chapter;
let    chapterId;
let    gradeId;
let    uuid;
let    name;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.syllabusGradeSubject?.uuid || !req.body.name || !req.body.uuid)
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }
        syllabusGradeSubjectUuid = req.body.syllabusGradeSubject?.uuid;
        subjectData = await db.getGradeSubject(syllabusGradeSubjectUuid)
        console.log(subjectData)
        if(subjectData.length == 0){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Grade subject not found`,
                "status_name": getCode.getStatus(404)
            });
        }
        syllabusGradeSubjectId = subjectData[0].id
        name = req.body.name?.trim();
        isActive = 1;
        uuid = req.body.uuid
        accessToken = req.body.accessToken;
        let checkValid = await db.getSubjectChapterDetails(uuid , syllabusGradeSubjectId)
        if(checkValid.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Provide valid data',
                "status_name"   :   getCode.getStatus(404),
            })
        }
        chapter = await db.selectChapter(uuid)
        if(chapter.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Chapter not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        chapterId = chapter[0].id
        let checkUsed = await db.checkSubjectChapterUsed(chapterId)
        console.log(checkUsed)

        if(checkUsed[0].isExist == 0 && checkUsed[0].Exist == 0){
            let check = await db.findChapter(name,syllabusGradeSubjectId ,uuid)
            console.log(check)
            if(check[0].Exist != 0){
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Chapter name  already present for subject`,
                    "status_name": getCode.getStatus(400)
                });
            }
            else{
               
            let updateSubject = await db.updateSubjectChapter(uuid,syllabusGradeSubjectId, name)
        
                if (updateSubject.affectedRows > 0) {
                    res.status(200);
                    return res.json({
                        "status_code": 200,
                        "message": "success",
                        "status_name": getCode.getStatus(200)
                    });
                }
                else{
                    res.status(500);
                    return res.json({
                        "status_code": 500,
                        "message": "Chapter not updated",
                        "status_name": getCode.getStatus(500)
                    });
                }
            }
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Chapter name is already in use`,
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
                    "message" : "Chapter not updated",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
