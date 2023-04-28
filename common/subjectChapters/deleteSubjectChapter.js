let    db = require('./databaseQuerySubjectChapter')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    subject;
let    subjectId;
let    uuid;

module.exports = require('express').Router().get('/:uuid',async(req,res) =>
{
    try
    {
        uuid = req.params.uuid
        accessToken = req.body.accessToken;
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
        // console.log(checkUsed,checkUsed[0])
            let deleteSubject = await db.deleteSubjectChapter(uuid,0)
        
                if (deleteSubject.affectedRows > 0) {
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
                        "message": "Chapter not deleted",
                        status_name: getCode.getStatus(500)
                    });
                }
            
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Chapter name '${subject[0].chapter_name}' is in use`,
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
                    "message" : "Chapter not deleted",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
