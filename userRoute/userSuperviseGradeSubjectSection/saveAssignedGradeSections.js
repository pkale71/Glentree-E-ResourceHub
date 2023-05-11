let    db = require('./databaseQueryGradeSubjectSection')
let    errorCode = require('../../common/errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    gradeSubjectUuid;
let    isActive;
let    uuid;
let    name;
let    chapterUuid;
let    gradeId;
let    sections;

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
        gradeSubjectUuid = req.body.gradeSubject?.uuid;
        gradeId = req.body.grade?.id;
        uuid = createUuid.v1()
        sections = req.body.sections;
        let sectionIds
        if(sections){
            sectionIds = await db.getSectionId(sections)
        }
        
        ids = await db.findSchoolAndAcaId(academicYearUuid,schoolUuid,userUuid,gradeSubjectUuid)
        if(ids.length > 0){
            acaId = ids[0]['acaId']
            schoolId = ids[0]['schoolId']
            userId = ids[0]['userId']
            subjectId = ids[0]['subjectId']
            let sql = `INSERT INTO user_teach_subject_section (uuid, user_id,  academic_year_id, school_id, grade_id,subject_id,section_id)  VALUES  `
            sectionIds.forEach((element,i) => {
                sql = sql + `("${createUuid.v1()}",${userId},${acaId},${schoolId},${gradeId},${subjectId},${element.id})` 
                if(sectionIds.length != i+1){
                    sql = sql+`,`
                }
            });

            let insertGrade = await db.insertAssignedSection(sql)
            if (insertGrade.affectedRows > 0)
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
                    "message": "Grade section not assigned",
                    "status_name": getCode.getStatus(500)
                });
            }
        }
        else 
        {
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : "Grade section not assigned",
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
                    "message" : "Grade section not assigned",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
