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
        name = req.body.name;
        accessToken = req.body.accessToken;
        if(!req.body.id ){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade id Missing",
             status_name : getCode.getStatus(404)
            })
        }
        id = req.body.id
        gradeCategoryId = req.body.gradeCategory.id;
        let check = await db.selectUsedGrade(id)
        let checkSection = await db.selectUsedGradeSection(id)
        if(!check[0].Exist && !checkSection[0].Exist){
            let updateGrade = await db.updateGrade(id,name, gradeCategoryId)
            if(updateGrade.affectedRows > 0){
                 res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message" : "success",
                        status_name : getCode.getStatus(200)
                    })            
            }
            else{
             res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade not updated",
                    status_name : getCode.getStatus(500)
                }) 
            }
        }
        else{
            res.status(500)
               return res.json({
                   "status_code" : 500,
                   "message" : "Grade is already in use.",
                   status_name : getCode.getStatus(500)
               }) 
           }     
           
        
        } catch(e){
            console.log(e)
            
            if(e.code == 'ER_DUP_ENTRY'){
                let msg = e.sqlMessage.replace('_UNIQUE', '');
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : msg,
                    status_name     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Grade not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
