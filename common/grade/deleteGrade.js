let    db = require('./databaseQueryGrade')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    name;
let    gradeCategoryId
let    id


module.exports = require('express').Router().get('/:id',async(req,res) =>
{
    try
    {
        if(!req.params.id ){
            res.status(404)
            return res.json({
             "status_code" : 404,
             "message" : "Grade id Missing",
             status_name : getCode.getStatus(404)
            })
        }
        id = req.params.id
        let check = await db.selectUsedGrade(id)
        if(!check[0].Exist){
            let deleteGrade = await db.deleteGrade(id)
            if(deleteGrade.affectedRows > 0){
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
                    "message" : "Grade not deleted",
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
                    "message" : "Grade not deleted",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
