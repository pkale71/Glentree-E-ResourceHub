let db = require('./databaseQuerySchoolUserSetting')
let schoolUserSettingObj = require('../../models/schoolUserSettting')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let schoolUserSettings = new schoolUserSettingObj()
let schoolUserSetting;
let schoolUserSettingList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        schoolUserSetting = await db.getSchoolUserSetting()
        schoolUserSettingList = [];
        if(schoolUserSetting.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "data"          :   {'schoolUserSetting' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        await Array.from(schoolUserSetting).forEach(ele  =>  {
            schoolUserSettings.setDataAll(ele)
            schoolUserSettingList.push(schoolUserSettings.getDataAll())
        })

        if(schoolUserSetting.length == schoolUserSettingList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'schoolUserSetting' : schoolUserSettingList},
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
            "message"       :   "School user setting not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
