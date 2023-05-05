let    db = require('./databaseQueryGradeSubject')
let    errorCode = require('../errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
let    isActive;
let    gradeId;
let    uuid;
let    name;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.syllabus?.id ||!req.body.name || !req.body.grade?.id){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                status_name: getCode.getStatus(404)
            });
        }
        syllabusId = req.body.syllabus?.id;
        name = req.body.name.trim();
        gradeId = req.body.grade?.id;
        isActive = 1;
        uuid = createUuid.v1()
        accessToken = req.body.accessToken;
        let check = await db.findSubject(name,gradeId,syllabusId,0)

        if(check[0].Exist != 0){
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": `Subject name '${name}' already present for grade`,
                status_name: getCode.getStatus(400)
            });
        }
        else{
           
        let insertSubject = await db.insertGradeSubject(uuid, syllabusId, gradeId, name, isActive)
    
            if (insertSubject.affectedRows > 0) {
                let returnUuid = await db.returnUuidSubject(insertSubject.insertId)
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
                    "message": "Grade subject not created",
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
                    "message" : "Grade subject not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
