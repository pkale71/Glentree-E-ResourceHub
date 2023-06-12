let db = require('./databaseQueryCurriculum')
let formidable = require('formidable');
let errorCode = require('../common/errorCode');
let getCode = new errorCode()
let fileObject;
let originalFilename;
let fileSizes
let materialTypeUuid
let curriculumFiles = []
let fileTypeIds = []
let materialType

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
            if(!JSON.parse(req.body.materialType) ||!JSON.parse(req.body.materialType)?.uuid  )
            {
                res.status(400)
                return res.json({
                    "status_code" : 400,
                    "message" : "Provide all values",
                    "status_name" : getCode.getStatus(400)
                })
            }
            materialTypeUuid = JSON.parse(req.body.materialType)?.uuid;
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
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message" : "success",
                    "data" : {"rejectedFiles" : rejectedFiles},
                    "status_name" : getCode.getStatus(200)
                })
            }
            else
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message" : "success",
                    "data" : {"rejectedFiles" : []},
                    "status_name" : getCode.getStatus(200)
                })
            }
        });
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   : 500,
            "message"       : msg,
            "status_name"     : getCode.getStatus(500),
            "error"         : e
        }) 
    }
})