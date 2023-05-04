let pool = require('../../databaseConnection/createconnection');
let db = {};
 
db.insertGradeSubject = (uuid, syllabusId, gradeId, name, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus_grade_subject (uuid, syllabus_id, grade_id, subject_name,is_active) VALUES (?, ?,?,?,?)", [uuid, syllabusId, gradeId, name, isActive], (error, result) => 
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
db.insertSubjectChapter = (uuid, syllabusGradeSubjectId, name, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO syllabus_grade_subject_chapters (uuid, syllabus_grade_subject_id,  chapter_name,is_active) VALUES (?, ?,?,?)", [uuid, syllabusGradeSubjectId, name, isActive], (error, result) => 
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
db.findSubject = (name,gradeId,syllabusId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(subject_name) AS Exist, grade_id FROM syllabus_grade_subject WHERE  grade_id = ? AND syllabus_id = ? AND UPPER(subject_name) LIKE UPPER(?)`, [gradeId,syllabusId,name], (error, result) => 
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

db.findSubjectChapter = (name,syllabusGradeSubjectId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(chapter_name) AS Exist FROM syllabus_grade_subject_chapters WHERE  syllabus_grade_subject_id = ? AND UPPER(chapter_name) LIKE UPPER(?)`, [syllabusGradeSubjectId,name], (error, result) => 
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

db.selectSubject = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM syllabus_grade_subject WHERE uuid = ?", [uuid], (error, result) => 
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
db.subjectStatusChange = (id) => {
    return new Promise((resolve, reject)=>{
        try{
            //console.log("p")
            pool.query('UPDATE syllabus_grade_subject set is_active = IF(is_active = 1,0,1) WHERE id = ?', [id], (error, result)=>{
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

db.checkUsedSubject = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(syllabus_grade_subject_id) AS Exist FROM syllabus_grade_subject_chapters WHERE   syllabus_grade_subject_id = ?`, [id], (error, result) => 
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

db.updateGradeSubject = (uuid, name) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE syllabus_grade_subject SET subject_name = ? WHERE uuid = ? ', [name,uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};

db.deleteGradeSubject = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM syllabus_grade_subject WHERE uuid = ?", [uuid], (error, result) => 
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

db.getGradeSubjects = (syllabusId,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgst.*, sy.name AS syllabusName, 
                        g.name AS gradeName, 
                        gc.id AS gradeCategoryId, gc.name AS gradeCatName
                        FROM syllabus_grade_subject sgst 
                        LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                        LEFT JOIN grade g ON g.id = sgst.grade_id 
                        LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                        WHERE sgst.syllabus_id = ?  AND sgst.grade_id = ?
                        ORDER BY sgst.id`,[syllabusId,gradeId],(error, result) => 
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

db.getGradeSchools = (syllabusId,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgst.*, sy.name AS syllabusName, 
                        g.name AS gradeName, 
                        gc.id AS gradeCategoryId, gc.name AS gradeCatName
                        FROM syllabus_grade_subject sgst 
                        LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                        LEFT JOIN grade g ON g.id = sgst.grade_id 
                        LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                        WHERE sgst.syllabus_id = ?  AND sgst.grade_id = ?
                        ORDER BY sgst.id`,[syllabusId,gradeId],(error, result) => 
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

db.getGradeSubjectDetails = (uuid , syllabusId,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT *
                        FROM syllabus_grade_subject 
                        WHERE syllabus_id = ?  AND grade_id = ? AND uuid = ?
                        `,[syllabusId,gradeId,uuid],(error, result) => 
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

db.returnUuidSubject = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid FROM syllabus_grade_subject WHERE  id = ? `, [id], (error, result) => 
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

db.getGradeSubject = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgst.*, sy.name AS syllabusName, 
                        g.name AS gradeName, 
                        gc.id AS gradeCategoryId, gc.name AS gradeCatName
                        FROM syllabus_grade_subject sgst 
                        LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                        LEFT JOIN grade g ON g.id = sgst.grade_id 
                        LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
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

db.getGradeSubjectList = (syllabusId,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {

            pool.query(`SELECT sgst.*, sy.name AS syllabusName, 
                        g.name AS gradeName, 
                        gc.id AS gradeCategoryId, gc.name AS gradeCatName
                        FROM syllabus_grade_subject sgst 
                        LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                        LEFT JOIN grade g ON g.id = sgst.grade_id 
                        LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                        WHERE sgst.syllabus_id = ? AND sgst.grade_id = ? 
                        ORDER BY sgst.id`,[syllabusId,gradeId],(error, result) => 
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

