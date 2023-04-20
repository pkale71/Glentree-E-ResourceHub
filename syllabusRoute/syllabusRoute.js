const express =require('express');
const syllabusRouter = express.Router();

syllabusRouter.use( '/getSyllabuses',require('../authentication/validateToken'),require('./getSyllabus'))
syllabusRouter.use( '/deleteSyllabus',require('../authentication/validateToken'),require('./deleteSyllabus'))
syllabusRouter.use( '/createSyllabus',require('../authentication/validateToken'),require('./insertSyllabus'))
module.exports = syllabusRouter