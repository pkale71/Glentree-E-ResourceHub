const express =require('express');
const curriculumRoute = express.Router();
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()

//app.use(upload.any())

curriculumRoute.use( '/saveCurriculum',require('../authentication/validateToken'),require('./saveCurriculum'))



curriculumRoute.use('/',(req,res,next)=>{
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})




module.exports = curriculumRoute