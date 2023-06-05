let db = require('./databaseQueryAcademicYear')
let errorCode = require('../errorCode')
const materialTypeObj = require('../../models/materialType')
let getCode = new errorCode()
let materialType = new materialTypeObj()
let materialTypes;
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
        materialType = await db.getMaterialTypes(uuid,0)

        if(academicYear.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Academic year not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        academicYears.setDataAll(academicYear[0])
        res.status(200)
        return res.json({
            "status_code" : 200,
            "data"        : {'academicYear' : academicYears.getDataAll()},
            "message"     : 'success',
            "status_name"   : getCode.getStatus(200)
        })
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Academic year not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})