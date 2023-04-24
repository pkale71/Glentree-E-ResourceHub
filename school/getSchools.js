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
                "status_code"   :   200,
                "data"          :   {'schools' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(school).forEach(async( ele ) =>  {
            let curriculumcheck = await db.getSchoolCurriculumSearch(ele.id)
            let userCheck = await db.getSchoolUserSearch(ele.id)
            ele['isExist'] = (curriculumcheck.length == 0 && userCheck.length == 0) ? 0 :1
            schools.setDataAll(ele)
            console.log(schools.getDataAll())
            schoolList.push(schools.getDataAll())

            if(school.length == schoolList.length){
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'schools' : schoolList},
                    "message"     : 'success',
                    status_name   : getCode.getStatus(200)
                })
            } 
        })

        
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
