let db = require('./databaseQueryCurriculum')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let commonFunction = require('../common/commonFunction')
let docPath = require('../DOC_FOLDER_PATH/docPath')
let getPath = new docPath()
let curriculumObj = require('../models/curriculumUpload')
let curriculum = new curriculumObj()
let curriculums;
let curriculumList = [];
let fileName;
let uploadUuid;

module.exports = require('express').Router().get('/:uploadUuid',async(req,res) =>  
{
    try
    {
        curriculumList = [];
        uploadUuid = req.params.uploadUuid
        if(!uploadUuid || uploadUuid.trim().length < 6)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message" : "Provide valid value",
                "status_name" : getCode.getStatus(400)
            })   
        }
        curriculums = await db.getCurriculumUpload(uploadUuid)
        if(curriculums.length == 0)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'curriculumUpload' : []},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })   
        }
        curriculum.setDataAll(curriculums[0])
        res.status(200)
        return res.json({
            "status_code"   :   200,
            "message"       :   "success",
            "data"          :   {"curriculumUpload" : curriculum.getDataAll()},
            "status_name"   :   getCode.getStatus(200)
        })
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Curriculum Upload not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})