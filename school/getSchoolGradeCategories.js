let db = require('./databaseQuerySchool')
let gradeCategoryObj = require('../models/gradeCategory')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let gradeCategories = new gradeCategoryObj()
let gradeCategory;
let gradeCategoryList = [];
let uuid;

module.exports = require('express').Router().get('/:uuid',async(req,res) =>  {
    try
    {
        uuid = req.params.uuid
        gradeCategory = await db.getGradeCategory(uuid)
        gradeCategoryList = [];
        if(gradeCategory.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'gradeCategories' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(gradeCategory).forEach(ele  =>  {
            gradeCategories.setDataAll(ele)
            gradeCategoryList.push(gradeCategories.getDataAll())
        })

        if(gradeCategory.length == gradeCategoryList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'gradeCategories' : gradeCategoryList},
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade Category not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
