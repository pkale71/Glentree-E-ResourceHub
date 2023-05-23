let db = require('./databaseQueryReportCompleteStatus')
let reportObj = require('../models/reportCompleteChapterStatus')
const commonFunction = require("../common/commonFunction")
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let report = new reportObj()
let reports;
let gradeId;
let acaUuid;
let subjectUuid;
let chapterUuid;
let completeStatuses = []
let reportCompleteChapterStatus = []

module.exports = require('express').Router().get('/:acaUuid/:gradeId/:subjectUuid/:chapterUuid?*',async(req,res) =>  
{
    try
    {   
        reportCompleteChapterStatus = []
        completeStatuses = []
        if(req.params['0'].length > 0 &&  req.params['0'] != '/')
        {
            let a = req.params['0'].split('/')
            if(a.length > 1)
            {
                subjectUuid = req.params.subjectUuid + a[0]
                chapterUuid = a[1]
            }
            else if(a.length == 1) 
            {
                subjectUuid = req.params.subjectUuid + a[0]
                chapterUuid = 0
            }
        }
        else
        {
            subjectUuid = req.params.subjectUuid
            chapterUuid = req.params['chapterUuid']
        }
        acaUuid = req.params.acaUuid
        gradeId = req.params.gradeId
        if(chapterUuid)
        {
            reports   = await db.getChapterCompleteStatuses(acaUuid,gradeId,subjectUuid,chapterUuid)
            if(reports.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "message"       :   'success',
                    "data"          :   {"reportUserChapterCompleteStatuses" : []},
                    "status_name"   :   getCode.getStatus(200),
                })   
            }
            else
            {
                reports.forEach((element) => {
                    report.setCompleteStatus(element)
                    completeStatuses.push(report.getCompleteStatus())
                });
                reports.forEach(ele => {
                    delete ele.uuid
                    delete ele.sectionUuid
                    delete ele.section
                    delete ele.userUuid
                    delete ele.fullName
                    delete ele.is_completed
                    delete ele.completed_on
                    ele['completeStatuses'] = []
                    completeStatuses.forEach(element => {
                        if(element.id == ele.id && element.chapterId == ele.chapterId)
                        {
                            ele['completeStatuses'].push(element)
                        }
                    })
                })
                reports = commonFunction.getUniqueData(reports)
                console.log(reports.length)
                reports.forEach(ele => {
                    ele.completeStatuses.forEach(e => {
                        delete e.id
                        delete chapterId
                    })
                    report.setDataAll(ele)
                    reportCompleteChapterStatus.push(report.getDataAll())
                })
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "message"       :   'success',
                    "data"          :   {"reportUserChapterCompleteStatuses" : reportCompleteChapterStatus},
                    "status_name"   :   getCode.getStatus(200),
                }) 
            }
        }
        else
        {
            reports   = await db.getChapterCompleteStatuses(acaUuid,gradeId,subjectUuid,chapterUuid)
            if(reports.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "message"       :   'success',
                    "data"          :   {"reportUserChapterCompleteStatuses" : []},
                    "status_name"   :   getCode.getStatus(200),
                })   
            }
            else
            {
                reports.forEach((element) => {
                    report.setCompleteStatus(element)
                    completeStatuses.push(report.getCompleteStatus())
                });
                reports.forEach(ele => {
                    delete ele.uuid
                    delete ele.sectionUuid
                    delete ele.section
                    delete ele.userUuid
                    delete ele.fullName
                    delete ele.is_completed
                    delete ele.completed_on
                    ele['completeStatuses'] = []
                    completeStatuses.forEach(element => {
                        if(element.id == ele.id && element.chapterId == ele.chapterId)
                        {
                            ele['completeStatuses'].push(element)
                        }
                    })
                })
                reports = commonFunction.getUniqueData(reports)
                console.log(reports.length)
                reports.forEach(ele => {
                    ele.completeStatuses.forEach(e => {
                        delete e.id
                        delete chapterId
                    })
                    report.setDataAll(ele)
                    reportCompleteChapterStatus.push(report.getDataAll())
                })
                res.status(200)
                return res.json({
                    "status_code"   :   200,
                    "message"       :   'success',
                    "data"          :   {"reportUserChapterCompleteStatuses" : reports},
                    "status_name"   :   getCode.getStatus(200),
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
            "message"       :   "Grade not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})

// function remove(value)
// {
//     let a = []
//     value.forEach(ele => {
//         console.log(a.includes(ele))
//         if(a.indexOf(ele) == -1)
//         {
//             a.push(ele)
//         }
//     })

//     let newArray = [];
//             let uniqueObject = {};
//             for (let i in value) {
//                 objTitle = value[i];
//                 obj = value[i];
//                 uniqueObject[objTitle] = value[i];
//             }
//             for (i in uniqueObject) {
//                 newArray.push(uniqueObject[i]);
//             }
//             console.log(newArray.length)
//             return newArray
// }