const express =require('express');
const schoolRouter = express.Router();
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()

schoolRouter.use( '/getSchools',require('../authentication/validateToken'),require('./getSchools'))
schoolRouter.use( '/createSchool',require('../authentication/validateToken'),require('./createSchool'))
schoolRouter.use( '/getSchoolUserSettting',require('../authentication/validateToken'),require('./schoolUserSetting/getSchoolUserSetting'))
schoolRouter.use( '/getSchoolGradeCategory',require('../authentication/validateToken'),require('./schoolGradeCategory/getSchoolGradeCategory'))
schoolRouter.use( '/getSchool',require('../authentication/validateToken'),require('./getSchool'))
schoolRouter.use( '/updateSchool',require('../authentication/validateToken'),require('./updateSchool'))
schoolRouter.use( '/deleteSchool',require('../authentication/validateToken'),require('./deleteSchool'))
schoolRouter.use( '/changeStatus',require('../authentication/validateToken'),require('./changeStatus'))
schoolRouter.use( '/getGradeSections',require('../authentication/validateToken'),require('./gradeSection/getGradeSections'))
schoolRouter.use( '/createGradeSection',require('../authentication/validateToken'),require('./gradeSection/createGradeSection'))
schoolRouter.use( '/deleteGradeSection',require('../authentication/validateToken'),require('./gradeSection/deleteGradeSection'))
schoolRouter.use( '/getSchoolGradeCategories',require('../authentication/validateToken'),require('./getSchoolGradeCategories'))



schoolRouter.use('/',(req,res,next)=>{
    console.log(req.baseUrl)
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})




module.exports = schoolRouter