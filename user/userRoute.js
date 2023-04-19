const express =require('express');
const userRouter = express.Router();

userRouter.use( '/createUser',require('../authentication/validateToken'),require('./createUser'))


module.exports = userRouter