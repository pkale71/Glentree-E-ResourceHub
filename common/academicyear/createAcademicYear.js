// // const currentYear = new Date().getFullYear()
// const date = require('date-and-time')
  
// // Creating object of current date and time 
// // by using Date() 
// const now  =  new Date();
  
// // Formatting the date and time
// // by using date.format() method
// const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
// npm install date-and-time --save

let    db = require('./databaseQueryAcademicYear')
let    createUuid = require('uuid')
let    errorCode = require('../errorCode')
let    getCode = new errorCode()
let    accessToken;
let    isCurrent;
let    uuid;
let    year;
let    startDate;
let    endDate;

module.exports = require('express').Router().post('/',async(req,res) =>
{
    try
    {
        year = req.body.year;
        startDate = req.body.startDate;
        endDate = req.body.endDate;
        accessToken = req.body.accessToken;
        uuid = createUuid.v1()
        isCurrent = (new Date (startDate).getFullYear() == new Date().getFullYear())?1:0;
        let insertAcademicYear = await db.insertAcademicYear(uuid,startDate,endDate,year,isCurrent)
                       if(insertAcademicYear.affectedRows > 0){
                        let returnUuid = await db.getAcademicYearId(insertAcademicYear.insertId)
                            res.status(200)
                               return res.json({
                                   "status_code" : 200,
                                   "message" : "success",
                                   "data" : {"uuid" : returnUuid[0].uuid},
                                   status_name : getCode.getStatus(200)
                               })            
                       }
                       else{
                        res.status(500)
                           return res.json({
                               "status_code" : 500,
                               "message" : "Academic year not created",
                               status_name : getCode.getStatus(500)
                           }) 
                       }
           
        
        } catch(e){
            console.log(e)
            
            if(e.code == 'ER_DUP_ENTRY'){
                let msg = e.sqlMessage.replace('_UNIQUE', '');
                res.status(500)
                return res.json({
                    "status_code"   : 500,
                    "message"       : msg,
                    status_name     : getCode.getStatus(500),
                    "error"         : msg
                }) 
            }else{
                res.status(500)
                return res.json({
                    "status_code" : 500,
                    "message" : "Academic year not created",
                    status_name : getCode.getStatus(500),
                    "error"     :      e.sqlMessage
                }) 
            }
           
        }

})
