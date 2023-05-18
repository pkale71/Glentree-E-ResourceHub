let db = require('./databaseQueryChapterComplete')
let completeObj = require('../../models/chapterCompleteStatus')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let completeChapterStatus = new completeObj()
let chapterStatus;
let completeChapterStatusList = [];
let acaUuid;
let userUuid;
let gradeId;
let subjectUuid;
let sectionUuid;
let chapterUuid;

module.exports = require('express').Router().get('/:acaUuid/:userUuid/:gradeId/:subjectUuid/:sectionUuid/:chapterUuid?*',async(req,res) =>  {
    try
    {
        if(req.params['0'].length > 0)
        {
            let a = req.params['0'].split('/')
            if(a.length > 1)
            {
                sectionUuid = req.params.sectionUuid + a[0]
                chapterUuid = a[1]
            }
            else if(a.length == 1) 
            {
                sectionUuid = req.params.sectionUuid + a[0]
                chapterUuid = 0
            }
        }
        else
        {
            sectionUuid = req.params.sectionUuid
            chapterUuid = req.params.chapterUuid
        }
         console.log(req.params)
        acaUuid = req.params.acaUuid
        userUuid = req.params.userUuid
        gradeId = req.params.gradeId
        subjectUuid = req.params.subjectUuid
        // sectionUuid = req.params.sectionUuid
        // chapterUuid = req.params.chapterUuid
        console.log(sectionUuid,chapterUuid)


        if(chapterUuid)
        {
            chapterStatus = await db.checkCurrentAcademicYearUpdate(acaUuid,userUuid,gradeId,subjectUuid,sectionUuid,chapterUuid)

            completeChapterStatusList = [];
            if(chapterStatus.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "data"          :   {'userChapterConpleteStatuses' : [] },
                    "message"       :   'success',
                    "status_name"   :   getCode.getStatus(200),
                })   
            }
            Array.from(chapterStatus).forEach(async(ele)  =>  
            {
                completeChapterStatus.setDataAll(ele)
                completeChapterStatusList.push(completeChapterStatus.getDataAll())
                if(chapterStatus.length == completeChapterStatusList.length)
                {
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'userChapterConpleteStatuses' : completeChapterStatusList},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
            })
        }
        else
        {
           
        chapterStatus = await db.checkCurrentAcademicYearUpdate(acaUuid,userUuid,gradeId,subjectUuid,sectionUuid,chapterUuid)

            completeChapterStatusList = [];
            if(chapterStatus.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "data"          :   {'userChapterConpleteStatuses' : [] },
                    "message"       :   'success',
                    "status_name"   :   getCode.getStatus(200),
                })   
            }
            Array.from(chapterStatus).forEach(async(ele)  =>  
            {
                completeChapterStatus.setDataAll(ele)
                completeChapterStatusList.push(completeChapterStatus.getDataAll())
                if(chapterStatus.length == completeChapterStatusList.length)
                {
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'userChapterConpleteStatuses' : completeChapterStatusList},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                } 
            })
        }
        

      
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "User chapter complete status not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
