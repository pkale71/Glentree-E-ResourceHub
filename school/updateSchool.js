let db = require('./databaseQuerySchool')
let errorCode = require('../common/errorCode')
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
let    syllabusId;
let    schoolGradeCategoryList;
let    schoolGradeCategory;
let    schoolGradeCategoryArray;
let    createdOn;
let    createdById;
let    active;
let    schoolUserSettingUuid;
let    schoolUserSettingList;
let    schoolId;

module.exports = require('express').Router().post('/',async(req,res)=>{
    try{
        if(!req.body.uuid  ){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Missing values",
                status_name : getCode.getStatus(404)
            })
        }
        email = req.body.email;
        name = req.body.name;
        accessToken = req.body.accessToken;
        location = req.body.location
        contact1 = req.body.contact1
        contact2 = req.body.contact2 == ""?null : req.body.contact2
        curriculumUpload = req.body.curriculumUpload
        syllabusId = req.body.syllabus.id
        schoolGradeCategory = req.body.gradeCategory 
         schoolGradeCategoryArray = schoolGradeCategory.split(',')
        schoolUuid = req.body.uuid
       // schoolUserSettingUuid = createUuid.v1()
        schoolUserSettingList = req.body.schoolUserSetting;
        
        if(!schoolGradeCategory){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade Category Missing",
             status_name : getCode.getStatus(404)
            })
        }
        if(schoolUuid){
            console.log("true")
            schoolId = await db.selectSchool(schoolUuid)
            if(schoolId.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "Provide valid school uuid number",
                    status_name : getCode.getStatus(404),
                })
            }
            schoolId = schoolId[0].id
            schoolGradeCategoryList = await db.getSchoolGradeCategoryId(schoolId)
            return res.json({
                "status_code" : 404,
                "message" : schoolGradeCategoryList,
                status_name : getCode.getStatus(404)
               })


        }
        else{
            schoolId = null
        }
        return


         if(uuid){
               let updateUser = await db.updateUser(uuid,firstName,lastName,gender,userTypeId,schoolId,email,mobile)
               console.log("***",updateUser)
                       if(updateUser.affectedRows > 0){
                        res.status(200)
                           return res.json({
                               "status_code" : 200,
                               "message" : "success",
                               status_name : getCode.getStatus(200),
                           })            
       
                       }
                       else{
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "User not updated",
                               status_name : getCode.getStatus(500),
                           }) 
                       }
           
         }
         
        } catch(e){
            res.status(500)
            return res.json({
                "status_code" : 500,
                "message" : "User not updated",
                status_name : getCode.getStatus(500),
                "error"     :      e.sqlMessage
            }) 
        }

})
