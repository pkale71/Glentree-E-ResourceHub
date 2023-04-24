let db = require('./databaseQuerySchoolGradeCategory')
let schoolGradeCategoryObj = require('../../models/schoolGradeCategory')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let schoolGradeCategorys = new schoolGradeCategoryObj()
let schoolGradeCategory;
let schoolGradeCategoryList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        schoolGradeCategory = await db.getSchoolGradeCategory()
        schoolGradeCategoryList = [];
        if(schoolGradeCategory.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'schoolGradeCategory' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(schoolGradeCategory).forEach(ele  =>  {
            schoolGradeCategorys.setDataAll(ele)
            schoolGradeCategoryList.push(schoolGradeCategorys.getDataAll())
        })

        if(schoolGradeCategory.length == schoolGradeCategoryList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'schoolGradeCategory' : schoolGradeCategoryList},
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
            "message"       :   "School grade category not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
