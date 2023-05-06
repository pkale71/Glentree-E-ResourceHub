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
        academicUuid    = req.params.acadmicUUID
        schoolUuid      = req.params.schoolUUID
        gradeCategoryId = req.params.gradeCategoryId
        gradeId         = req.params['gradeId']
        accessToken     = req.body.accessToken

        if(gradeCategoryId.length == 0){
            res.status(404)
            return res.json({
                "status_code" : 404,
                "message"     : 'Provide grade Category id',
                "status_name"   : getCode.getStatus(404)
            })
        }
       
       // console.log((!gradeId && gradeCategoryId && schoolId))
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
        //   console.log("***")
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
           // console.log("***")
            console.log(academicUuid,academicId,schoolId)
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
            gradeId = await db.getGradeId(gradeCategoryId)
            if(gradeId.length == 0){
                res.status(404)
                return res.json({
                    "status_code" : 404,
                    "message"     : 'Grade section not found',
                    "status_name"   : getCode.getStatus(404)
                })
            }
         
            Array.from(gradeId).forEach(async(ele) => {
                // console.log("*******",gradeId)
                let datas = {'ele':ele,'academic' :academic,'school' : school ,'gradeCategory' : gradeCategory}
                sectionList.push(await db.getGradeSections(academicId,schoolId,ele.id,ele.grade_category_id,datas))
                gradeId.splice(gradeId.indexOf(ele),1)
                if(gradeId.length == 0){
                    // return res.json({
                    //     data: sectionList
                    // })
                   // console.log(sectionList)
                    setSections = sectionList
                    
                        for(i=0;i<sectionList.length;i++){
                            Array.from(sectionList[i]).forEach((element) =>{
                                sections.setGradeSection(element)
                                list.push(sections.getGradeSection())
                            })
                            // console.log("***",setSections[i][0])
                            //  console.log("******",list)
                            setSections[i][0]['sections']=list[0].uuid ? list : []
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
                        
                           // setSections[i][0]['gradeCategory']=copySectionList
                            
                        }
                        res.status(200)
                        return res.json({
                            "status_code" : 200,
                            "data"        : {'gradeSections' : copySectionList[0]},
                            "message"     : "success",
                            "status_name"   : getCode.getStatus(200)
                        })
                    
                   
                    // return res.json({
                    //         data: finalList[finalList.length-1]
                    //     })
                   
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
