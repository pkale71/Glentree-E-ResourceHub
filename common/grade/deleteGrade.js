let    db = require('./databaseQueryGrade')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    id

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        id = req.body.id
        if(!id)
        {
            res.status(404)
            return res.json({
             "status_code"  : 404,
             "message"      : "Grade not given",
             "status_name"  : getCode.getStatus(404)
            })
        }        
        let check = await db.checkGradeUsed(id)
        if(!check[0].Exist && !check[0].isExist)
        {
            let deleteGrade = await db.deleteGrade(id)
            if(deleteGrade.affectedRows > 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   : 200,
                    "message"       : "success",
                    "status_name"   : getCode.getStatus(200)
                })            
            }
            else
            {
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : "Grade not deleted",
                    "status_name"   : getCode.getStatus(500)
                }) 
            }
        }
        else
        {
            res.status(400)
            return res.json({
                "status_code"   : 400,
                "message"       : "Grade is already in use.",
                "status_name"   : getCode.getStatus(400)
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
                    "message"       : "Grade not deleted",
                    "status_name"   : getCode.getStatus(500),
                    "error"         : e.sqlMessage
                }) 
            }
           
        }

})
