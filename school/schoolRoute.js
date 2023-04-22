const express =require('express');
const schoolRouter = express.Router();

schoolRouter.use( '/getSchools',require('../authentication/getValidateToken'),require('./getSchools'))
schoolRouter.use( '/createSchool',require('../authentication/postValidateToken'),require('./createSchool'))
schoolRouter.use( '/getSchoolUserSettting',require('../authentication/getValidateToken'),require('./schoolUserSetting/getSchoolUserSetting'))
schoolRouter.use( '/getSchoolGradeCategory',require('../authentication/getValidateToken'),require('./schoolGradeCategory/getSchoolGradeCategory'))
schoolRouter.use( '/getSchool',require('../authentication/getValidateToken'),require('./getSchool'))


module.exports = schoolRouter