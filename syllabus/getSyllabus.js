let db = require('./databaseQuerySyllabus')
let syllabusObj = require('../models/syllabus')
let errorCode = require('../common/errorCode')
let getCode = new errorCode()
let syllabuses = new syllabusObj()
let syllabus;
let syllabusList = [];

module.exports = require('express').Router().get('/',async(req,res) =>  {
    try
    {
        syllabus = await db.getSyllabus()
        if(syllabus.length == 0){
            return res.json({
                "status_code"   :   404,
                "data"          :   {'syllabus' : []},
                "message"       :   'success',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        await Array.from(syllabus).forEach(ele  =>  {
            syllabuses.setDataAll(ele)
            syllabusList.push(syllabuses.getDataAll())
        })

        if(syllabus.length == syllabusList.length){
            return res.json({
                "status_code" : 200,
                "data"        : {'syllabus' : syllabusList},
                "message"     : 'success',
                status_name   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        return res.json({
            "status_code"   :   500,
            "message"       :   "Syllabus not found",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e
        })     
    }
})
