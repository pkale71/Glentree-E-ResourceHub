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
let grades= []
let gradeList = []
let setSections = []
let list = []



module.exports = require('express').Router().get('/:acadmicId/:schoolId/:gradeCategoryId/:gradeId?*',async(req,res) =>  {
    try
    {  
        academicId = req.params.acadmicId
        schoolId = req.params.schoolId
        gradeCategoryId = req.params.gradeCategoryId
        gradeId = req.params['gradeId']
      
        if(gradeCategoryId.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Provide grade Category id',
                status_name   : getCode.getStatus(404)
            })
        }
       
       // console.log((!gradeId && gradeCategoryId && schoolId))
        gradeSectionList = []
        gradeCategoryList = []
        sectionList = []
        setSections = []
        gradeList = []
        grades = []
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
        if(gradeId && gradeCategoryId){
            let grade = await db.getGrade(gradeId,gradeCategoryId)
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
                grades.push({"grade_id": ele.id, "gradeName" : ele.name})
                sectionList.push(await db.getGradeSections(academicId,schoolId,ele.id))
                gradeId.splice(gradeId.indexOf(ele),1)
                if(gradeId.length == 0){
                    setSections = sectionList
                    for(i=0;i<sectionList.length;i++){
                        await Array.from(sectionList[i]).forEach((element) =>{
                            sections.setGradeSection(element)
                            list.push(sections.getGradeSection())
                        })
                       // console.log(setSections[i])
                        if(setSections[i].length == 0){
                            setSections[i]=[grades[i]]
                            setSections[i][0]['sections']=list
                        }
                        else {
                            setSections[i][0]['sections']=list
                        }
                     
                        list = [] 
                             sections.setGrade( setSections[i][0])
                             gradeList.push(sections.getGrade())
                             if(setSections[i].length == 0){
                                setSections[i]['grade']=gradeList
                            }
                            else {
                                setSections[i][0]['grade']=gradeList
                            }
                

                         sections.setGradeCategory( setSections[i][0])
                         gradeCategoryList.push(sections.getGradeCategory())
                         if(setSections[i].length == 0){
                            setSections[i]['gradeCategory']=gradeCategoryList
                        }
                        else {
                            setSections[i][0]['gradeCategory']=gradeCategoryList
                        }
                     

                     sections.setDataAll( setSections[i][0])
                     copySectionList.push(sections.getDataAll())
                     if(setSections[i].length == 0){
                        setSections[i]['gradeCategory']=copySectionList
                    }
                    else {
                        setSections[i][0]['gradeCategory']=copySectionList
                    }
                 
                    
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
