let    db = require('./databaseQueryChapterComplete')
let    errorCode = require('../../common/errorCode')
let    getCode = new errorCode()
let    uuid;
let    completedOn;


module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        if(!req.body.uuid){
            res.status(404);
            return res.json({
                "status_code": 404,
                "message": `Provide all values`,
                "status_name": getCode.getStatus(404)
            });
        }

        uuid = req.body.uuid
        let currentAcaYear = await db.checkCurrentAcademicYearUpdate(uuid)
        if(currentAcaYear[0]?.Exist == 0)
        {
            res.status(400);
                return res.json({
                    "status_code": 400,
                    "message": `Academic year completed`,
                    "status_name": getCode.getStatus(400)
                });
        }
        else
        {
            saveStatus = await db.deleteUserChapterCompleteStatus(uuid)
            if (saveStatus.affectedRows > 0) {
                
                res.status(200);
                return res.json({
                    "status_code":  200,
                    "message"   :   "success",
                    "status_name": getCode.getStatus(200)
                });
                }
                else{
                    res.status(500);
                    return res.json({
                        "status_code": 500,
                        "message": "Complete status not updated",
                        "status_name": getCode.getStatus(500)
                    });
                }  
        }
        
        } 
        catch(e)
        {
            console.log(e)
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
                    "status_code"   : 500,
                    "message"       : "Complete status not updated",
                    "status_name"   : getCode.getStatus(500),
                    "error"         : e.sqlMessage
                }) 
            }
           
        }

})
