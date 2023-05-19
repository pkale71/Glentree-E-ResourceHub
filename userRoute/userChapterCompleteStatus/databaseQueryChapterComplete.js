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
                WHERE syllabus_grade_subject_chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?) 
                AND UPPER(topic_name) = UPPER('All-Topics')))`
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
                    WHERE syllabus_grade_subject_chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?) AND UPPER(topic_name) = UPPER('All-Topics'))`
                
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


db.getUserChapterCompleteStatus = (acaUuid,userUuid,gradeId,subjectUuid,sectionUuid,chapterUuid) => {
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = ``
           if(chapterUuid)
           {
            sql = `SELECT distinct uccs.uuid,DATE_FORMAT(uccs.completed_on, '%m-%d-%Y') AS completed_on, uccs.is_completed, ay.uuid AS acaUuid, ay.year, g.id AS gradeId, g.name AS gradeName, 
            sgs.uuid AS sectionUuid, sgs.section AS sectionName, sygs.uuid AS subjectUuid, 
            sygs.subject_name AS subjectName, sgsc.chapter_name AS chapterName, sgsc.uuid AS chapterUuid,
            sgsct.uuid AS topicUuid, sgsct.topic_name AS topicName,
            u.uuid AS userUuid, TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name,''))) AS fullName
                        from user_chapter_complete_status uccs 
                        LEFT JOIN academic_year ay ON ay.id = uccs.academic_year_id
                        LEFT JOIN grade g ON g.id = uccs.grade_id
                        LEFT JOIN school_grade_section sgs ON sgs.id = uccs.section_id
                        LEFT JOIN syllabus_grade_subject sygs ON sygs.id = uccs.subject_id
                        LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = uccs.chapter_id
                        LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = uccs.topic_id
                        LEFT JOIN user u ON u.id = uccs.completed_by
                        WHERE uccs.grade_id = ?
                        AND uccs.academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                        AND uccs.completed_by = (SELECT id FROM user WHERE uuid = ?)
                        AND uccs.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                        AND uccs.section_id = (SELECT id FROM school_grade_section WHERE uuid = ?)
                        AND uccs.chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = ?)
                        ORDER BY  uccs.id`
           }
           else
           {
            sql = `SELECT distinct uccs.uuid,DATE_FORMAT(uccs.completed_on, '%m-%d-%Y') AS completed_on,uccs.is_completed, ay.uuid AS acaUuid, ay.year, g.id AS gradeId, g.name AS gradeName, 
            sgs.uuid AS sectionUuid, sgs.section AS sectionName, sygs.uuid AS subjectUuid, 
            sygs.subject_name AS subjectName, sgsc.chapter_name AS chapterName, sgsc.uuid AS chapterUuid,
            sgsct.uuid AS topicUuid, sgsct.topic_name AS topicName,
            u.uuid AS userUuid, TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name,''))) AS fullName
                        from user_chapter_complete_status uccs 
                        LEFT JOIN academic_year ay ON ay.id = uccs.academic_year_id
                        LEFT JOIN grade g ON g.id = uccs.grade_id
                        LEFT JOIN school_grade_section sgs ON sgs.id = uccs.section_id
                        LEFT JOIN syllabus_grade_subject sygs ON sygs.id = uccs.subject_id
                        LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = uccs.chapter_id
                        LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = uccs.topic_id
                        LEFT JOIN user u ON u.id = uccs.completed_by
                        WHERE uccs.grade_id = ?
                        AND uccs.academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                        AND uccs.completed_by = (SELECT id FROM user WHERE uuid = ?)
                        AND uccs.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                        AND uccs.section_id = (SELECT id FROM school_grade_section WHERE uuid = ?)
                        ORDER BY  uccs.id`
           }
               
            
            
            pool.query(sql, [gradeId,acaUuid,userUuid,subjectUuid,sectionUuid,chapterUuid], (error, result)=>
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

db.getUserType = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT user_type_id AS userTypeId, u.role_id AS roleId, ut.code 
            FROM user u
            LEFT JOIN user_type ut ON ut.id = u.user_type_id
            WHERE id = ?`, [id], (error, result) => 
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

module.exports = db

