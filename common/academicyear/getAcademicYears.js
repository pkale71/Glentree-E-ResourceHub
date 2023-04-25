let db = require('./databaseQueryAcademicYear')
let academicYearObj = require('../../models/academicYear')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let academicYears = new academicYearObj()
let academicYear;
let academicYearList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        academicYear = await db.getAcademicYears()
        academicYearList = [];
        if(academicYear.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'academicYears' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(academicYear).forEach(ele  =>  {
            console.log(ele)
            academicYears.setDataAll(ele)
            academicYearList.push(academicYears.getDataAll())
        })

        if(academicYear.length == academicYearList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'academicYears' : academicYearList},
                "message"     : 'success',
                status_name   : getCode.getStatus(200)
            })
        } 
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
