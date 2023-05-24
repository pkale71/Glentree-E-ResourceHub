let pool = require('../databaseConnection/createconnection');
let db = {};
 
db.getChapterCompleteStatuses = (acaUuid,gradeId,subjectUuid,chapterUuid) => 
{
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = ``
            if(chapterUuid)
            {
                sql = `SELECT uccs.uuid, DATE_FORMAT(uccs.completed_on, '%m-%d-%Y') AS completed_on, uccs.is_completed,
                sgsc.uuid AS chapterUuid, sgsc.chapter_name, sgsc.id AS chapterId, sgsct.id, sgsct.uuid AS topicUuid, sgsct.topic_name,
                sgs.uuid AS sectionUuid, sgs.section, u.uuid AS userUuid, TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name,''))) AS fullName
                FROM user_chapter_complete_status uccs
                LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = uccs.chapter_id
                LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = uccs.topic_id
                LEFT JOIN school_grade_section sgs ON sgs.id = uccs.section_id
                LEFT JOIN user u ON u.id = uccs.completed_by
                WHERE uccs.grade_id = ?
                AND uccs.academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                AND uccs.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                AND sgsc.uuid = ?
                ORDER BY sgsc.id`
            }
            else
            {
                sql = `SELECT uccs.uuid, DATE_FORMAT(uccs.completed_on, '%m-%d-%Y') AS completed_on, uccs.is_completed,
                sgsc.uuid AS chapterUuid, sgsc.chapter_name, sgsc.id AS chapterId, sgsct.id, sgsct.uuid AS topicUuid, sgsct.topic_name,
                sgs.uuid AS sectionUuid, sgs.section, u.uuid AS userUuid, TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name,''))) AS fullName
                FROM user_chapter_complete_status uccs
                LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = uccs.chapter_id
                LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = uccs.topic_id
                LEFT JOIN school_grade_section sgs ON sgs.id = uccs.section_id
                LEFT JOIN user u ON u.id = uccs.completed_by
                WHERE uccs.grade_id = ?
                AND uccs.academic_year_id = (SELECT id FROM academic_year WHERE uuid = ?)
                AND uccs.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
                ORDER BY sgsc.id`
            }
            pool.query(sql,[gradeId,acaUuid,subjectUuid,chapterUuid],(error, result) => 
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

db.deleteGradeCategory = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus WHERE id = ?", [id], (error, result) => 
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

db.insertGrade = (name, gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO grade (name, grade_category_id) VALUES (?, ?)", [name, gradeCategoryId], (error, result) => 
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

db.selectTopicsIds = (acaUuid,subjectUuid,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT distinct sgsct.id, sgsc.id AS chapterId 
            FROM user_chapter_complete_status uccs
            LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = uccs.chapter_id
            LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = uccs.topic_id
            WHERE uccs.grade_id = 1
            AND uccs.academic_year_id = (SELECT id FROM academic_year WHERE uuid = '56ffab7b-e33b-11ed-9f9d-c4346b527e08')
            AND uccs.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = 'aa3f0170-e417-11ed-b74b-6f7650aff17f')
            ORDER BY sgsc.id`, [gradeId,acaUuid,subjectUuid], (error, result) => 
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

db.checkGradeUsed = (id) => {
    return new Promise((resolve, reject)=>{
        try{pool.query(`SELECT (SELECT COUNT(grade_id)  FROM syllabus_grade_subject 
        WHERE grade_id = ?)  AS Exist,  COUNT(grade_id) AS isExist  FROM  school_grade_section 
        WHERE grade_id = ?`, [id,id], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
}



db.updateGrade = (id,name, gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("UPDATE grade SET name = ?, grade_category_id = ? WHERE id = ?", [name, gradeCategoryId, id], (error, result) => 
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

db.deleteGrade = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM grade WHERE id = ?", [id], (error, result) => 
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

db.checkGradeExist = (name,gradeCategoryId,id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ``
            if(id)
            {
                sql = `SELECT COUNT(id) AS Exist FROM grade WHERE grade_category_id = ? AND UPPER(name) LIKE UPPER(?) AND id != ?`
            }
            else
            {
                sql = `SELECT COUNT(id) AS Exist FROM grade WHERE grade_category_id = ? AND UPPER(name) LIKE UPPER(?)`
            }
            pool.query(sql, [gradeCategoryId,name,id], (error, result) => 
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

