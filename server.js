let express = require('express')
let connect = require('connect')
let dotenv = require('dotenv')
let cors = require('cors')
let bodyparser = require('body-parser')
let    errorCode = require('./common/errorCode')
let    getCode = new errorCode()
let     docPath = require('./DOC_FOLDER_PATH/docPath')
let     getPath = new docPath()
let createFolder = require('./DOC_FOLDER_PATH/createDocFolder')
let https = require('https')
let fs = require('fs')

let app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
dotenv.config();

// create uploads folder if not exist
//createFolder('root')
// app.listen(8082,()=>{
//     console.log("server is listing on port no 8082")
// })

app.use('/authenticate',require('./authentication/authenticate'));
app.use('/authenticate',require('./authentication/authenticate'));
// app.use('/validateToken',require('./authentication/postValidateToken'));
app.use('/logout',require('./authentication/validateToken'),require('./authentication/logout'));
app.use('/changePassword',require('./authentication/validateToken'),require('./authentication/changePassword'));
app.use('/user',require('./userRoute/userRoute'))
app.use('/common',require('./common/commonRoute'))
app.use('/school',require('./school/schoolRoute'))
app.use('/report',require('./report/reportRoute'))
app.use('/curriculum',require('./curriculum/curriculumRoute'))


connect().use(express.static(__dirname + '/uploads/curriculum'))

app.use('/',(req,res,next)=>{
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})

// app.listen(8082,() => {
//        console.log('Listening...on HTTPS port')
// })

https.createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/nodeserver.ssinformatics.org.in/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/nodeserver.ssinformatics.org.in/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/nodeserver.ssinformatics.org.in/chain.pem'),
    },
   app
  )
  .listen(443, () => {
    console.log('Listening...on HTTPS port')
  })
