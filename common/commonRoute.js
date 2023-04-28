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
commonRoute.use( '/getAcademicYears',require('../authentication/getValidateToken'),require('./academicyear/getAcademicYears'))
commonRoute.use( '/getAcademicYear',require('../authentication/paramValidateToken'),require('./academicyear/getAcademicYear'))
commonRoute.use( '/createAcademicYear',require('../authentication/postValidateToken'),require('./academicyear/createAcademicYear'))
commonRoute.use( '/getGradeSections',require('../authentication/paramValidateToken'),require('./gradeSection/getGradeSections'))
commonRoute.use( '/createGradeSection',require('../authentication/postValidateToken'),require('./gradeSection/createGradeSection'))
commonRoute.use( '/deleteGradeSection',require('../authentication/paramValidateToken'),require('./gradeSection/deleteGradeSection'))
commonRoute.use( '/createGradeSubject',require('../authentication/postValidateToken'),require('./gradeSubject/createGradeSubject'))
commonRoute.use( '/updateGradeSubject',require('../authentication/postValidateToken'),require('./gradeSubject/updateGradeSubject'))
commonRoute.use( '/changeStatus',require('../authentication/paramValidateToken'),require('./gradeSubject/changeStatus'))
commonRoute.use( '/deleteGradeSubject',require('../authentication/paramValidateToken'),require('./gradeSubject/deleteGradeSubject'))
commonRoute.use( '/getGradeSubject',require('../authentication/paramValidateToken'),require('./gradeSubject/getGradeSubject'))
commonRoute.use( '/createSubjectChapter',require('../authentication/postValidateToken'),require('./subjectChapters/createSubjectchapter'))
commonRoute.use( '/deleteSubjectChapter',require('../authentication/paramValidateToken'),require('./subjectChapters/deleteSubjectChapter'))
commonRoute.use( '/updateSubjectChapter',require('../authentication/postValidateToken'),require('./subjectChapters/updateSubjectchapter'))

module.exports = commonRoute