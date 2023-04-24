let db = require('./databaseQuerySchool')
let schoolObj = require('../models/school')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let schools = new schoolObj()
let school;
let schoolId;
let schoolStatuschange;
let schoolUUID;
let schoolGradeCategory;
let schoolGradeCategoryList = [];
let schoolUserSetting;
let schoolUserSettingList = [];

module.exports = require('express').Router().get('/:schoolUUID',async(req,res) =>  {
    try
    {
        schoolUUID = req.params.schoolUUID
        
        school = await db.selectSchool(schoolUUID)
        if(school.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'School not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        schoolId = school[0].id
        schoolStatuschange = await db.schoolStatusChange(schoolId)
        console.log(schoolStatuschange)
        if(schoolStatuschange.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                status_name   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
