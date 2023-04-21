const express =require('express');
const schoolRouter = express.Router();

schoolRouter.use( '/getSchools',require('../authentication/getValidateToken'),require('./getSchools'))
schoolRouter.use( '/createSchool',require('../authentication/postValidateToken'),require('./createSchool'))


module.exports = schoolRouter