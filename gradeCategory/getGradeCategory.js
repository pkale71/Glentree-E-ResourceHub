let db = require('./databaseQueryGradeCategory')
let gradeCategoryObj = require('../models/gradeCategory')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let gradeCategories = new gradeCategoryObj()
let gradeCategory;
let gradeCategoryList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        gradeCategory = await db.getGradeCategory()
        gradeCategoryList = [];
        if(gradeCategory.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "data"          :   {'gradeCategory' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(404),
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
                "data"        : {'gradeCategory' : gradeCategoryList},
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
            "message"       :   "Grade Category not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})