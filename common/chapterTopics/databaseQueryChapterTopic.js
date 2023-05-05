let pool = require('../../databaseConnection/createconnection');
let db = {};
 

db.insertChapterTopic = (uuid, chapterId, name, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus_grade_subject_chapter_topic (uuid, syllabus_grade_subject_chapter_id,  topic_name,is_active) VALUES (?, ?,?,?)", [uuid, chapterId, name, isActive], (error, result) => 
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
db.findTopic = (name,chapterId,uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(UPPER(topic_name)) AS Exist FROM syllabus_grade_subject_chapter_topic WHERE  syllabus_grade_subject_chapter_id = ? AND UPPER(topic_name) LIKE UPPER(?) AND uuid NOT LIKE ?`, [chapterId,name,uuid], (error, result) => 
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


db.selectTopic = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM syllabus_grade_subject_chapter_topic WHERE uuid = ?", [uuid], (error, result) => 
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


db.getChapterTopicDetails = (uuid , chapterId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT *
                        FROM syllabus_grade_subject_chapter_topic 
                        WHERE syllabus_grade_subject_chapter_id = ? AND uuid = ?
                        `,[chapterId,uuid],(error, result) => 
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
db.returnUuidTopic = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid FROM syllabus_grade_subject_chapter_topic WHERE  id = ? `, [id], (error, result) => 
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

db.deleteChapterTopic = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus_grade_subject_chapter_topic  WHERE uuid = ?", [uuid], (error, result) => 
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

db.updateChapterTopic = (name,uuid, chapterId) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE syllabus_grade_subject_chapter_topic SET topic_name = ? WHERE uuid = ?  AND syllabus_grade_subject_chapter_id = ?', [name,uuid, chapterId], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};


db.getSubjectChapter = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgsc.id
                        FROM syllabus_grade_subject_chapter sgsc 
                        WHERE sgsc.uuid = ? AND is_active = 1
                        ORDER BY sgsc.id`,[uuid],(error, result) => 
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

db.getChapterTopics = (id,uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ``
            if(id){
                sql = `select sgsct.*, sgsc.uuid AS chapterUuid, sgsc.chapter_name, sgsc.is_active AS chapterIsActive,
                (SELECT IF(COUNT(cm.id)> 0,1,0) FROM curriculum_master cm
               WHERE cm.topic_id = sgsct.id ) AS isExist,
                               sgst.uuid AS subUuid,sgst.is_active AS subIsActive,
                               sgst.grade_id, sgst.syllabus_id, sgst.subject_name , 
                               sy.name AS syllabusName, 
                               g.name AS gradeName
                               from syllabus_grade_subject_chapter_topic sgsct
                               LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = sgsct.syllabus_grade_subject_chapter_id
                               LEFT JOIN syllabus_grade_subject sgst ON sgsc.syllabus_grade_subject_id = sgst.id
                               LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                               LEFT JOIN grade g ON g.id = sgst.grade_id 
                               LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                               where sgsct.syllabus_grade_subject_chapter_id = ?
                               ORDER BY sgsct.id`
            }
            else 
            {
                sql = `select sgsct.*, sgsc.uuid AS chapterUuid, sgsc.chapter_name, sgsc.is_active AS chapterIsActive,
                (SELECT IF(COUNT(cm.id)> 0,1,0) FROM curriculum_master cm
               WHERE cm.topic_id = sgsct.id ) AS isExist,
                               sgst.uuid AS subUuid,sgst.is_active AS subIsActive,
                               sgst.grade_id, sgst.syllabus_id, sgst.subject_name , 
                               sy.name AS syllabusName, 
                               g.name AS gradeName
                               from syllabus_grade_subject_chapter_topic sgsct
                               LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = sgsct.syllabus_grade_subject_chapter_id
                               LEFT JOIN syllabus_grade_subject sgst ON sgsc.syllabus_grade_subject_id = sgst.id
                               LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                               LEFT JOIN grade g ON g.id = sgst.grade_id 
                               LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                               where sgsct.uuid = ?
                               ORDER BY sgsct.id`
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

db.checkChapterTopicUsed = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = `SELECT IF(COUNT(cm.id)> 0,1,0) AS isExist FROM curriculum_master cm 
            WHERE cm.topic_id = ? `
            pool.query(sql,[id],(error, result) => 
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


db.topicStatusChange = (id) => {
    return new Promise((resolve, reject)=>{
        try{
            //console.log("p")
            pool.query('UPDATE syllabus_grade_subject_chapter_topic set is_active = IF(is_active = 1,0,1) WHERE id = ?', [id], (error, result)=>{
                if(error){
                    return reject(error);
                }
               // console.log("e")
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};



module.exports = db

