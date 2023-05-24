const express =require('express');
const commonRoute = express.Router();
let    errorCode = require('./errorCode')
let    getCode = new errorCode()

commonRoute.use( '/getSyllabuses',require('../authentication/validateToken'),require('./syllabus/getSyllabus'))
commonRoute.use( '/deleteSyllabus',require('../authentication/validateToken'),require('./syllabus/deleteSyllabus'))
commonRoute.use( '/createSyllabus',require('../authentication/validateToken'),require('./syllabus/createSyllabus'))
commonRoute.use( '/getGradeCategories',require('../authentication/validateToken'),require('./gradeCategory/getGradeCategory'))
commonRoute.use( '/getRoles',require('../authentication/validateToken'),require('./role/getRoles'))
commonRoute.use( '/getUserTypes',require('../authentication/validateToken'),require('./userType/getUserTypes'))
commonRoute.use( '/getGrades',require('../authentication/validateToken'),require('./grade/getGrades'))
commonRoute.use( '/getGrade',require('../authentication/validateToken'),require('./grade/getGrade'))
commonRoute.use( '/createGrade',require('../authentication/validateToken'),require('./grade/createGrade'))
commonRoute.use( '/updateGrade',require('../authentication/validateToken'),require('./grade/updateGrade'))
commonRoute.use( '/deleteGrade',require('../authentication/validateToken'),require('./grade/deleteGrade'))
commonRoute.use( '/getAcademicYears',require('../authentication/validateToken'),require('./academicyear/getAcademicYears'))
commonRoute.use( '/getAcademicYear',require('../authentication/validateToken'),require('./academicyear/getAcademicYear'))
commonRoute.use( '/getCurrentAcademicYear',require('../authentication/validateToken'),require('./academicYear/getCurrentAcademicYear'))
commonRoute.use( '/createAcademicYear',require('../authentication/validateToken'),require('./academicyear/createAcademicYear'))
commonRoute.use( '/deleteAcademicYear',require('../authentication/validateToken'),require('./academicyear/deleteAcademicYear'))
commonRoute.use( '/createGradeSubject',require('../authentication/validateToken'),require('./gradeSubject/createGradeSubject'))
commonRoute.use( '/updateGradeSubject',require('../authentication/validateToken'),require('./gradeSubject/updateGradeSubject'))
commonRoute.use( '/changeGradeSubjectStatus',require('../authentication/validateToken'),require('./gradeSubject/changeStatus'))
commonRoute.use( '/deleteGradeSubject',require('../authentication/validateToken'),require('./gradeSubject/deleteGradeSubject'))
commonRoute.use( '/getGradeSubject',require('../authentication/validateToken'),require('./gradeSubject/getGradeSubject'))
commonRoute.use( '/getGradeSubjects',require('../authentication/validateToken'),require('./gradeSubject/getGradeSubjects'))
commonRoute.use( '/createSubjectChapter',require('../authentication/validateToken'),require('./subjectChapters/createSubjectChapter'))
commonRoute.use( '/deleteSubjectChapter',require('../authentication/validateToken'),require('./subjectChapters/deleteSubjectChapter'))
commonRoute.use( '/updateSubjectChapter',require('../authentication/validateToken'),require('./subjectChapters/updateSubjectChapter'))
commonRoute.use( '/getSubjectChapters',require('../authentication/validateToken'),require('./subjectChapters/getSubjectChapters'))
commonRoute.use( '/getSubjectChapter',require('../authentication/validateToken'),require('./subjectChapters/getSubjectChapter'))
commonRoute.use( '/changeSubjectChapterStatus',require('../authentication/validateToken'),require('./subjectChapters/changeStatusChapter'))
commonRoute.use( '/createChapterTopic',require('../authentication/validateToken'),require('./chapterTopics/createChapterTopics'))
commonRoute.use( '/updateChapterTopic',require('../authentication/validateToken'),require('./chapterTopics/updateChapterTopic'))
commonRoute.use( '/deleteChapterTopic',require('../authentication/validateToken'),require('./chapterTopics/deleteChapterTopic'))
commonRoute.use( '/changeChapterTopicStatus',require('../authentication/validateToken'),require('./chapterTopics/changeStatusTopic'))
commonRoute.use( '/getChapterTopic',require('../authentication/validateToken'),require('./chapterTopics/getChapterTopic'))
commonRoute.use( '/getChapterTopics',require('../authentication/validateToken'),require('./chapterTopics/getChapterTopics'))


commonRoute.use('/',(req,res,next)=>{
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})


module.exports = commonRoute