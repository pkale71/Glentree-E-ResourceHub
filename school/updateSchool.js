let db = require('./databaseQuerySchool')
let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let    upload = require('../common/fileUpload')
let     createUuid = require('uuid')
let getCode = new errorCode()
let accessToken;
let    authData;
let    schoolUuid;
let    name;
let    location;
let    contact1;
let    contact2;
let    email;
let    curriculumUpload;
let    curriculumComplete;
let    syllabusId;
let    schoolGradeCategoryList;
let    schoolGradeCategory;
let    schoolGradeCategoryArray;
let    schoolUserSettingList;
let    schoolId;
let    insertGradeCategory = [];
let    createdOn
let    createdById
let    active

module.exports = require('express').Router().post('/',async(req,res)=>{
    try
    {
        if(!req.body.uuid||!req.body.email || !req.body.name?.trim()  || !req.body.location  || !req.body.contact1  || !req.body.curriculumUpload  || !req.body.curriculumComplete  || !req.body.syllabus?.id ||!req.body.gradeCategory?.trim())
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message" : "Provide all values",
                "status_name" : getCode.getStatus(400)
            })
        }
        email = req.body.email
        name = req.body.name?.trim();
        accessToken = req.body.accessToken;
        location = req.body.location?.trim()
        contact1 = req.body.contact1
        contact2 = req.body.contact2 == ""?null : req.body.contact2
        curriculumUpload = req.body.curriculumUpload
        curriculumComplete = req.body.curriculumComplete
        syllabusId = req.body.syllabus.id
        schoolGradeCategory = req.body.gradeCategory
        schoolGradeCategoryArray = schoolGradeCategory.split(',')
        schoolUuid = req.body.uuid
        active = 1
        schoolUserSettingList = req.body.schoolUserSetting;
        authData = await commondb.selectToken(accessToken)
        createdById = authData[0].userId
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        insertGradeCategory = []
        if(!schoolGradeCategory)
        {
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Grade Category Missing",
                "status_name" : getCode.getStatus(404)
            })
        }
        if(schoolUuid)
        {
            schoolId = await db.selectSchool(schoolUuid)
            if(schoolId.length == 0)
            {
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "Provide valid school uuid number",
                    "status_name" : getCode.getStatus(404),
                })
            }
            schoolId = schoolId[0].id
            let schoolGradeCategoryMatch = await db.getSchoolGradeCategorySearch(schoolId,schoolGradeCategory)
            if(schoolGradeCategoryMatch.length > 0)
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : `School is currently on use, so grade categories cannot be deleted, only new grade categories can be added.`,
                    "status_name" : getCode.getStatus(400)
                })
            }
            schoolGradeCategoryList = await db.getSchoolGradeCategory(schoolId)
            let list = [];
            Array.from(schoolGradeCategoryList).forEach((ele) => 
            {
                list.push(ele.gradeId.toString())
            })
            let flag = 1;
            Array.from(schoolGradeCategoryArray).forEach((ele) => 
            {
                let index = list.indexOf(ele)
                if(index == -1)
                {
                    insertGradeCategory.push(ele)
                }
            })
            if(flag)
            {
                let updateSchool = await db.updateSchool(schoolUuid, location, contact1, contact2, email, curriculumUpload, curriculumComplete, syllabusId,name)
                if(updateSchool.affectedRows > 0)
                {
                    if(insertGradeCategory.length > 0)
                    {
                        Array.from(insertGradeCategory).forEach(async(ele)=>
                        {
                            let insertSchoolGradeCategory = await db.insertSchoolGradeCategory(schoolId,parseInt(ele))
                        })
                    }
                    let schoolUserSettingUuidList = await db.getSchoolUserSettingUuid(schoolId)
                    let searchUserSettingUuid = []
                    Array.from(schoolUserSettingUuidList).forEach((ele)=>
                    {
                        searchUserSettingUuid.push(ele.uuid)                       
                    })
                    Array.from(schoolUserSettingList).forEach((ele)=>
                    {
                        if(ele.uuid)
                        {
                            let index = searchUserSettingUuid.indexOf(ele.uuid)
                            if(index != -1)
                            {
                                searchUserSettingUuid.splice(index, 1)
                                schoolUserSettingUuidList.splice(index,1)
                            }
                        }
                    })
                    Array.from(searchUserSettingUuid).forEach(async(ele,i)=>
                    {
                        let deleteSUSetting      = await  db.deleteSchoolUserSetting(ele);
                        let insertSUSettingHistory = await db.insertSchoolUserSettingHistory(schoolId,schoolUserSettingUuidList[i].user_type_id,schoolUserSettingUuidList[i].can_upload,schoolUserSettingUuidList[i].can_verify,schoolUserSettingUuidList[i].can_publish, 'delete',createdOn, createdById)
                    })
                    if(schoolUserSettingList.length > 0)
                    {
                        Array.from(schoolUserSettingList).forEach(async(ele)=>
                        {
                            if(ele.uuid)
                            {
                                let insertSchoolUserSetting = await db.updateSchoolUserSetting(ele.uuid,ele.userType.id,ele.canUpload,ele.canVerify,ele.canPublish)
                                let insertSUSettingHistory = await db.insertSchoolUserSettingHistory(schoolId,ele.userType.id,ele.canUpload,ele.canVerify,ele.canPublish, 'update',createdOn, createdById)
                            }
                            else
                            {
                                let schoolUserSettingUuid = createUuid.v1()
                                let insertSchoolUserSetting = await db.insertSchoolUserSetting(schoolUserSettingUuid,schoolId,ele.userType.id,ele.canUpload,ele.canVerify,ele.canPublish)
                                let insertSUSettingHistory = await db.insertSchoolUserSettingHistory(schoolId,ele.userType.id,ele.canUpload,ele.canVerify,ele.canPublish, 'add',createdOn, createdById)
                            }
                        })
                    }
                    let insertCurriculumUploadAs = await db.insertCurriculumUploadAs(schoolId, curriculumUpload, active, createdOn, createdById)
                    if(insertCurriculumUploadAs.affectedRows > 0)
                    {
                        let updateCurriculumUploadAsIsActive = await db.updateCurriculumUploadAsIsActive(0, schoolId, insertCurriculumUploadAs.insertId)
                    }
                    let insertCurriculumCompletionAs = await db.insertCurriculumCompletionAs(schoolId, curriculumComplete, active, createdOn, createdById)
                    if(insertCurriculumCompletionAs.affectedRows > 0)
                    {
                        let updateCurriculumCompletionAsIsActive = await db.updateCurriculumCompletionAsIsActive(0, schoolId, insertCurriculumCompletionAs.insertId)
                    }
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message" : "success",
                        "status_name" : getCode.getStatus(200),
                    })
                }
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code" : 500,
                        "message" : "School not updated",
                        'status_name' : getCode.getStatus(500),
                    }) 
                }
            }
        }
    }
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code" : 500,
            "message" : "School not updated",
            'status_name' : getCode.getStatus(500),
            "error"     :      e.sqlMessage
        }) 
    }
})
