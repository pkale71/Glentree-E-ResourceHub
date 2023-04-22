const express =require('express');
const commonRoute = express.Router();


commonRoute.use( '/getSyllabuses',require('../authentication/getValidateToken'),require('../syllabus/getSyllabus'))
commonRoute.use( '/deleteSyllabus',require('../authentication/postValidateToken'),require('../syllabus/deleteSyllabus'))
commonRoute.use( '/createSyllabus',require('../authentication/postValidateToken'),require('../syllabus/insertSyllabus'))
commonRoute.use( '/getGradeCategories',require('../authentication/getValidateToken'),require('../gradeCategory/getGradeCategory'))
commonRoute.use( '/getRoles',require('../authentication/getValidateToken'),require('../role/getRoles'))
commonRoute.use( '/getUserTypes',require('../authentication/getValidateToken'),require('../userType/getUserTypes'))
commonRoute.use( '/getSchoolUserSettting',require('../authentication/getValidateToken'),require('./schoolUserSetting/getSchoolUserSetting'))
commonRoute.use( '/getSchoolGradeCategory',require('../authentication/getValidateToken'),require('./schoolGradeCategory/getSchoolGradeCategory'))

module.exports = commonRoute