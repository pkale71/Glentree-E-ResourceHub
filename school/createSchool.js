let    db = require('./databaseQuerySchool')
let    commondb = require('../common/commonDatabaseQuery')
let    userUuid = require('uuid')
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()
let    accessToken;
let    authData
let    uuid 
let    name
let    location
let    contact1
let    contact2
let    email
let    curriculumUpload
let    syllabus
let    gradeCategory
let    createdOn
let    createdBy
let    active

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
        syllabus = req.body.syllabus.id
        gradeCategory = req.body.gradeCategory.id
        active = req.body.active
        uuid = userUuid.v1()
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
         createdBy = authData[0].userId
        if(createdBy){

            user = await commondb.getUserById(createdBy)
         
            if(user.length == 0){
                res.status(401)
               return res.json({
                "status_code" : 401,
                "message" : "Invalid token",
                status_name : getCode.getStatus(401)
               })
           }
     
              // console.log("***********",)
               let insertSchool = await db.insertSchool(uuid, name, location, contact1, contact2, email, curriculumUpload, syllabus, createdOn, createdBy, active, gradeCategory)
                       if(insertSchool.affectedRows > 0){
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
                    "message"       : "School not created",
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
