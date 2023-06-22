let db = require('./databaseQueryCurriculum')
let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let uuid;
let status;
let accessToken;
let userId;

module.exports = require('express').Router().post('/',async(req,res) =>  {
    try
    {
        uuid = req.body.uuid;
        status = req.body.status;
        accessToken = req.body.accessToken;
        authData = await commondb.selectToken(accessToken)
        userId = authData[0].userId
        let checkStatus = await db.checkStatus(uuid);
        
        if(status == 'Verified')
        {
            if(checkStatus[0].is_active == 1 && checkStatus[0].is_rejected == null && checkStatus[0].uploaded_on != null && checkStatus[0].is_verified == null)
            {
                let sql = `UPDATE curriculum_upload SET is_verified = 1, verified_on = ?, verified_by_id = ${userId} where uuid = '${uuid}'`

                let changeStatus = await db.changeStatus(sql, new Date())

                if(changeStatus.affectedRows > 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code"   :   500,
                        "message"       :   "Status not changed",
                        "status_name"   :   getCode.getStatus(500)
                    })   
                }

            }
            else if(checkStatus[0].is_active == 1 &&  checkStatus[0].is_verified != null)
            {
                res.status(400)
                return res.json({
                    "status_code"   :   400,
                    "message"       :   'Already Verified',
                    "status_name"   :   getCode.getStatus(404),
                })
            }
        }
        else if(status == 'Published')
        {
            if(checkStatus[0].is_active == 1 && checkStatus[0].is_rejected == null  && checkStatus[0].uploaded_on != null && checkStatus[0].is_verified != null && checkStatus[0].is_published == null)
            {
                let sql = `UPDATE curriculum_upload SET is_published = 1, published_on = ?, published_by_id = ${userId} where uuid = '${uuid}'`

                let changeStatus = await db.changeStatus(sql, new Date())

                if(changeStatus.affectedRows > 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code"   :   500,
                        "message"       :   "Status not changed",
                        "status_name"   :   getCode.getStatus(500)
                    })   
                }
            }
            else if(checkStatus[0].is_active == 1 && checkStatus[0].is_published != null)
            {
                res.status(400)
                return res.json({
                    "status_code"   :   400,
                    "message"       :   'Already Published',
                    "status_name"   :   getCode.getStatus(404),
                })
            }
        }
        else if(status == 'Rejected')
        {
            if(checkStatus[0].is_active == 1 && checkStatus[0].is_rejected == null)
            {
                let sql = `UPDATE curriculum_upload SET is_rejected = 1, rejected_on = ?, rejected_by_id = ${userId} where uuid = '${uuid}'`

                let changeStatus = await db.changeStatus(sql, new Date())

                if(changeStatus.affectedRows > 0){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
                else
                {
                    res.status(500)
                    return res.json({
                        "status_code"   :   500,
                        "message"       :   "Status not changed",
                        "status_name"   :   getCode.getStatus(500)
                    })   
                }

            }
            else if(checkStatus[0].is_active == 0 && checkStatus[0].is_rejected != null)
            {
                res.status(400)
                return res.json({
                    "status_code"   :   400,
                    "message"       :   'Already Rejected',
                    "status_name"   :   getCode.getStatus(404),
                })
            }
        }
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
