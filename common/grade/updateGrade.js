let    db = require('./databaseQueryGrade')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    name;
let    gradeCategoryId
let    id


module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        name = req.body.name?.trim();
        accessToken = req.body.accessToken;
        if(!req.body.id ){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade not given",
             "status_name" : getCode.getStatus(404)
            })
        }
        id = req.body.id
        gradeCategoryId = req.body.gradeCategory.id;
        let check = await db.checkGradeUsed(id)
        if(!check[0].Exist && !check[0].isExist)
        {
            let checkGradeExist = await db.checkGradeExist(name,gradeCategoryId,id)
        if(checkGradeExist[0].Exist > 0)
        {
            res.status(400)
            return res.json({
             "status_code" : 400,
             "message"     : "Grade already exist",
             "status_name" : getCode.getStatus(400)
            })
        }
            let updateGrade = await db.updateGrade(id,name, gradeCategoryId)
            if(updateGrade.affectedRows > 0){
                 res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message" : "success",
                        "status_name" : getCode.getStatus(200)
                    })            
            }
            else{
             res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade not updated",
                    "status_name" : getCode.getStatus(500)
                }) 
            }
        }
        else
        {
            res.status(400)
               return res.json({
                   "status_code" : 400,
                   "message" : "Grade is already in use.",
                   "status_name" : getCode.getStatus(400)
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
                    "status_name"     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }
            else
            {
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade not created",
                    "status_name" : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
