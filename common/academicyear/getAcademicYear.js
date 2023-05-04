let db = require('./databaseQueryAcademicYear')
let academicYearObj = require('../../models/academicYear')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let academicYears = new academicYearObj()
let academicYear;
let academicYearList = [];

module.exports = require('express').Router().get('/:uuid',async(req,res) =>  {
    try
    {
        if(!req.params.uuid){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message" : "Missing values",
                status_name : getCode.getStatus(404)
            })
        }
        uuid = req.params.uuid
        academicYear = await db.getAcademicYears(uuid,0)

        if(academicYear.length == 0){
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
                status_name   : getCode.getStatus(200)
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
