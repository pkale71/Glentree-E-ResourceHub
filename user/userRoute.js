const express =require('express');
const userRouter = express.Router();

userRouter.use( '/createUser',require('../authentication/validateToken'),require('./createUser'))
userRouter.use( '/deleteUser',require('../authentication/validateToken'),require('./deleteUser'))
userRouter.use( '/updateUser',require('../authentication/validateToken'),require('./updateUser'))
userRouter.use( '/getUsers',require('../authentication/validateToken'),require('./getAllUser'))
userRouter.use( '/getUser/:userUUID',require('../authentication/validateToken'),require('./getUser'))


module.exports = userRouter