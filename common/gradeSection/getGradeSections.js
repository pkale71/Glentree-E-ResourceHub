 let db = require('./databaseQueryGradeSection')
let gradeSectionObj = require('../../models/gradeSection')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let sections = new gradeSectionObj()
let section;
let gradeSectionList = [];
let sectionList = [];
let copySectionList = [];
let academicId;
let schoolId;
let gradeCategoryId;
let gradeCategoryList = []
let gradeId;
let gradeList = []
let setSections = []
let list = []
let gradeIdList = []



module.exports = require('express').Router().get('/:acadmicId/:schoolId/:gradeCategoryId?*',async(req,res) =>  {
    try
    {  
        academicId = req.params.acadmicId
        schoolId = req.params.schoolId
        gradeCategoryId = req.params['gradeCategoryId']
        gradeId = req.params['0']
        gradeId = gradeId.split('/')
        if(gradeId.length > 2){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Wrong url',
                status_name   : getCode.getStatus(404)
            })
        }
        gradeId = gradeId[1]
       // console.log((!gradeId && gradeCategoryId && schoolId))
        gradeSectionList = []
        gradeCategoryList = []
        gradeIdList = []
        sectionList = []
        setSections = []
        gradeList = []
        copySectionList = []
        list = []
        let academic = await db.getAcademic(academicId)
        if(academic.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Academic year not found',
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
           // console.log("***")
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
                gradeSectionList.push(sections.getGradeSection())
            })
            if(gradeSectionList.length == section.length ){
                section[0]['gradeSection'] = gradeSectionList
                sections.setData(section[0])
                res.status(200)
                return res.json({
                    "status_code" : 200,
                    "data"        : {'gradeSection' : sections.getData()},
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
            Array.from(gradeId).forEach(async(ele) => {
                sectionList.push(await db.getGradeSections(academicId,schoolId,ele.id))
                gradeId.splice(gradeId.indexOf(ele),1)
                if(gradeId.length == 0){
                    setSections = sectionList
                    for(i=0;i<sectionList.length;i++){
                        await Array.from(sectionList[i]).forEach((element) =>{
                            sections.setGradeSection(element)
                            list.push(sections.getGradeSection())
                        })
                      setSections[i][0]['sections']=list
                        list = [] 
                             sections.setGrade( setSections[i][0])
                             gradeList.push(sections.getGrade())
                        
                         setSections[i][0]['grade']=gradeList

                         sections.setGradeCategory( setSections[i][0])
                         gradeCategoryList.push(sections.getGradeCategory())
                    
                     setSections[i][0]['gradeCategory']=gradeCategoryList

                     sections.setDataAll( setSections[i][0])
                     copySectionList.push(sections.getDataAll())
                
                    setSections[i][0]['gradeCategory']=copySectionList
                    }
                        res.status(200)
                        return res.json({
                            "status_code" : 200,
                            "message"     : copySectionList[0],
                            status_name   : getCode.getStatus(200)
                        })
                }
            })
        }
        else if(schoolId&&!gradeId && !gradeCategoryId ){
            console.log("9999999999")
            let gradeCategory = await db.getGradeCategorySchool(schoolId)
            if(gradeCategory.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     :" Grade category not found",
                    status_name   : getCode.getStatus(404)
                })
            }
           
            Array.from(gradeCategory).forEach(async(ele) => {
                gradeIdList.push(await db.getGradeId(ele.grade_category_id))
                if(gradeCategory.length == gradeIdList.length){
                    let l=0;
                    for(j=0;j<gradeIdList.length;j++){
                        
                        Array.from(gradeIdList[j]).forEach(async(ele) => {
                           
                            
                    
                        sectionList.push(await db.getGradeSections(academicId,schoolId,ele.id))

                         console.log(sectionList.length)
                         if(sectionList.length==12){
                            res.status(200)
                            return res.json({
                                "status_code" : 200,
                                "message"     : sectionList,
                                status_name   : getCode.getStatus(200)
                            })
                        }
                            return
                            res.status(200)
                                return res.json({
                                    "status_code" : 200,
                                    "message"     : sectionList,
                                    status_name   : getCode.getStatus(200)
                                })
                            setSections = sectionList
                            for(i=0;i<sectionList.length;i++){
                                await Array.from(sectionList[i]).forEach((element) =>{
                                    sections.setGradeSection(element)
                                    list.push(sections.getGradeSection())
                                })
                              setSections[i][0]['sections']=list
                                list = [] 
                                     sections.setGrade( setSections[i][0])
                                     gradeList.push(sections.getGrade())
                                
                                 setSections[i][0]['grade']=gradeList
        
                                 sections.setGradeCategory( setSections[i][0])
                                 gradeCategoryList.push(sections.getGradeCategory())
                            
                             setSections[i][0]['gradeCategory']=gradeCategoryList
        
                             sections.setDataAll( setSections[i][0])
                             copySectionList.push(sections.getDataAll())
                        
                            setSections[i][0]['gradeCategory']=copySectionList
                            }
                                res.status(200)
                                return res.json({
                                    "status_code" : 200,
                                    "message"     : copySectionList[0],
                                    status_name   : getCode.getStatus(200)
                                })
                    
                    })

                    
                   
                }
                    
                    
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
