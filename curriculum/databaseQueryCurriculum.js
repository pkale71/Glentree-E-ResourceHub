let pool = require('../databaseConnection/createconnection')
let db = {};


db.getMimeTypesFromFileTypes = (ids) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT mime_type FROM file_types WHERE id IN (${ids})`;
            pool.query(sql,(error, result) => 
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

db.getMaterialFileType = (MaterialTypeUuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT file_type_ids FROM material_type WHERE uuid = '${MaterialTypeUuid}'`;
            pool.query(sql,(error, result) => 
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

db.insertCurriculumMaster = (uuid, academicYearUuid, schoolUuid, gradeId, gradeSubjectUuid, subjectChapterUuid, createdOn, createdById, chapterTopicUuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `INSERT INTO curriculum_master (uuid, academic_year_id, school_id, grade_id, subject_id, chapter_id, created_on, created_by, topic_id) values 
              ('${uuid}', (SELECT id FROM academic_year WHERE uuid = '${academicYearUuid}'), (SELECT id FROM school WHERE uuid = '${schoolUuid}'), ${gradeId},
               (SELECT id FROM syllabus_grade_subject WHERE uuid = '${gradeSubjectUuid}'), 
              (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = '${subjectChapterUuid}'), ?, ${createdById}, `;

              if(chapterTopicUuid?.length > 1)
              {
                sql = sql + `(SELECT id FROM syllabus_grade_subject_chapter_topic WHERE uuid = '${chapterTopicUuid}'))`
              }
              else
              {
                sql = sql + `(SELECT id FROM syllabus_grade_subject_chapter_topic WHERE syllabus_grade_subject_chapter_id = (SELECT id FROM syllabus_grade_subject_chapter WHERE uuid = '${subjectChapterUuid}')))`
              }
              console.log(sql)
            pool.query(sql, [createdOn], (error, result) => 
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

db.insertCurriculumUploads = (uuid, curriculumId, MaterialTypeUuid, fileName, isActive, uploadedOn, uploadedById) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `INSERT INTO curriculum_upload (uuid, curriculum_id, material_type_id, file_name, is_active, uploaded_on, uploaded_by_id) values 
              ('${uuid}', ${curriculumId}, (SELECT id FROM material_type WHERE uuid = '${MaterialTypeUuid}'), '${fileName}', ${isActive}, ?, ${uploadedById})`;

            pool.query(sql, [uploadedOn], (error, result) => 
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

db.getCurriculumMasterUuid = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT uuid FROM curriculum_master WHERE id = ${id}`;
            pool.query(sql,(error, result) => 
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

db.getCurriculumUploadUuid = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT uuid FROM curriculum_upload WHERE id = ${id}`;
            pool.query(sql,(error, result) => 
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

db.deleteCurriculumUpload = (curriculumId) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `DELETE FROM curriculum_upload WHERE curriculum_id = ${curriculumId}`;
            pool.query(sql,(error, result) => 
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

db.deleteCurriculumUploadByUuid = (uuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `DELETE FROM curriculum_upload WHERE uuid = '${uuid}'`;
            pool.query(sql,(error, result) => 
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

db.deleteCurriculumMaster = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `DELETE FROM curriculum_master WHERE id = ${id}`;
            pool.query(sql,(error, result) => 
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

db.getFileName = (uuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT cu.file_name AS fileName, cu.material_type_id, cu.curriculum_id,
              (SELECT COUNT(c.id) FROM curriculum_upload c WHERE c.curriculum_id = cu.curriculum_id) AS Exist
               FROM curriculum_upload cu WHERE cu.uuid = '${uuid}'`;
            pool.query(sql,(error, result) => 
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
