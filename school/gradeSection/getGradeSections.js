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
let grades= []
let gradeList = []
let setSections = []
let finalList = []
let list = []
let academic;
let school;
let authData;


module.exports = require('express').Router().get('/:acadmicUUID/:schoolUUID/:gradeCategoryId/:gradeId?*',async(req,res) =>  {
    try
    {  
        gradeCategoryId = ''
        gradeId = ''
        if(req.params['0'].length > 0 &&  req.params['0'] != '/')
        {
            let a = req.params['0'].split('/')
            if(a.length > 1)
            {
                gradeCategoryId = req.params.gradeCategoryId + a[0]
                gradeId = a[1]
            }
            else if(a.length == 1) 
            {
                gradeCategoryId = req.params.gradeCategoryId + a[0]
                gradeId = 0
            }
        }
        else
        {
            gradeCategoryId = req.params.gradeCategoryId
            gradeId = req.params['gradeId']
        }
        academicUuid    = req.params.acadmicUUID
        schoolUuid      = req.params.schoolUUID
        // gradeCategoryId = req.params.gradeCategoryId
        // gradeId         = req.params['gradeId']
        accessToken     = req.body.accessToken

        if(gradeCategoryId.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Provide grade Category id',
                "status_name"   : getCode.getStatus(404)
            })
        }
        gradeSectionList    = []
        gradeCategoryList   = []
        sectionList         = []
        setSections         = []
        gradeList           = []
        grades              = []
        copySectionList     = []
        finalList           = []
        list                = []

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
        if(gradeId && gradeCategoryId){
            let grade = await db.getGrade(gradeId,gradeCategoryId)
            if(grade.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade not found',
                    "status_name"   : getCode.getStatus(404)
                })
            }
            section = await db.getGradeSections(academicId,schoolId,gradeId,gradeCategoryId,0);
            if(section.length == 0)
            {
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade section not found',
                    "status_name"   : getCode.getStatus(404)
                })
            }
            Array.from(section).forEach(async(ele) => {
                sections.setGradeSection(ele)
                gradeSectionList.push(sections.getGradeSection())
                if(gradeSectionList.length == section.length ){
                    
                    section[0]['gradeSection'] = gradeSectionList
                    sections.setData(section[0])
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'gradeSections' : sections.getData()},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
                }
            })
           
        }
        else if(!gradeId && gradeCategoryId){
            let gradeCategory = await db.getGradeCategory(gradeCategoryId)
            if(gradeCategory.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade Category not found',
                    'status_name'   : getCode.getStatus(404)
                })
            }
             await db.getGradeNotIn(academicId,schoolId,gradeCategoryId).then(gradeRes => {
                if(gradeRes)
                {
                    
                    let  l = []
                    db.getGradeSections(academicId,schoolId,0,gradeCategoryId,0).then((res1) => {
                    console.log("res1 " + res1.length)
                        if(res1.length > 0)
                        {
                            db.getGradeId(academicId,schoolId).then(gradeIn => {
                    console.log("gradeIn " + gradeIn.length)
                                if(gradeIn.length > 0)
                                {
                                    gradeIn.forEach((element,i) => {
                                        sectionList[i] = []
                                        for(let l = 0; l < res1.length; l++)
                                        {
                                            if(parseInt(element.grade_id) == parseInt(res1[l].grade_id))
                                            {
                                                sectionList[i].push(res1[l])
                                            }
                                        }                                        
                                    })
                        
                                    setSections = sectionList
                                    console.log("SEC = " + JSON.stringify(setSections))
                                    for(i=0;i<sectionList.length;i++)
                                    {
                                        //console.log("SEL-SEC = " + sectionList[i].length)
                                        Array.from(sectionList[i]).forEach((element) =>{
                                            sections.setGradeSection(element)
                                            list.push(sections.getGradeSection())
                                        })
                                        if(setSections[i].length > 0)
                                        {
                                            setSections[i][0]['sections']=list[0]?.uuid ? list : []
                                            list = [] 
                                            sections.setGrade( setSections[i][0])
                                            gradeList.push(sections.getGrade())
                                            gradeList.sort(function(a, b){return a.id-b.id})
                                            setSections[i][0]['grade']=gradeList
                                                
                                            sections.setGradeCategory( setSections[i][0])
                                            gradeCategoryList.push(sections.getGradeCategory())
                                                
                                            setSections[i][0]['gradeCategory']=gradeCategoryList
                                            
                                        
                                            sections.setDataAll( setSections[i][0])
                                            copySectionList.push(sections.getDataAll())
                                        
                                            setSections[i][0]['gradeCategory']=copySectionList
                                        }                                        
                                    }
                                    gradeRes.forEach(ele => {
                                        copySectionList[0]['gradeCategory']['grades'].push(
                                            {"id": ele.id, 
                                            "name" : ele.gradeName,
                                            "sections" : []
                                        })
                                    })
                                    res.status(200)
                                    return res.json({
                                        "status_code" : 200,
                                        "data"        : {'gradeSections' : copySectionList[0]},
                                        "message"     : "success",
                                        "status_name"   : getCode.getStatus(200)
                                    })                            
                                }
                                else if(grade.length == 0)
                                {
                                    res.status(200)
                                        return res.json({
                                            "status_code" : 200,
                                            "message"     : 'success',
                                            "data"        : {'gradeSections' : []},
                                            "status_name"   : getCode.getStatus(200)
                                        })
                                }

                            })
                        }
                        else
                        {
                            res.status(200)
                            return res.json({
                                "status_code" : 200,
                                "data"        : {'gradeSections' : []},
                                "message"     : "success",
                                "status_name"   : getCode.getStatus(200)
                            })
                        }
                    })
                }
            })
       
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
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Grade section not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
