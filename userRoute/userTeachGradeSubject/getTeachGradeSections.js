let db = require('./databaseQueryTeachGradeSubject')
let gradeSectionObj = require('../../models/gradeSection')
let errorCode = require('../../common/errorCode')
let getCode = new errorCode()
let sections = new gradeSectionObj()
let section;
let gradeSectionList = [];;
let userUuid;
let gradeId;
let subjectUuid;
let schoolUuid;



module.exports = require('express').Router().get('/:userUuid/:gradeId/:subjectUuid/:schoolUuid',async(req,res) =>  {
    try
    {  
        userUuid    = req.params.userUuid
        gradeId         = req.params.gradeId
        subjectUuid      = req.params.subjectUuid
        schoolUuid      = req.params.schoolUuid
        accessToken     = req.body.accessToken

        gradeSectionList    = []
       
       

        if(gradeId){
            section = await db.getGradeSection(userUuid,gradeId,subjectUuid, schoolUuid);
            if(section.length == 0)
            {
                res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'sections' : []},
                        "message"     : 'success',
                        "status_name"   : getCode.getStatus(200)
                    })
            }
            Array.from(section).forEach(async(ele) => {
                sections.setTeachSection(ele)
                gradeSectionList.push(sections.getTeachSection())
                if(gradeSectionList.length == section.length ){
                    res.status(200)
                    return res.json({
                        "status_code" : 200,
                        "data"        : {'sections' : gradeSectionList},
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
