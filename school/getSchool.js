let db = require('./databaseQuerySchool')
let schoolObj = require('../models/school')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let schools = new schoolObj()
let school;
let schoolList = [];
let schoolUUID;
let schoolGradeCategory;
let schoolGradeCategoryList = [];
let schoolUserSetting;
let schoolUserSettingList = [];

module.exports = require('express').Router().get('/:schoolUUID',async(req,res) =>  {
    try
    {
        schoolUUID = req.params.schoolUUID
        console.log(schoolUUID)
        // school = await db.getSchoolError(schoolUUID)
        //  await Object.keys(school[0]).forEach(function(key) {
        //     school = JSON.parse(school[0][key]);
        //     // ...
        // })
        // return res.json({
        //     "status_code"   :   404,
        //     "data"          :   {'school' : school },
        //     "message"       :   'success',
        //     "status_name"   :   getCode.getStatus(404),
        // })  
        school = await db.getSchool(schoolUUID)
        schoolList = [];
        schoolGradeCategoryList=[]
        schoolUserSettingList=[]
        if(school.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'school' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        schoolGradeCategory = await db.getSchoolGradeCategory(school[0].id)
        schoolUserSetting = await db.getSchoolUserSetting(school[0].id)
        if(schoolGradeCategory.length>0){
            await Array.from(schoolGradeCategory).forEach(ele  =>  {
                schools.setSchoolGradeCategory(ele)
                schoolGradeCategoryList.push(schools.getSchoolGradeCategory())
            })
        }
        if(schoolUserSetting.length>0){
            await Array.from(schoolUserSetting).forEach(ele  =>  {
                schools.setSchoolUserSetting(ele)
                schoolUserSettingList.push(schools.getSchoolUserSetting())
            })
        }
        school[0]['gradeCategory'] = schoolGradeCategoryList
        school[0]['schoolUserSetting'] = schoolUserSettingList
        await Array.from(school).forEach(ele  =>  {
            schools.setData(ele)
            schoolList.push(schools.getData())
        })

        if(school.length == schoolList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'school' : schoolList},
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
            "message"       :   "School not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
