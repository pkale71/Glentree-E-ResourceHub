let express = require('express')
let dotenv = require('dotenv')
let cors = require('cors')
let bodyparser = require('body-parser')
let jwt = require('jsonwebtoken')

let app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
dotenv.config();

app.listen(8082,()=>{
    console.log("server is listing on port no 8082")
})

app.use('/authenticate',require('./authToken/authenticate'));
app.use('/validateToken',require('./authToken/validateToken'))