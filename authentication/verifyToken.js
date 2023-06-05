let commondb = require('../common/commonDatabaseQuery')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let userTypeCode;
let accessToken;
let userId;
let authData;
let tokenArr;
let email

async function  verifyToken  (req, res, next){
    try 
    {
        console.log("PARAM")
        let token = req.headers['authorization']
        if(!token)
        {
            res.status(401)
            return res.json({
                "message": "Provide Token",
                "status_name" : getCode.getStatus(401),
                "status_code"   :  401
            })
        }
        if(typeof token !== 'undefined')
        {
            tokenArr = token.split(" ")
            accessToken = tokenArr[1]
            accessToken = accessToken.toString()
        }
        if(accessToken.length == 0)
        {
            res.status(401)
            return res.json({
                "message": "Invalid Token",
                "status_name" : getCode.getStatus(401),
                "status_code"   :  401
            })
        }
        authData = await commondb.selectToken(accessToken)
        if(authData.length == 0)
        {
            res.status(401)
            return res.json({
                "message": "Invalid Token",
                "status_name" : getCode.getStatus(401),
                "status_code"   :  401
            })
        }
        userId = authData[0].userId
        if(userId)
        {
            user = await commondb.getUserById(userId);
            email = user[0].email
            if(user.length == 0)
            {
                console.log("1****")
                res.status(401)
                return res.json({
                    "message": "User not active",
                    "status_name" : getCode.getStatus(401),
                    "status_code"   :  401
                })
            }
            if(user[0].role_id == 2 && user[0].schoolActive == 0)
            {
                console.log("2****")
                res.status(401)
                return res.json({
                    "message": "School is not active",
                    "status_name" : getCode.getStatus(401),
                    "status_code"   :  401
                })
            }
            userTypeCode = user[0].user_type_code
            const verified = (accessToken === authData[0].authToken)    
            if(verified)
            {
                console.log("3", req.baseUrl,userTypeCode)
                if((userTypeCode == 'SUADM'||userTypeCode == 'HDOFA') &&  (req.baseUrl ==  '/user/createUser' || req.baseUrl ==  '/user/updateUser' || req.baseUrl ==  '/user/deleteUser'|| req.baseUrl ==  '/user/changeStatus'||req.baseUrl ==  '/common/createGrade' || req.baseUrl ==  '/common/updateGrade' || req.baseUrl ==  '/common/deleteGrade' ||  req.baseUrl ==  '/user/checkDuplicateEmailMobile' ||req.baseUrl ==  '/school/createSchool' ||req.baseUrl ==  '/school/updateSchool' || req.baseUrl ==  '/school/deleteSchool' || req.baseUrl ==  '/school/changeStatus' || req.baseUrl ==  '/school/deleteGradeSection' || req.baseUrl ==  '/school/createGradeSection' || req.baseUrl ==  '/user/saveAssignedGradeSubjects'  || req.baseUrl ==  '/user/deleteAssignedGradeSubjects' || req.baseUrl ==  '/user/saveAssignedGrades' || req.baseUrl ==  '/user/deleteAssignedGrades'|| req.baseUrl ==  '/user/saveAssignedGradeSections' || req.baseUrl ==  '/user/deleteAssignedGradeSections' || req.baseUrl ==  '/common/createGradeSubject' || req.baseUrl ==  '/common/updateGradeSubject' || req.baseUrl ==  '/common/deleteGradeSubject' || req.baseUrl ==  '/common/changeGradeSubjectStatus'   || req.baseUrl ==  '/common/createSubjectChapter' || req.baseUrl ==  '/common/deleteSubjectChapter' || req.baseUrl ==  '/common/updateSubjectChapter' || req.baseUrl ==  '/common/changeSubjectChapterStatus' || req.baseUrl ==  '/common/createChapterTopic' || req.baseUrl ==  '/common/updateChapterTopic' || req.baseUrl ==  '/common/deleteChapterTopic' || req.baseUrl ==  '/common/changeChapterTopicStatus' || 
                req.baseUrl ==  '/common/createAcademicYear' ||req.baseUrl ==  '/common/updateAcademicYear' ||req.baseUrl ==  '/common/deleteAcademicYear' || req.baseUrl ==  '/common/updateMaterialType' || req.baseUrl ==  '/common/deleteMaterialType' || req.baseUrl ==  '/common/saveMaterialType'))
                {
                    console.log("4")
                    req.body.accessToken = accessToken
                    next()
                }
                else if((userTypeCode == 'SUADM') && ( req.baseUrl ==  '/common/deleteSyllabus' || req.baseUrl ==  '/common/createSyllabus' || req.baseUrl ==  '/common/updateSyllabus'))
                {
                    console.log("5")     
                    req.body.accessToken = accessToken
                    next()
                }
                else if((userTypeCode == 'SCHCD' || userTypeCode == 'SUBHD' || userTypeCode == 'TECHR' ) && (req.baseUrl ==  '/user/saveUserChapterCompleteStatus' || req.baseUrl ==  '/user/updateUserChapterCompleteStatus' || req.baseUrl ==  '/user/deleteUserChapterCompleteStatus'))
                {
                    console.log("7")     
                    req.body.accessToken = accessToken
                    next()
                 }
                 else if (req.method == 'GET' && (req.baseUrl.includes('get') || req.baseUrl ==  '/logout' ))
                 {
                    req.body.accessToken = accessToken
                    next()
                 }
                 else if (req.method == 'POST' && (req.baseUrl ==  '/authenticate' || req.baseUrl ==  '/changePassword'))
                 {
                    req.body.accessToken = accessToken
                    next()
                 }
                else 
                {
                        res.status(401)
                        return res.json({
                            'message'       :       `Invalid user`,
                            "status_name" : getCode.getStatus(401),
                            "status_code"   :       401
                        });
                }
               
            }
            else
            {
                console.log("9")
                res.status(401)
                return res.json({
                    'message'       :       `Invalid user`,
                    "status_name" : getCode.getStatus(401),
                    "status_code"   :       401
                });
            }
        }
        else
        {
            console.log("10")
            res.status(401)
            return res.json({
                'message'       :       `Unauthenticated User "${email}"`,
                "status_name" : getCode.getStatus(401),
                "status_code"   :       401
            });
        }
    } 
    catch (error) 
    {
        console.log("11****", req.method)
        res.status(401)
        return res.json({
            'message'       :       `Unauthoried User "${email}"`,
            "status_name"     :       getCode.getStatus(401),
            "status_code"   :       401,
            "error"         :       error
        });
    }
}

module.exports = verifyToken;