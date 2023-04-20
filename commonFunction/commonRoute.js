const express =require('express');
const commonRoute = express.Router();

commonRoute.use( '/getSyllabuses',require('../authentication/validateToken'),require('../syllabus/getSyllabus'))
commonRoute.use( '/deleteSyllabus',require('../authentication/validateToken'),require('../syllabus/deleteSyllabus'))
commonRoute.use( '/createSyllabus',require('../authentication/validateToken'),require('../syllabus/insertSyllabus'))

module.exports = commonRoute