let verifyToken = require('./verifyToken')
let app = require('express').Router();

 app.get('/:UUID',async (req,res,next)=>{ 
verifyToken(req,res,next)
})

app.get('/:UUID/:UUID',async (req,res,next)=>{
    verifyToken(req,res,next)
})


app.get('/:UUID/:UUID/:UUID/:UUID?*',async (req,res,next)=>{
    verifyToken(req,res,next)
})

app.get('/',async (req,res,next)=>{
    verifyToken(req,res,next)
})

app.post('/',async (req,res,next)=>{
    verifyToken(req,res,next)
})


module.exports = app