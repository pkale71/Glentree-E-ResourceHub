let db = require('./databaseQueryCurriculum')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let commonFunction = require('../common/commonFunction')
let docPath = require('../DOC_FOLDER_PATH/docPath')
let curriculumObj = require('../models/curriculumUpload')
let curriculum = new curriculumObj()
let getPath = new docPath()
let fileName;
let uploadUuid;
let curriculumMasterUUID;

module.exports = require('express').Router().get('/:uploadUuid',async(req,res) =>  
{
    try
    {
        uploadUuid = req.params.uploadUuid 
        fileName = await db.getFileName(uploadUuid)
        if(fileName[0].fileName == null)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"       :   "success",
                "data"          :   {"curriculumFile" : []},
                "status_name"   : getCode.getStatus(200)
            })   
        }
///get curriculum master UUID
        let curriculumUpload = await db.getCurriculumUpload(uploadUuid)
        curriculum.setDataAll(curriculumUpload[0])
        let curriculumMaster = curriculum.getDataAll()
        curriculumMasterUUID = curriculumMaster.curriculum.uuid;
///////////
        let file = await commonFunction.getFileUploadedPath(getPath.getName('curriculum'), fileName[0].fileName, curriculumMasterUUID)
       // res.sendFile(path.join(__dirname,"../",logoFile))
       
    //    res.status(200)
    //     return res.json({
    //         "status_code"   :   200,
    //         "message"       :   "success",
    //         "data"          :   {"curriculumFile" : file},
    //         "status_name"   :   getCode.getStatus(200)
    //     })
    res.sendFile(file)
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "File not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
