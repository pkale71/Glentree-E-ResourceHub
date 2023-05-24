const express =require('express');
const reportRoute = express.Router();
let  errorCode = require('../common/errorCode')
let  getCode = new errorCode()

reportRoute.use( '/getChapterCompleteStatusReport',require('../authentication/verifyToken'),require('./getChapterCompleteStatusReport'))


reportRoute.use('/',(req,res,next)=>{
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})


module.exports = reportRoute