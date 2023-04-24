let    db = require('./databaseQuerySchool')
let    commondb = require('../common/commonDatabaseQuery')
let    createUuid = require('uuid')
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()
let    accessToken;
let    authData;
let    schoolUuid;
let    name;
let    location;
let    contact1;
let    contact2;
let    email;
let    curriculumUpload;
let    syllabusId;
let    schoolGradeCategoryList;
let    schoolGradeCategoryArray;
let    createdOn;
let    createdById;
let    active;
let    schoolUserSettingUuid;
let    schoolUserSettingList;
let    schoolId;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        email = req.body.email;
        name = req.body.name;
        accessToken = req.body.accessToken;
        location = req.body.location
        contact1 = req.body.contact1
        contact2 = req.body.contact2 == ""?null : req.body.contact2
        curriculumUpload = req.body.curriculumUpload
        syllabusId = req.body.syllabus.id
        schoolGradeCategoryList = req.body.gradeCategory 
        schoolGradeCategoryArray = schoolGradeCategoryList.split(',')
        active = 1
        schoolUuid = createUuid.v1()
        schoolUserSettingList = req.body.schoolUserSetting;
        
        if(!schoolGradeCategoryList){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade Category Missing",
             status_name : getCode.getStatus(404)
            })
        }
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
         authData = await commondb.selectToken(accessToken)
         console.log(authData)
         createdById = authData[0].userId
        if(createdById){

            user = await commondb.getUserById(createdById)
            if(user.length == 0){
                res.status(401)
               return res.json({
                "status_code" : 401,
                "message" : "Invalid token",
                status_name : getCode.getStatus(401)
               })
           }
     
              // console.log("***********",)
               let insertSchool = await db.insertSchool(schoolUuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, active)
                       if(insertSchool.affectedRows > 0){
                        console.log(insertSchool)
                        schoolId = insertSchool.insertId;
                        if(schoolGradeCategoryArray.length > 0){
                            Array.from(schoolGradeCategoryArray).forEach(async(ele)=>{
                                let insertSchoolGradeCategory = await db.insertSchoolGradeCategory(schoolId,ele)
                            })
                        }
                        
                            if(schoolUserSettingList.length > 0){
                                Array.from(schoolUserSettingList).forEach(async(ele)=>{
                                    schoolUserSettingUuid = createUuid.v1()
                                    let insertSchoolUserSetting = await db.insertSchoolUserSetting(schoolUserSettingUuid,schoolId,ele.userType.id,ele.canUpload,ele.canVerify,ele.canPublish)
                                })
                            }
    
                            res.status(200)
                               return res.json({
                                   "status_code" : 200,
                                   "message" : "success",
                                   status_name : getCode.getStatus(200)
                               })            
           
                
                       
                       }
                       else{
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "School not created",
                               status_name : getCode.getStatus(500)
                           }) 
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
                    "message" : "School not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
