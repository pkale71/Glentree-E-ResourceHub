 let db = require('./databaseQueryCurriculum')
 let commondb = require('../common/commonDatabaseQuery')
let curriculumObj = require('../models/curriculumUpload')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let curriculum = new curriculumObj()
let acadmicUUID;
let gradeId;
let subjectUuid;
let chapterUuid;
let topicUuid;
let schoolUuid;
let status = '';
let curriculums;
let curriculumList = []
let gradeIds;
let subjectIds;
let sectionIds;


module.exports = require('express').Router().get('/:acadmicUUID/:schoolUuid/:gradeId/:subjectUuid/:chapterUuid/:topicUuid/:status',async(req,res) =>  {
    try
    {  
       // /getCurriculumUploads/{academicYearUUID}/{schoolUuid}/{gradeId}/{subjectUUID}/{chapterUUID}/{topicUUID}/{status}
       // console.log(req.params)
        acadmicUUID = ''
        subjectUuid = ''
        chapterUuid = ''
        topicUuid = ''
        gradeId = ''
        status = ''
        schoolUuid = ''
        curriculumList = []
        // if(req.params['0'].length > 0 &&  req.params['0'] != '/')
        // {
        //     let a = req.params['0'].split('/')
        //     if(a.length >= 6)
        //     {
        //         schoolUuid = req.params.schoolUuid + a[0]
        //         gradeId = a[1]
        //         subjectUuid = a[2]
        //         chapterUuid = a[3]
        //         topicUuid = a[4]
        //         status = a[5]
        //     }
        //     // else if(a.length == 5) 
        //     // {
        //     //     schoolUuid = req.params.schoolUuid + a[0]
        //     //     gradeId = a[1]
        //     //     subjectUuid = a[2]
        //     //     chapterUuid = a[3]
        //     //     status = 
        //     //     topicUuid = 0
        //     // }
        //     // else if(a.length == 4) 
        //     // {
        //     //     schoolUuid = req.params.schoolUuid + a[0]
        //     //     gradeId = a[1]
        //     //     subjectUuid = a[2]
        //     //     status = a[3]
        //     //     chapterUuid = 0
        //     //     topicUuid = 0
        //     // }
        //     // else if(a.length == 3) 
        //     // {
        //     //     schoolUuid = req.params.schoolUuid + a[0]
        //     //     gradeId = a[1]
        //     //     subjectUuid = 0
        //     //     status = a[2]
        //     //     chapterUuid = 0
        //     //     topicUuid = 0
        //     // }
        //     // else if(a.length == 2) 
        //     // {
        //     //     schoolUuid = req.params.schoolUuid + a[0]
        //     //     status = a[1]
        //     //     gradeId = 0
        //     //     subjectUuid = 0
        //     //     chapterUuid = 0
        //     //     topicUuid = 0
        //     // }
        //     // else if(a.length == 1) 
        //     // {
        //     //     schoolUuid = req.params.schoolUuid + a[0]
        //     //     gradeId = 0
        //     //     subjectUuid = 0
        //     //     chapterUuid = 0
        //     //     topicUuid = 0
        //     // }
        // }
        // else
        // {
        //     acadmicUUID = req.params.acadmicUUID
        //     schoolUuid = req.params.schoolUuid
        //     gradeId = req.params['gradeId']
        //     subjectUuid = 0
        //     chapterUuid = 0
        //     topicUuid = 0
        //     gradeId = 0
        // }
        schoolUuid = req.params.schoolUuid.trim()
        gradeId = req.params.gradeId
        subjectUuid = req.params.subjectUuid.trim()
        chapterUuid = req.params.chapterUuid.trim()
        topicUuid = req.params.topicUuid.trim()
        status = req.params.status.trim()
        gradeIds = 0
        subjectIds = 0
        sectionIds = 0
        acadmicUUID = req.params.acadmicUUID.trim()
        accessToken     = req.body.accessToken
        authData = await commondb.selectToken(accessToken)
       // console.log(authData)
       if(!acadmicUUID || acadmicUUID.trim().length < 6  || !schoolUuid || schoolUuid.trim().length < 6 || !status || status?.trim().length < 4)
       {
           res.status(400)
           return res.json({
               "status_code" : 400,
               "message" : "Provide valid value",
               "status_name" : getCode.getStatus(400)
           })   
       }
        let userCode = await db.getUserCode(authData[0].userId)

        if(userCode[0].userTypeCode == 'SCHCD'  && gradeId == 0)
        {
            gradeIds = await db.getUserGrade(authData[0].userId)
           // console.log(gradeIds)
            let ids = []
            gradeIds.forEach(ele => {
                ids.push(ele.grade_id)
            })
            gradeIds = ids.toString()  
        }
        if(userCode[0].userTypeCode == 'SUBHD'  && (subjectUuid == 0 || subjectUuid?.length == 0 || !subjectUuid))
        {
            subjectIds = await db.getUserSubject(authData[0].userId)
            let ids = []
            subjectIds.forEach(ele => {
                ids.push(ele.subject_id)
            })
            subjectIds = ids.toString()
        }
        if(userCode[0].userTypeCode == 'TECHR')
        {
            sectionIds = await db.getUserSection(authData[0].userId)
            let ids = []
            sectionIds.forEach(ele => {
                ids.push(ele.section_id)
            })
            sectionIds = ids.toString()
        }
        // console.log(acadmicUUID,schoolUuid,gradeId,subjectUuid,chapterUuid,topicUuid,status,userCode[0].userTypeCode)
        
        curriculums = await db.getCurriculumUploads(acadmicUUID, gradeId, subjectUuid, chapterUuid, topicUuid, schoolUuid, gradeIds, subjectIds, sectionIds)
        if(curriculums.length == 0)
        {
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "data"        : {"curriculumUploads" : []},
                "status_name"   : getCode.getStatus(200)
            })
        }
        else
        {
            if(status?.length > 0)
            {
                let filterArr = curriculums.filter(ele => ele.Status == status)
                curriculums = filterArr
            }
            curriculums.forEach(element => {
                curriculum.setDataAll(element)
                curriculumList.push(curriculum.getDataAll())
            });
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "data"        : {"curriculumUploads" : curriculumList},
                "status_name"   : getCode.getStatus(200)
            })
        }
    } 
    catch(e)
    {
        console.log(e)
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Curriculum Upload not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
