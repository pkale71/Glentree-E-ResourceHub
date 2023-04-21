let db = require('./databaseQuerySchool')
let schoolObj = require('../models/school')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let schools = new schoolObj()
let school;
let schoolList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        school = await db.getAllSchools()
        schoolList = [];
        if(school.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   404,
                "data"          :   {'school' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        await Array.from(school).forEach(ele  =>  {
            schools.setData(ele)
            schoolList.push(schools.getData())
        })

        if(school.length == schoolList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'school' : schoolList},
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
            "message"       :   "School not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
