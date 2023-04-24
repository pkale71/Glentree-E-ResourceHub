let    db = require('./databaseQuerySchool')
let    commondb = require('../common/commonDatabaseQuery')
let    createUuid = require('uuid')
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()
let    accessToken;
let    authData
let    schoolUuid 
let    name
let    location
let    contact1
let    contact2
let    email
let    curriculumUpload
let    syllabusId
let    schoolGradeCategoryList
let    schoolGradeCategoryArray
let    createdOn
let    createdById
let    active
let    schoolUserSettingUuid;
let    schoolUserSettingList;
let    schholId

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
        schoolUserSettingUuid = createUuid.v1()
        schoolUserSettingList = req.body.schoolUserSetting;
        createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
            // if(req.body.role.id==2 && !req.body.school.id){
            //     return res.json({
            //         "status_code" : 404,
            //         "message" : "School Id Missing",
            //         status_name : getCode.getStatus(404)
            //     })
            // }
         //schoolId = req.body.role.id==2?req.body.school.id:null

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
               let insertSchool = await db.insertSchool(schooUuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, active, schoolGradeCategoryId)
                       if(insertSchool.affectedRows > 0){
                        console.log(insertSchool)
                        schholId = insertSchool.insertId;
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
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            if(e.code == 'ER_DUP_ENTRY'){
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
