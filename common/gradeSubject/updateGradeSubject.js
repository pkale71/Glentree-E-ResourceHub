let    db = require('./databaseQueryGradeSubject')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    subject;
let    subjectId;
let    gradeId;
let    uuid;
let    name;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.syllabus?.id ||!req.body.name || !req.body.grade?.id || !req.body.uuid){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }
        syllabusId = req.body.syllabus?.id;
        name = req.body.name?.trim();
        gradeId = req.body.grade?.id;
        uuid = req.body.uuid
        accessToken = req.body.accessToken;
        let checkValid = await db.getGradeSubjectDetails(uuid , syllabusId,gradeId)
        if(checkValid.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Provide valid data',
                "status_name"   :   getCode.getStatus(404),
            })
        }
        subject = await db.selectSubject(uuid)
        if(subject.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Grade subject not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        subjectId = subject[0].id
        let checkUsed = await db.checkUsedSubject(subjectId)
        if(checkUsed[0].Exist == 0){
            let check = await db.findSubject(name,gradeId,syllabusId,uuid)
            console.log(check)
            if(check[0].Exist != 0 && check[0].grade_id){
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Subject name already present for grade id`,
                    "status_name": getCode.getStatus(400)
                });
            }
            else{
               
            let updateSubject = await db.updateGradeSubject(uuid, name)
        
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
                        "message": "Grade subject not updated",
                        "status_name": getCode.getStatus(500)
                    });
                }
            }
        }
        else{
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Subject name is already in use`,
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
                    "message" : "Grade subject not updated",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
