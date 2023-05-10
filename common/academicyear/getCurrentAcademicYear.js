let db = require('./databaseQueryAcademicYear')
let academicYearObj = require('../../models/academicYear')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let academicYears = new academicYearObj()
let academicYear;
let uuid;

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        
        academicYear = await db.getCurrentAcademicYears()

        if(academicYear.length == 0)
        {
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Current academic year not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        academicYears.setDataAll(academicYear[0])
        res.status(200)
        return res.json({
            "status_code" : 200,
            "data"        : {'currentAcademicYear' : academicYears.getDataAll()},
            "message"     : 'success',
            "status_name"   : getCode.getStatus(200)
        })
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Current academic year not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})