let db = require('./databaseQuerySchool')
let schoolObj = require('../models/school')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let schools = new schoolObj()
let    path = require('path')
let    commonFunction = require('../common/commonFunction')
let    fs = require('fs');
let    docPath = require('../DOC_FOLDER_PATH/docPath')
let    getPath = new docPath()
let schoolLogo;
let schoolList = [];
let schoolUUID;
let schoolGradeCategory;
let schoolGradeCategoryList = [];
let schoolUserSetting;
let schoolUserSettingList = [];

module.exports = require('express').Router().get('/:schoolUUID',async(req,res) =>  
{
    try
    {
        schoolUUID = req.params.schoolUUID 
        schoolLogo = await db.getLogoName(schoolUUID)
        if(schoolLogo[0].fileName == null)
        {
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Logo not found',
                "status_name"   : getCode.getStatus(404)
            })   
        }

        let logoFile = await commonFunction.getFileUploaded(getPath.getName('school'), schoolLogo[0].fileName, schoolUUID)

       // res.sendFile(path.join(__dirname,"../",logoFile))
       res.status(200)
        return res.json({
            "status_code"   :   200,
            "message"       :   "success",
            "data"          :   {"logoFile" : logoFile},
            "status_name"   :   getCode.getStatus(200)
        })
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "School not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
