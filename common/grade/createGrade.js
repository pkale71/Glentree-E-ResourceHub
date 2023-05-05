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
        name = req.body.name.trim();
        accessToken = req.body.accessToken;

        
        if(!req.body.gradeCategory){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade Category Missing",
             status_name : getCode.getStatus(404)
            })
        }
        gradeCategoryId = req.body.gradeCategory.id.trim();

               let insertGrade = await db.insertGrade(name, gradeCategoryId)
                       if(insertGrade.affectedRows > 0){
                            res.status(200)
                               return res.json({
                                   "status_code" : 200,
                                   "message" : "success",
                                   "data" : {"id" : insertGrade.insertId},
                                   status_name : getCode.getStatus(200)
                               })            
                       }
                       else{
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "Grade not created",
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
