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
            db.getFileTypes(element.file_type_ids).then(res1 =>
            {
                if(res1)
                {
                    res1.forEach(ele => {
                        materialType.setFileType(ele)
                        fileTypesList.push(materialType.getFileType())
                    })
                    element['fileTypes'] = fileTypesList
                    fileTypesList = []
                    materialType.setDataAll(element)
                    materialTypeList.push(materialType.getDataAll())
                    if(materialTypes.length == materialTypeList.length)
                    {
                        materialTypeList.sort(function (a, b) {
                            if (a.name < b.name) {
                              return -1;
                            }
                            if (a.name > b.name) {
                              return 1;
                            }
                            return 0;
                          });
                        res.status(200)
                        return res.json({
                            "status_code" : 200,
                            "data"        : {'materialTypes' : materialTypeList},
                            "message"     : 'success',
                            "status_name"   : getCode.getStatus(200)
                        })
                    } 
                }
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
