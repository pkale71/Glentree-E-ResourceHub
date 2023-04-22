const express =require('express');
const userRouter = express.Router();

userRouter.use( '/createUser',require('../authentication/postValidateToken'),require('./createUser'))
userRouter.use( '/deleteUser',require('../authentication/postValidateToken'),require('./deleteUser'))
userRouter.use( '/updateUser',require('../authentication/postValidateToken'),require('./updateUser'))
userRouter.use( '/getUsers',require('../authentication/getValidateToken'),require('./getAllUser'))
userRouter.use( '/getUser',require('../authentication/getValidateToken'),require('./getUser'))
userRouter.use( '/checkDuplicateEmailMobile',require('../authentication/postValidateToken'),require('./duplicateEmailOrMobile'))

module.exports = userRouter