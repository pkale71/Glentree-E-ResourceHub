let verifyToken = require('./verifyToken')
let app = require('express').Router();

 app.get('/:UUID',async (req,res,next)=>{ 
    console.log("v1")
verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2',async (req,res,next)=>{
    console.log("v2")
    verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2/:UUID3',async (req,res,next)=>{
    console.log("v3")
    verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2/:UUID3/:UUID4',async (req,res,next)=>{
    console.log("v4")
    verifyToken(req,res,next)
})

app.get('/:UUID1/:UUID2/:UUID3/:UUID4/:UUID5',async (req,res,next)=>{
    console.log("v5")
    verifyToken(req,res,next)
})
app.get('/:UUID1/:UUID2/:UUID3/:UUID4/:UUID5/:UUID6',async (req,res,next)=>{
    console.log("v6")
    verifyToken(req,res,next)
})
app.get('/:UUID1/:UUID2/:UUID3/:UUID4/:UUID5/:UUID6/:UUID7',async (req,res,next)=>{
    console.log("v6")
    verifyToken(req,res,next)
})


app.get('/',async (req,res,next)=>{
    console.log("v7")
    verifyToken(req,res,next)
})

app.post('/',async (req,res,next)=>{
    console.log("v8")
    verifyToken(req,res,next)
})


module.exports = app