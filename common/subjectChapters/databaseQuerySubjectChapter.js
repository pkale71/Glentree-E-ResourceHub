let pool = require('../../databaseConnection/createconnection');
let db = {};
 

db.insertSubjectChapter = (uuid, syllabusGradeSubjectId, name, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus_grade_subject_chapter (uuid, syllabus_grade_subject_id,  chapter_name,is_active) VALUES (?, ?,?,?)", [uuid, syllabusGradeSubjectId, name, isActive], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}
db.findChapter = (name,syllabusGradeSubjectId,uuid) => 
{
    return new Promise((resolve, reject)=>
    {
        try
        {
            pool.query(`SELECT COUNT(UPPER(chapter_name)) AS Exist FROM syllabus_grade_subject_chapter WHERE  syllabus_grade_subject_id = ? AND UPPER(chapter_name) LIKE UPPER(?) AND uuid NOT LIKE ?`, [syllabusGradeSubjectId,name,uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}


db.selectChapter = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM syllabus_grade_subject_chapter WHERE uuid = ?", [uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.checkUsedSubject = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(syllabus_grade_subject_id) AS Exist FROM syllabus_grade_subject_chapter WHERE   syllabus_grade_subject_id LIKE ?`, [id], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}


db.getSubjectChapterDetails = (uuid , syllabusGradeSubjectId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT *
                        FROM syllabus_grade_subject_chapter 
                        WHERE syllabus_grade_subject_id = ? AND uuid = ?
                        `,[syllabusGradeSubjectId,uuid],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}
// here
db.returnUuidChapter = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid FROM syllabus_grade_subject_chapter WHERE  id = ? `, [id], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.insertChapterTopics = (uuid, subjectChapterId, name, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus_grade_subject_chapter_topic (uuid, syllabus_grade_subject_chapter_id, topic_name,is_active) VALUES (?, ?,?,?)", [uuid, subjectChapterId, name, isActive], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.deleteSubjectChapter = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus_grade_subject_chapter WHERE uuid = ?", [uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}
db.deleteTopic = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus_grade_subject_chapter_topic WHERE id = ?", [id], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.updateSubjectChapter = (uuid,syllabusGradeSubjectId, name) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE syllabus_grade_subject_chapter SET chapter_name = ? WHERE uuid = ?  AND syllabus_grade_subject_id = ?', [name,uuid, syllabusGradeSubjectId], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};


db.getGradeSubject = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgst.id
                        FROM syllabus_grade_subject sgst 
                        WHERE sgst.uuid = ? 
                        ORDER BY sgst.id`,[uuid],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.getSubjectChapters = (id,uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ``
            if(id){
                sql = `select sgsc.*, (SELECT IF(COUNT(sgsct.id)> 0,1,0) FROM syllabus_grade_subject_chapter_topic sgsct 
                WHERE sgsct.syllabus_grade_subject_chapter_id = sgsc.id AND sgsct.topic_name NOT LIKE 'All-Topics' ) AS isExist,
                sgst.uuid AS subUuid,sgst.is_active AS subIsActive,
                sgst.grade_id, sgst.syllabus_id, sgst.subject_name , 
                sy.name AS syllabusName, 
                g.name AS gradeName
                from syllabus_grade_subject_chapter sgsc
                LEFT JOIN syllabus_grade_subject sgst ON sgsc.syllabus_grade_subject_id = sgst.id
                LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                LEFT JOIN grade g ON g.id = sgst.grade_id 
                LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                where sgsc.syllabus_grade_subject_id = ?
                ORDER BY sgsc.id`
            }
            else 
            {
                sql = `select sgsc.*, (SELECT IF(COUNT(sgsct.id)> 0,1,0) FROM syllabus_grade_subject_chapter_topic sgsct 
                WHERE sgsct.syllabus_grade_subject_chapter_id = sgsc.id AND sgsct.topic_name NOT LIKE 'All-Topics') AS isExist,
                sgst.uuid AS subUuid,sgst.is_active AS subIsActive,
                sgst.grade_id, sgst.syllabus_id, sgst.subject_name , 
                sy.name AS syllabusName, 
                g.name AS gradeName
                from syllabus_grade_subject_chapter sgsc
                LEFT JOIN syllabus_grade_subject sgst ON sgsc.syllabus_grade_subject_id = sgst.id
                LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                LEFT JOIN grade g ON g.id = sgst.grade_id 
                LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                where sgsc.uuid = ?
                ORDER BY sgsc.id`
            }
            let chapterId = id ? id : uuid
            pool.query(sql,[chapterId],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.checkSubjectChapterUsed = (id) => 
{
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = `SELECT IF(COUNT(sgsct.id)> 0,1,0) AS isExist, (SELECT IF(COUNT(chapter_id) > 0 ,1,0)  FROM curriculum_master 
            WHERE chapter_id = ?) AS Exist,
            (SELECT IF(COUNT(chapter_id) > 0 ,1,0)  FROM user_chapter_complete_status 
            WHERE chapter_id = ?) AS statusExist
            FROM syllabus_grade_subject_chapter_topic sgsct 
            WHERE sgsct.syllabus_grade_subject_chapter_id = ? AND UPPER(sgsct.topic_name) NOT LIKE UPPER('All-Topics')`

            pool.query(sql,[id,id,id],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

db.selectChapter = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM syllabus_grade_subject_chapter WHERE uuid = ?", [uuid], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.chapterStatusChange = (id) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE syllabus_grade_subject_chapter set is_active = IF(is_active = 1,0,1) WHERE id = ?', [id], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};


module.exports = db

