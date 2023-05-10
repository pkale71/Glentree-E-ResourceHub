const express =require('express');
const userRouter = express.Router();
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()

userRouter.use( '/createUser',require('../authentication/validateToken'),require('./createUser'))
userRouter.use( '/deleteUser',require('../authentication/validateToken'),require('./deleteUser'))
userRouter.use( '/updateUser',require('../authentication/validateToken'),require('./updateUser'))
userRouter.use( '/getUsers',require('../authentication/validateToken'),require('./getAllUser'))
userRouter.use( '/getUser',require('../authentication/validateToken'),require('./getUser'))
userRouter.use( '/checkDuplicateEmailMobile',require('../authentication/validateToken'),require('./duplicateEmailOrMobile'))
userRouter.use( '/getUnassignedGrades',require('../authentication/validateToken'),require('./userSuperviseGrade/getUnassignedGrades'))


userRouter.use('/',(req,res,next)=>{
    console.log(req.baseUrl,next())
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400)
    }) 
})



module.exports = userRouter