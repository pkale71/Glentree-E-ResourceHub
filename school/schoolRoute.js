const express =require('express');
const schoolRouter = express.Router();

schoolRouter.use( '/getSchools',require('../authentication/getValidateToken'),require('./getSchools'))
schoolRouter.use( '/createSchool',require('../authentication/postValidateToken'),require('./createSchool'))
schoolRouter.use( '/getSchoolUserSettting',require('../authentication/getValidateToken'),require('./schoolUserSetting/getSchoolUserSetting'))
schoolRouter.use( '/getSchoolGradeCategory',require('../authentication/getValidateToken'),require('./schoolGradeCategory/getSchoolGradeCategory'))
schoolRouter.use( '/getSchool',require('../authentication/paramValidateToken'),require('./getSchool'))
schoolRouter.use( '/updateSchool',require('../authentication/postValidateToken'),require('./updateSchool'))
schoolRouter.use( '/deleteSchool',require('../authentication/postValidateToken'),require('./deleteSchool'))
schoolRouter.use( '/changeStatus',require('../authentication/paramValidateToken'),require('./changeStatus'))
schoolRouter.use( '/getGradeSections',require('../authentication/paramValidateToken'),require('./gradeSection/getGradeSections'))
schoolRouter.use( '/createGradeSection',require('../authentication/postValidateToken'),require('./gradeSection/createGradeSection'))
schoolRouter.use( '/deleteGradeSection',require('../authentication/paramValidateToken'),require('./gradeSection/deleteGradeSection'))


module.exports = schoolRouter