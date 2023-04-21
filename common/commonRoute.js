const express =require('express');
const commonRoute = express.Router();

commonRoute.use( '/getSyllabuses',require('../authentication/validateToken'),require('../syllabus/getSyllabus'))
commonRoute.use( '/deleteSyllabus',require('../authentication/validateToken'),require('../syllabus/deleteSyllabus'))
commonRoute.use( '/createSyllabus',require('../authentication/validateToken'),require('../syllabus/insertSyllabus'))
commonRoute.use( '/getGradeCategories',require('../authentication/validateToken'),require('../gradeCategory/getGradeCategory'))
commonRoute.use( '/getRoles',require('../authentication/validateToken'),require('../role/getRoles'))
commonRoute.use( '/getUserTypeList',require('../authentication/validateToken'),require('../userType/getUserTypes'))

module.exports = commonRoute