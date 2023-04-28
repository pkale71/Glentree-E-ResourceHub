let    db = require('./databaseQuerySubjectChapter')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    subject;
let    subjectId;
let    gradeId;
let    uuid;
let    name;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.syllabusGradeSubject?.id || !req.body.name || !req.body.uuid){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                status_name: getCode.getStatus(404)
            });
        }
        syllabusGradeSubjectId = req.body.syllabusGradeSubject?.id;
        name = req.body.name;
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
        subject = await db.selectChapter(uuid)
        if(subject.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Chapter not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        subjectId = subject[0].id
       // let checkUsed = await db.checkUsedSubject(subjectId)
       let checkUsed = [{'Exist':0}]
        if(checkUsed[0].Exist == 0){
            let check = await db.findChapter(name,syllabusGradeSubjectId)
            console.log(check)
            if(check[0].Exist != 0){
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Chapter name '${name}' alreay present for subject`,
                    status_name: getCode.getStatus(400)
                });
            }
            else{
               
            let updateSubject = await db.updateSubjectChapter(uuid,syllabusGradeSubjectId, name)
        
                if (updateSubject.affectedRows > 0) {
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
                        "message": "Chapter not updated",
                        status_name: getCode.getStatus(500)
                    });
                }
            }
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Chapter name '${name}' is in use`,
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
                    "message" : "Chapter not updated",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
