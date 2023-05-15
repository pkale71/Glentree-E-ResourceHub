const express =require('express');
const userRouter = express.Router();
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()

userRouter.use( '/createUser',require('../authentication/validateToken'),require('./createUser'))
userRouter.use( '/deleteUser',require('../authentication/validateToken'),require('./deleteUser'))
userRouter.use( '/updateUser',require('../authentication/validateToken'),require('./updateUser'))
userRouter.use( '/getUsers',require('../authentication/validateToken'),require('./getAllUser'))
userRouter.use( '/getUser',require('../authentication/validateToken'),require('./getUser'))
userRouter.use( '/checkDuplicateEmailMobile',require('../authentication/validateToken'),require('./duplicateEmailOrMobile'))
userRouter.use( '/getUnassignedGrades',require('../authentication/validateToken'),require('./userSuperviseGrade/getUnassignedGrades'))
userRouter.use( '/getAssignedGrades',require('../authentication/validateToken'),require('./userSuperviseGrade/getAssignedGrade'))
userRouter.use( '/getUnassignedGradeSubjects',require('../authentication/validateToken'),require('./userSuperviseGradeSubject/getUnassignedGradeSubjects'))
userRouter.use( '/getUnassignedGradeSubjectSections',require('../authentication/validateToken'),require('./userSuperviseGradeSubjectSection/getUnassignedSubjectSections'))
userRouter.use( '/saveAssignedGrades',require('../authentication/validateToken'),require('./userSuperviseGrade/saveAssignedGrades'))
userRouter.use( '/deleteAssignedGrades',require('../authentication/validateToken'),require('./userSuperviseGrade/deleteAssignedGrades'))
userRouter.use( '/saveAssignedGradeSubjects',require('../authentication/validateToken'),require('./userSuperviseGradeSubject/saveAssignedGradeSubject'))
userRouter.use( '/saveAssignedGradeSections',require('../authentication/validateToken'),require('./userSuperviseGradeSubjectSection/saveAssignedGradeSections'))
userRouter.use( '/deleteAssignedGradeSections',require('../authentication/validateToken'),require('./userSuperviseGradeSubjectSection/deleteAssignedGradeSections'))
userRouter.use( '/getAssignedGradeSections',require('../authentication/validateToken'),require('./userSuperviseGradeSubjectSection/getAssignedGradeSection'))
userRouter.use( '/deleteAssignedGradeSubjects',require('../authentication/validateToken'),require('./userSuperviseGradeSubject/deleteAssignedGradeSubject'))
userRouter.use( '/getAssignedGradeSubjects',require('../authentication/validateToken'),require('./userSuperviseGradeSubject/getAssignedGradeSubject'))
userRouter.use( '/getAssignedChapters',require('../authentication/validateToken'),require('./getAssignedChapters'))


userRouter.use('/',(req,res,error)=>{
    console.log(req.errored,req.method)
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})



module.exports = userRouter