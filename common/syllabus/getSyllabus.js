let db = require('./databaseQuerySyllabus')
let syllabusObj = require('../../models/syllabus')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let syllabuses = new syllabusObj()
let syllabus;
let syllabusList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        syllabus = await db.getSyllabus()
        syllabusList = [];
        if(syllabus.length == 0){
            res.status(200)
            return res.json({
                "status_code"   :   200,
                "data"          :   {'syllabuses' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(200),
            })   
        }
        await Array.from(syllabus).forEach(ele  =>  {
            syllabuses.setDataAll(ele)
            syllabusList.push(syllabuses.getDataAll())
        })

        if(syllabus.length == syllabusList.length){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "data"        : {'syllabuses' : syllabusList},
                "message"     : 'success',
                status_name   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Syllabus not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
