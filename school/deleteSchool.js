let db = require('./databaseQuerySchool')
let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let createUuid = require('uuid')
let getCode = new errorCode()
let accessToken;
let authData;
let schoolUuid;
let schoolId;
let createdOn
let createdById

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
        if(!req.params.schoolUUID  ){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Missing values",
                "status_name" : getCode.getStatus(404)
            })
        }
        accessToken = req.body.accessToken;
        schoolUuid = req.params.schoolUUID
        authData = await commondb.selectToken(accessToken)
        createdById = authData[0].userId
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        if(schoolUuid){
            school = await db.selectSchool(schoolUuid)
            if(school.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "Provide valid school uuid number",
                    "status_name" : getCode.getStatus(404),
                })
            }
            schoolId = school[0].id
            let curriculumcheck = await db.getSchoolCurriculumSearch(schoolId)
            let userCheck = await db.getSchoolUserSearch(schoolId)
            let ifDelete = (curriculumcheck.length == 0 && userCheck.length == 0) ? 0 :1
            console.log(!ifDelete,curriculumcheck,userCheck)
            let schoolUserSettingUuidList = await db.getSchoolUserSettingUuid(schoolId)
            if(!ifDelete){
                let deleteschool = await db.deleteSchool(schoolUuid);
                if(deleteschool.affectedRows > 0){
                    await Array.from(schoolUserSettingUuidList).forEach(async(ele)=>{
                        let insertSUSettingHistory = await db.insertSchoolUserSettingHistory(schoolId,ele.user_type_id,ele.can_upload,ele.can_verify,ele.can_publish, 'delete',createdOn, createdById)                      
                    })
                    let delSchoolGradeCategory = await db.deleteSchoolGradeCategory(schoolId)
                    let delSchoolUserSetting = await db.deleteSchoolUserSettingId(schoolId)

                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message" : `success`,
                        "status_name" : getCode.getStatus(200)
                       })
                }
                else{
                    res.status(500)
                    return res.json({
                        "status_code" : 500,
                        "message" : `School not deleted.`,
                        "status_name" : getCode.getStatus(500)
                       })
                }
            }
            else{
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : `School is currently on use, so cannot be deleted.`,
                    "status_name" : getCode.getStatus(400)
                   })
            }
        }   
        } catch(e){
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "School not deleted",
                'status_name' : getCode.getStatus(500),
                "error"     :      e.sqlMessage
            }) 
        }

})
