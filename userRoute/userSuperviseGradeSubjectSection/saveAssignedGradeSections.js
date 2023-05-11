let    db = require('./databaseQueryGradeSubjectSection')
let    errorCode = require('../../common/errorCode')
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

        if(!req.body.academicYear?.uuid ||!req.body.user?.uuid || !req.body.school?.uuid || !req.body.gradeSubject?.uuid || !req.body.grade?.id || !req.body.sections?.trim())
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }
        academicYearUuid = req.body.academicYear?.uuid;
        userUuid = req.body.user?.uuid;
        schoolUuid = req.body.school?.uuid;
        uuid = createUuid.v1()
        grade = req.body.grade;
        grade = grade.split(",")
        ids = await db.findSchoolAndAcaId(academicYearUuid,schoolUuid,userUuid)
        if(ids.length > 0){
            acaId = ids[0]['acaId']
            schoolId = ids[0]['schoolId']
            userId = ids[0]['userId']
            
            let sql = `INSERT INTO user_supervise_grade (uuid, user_id,  academic_year_id, school_id, grade_id)  VALUES  `
            grade.forEach((element,i) => {
                sql = sql + `("${createUuid.v1()}",${userId},${acaId},${schoolId},${element})` 
                if(grade.length != i+1){
                    sql = sql+`,`
                }
            });

            let insertGrade = await db.insertAssignedGrade(sql)
            if (insertGrade.affectedRows > 0)
             {
                // let returnUuid = await db.returnUuidTopic(insertTopic.insertId)
                // let insertTopics = await db.insertChapterTopics(createUuid.v1(), insertChapter.insertId, "All-Topics", isActive)
                res.status(200);
                return res.json({
                    "status_code": 200,
                    "message": "success",
                    // "data" :{ "uuid" : returnUuid[0].uuid},
                    "status_name": getCode.getStatus(200)
                });
            }
            else
            {
                res.status(500);
                return res.json({
                    "status_code": 500,
                    "message": "Grade not assigned",
                    "status_name": getCode.getStatus(500)
                });
            }
        }
        else 
        {
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : "Grade not assigned",
                "status_name"   : getCode.getStatus(500)
            }) 
        }
        
        } 
        catch(e)
        {
            console.log(e)
            
            if(e.code == 'ER_DUP_ENTRY')
            {
                let msg = e.sqlMessage.replace('_UNIQUE', '');
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : msg,
                    "status_name"     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }
            else
            {
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade not assigned",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
