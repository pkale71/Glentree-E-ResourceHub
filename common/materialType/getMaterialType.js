let db = require('./databaseQueryMaterialType')
let errorCode = require('../errorCode')
const materialTypeObj = require('../../models/materialType')
let getCode = new errorCode()
let materialType = new materialTypeObj()
let materialTypes;
let fileTypeIds;
let fileTypes = []
let uuid;

module.exports = require('express').Router().get('/:uuid',async(req,res) =>  {
    try
    {
        if(!req.params.uuid)
        {
            res.status(400)
            return res.json({
                "status_code" : 400,
                "message"     : "Provide all values",
                "status_name"   : getCode.getStatus(400)
            })
        }        
        uuid = req.params.uuid
        fileTypes = []
        materialTypes = await db.getMaterialTypes(uuid)
        if(materialTypes.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Material Type not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        fileTypeIds = materialTypes[0].file_type_ids.split(",")
        fileTypeIds.forEach((element) => {
            db.getFileTypes(element).then(res1 => {
                if(res1)
                {
                    materialType.setFileType(res1[0])
                    fileTypes.push(materialType.getFileType())
                    if(fileTypes.length == fileTypeIds.length)
                    {
                        materialTypes[0]['fileTypes'] = fileTypes
                        materialType.setDataAll(materialTypes[0])
                        res.status(200)
                        return res.json({
                            "status_code" : 200,
                            "data"        : {'materialType' : materialType.getDataAll()},
                            "message"     : 'success',
                            "status_name"   : getCode.getStatus(200)
                        })
                    }
                }
            })
        });
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Material Type not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })
    }
})