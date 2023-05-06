let db = require('./databaseQuerySubjectChapter')
let errorCode = require('../errorCode')
let getCode = new errorCode()
let chapter;
let chapterId;
let chapterStatusChange;
let chapterUUID;


module.exports = require('express').Router().get('/:chapterUUID',async(req,res) =>  {
    try
    {
        chapterUUID = req.params.chapterUUID
        
        chapter = await db.selectChapter(chapterUUID)
        if(chapter.length == 0){
            res.status(404)
            return res.json({
                "status_code"   :   404,
                "message"       :   'Chapter not found',
                "status_name"   :   getCode.getStatus(404),
            })   
        }
        chapterId = chapter[0].id
        chapterStatusChange = await db.chapterStatusChange(chapterId)
        console.log(chapterStatusChange)
        if(chapterStatusChange.affectedRows > 0){
            res.status(200)
            return res.json({
                "status_code" : 200,
                "message"     : 'success',
                "status_name"   : getCode.getStatus(200)
            })
        } 
    } 
    catch(e)
    {
        res.status(500)
        return res.json({
            "status_code"   :   500,
            "message"       :   "Status not changed",
            "status_name"   :   getCode.getStatus(500),
            "error"         :   e.sqlMessage
        })     
    }
})
