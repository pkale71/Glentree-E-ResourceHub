let db = require('./databaseQueryCurriculum')
let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let createUuid = require('uuid')
let getCode = new errorCode()
let path = require('path')
let commonFunction = require('../common/commonFunction')
let fs = require('fs');
let docPath = require('../DOC_FOLDER_PATH/docPath')
let getPath = new docPath()
let curriculumObj = require('../models/curriculumUpload')
let curriculum = new curriculumObj()
let accessToken;
let authData;
let uploadUuid;
let curriculumUpload;
let curriculumMasterUUID;

module.exports = require('express').Router().post('/',async(req,res) => 
{
    try
    {
        if(!req.body.uuid  )
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message" : "Provide all values",
                "status_name" : getCode.getStatus(400)
            })
        }
        accessToken = req.body.accessToken;
        uploadUuid = req.body.uuid
        //For delete user identity check (deleted by whom)
        // authData = await commondb.selectToken(accessToken)
        // createdById = authData[0].userId
        // createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        if(uploadUuid)
        {
            curriculumUpload = await db.getFileName(uploadUuid)
            if(curriculumUpload.length == 0)
            {
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message" : "Provide valid curriculum upload uuid number",
                    "status_name" : getCode.getStatus(404),
                })
            }
            //For curriculum upload user (isExist) check
            // let curriculumcheck = await db.getSchoolCurriculumSearch(schoolId)
            // let userCheck = await db.getSchoolUserSearch(schoolId)
            // let ifDelete = (curriculumcheck.length == 0 && userCheck.length == 0) ? 0 :1
            ifDelete = false
            if(!ifDelete)
            {
        ///get curriculum master UUID
                let curriculumUpload = await db.getCurriculumUpload(uploadUuid)
                curriculum.setDataAll(curriculumUpload[0])
                let curriculumMaster = curriculum.getDataAll()
                curriculumMasterUUID = curriculumMaster.curriculum.uuid;
        ///////////
                let deleteCurriculumUploadByUuid = await db.deleteCurriculumUploadByUuid(uploadUuid);
                if(deleteCurriculumUploadByUuid.affectedRows > 0)
                {
                    let deleteCurriculumUpload = await commonFunction.deleteUploadedFile(getPath.getName('curriculum'),curriculumUpload[0].fileName,curriculumMasterUUID)
                    if(deleteCurriculumUpload)
                    {
                        if(curriculumUpload[0].isExist == 1)
                        {
                            let deleteCurriculumMaster = await db.deleteCurriculumMaster(curriculumUpload[0].curriculum_id)
                            if(deleteCurriculumMaster.affectedRows > 0)
                            {
                                res.status(200)
                                return res.json({
                                    "status_code" : 200,
                                    "message" : `success`,
                                    "status_name" : getCode.getStatus(200)
                                })
                            }
                        }
                        else
                        {
                            res.status(200)
                            return res.json({
                                "status_code" : 200,
                                "message" : `success`,
                                "status_name" : getCode.getStatus(200)
                            })
                        }
                    }
                }
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code" : 500,
                        "message" : `Curriculum upload not deleted.`,
                        "status_name" : getCode.getStatus(500)
                    })
                }
            }
            else
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : `Curriculum upload is currently on use, so cannot be deleted.`,
                    "status_name" : getCode.getStatus(400)
                })
            }
        }   
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code" : 500,
            "message" : "Curriculum Upload not deleted",
            'status_name' : getCode.getStatus(500),
            "error"     :      e.sqlMessage
        }) 
    }
})
