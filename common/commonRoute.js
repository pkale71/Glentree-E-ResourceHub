const express =require('express');
const commonRoute = express.Router();


commonRoute.use( '/getSyllabuses',require('../authentication/getValidateToken'),require('./syllabus/getSyllabus'))
commonRoute.use( '/deleteSyllabus',require('../authentication/postValidateToken'),require('./syllabus/deleteSyllabus'))
commonRoute.use( '/createSyllabus',require('../authentication/postValidateToken'),require('./syllabus/insertSyllabus'))
commonRoute.use( '/getGradeCategories',require('../authentication/getValidateToken'),require('./gradeCategory/getGradeCategory'))
commonRoute.use( '/getRoles',require('../authentication/getValidateToken'),require('./role/getRoles'))
commonRoute.use( '/getUserTypes',require('../authentication/getValidateToken'),require('./userType/getUserTypes'))
commonRoute.use( '/getGrades',require('../authentication/getValidateToken'),require('./grade/getGrades'))
commonRoute.use( '/getGrade',require('../authentication/paramValidateToken'),require('./grade/getGrade'))
commonRoute.use( '/createGrade',require('../authentication/postValidateToken'),require('./grade/createGrade'))
commonRoute.use( '/updateGrade',require('../authentication/postValidateToken'),require('./grade/updateGrade'))
commonRoute.use( '/deleteGrade',require('../authentication/paramValidateToken'),require('./grade/deleteGrade'))


module.exports = commonRoute