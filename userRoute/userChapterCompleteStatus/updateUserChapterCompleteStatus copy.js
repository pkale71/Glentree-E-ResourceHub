let    db = require('./databaseQueryChapterComplete')
let commondb = require('../../common/commonDatabaseQuery')
let    errorCode = require('../../common/errorCode')
let    createUuid = require('uuid')
let    getCode = new errorCode()
let    accessToken;
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
let    isCompleted;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.uuid || !req.body.completedOn){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }

        uuid = createUuid.v1();
        completedOn = req.body.completedOn
        
        saveStatus = await db.updateUserChapterCompleteStatus(uuid,completedOn)
        if (saveStatus.affectedRows > 0) {
            let returnUuid = await db.returnUuidUserChapterCompleteStatus(saveStatus.insertId)
            res.status(200);
            return res.json({
                "status_code":  200,
                "message"   :   "success",
                "data"      :   { 
                                    "uuid" : returnUuid[0].uuid
                                },
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
