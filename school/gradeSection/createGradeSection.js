let    db = require('./databaseQueryGradeSection')
let    errorCode = require('../../common/errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
let    academicId;
let    schoolId;
let    academicUuid;
let    schoolUuid;
let    gradeId;
let    uuid;
let    section;
let    count;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        academicUuid = req.body.academicYear?.uuid
        schoolUuid = req.body.school?.uuid
        gradeId = req.body.grade?.id;
        count = req.body.count;
        uuid = createUuid.v1()
        accessToken = req.body.accessToken;
        let academic = await db.getAcademic(academicUuid)

        if(academic.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Academic year not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
        academicId = academic[0].id

        let school = await db.getSchool(schoolUuid)
        if(school.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'School not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
        schoolId = school[0].id
        let insertGrade = []
        section = await db.findLastSection(academicId,schoolId,gradeId)
        section = section[0]?.section ? section[0].section : 64
        console.log(insertGrade.length,section)

        for(i = 0; i < count;i++){
            section++
           insertGrade.push(await db.insertGradeSection(createUuid.v1(), academicId, schoolId, gradeId, String.fromCharCode(section)));  
        }

        if (insertGrade.length == count) {
            res.status(200);
            return res.json({
                "status_code": 200,
                "message": "success",
                "status_name": getCode.getStatus(200)
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
                    "message" : "Grade section not created",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
