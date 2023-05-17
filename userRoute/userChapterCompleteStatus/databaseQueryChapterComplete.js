let pool = require('../../databaseConnection/createconnection');
let db = {};
 
db.saveUserChapterCompleteStatus = (uuid,acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,topicUuid,completedOn,completedBy,createdOn,isCompleted) => 
{
    return new Promise((resolve, reject)=>{
        try{
            let sql = ``
            if(topicUuid && topicUuid?.length > 0)
            {
                sql = `INSERT INTO user_chapter_complete_status 
                (uuid,academic_year_id,grade_id, section_id, subject_id,chapter_id,completed_on,completed_by,created_on,is_completed,topic_id) 
                VALUES (
                ?,  
                (SELECT id FROM academic_year WHERE uuid = ?), 
                ?, 
                (SELECT id FROM school_grade_section WHERE uuid = ?), 
                (SELECT id FROM syllabus_grade_subject WHERE uuid = ?),  
                (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?),
                ?,  
                ?,  
                ?,
                ?,
                (SELECT id FROM syllabus_grade_subject_chapter_topic WHERE uuid = ?))`
            }
            else
            {
                sql = `INSERT INTO user_chapter_complete_status 
                (uuid,academic_year_id,grade_id, section_id, subject_id,chapter_id,completed_on,completed_by,created_on,is_completed,topic_id) 
                VALUES (
                ?,  
                (SELECT id FROM academic_year WHERE uuid = ?), 
                ?, 
                (SELECT id FROM school_grade_section WHERE uuid = ?), 
                (SELECT id FROM syllabus_grade_subject WHERE uuid = ?),  
                (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?),  
                ?,  
                ?,  
                ?,
                ?,
                (SELECT id FROM syllabus_grade_subject_chapter_topic 
                WHERE syllabus_grade_subject_chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?)))`
                topicUuid = chapterUuid
            }
            
            pool.query(sql, [uuid,acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,completedOn,completedBy,createdOn,isCompleted,topicUuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e)
        {console.log(e)}
      
    });
};

db.returnUuidUserChapterCompleteStatus = (id) =>
 {
    return new Promise((resolve, reject)=>
    {
        try
        {
            pool.query(`SELECT uuid FROM user_chapter_complete_status WHERE id = ?`, [id], (error, result) => 
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



db.updateUserChapterCompleteStatus = (uuid,completedOn) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query(`UPDATE user_chapter_complete_status SET completed_on = ? WHERE uuid = ?`, [completedOn,uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};

db.deleteUserChapterCompleteStatus = (uuid) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query(`DELETE FROM user_chapter_complete_status  WHERE uuid = ?`, [uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};

db.checkCompleteStatusExist = (acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,topicUuid) => {
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = ``
            if(topicUuid && topicUuid?.length > 0)
            {
                sql = `SELECT id FROM user_chapter_complete_status WHERE 
                academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                AND grade_id = ?
                AND section_id = (SELECT id FROM school_grade_section WHERE uuid = ?)
                AND subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                AND chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?)
                AND topic_id = (SELECT id FROM syllabus_grade_subject_chapter_topic WHERE uuid = ?)`
            }
            else
            {
                sql = `SELECT id FROM user_chapter_complete_status WHERE 
                academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                AND grade_id = ?
                AND section_id = (SELECT id FROM school_grade_section WHERE uuid = ?)
                AND subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                AND chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?)
                AND topic_id = (SELECT id FROM syllabus_grade_subject_chapter_topic 
                    WHERE syllabus_grade_subject_chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?))`
                
                topicUuid = chapterUuid
            }
            pool.query(sql, [acaUuid,gradeId,sectionUuid,subjectUuid,chapterUuid,topicUuid], (error, result)=>
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
};


db.checkCurrentAcademicYear = (acaUuid) => {
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = ``
           
                sql = `SELECT id FROM academic_year WHERE uuid = ? AND is_current = 1`
            
            
            pool.query(sql, [acaUuid], (error, result)=>
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
};

db.checkCurrentAcademicYearUpdate = (uuid) => {
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = ``
           
                sql = `SELECT IF (COUNT(id) > 0,1,0) AS Exist FROM academic_year WHERE id = (SELECT academic_year_id FROM user_chapter_complete_status 
                    WHERE uuid = ?)
                    AND is_current = 1`
            
            
            pool.query(sql, [uuid], (error, result)=>
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
};


module.exports = db

