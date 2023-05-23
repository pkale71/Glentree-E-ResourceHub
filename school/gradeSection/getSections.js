 let db = require('./databaseQueryGradeSection')
 let commondb = require('../../common/commonDatabaseQuery')
let gradeSectionObj = require('../../models/gradeSection')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let sections = new gradeSectionObj()
let section;
let gradeSectionList = [];
let sectionList = [];
let copySectionList = [];
let academicUuid;
let schoolUuid;
let academicId;
let schoolId;
let gradeCategoryId;
let gradeCategoryList = []
let gradeId;
let gradeList = []
let list = []
let academic;
let school;
let authData;


module.exports = require('express').Router().get('/:acadmicUUID/:schoolUUID/:gradeId',async(req,res) =>  {
    try
    {  
        gradeId = req.params.gradeId
        academicUuid    = req.params.acadmicUUID
        schoolUuid      = req.params.schoolUUID
        accessToken     = req.body.accessToken
        sectionList         = []
        authData = await commondb.selectToken(accessToken)
        academic = await db.getAcademic(academicUuid)
        if(academic.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Academic year not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
        academicId = academic[0].id
        school = await db.getSchool(schoolUuid)
        if(school.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'School not found',
                "status_name"   : getCode.getStatus(404)
            })
        }
        schoolId = school[0].id
        if(gradeId){
            section = await db.getSections(academicId,schoolId,gradeId);
            if(section.length == 0)
            {
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "message"     : 'success',
                    "data"        : {'sections' : []},
                    "status_name"   : getCode.getStatus(200)
                })
            }
            Array.from(section).forEach(async(ele) => {
                sections.setGradeSection(ele)
                sectionList.push(sections.getGradeSection())
                if(sectionList.length == section.length )
                {
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'sections' : sectionList},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                }
            })
        }
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade section not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
