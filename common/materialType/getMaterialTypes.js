let db = require('./databaseQueryMaterialType')
let materialTypeObj = require('../../models/materialType')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let materialType = new materialTypeObj()
let materialTypes;
let fileTypesList = [];
let materialTypeList = [];
let fileTypeIds;

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        materialTypes = await db.getMaterialTypes(0)
        if(materialTypes.length == 0)
        {
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'materialTypes' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        materialTypeList = [];
        fileTypesList = []
              
        Array.from(materialTypes).forEach(element  =>  {
            fileTypeIds = element.file_type_ids.split(",")
            fileTypeIds.forEach((ele) => 
            {
                db.getFileTypes(ele).then(res1 =>
                {
                    if(res1)
                    {
                        materialType.setFileType(res1[0])
                        fileTypesList.push(materialType.getFileType())
                        if(fileTypeIds.length == fileTypesList.length)
                        {
                            element['fileTypes'] = fileTypesList
                            fileTypesList = []
                            materialType.setDataAll(element)
                            materialTypeList.push(materialType.getDataAll())
                            if(materialTypes.length == materialTypeList.length)
                            {
                                res.status(200)
                                return res.json({
                                    "status_code" : 200,
                                    "data"        : {'materialTypes' : materialTypeList},
                                    "message"     : 'success',
                                    "status_name"   : getCode.getStatus(200)
                                })
                            }
                        }
                    }
                })
            })
        }) 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Material Types not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
