let db = require('./databaseQueryGradeSection')
let gradeSectionObj = require('../../models/gradeSection')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let sections = new gradeSectionObj()
let section;
let sectionList = [];
let academicId;
let schoolId;
let gradeCategoryId;
let gradeId;

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {   
        syllabusId = req.body.syllabus?.id
        gradeId = req.body.grade?.id
        sectionList = []
        let syllabus = await db.getSyllabus(syllabusId)
        if(syllabus.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Syllabus not found',
                status_name   : getCode.getStatus(404)
            })
        }
        let school = await db.getSchool(schoolId)
        if(school.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'School not found',
                status_name   : getCode.getStatus(404)
            })
        }
        if(gradeId){
            let grade = await db.getGrade(gradeId)
            if(grade.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            console.log("***")
            section = await db.getGradeSections(academicId,schoolId,gradeId);
            if(section.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade section not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            await Array.from(section).forEach(async(ele) => {
                sections.setGradeSection(ele)
                sectionList.push(sections.getGradeSection())
            })
            if(sectionList.length == section.length ){
                section[0]['gradeSection'] = sectionList
                sections.setDataAll(section[0])
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'gradeSection' : sections.getDataAll()},
                    "message"     : 'success',
                    status_name   : getCode.getStatus(200)
                })
            }
        }
        else if(!gradeId && gradeCategoryId){
            let gradeCategory = await db.getGradeCategory(gradeCategoryId)
            if(gradeCategory.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade Category not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            gradeId = await db.getGradeId(gradeCategoryId)
            if(gradeId.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade section not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            gradeId = gradeId[0].id
            let grade = await db.getGrade(gradeId)
            if(grade.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            console.log(gradeId,academicId,schoolId,gradeCategoryId)
            section = await db.getGradeSections(academicId,schoolId,gradeId);
            if(section.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade section not found',
                    status_name   : getCode.getStatus(404)
                })
            }
            await Array.from(section).forEach(async(ele) => {
                sections.setGradeSection(ele)
                sectionList.push(sections.getGradeSection())
            })
            if(sectionList.length == section.length ){
                section[0]['gradeSection'] = sectionList
                sections.setDataAll(section[0])
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'gradeSection' : sections.getDataAll()},
                    "message"     : 'success',
                    status_name   : getCode.getStatus(200)
                })
            }
        }
        else{
            res.status(400)
            return res.json({
                "status_code"   :   400,
                "message"       :   'Grade section not found',
                "status_name"   :   getCode.getStatus(400),
            }) 
        }
    } 
    catch(e)
    {
        console.log("ppppp")
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade section not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
