let db = require('./databaseQueryCurriculum')
let commondb = require('../common/commonDatabaseQuery')
let createUuid = require('uuid')
let formidable = require('formidable');
let path = require('path')
let commonFunction = require('../common/commonFunction')
let fs = require('fs');
let docPath = require('../DOC_FOLDER_PATH/docPath')
let getPath = new docPath()
let errorCode = require('../common/errorCode');
let getCode = new errorCode()
let fileObject;
let originalFilename;
let fileSizes
let academicYearUuid;
let schoolUuid;
let gradeId;
let gradeSubjectUuid;
let subjectChapterUuid;
let chapterTopicUuid;
let materialTypeUuid
let uuid;
let curriculumFiles = []
let isActive
let fileTypeIds = []
let materialType
let curriculumId;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        const options = {
            multiples : true
        };
        fileTypeIds = []
        curriculumFiles = []
        fileSizes = 0;
        accessToken = req.body.accessToken;
        let form = new formidable.IncomingForm(options);
        form.parse(req, async function (error, fields, files) 
        {
            if(error) throw error
            if(Object.keys(files).length > 0)
            {
                fileObject = files
                if(( Object.keys(files).length == 1) && (!files.curriculumFiles?.length))
                {
                    curriculumFiles.push(files.curriculumFiles)
                }
                else
                {
                    curriculumFiles = files.curriculumFiles
                }
                curriculumFiles.forEach(ele => {
                    fileSizes = fileSizes + ele.size
                    let fileType = ele['mimetype']
                    originalFilename = ele.originalFilename
                })
                if(fileSizes > (50*1024*1024))
                {
                    res.status(400)
                    return res.json({
                        "status_code" : 400,
                        "message" : "File Size Should Be Less Than 50 Mb.",
                        "status_name" : getCode.getStatus(400)
                    })
                }
            }
            if(curriculumFiles.length == 0)
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : "File Not Selected",
                    "status_name" : getCode.getStatus(400)
                })
            }
            // return
            // replace access token here with body
            req.body = fields
            if(!req.body.academicYear || !JSON.parse(req.body.academicYear)?.uuid || !req.body.school || !JSON.parse(req.body.school)?.uuid || !req.body.grade  || !JSON.parse(req.body.grade)?.id  || !req.body.gradeSubject || !JSON.parse(req.body.gradeSubject)?.uuid  || !JSON.parse(req.body.subjectChapter) ||!JSON.parse(req.body.subjectChapter)?.uuid || !JSON.parse(req.body.materialType) ||!JSON.parse(req.body.materialType)?.uuid  )
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : "Provide all values",
                    "status_name" : getCode.getStatus(400)
                })
            }
            academicYearUuid = JSON.parse(req.body.academicYear)?.uuid;
            schoolUuid = JSON.parse(req.body.school)?.uuid;
            gradeSubjectUuid = JSON.parse(req.body.gradeSubject)?.uuid;
            subjectChapterUuid = JSON.parse(req.body.subjectChapter)?.uuid;
            chapterTopicUuid = JSON.parse(req.body.chapterTopic)?.uuid;
            materialTypeUuid = JSON.parse(req.body.materialType)?.uuid;
            gradeId = JSON.parse(req.body.grade)?.id;
            uuid = createUuid.v1()
            isActive = 1
            createdOn =  new Date().toISOString().slice(0, 19).replace('T', ' ')
            authData = await commondb.selectToken(accessToken)
            createdById = authData[0].userId
            materialType = await db.getMaterialFileType(materialTypeUuid)
            materialType = materialType[0].file_type_ids
            let mimeTypes = await db.getMimeTypesFromFileTypes(materialType)
            mimeTypes.forEach(ele => {
                fileTypeIds.push(ele.mime_type)
            })
            let rejectedFiles = []
            curriculumFiles.forEach(ele => {
                if(!fileTypeIds.includes(ele.mimetype))
                {
                    rejectedFiles.push({fileName : ele.originalFilename})
                }
            })
            if(rejectedFiles.length > 0)
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : "Incorrect File Types",
                    "data" : {"rejectedFiles" : rejectedFiles},
                    "status_name" : getCode.getStatus(400)
                })
            }
            if(createdById)
            {
                let insertCurriculumMaster = await db.insertCurriculumMaster(uuid, academicYearUuid, schoolUuid, gradeId, gradeSubjectUuid, subjectChapterUuid, createdOn, createdById, chapterTopicUuid)
                if(insertCurriculumMaster.affectedRows > 0)
                {
                    curriculumId = insertCurriculumMaster.insertId;
                    let returnUuid = await db.getCurriculumMasterUuid(curriculumId)
                    if(curriculumFiles?.length > 0)
                    {
                        let uploadFileSize = []
                        Array.from(curriculumFiles).forEach((ele)=>
                        {
                            db.insertCurriculumUploads(uuid, curriculumId, materialTypeUuid, ele.originalFilename, isActive, createdOn, createdById).then(insertCurriculumUploads => {
                                if(insertCurriculumUploads)
                                {
                                    if(insertCurriculumUploads.affectedRows > 0)
                                    {
                                         db.getCurriculumUploadUuid(insertCurriculumUploads.insertId).then(uploadedUuid => {
                                            if(uploadedUuid)
                                            {
                                                if(uploadedUuid.length > 0)
                                                {
                                                     commonFunction.multiFileUpload(ele, getPath.getName('curriculum'), ele.originalFilename, uploadedUuid[0].uuid).then(upload =>
                                                    {
                                                        if(upload)
                                                        {
                                                            uploadFileSize.push({fileName : ele.originalFilename, uuid : uploadedUuid[0].uuid })
                                                            console.log(upload + " File uploaded successfully")
                                                            if(uploadFileSize.length == curriculumFiles?.length)
                                                            {
                                                                res.status(200)
                                                                return res.json({
                                                                    "status_code" : 200,
                                                                    "message" : "success",
                                                                    "data" : { "uuid" : returnUuid[0].uuid},
                                                                    "status_name" : getCode.getStatus(200)
                                                                })
                                                            }
                                                        }
                                                    })
                                                } 
                                            }
                                        })
                                    }
                                    else
                                    {
                                        db.deleteCurriculumUpload(curriculumId).then(res => {
                                            if(res)
                                            {
                                                uploadFileSize.forEach(ele => {

                                                    commonFunction.deleteUploadedFile(getPath.getName('curriculum'),ele.fileName,ele.uuid).then(deleteUploads => {
                                                        if(deleteUploads)
                                                        {
                                                            db.deleteCurriculumMaster(curriculumId).then(deleteCurriculumMaster => {
                                                                if(deleteCurriculumMaster.affectedRows > 0)
                                                                {
                                                                    res.status(200)
                                                                    return res.json({
                                                                        "status_code" : 200,
                                                                        "message" : `success`,
                                                                        "status_name" : getCode.getStatus(200)
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                        // delete uploaded file from table and uploads directory then delete curriculum master id.
                                    }
                                }
                            })
                        })
                    }
                }
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code" : 500,
                        "message" : "Curriculum master not created",
                        "status_name" : getCode.getStatus(500)
                    }) 
                }
            }
        });
        } 
        catch(e)
        {
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY')
            {
                let msg = e.sqlMessage.replace('_UNIQUE', '');
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : msg,
                    "status_name"     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }
            else
            {
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Curriculum master not created",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
        }
})