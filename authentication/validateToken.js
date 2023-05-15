let verifyToken = require('./verifyToken')
let app = require('express').Router();

 app.get('/:UUID',async (req,res,next)=>{ 
    console.log("v1")
verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2',async (req,res,next)=>{
    console.log("v2",req.params)
    verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2/:UUID3/:UUID4?*',async (req,res,next)=>{
    console.log("v3",req.params)
    verifyToken(req,res,next)
})

app.get('/',async (req,res,next)=>{
    console.log("v4")
    verifyToken(req,res,next)
})

app.post('/',async (req,res,next)=>{
    console.log("v5")
    verifyToken(req,res,next)
})


module.exports = app