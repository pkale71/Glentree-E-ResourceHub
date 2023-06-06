let db = require('./databaseQueryMaterialType')
let fileTypeObj = require('../../models/materialType')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let fileType = new fileTypeObj()
let fileTypes;
let fileTypesList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        fileTypes = await db.getAllFileTypes()
        if(fileTypes.length == 0)
        {
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'fileTypes' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        fileTypesList = []
              
        Array.from(fileTypes).forEach(element  => 
        {
            fileType.setFileType(element)
            fileTypesList.push(fileType.getFileType())
        }) 
        if(fileTypes.length == fileTypesList.length)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'fileTypes' : fileTypesList},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        }
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "File Types not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
