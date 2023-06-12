let db = require('./databaseQueryCurriculum')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let commonFunction = require('../common/commonFunction')
let docPath = require('../DOC_FOLDER_PATH/docPath')
let getPath = new docPath()
let fileName;
let uploadUuid;

module.exports = require('express').Router().get('/:uploadUuid',async(req,res) =>  
{
    try
    {
        uploadUuid = req.params.uploadUuid 
        fileName = await db.getFileName(uploadUuid)
        if(fileName[0].fileName == null)
        {
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'File not found',
                "status_name"   : getCode.getStatus(404)
            })   
        }

        let file = await commonFunction.getFileUploaded(getPath.getName('curriculum'), fileName[0].fileName, uploadUuid)
       // res.sendFile(path.join(__dirname,"../",logoFile))
       res.status(200)
        return res.json({
            "status_code"   :   200,
            "message"       :   "success",
            "data"          :   {"logoFile" : file},
            "status_name"   :   getCode.getStatus(200)
        })
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
