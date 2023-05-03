let    db = require('./databaseQueryGradeSection')
let    commondb = require('../../common/commonDatabaseQuery')
let    errorCode = require('../../common/errorCode')
let    getCode = new errorCode()
let    accessToken;
let    uuid;
let    section;
let    gradeSection;
let    authData;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        uuid = req.body.uuid
        accessToken = req.body.accessToken;
        gradeSection = await db.getGradeSection(uuid)
        if(gradeSection.length == 0){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": "Grade section not present",
                status_name: getCode.getStatus(404)
            });
        }

        authData = await commondb.selectToken(accessToken)

        section = await db.findSection(gradeSection[0].academic_year_id,authData[0].userId,gradeSection[0].grade_id,gradeSection[0].id)
        if(section[0].Exist == 0){
            let deleteSection = await db.deleteGradeSection(uuid)
            if (deleteSection.affectedRows > 0) {
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
                    "message": "Grade section not deleted",
                    status_name: getCode.getStatus(500)
                });
            }
        }
        else{
            res.status(500);
            return res.json({
                "status_code": 500,
                "message": "Grade section is in use.",
                status_name: getCode.getStatus(500)
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
                    "message" : "Grade section not deleted",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
