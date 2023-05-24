let    db = require('./databaseQueryChapterComplete')
let    commondb = require('../../common/commonDatabaseQuery')
let    errorCode = require('../../common/errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
let    isActive;
let    uuid;
let    gradeId;
let    chapterUuid;
let    subjectUuid;
let    sectionUuid;
let    topicUuid;
let    acaUuid;
let    completedOn;
let    completedBy;
let    createdOn;
let    chapterId;
let    chapter;
let    isCompleted;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.subject?.uuid ||!req.body.grade?.id || !req.body.academicYear?.uuid || !req.body.section?.uuid || !req.body.chapter?.uuid || !req.body.completedOn){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }

        uuid = createUuid.v1();
        acaUuid = req.body.academicYear?.uuid
        gradeId = req.body.grade?.id
        sectionUuid = req.body.section?.uuid
        subjectUuid = req.body.subject?.uuid
        chapterUuid = req.body.chapter?.uuid;
        topicUuid = req.body.topic?.uuid
        completedOn = req.body.completedOn
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        isCompleted = 1
        accessToken = req.body.accessToken
        authData = await commondb.selectToken(accessToken)
        completedBy = authData[0].userId

        let user = await db.getUserType(authData[0].userId);
        if(user.length == 0)
        {
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": "User not found",
                "status_name": getCode.getStatus(404)
            });
        }

        if(user[0].roleId != 2)
        {
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": "Not a school user",
                "status_name": getCode.getStatus(400)
            });
        }
        if(user[0].roleId == 2 && user[0].code != 'SCHCD' &&  user[0].code != 'SUBHD' &&  user[0].code != 'TECHR')
        {
            res.status(400);
            return res.json({
                "status_code": 400,
                "message": "User is not coordinator or teacher or subject head.",
                "status_name": getCode.getStatus(400)
            });
        }



        currentAca = await db.checkCurrentAcademicYear(acaUuid)
        if(currentAca.length == 0)
        {
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Academic year completed`,
                    "status_name": getCode.getStatus(400)
                });
        }

        checkExist = await db.checkCompleteStatusExist(acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,topicUuid)
        if(checkExist.length > 0)
        {
                res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Complete status already exist.`,
                    "status_name": getCode.getStatus(400)
                });
        }
        else
        {
            saveStatus = await db.saveUserChapterCompleteStatus(uuid,acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,topicUuid,completedOn,completedBy,createdOn,isCompleted)
                if (saveStatus.affectedRows > 0) {
                    let returnUuid = await db.returnUuidUserChapterCompleteStatus(saveStatus.insertId)
                   
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
                        "message": "Complete status not saved",
                        "status_name": getCode.getStatus(500)
                    });
                }
        }

       
        } 
        catch(e)
        {
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
                    "status_code"   : 500,
                    "message"       : "Complete status not saved",
                    "status_name"   : getCode.getStatus(500),
                    "error"         : e.sqlMessage
                }) 
            }
           
        }

})
