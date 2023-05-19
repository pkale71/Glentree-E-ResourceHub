let    db = require('./databaseQueryGrade')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    name;
let    gradeCategoryId

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        name = req.body.name?.trim();
        accessToken = req.body.accessToken;
        if(!req.body.gradeCategory)
        {
            res.status(400)
            return res.json({
             "status_code" : 400,
             "message"     : "Grade Category not given",
             "status_name" : getCode.getStatus(400)
            })
        }
        gradeCategoryId = req.body.gradeCategory.id;
        let checkGradeExist = await db.checkGradeExist(name,gradeCategoryId)
        if(checkGradeExist[0].Exist > 0)
        {
            res.status(400)
            return res.json({
             "status_code" : 400,
             "message"     : "Grade already exist",
             "status_name" : getCode.getStatus(400)
            })
        }

       
        
        let insertGrade = await db.insertGrade(name, gradeCategoryId)
        if(insertGrade.affectedRows > 0)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : "success",
                "data"        : { "id" : insertGrade.insertId },
                "status_name" : getCode.getStatus(200)
            })            
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : "Grade not created",
                "status_name"   : getCode.getStatus(500)
            }) 
        }
    } 
    catch(e)
    {
        if(e.code == 'ER_DUP_ENTRY')
        {
            let msg = e.sqlMessage.replace('_UNIQUE', '');
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : msg,
                "status_name"   : getCode.getStatus(500),
                "error"         : msg
            }) 
        }
        else
        {
            res.status(500)
            return res.json({
                "status_code"   : 500,
                "message"       : "Grade not created",
                "status_name"   : getCode.getStatus(500),
                "error"         : e.sqlMessage
            }) 
        }   
    }

})
