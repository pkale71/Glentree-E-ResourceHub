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

db.getCurriculumUpload = (uuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT cu.uuid, cu.file_name AS fileName, cu.is_active, cu.is_published, cu.is_rejected, cu.is_verified, cu.material_type_id, 
              mt.uuid AS materialUuid, mt.name AS materialName, cu.uploaded_on AS uploadedOn,
              cu.rejected_on AS rejectOn, cu.published_on AS publishOn,
              cu.verified_on AS verifyOn, cu.uploaded_by_id AS uploadId, uu.uuid AS uploadUuid,
              TRIM(CONCAT(uu.first_name,' ',IFNULL(uu.last_name,''))) AS uploadName,  cu.verified_by_id AS verifyId, uv.uuid AS verifyUuid,
              TRIM(CONCAT(uv.first_name,' ',IFNULL(uv.last_name,''))) AS verifyName, cu.published_by_id AS publishedId, up.uuid AS publishUuid,
              TRIM(CONCAT(up.first_name,' ',IFNULL(up.last_name,''))) AS publishName,  cu.rejected_by_id AS rejectId, ur.uuid AS rejectUuid,
              TRIM(CONCAT(ur.first_name,' ',IFNULL(ur.last_name,''))) AS rejectName, (SELECT COUNT(c.id) FROM curriculum_upload c WHERE c.curriculum_id = cu.curriculum_id) AS isExist,
              cu.curriculum_id, cm.uuid AS curriculumUuid, cm.academic_year_id, ay.uuid AS acaUuid, ay.year AS acaYear, s.uuid AS schoolUuid, s.name AS schoolName,
              g.id AS gradeId, g.name AS gradeName, sgs.uuid AS subjectUuid, sgs.subject_name AS subjectName, sgsc.uuid AS chapterUuid, sgsc.chapter_name AS chapterName,
              sgsct.uuid AS topicUuid, sgsct.topic_name AS topicName, IF((cu.is_active = 1 AND cu.is_verified IS NULL AND cu. is_published IS NULL 
                AND cu.is_rejected IS NULL ), 'Uploaded', IF((cu.is_active = 1 AND cu.is_verified = 1 AND cu. is_published IS NULL AND cu.is_rejected IS NULL), 'Verified',
                IF((cu.is_active = 1 AND cu.is_verified = 1 AND cu. is_published = 1 AND cu.is_rejected IS NULL), 'Published',
                IF((cu.is_active = 0 AND cu.is_rejected = 1), 'Rejected', 'Not Known')) )) AS Status
                             FROM curriculum_upload cu
                             LEFT JOIN material_type mt ON mt.id = cu.material_type_id
                             LEFT JOIN user uu ON uu.id = cu.uploaded_by_id
                             LEFT JOIN user uv ON uv.id = cu.verified_by_id
                             LEFT JOIN user up ON up.id = cu.published_by_id
                             LEFT JOIN user ur ON ur.id = cu.rejected_by_id
                             LEFT JOIN curriculum_master cm ON cm.id = cu.curriculum_id
                             LEFT JOIN academic_year ay ON ay.id = cm.academic_year_id
                             LEFT JOIN school s ON s.id = cm.school_id
                             LEFT JOIN grade g ON g.id = cm.grade_id
                              LEFT JOIN syllabus_grade_subject sgs ON sgs.id = cm.subject_id
                             LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = cm.chapter_id
                             LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = cm.topic_id
                             WHERE cu.uuid = '${uuid}'`;
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

db.getUserCode = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT ut.code AS userTypeCode 
              FROM user_type ut 
              LEFT JOIN user u ON u.user_type_id = ut.id
              WHERE u.id = ${id}`;
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

db.getUserGrade = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT grade_id FROM user_supervise_grade WHERE user_id = ${id};`;
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

db.getUserSubject = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT subject_id FROM user_supervise_grade_subject WHERE user_id = ${id};`;
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

db.getUserSection = (id) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
              let  sql = `SELECT section_id FROM user_teach_subject_section WHERE user_id = ${id};`;
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

db.getCurriculumUploads = (acaUuid, gradeId, subjectUuid, chapterUuid, topicUuid, schoolUuid, gradeIds, subjectIds, sectionIds) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            let  sql = `SELECT cu.uuid, cu.file_name AS fileName, cu.is_active, cu.is_published, cu.is_rejected, cu.is_verified, cu.material_type_id, 
            mt.uuid AS materialUuid, mt.name AS materialName, cu.uploaded_on AS uploadedOn,
            cu.rejected_on AS rejectOn, cu.published_on AS publishOn,
            cu.verified_on AS verifyOn, cu.uploaded_by_id AS uploadId, uu.uuid AS uploadUuid,
            TRIM(CONCAT(uu.first_name,' ',IFNULL(uu.last_name,''))) AS uploadName,  cu.verified_by_id AS verifyId, uv.uuid AS verifyUuid,
            TRIM(CONCAT(uv.first_name,' ',IFNULL(uv.last_name,''))) AS verifyName, cu.published_by_id AS publishedId, up.uuid AS publishUuid,
            TRIM(CONCAT(up.first_name,' ',IFNULL(up.last_name,''))) AS publishName,  cu.rejected_by_id AS rejectId, ur.uuid AS rejectUuid,
            TRIM(CONCAT(ur.first_name,' ',IFNULL(ur.last_name,''))) AS rejectName, (SELECT IF(COUNT(c.id) > 0, 1, 0) FROM curriculum_upload c WHERE c.curriculum_id = cu.curriculum_id) AS isExist,
            cu.curriculum_id, cm.uuid AS curriculumMasterUuid, cm.academic_year_id, ay.uuid AS acaUuid, ay.year AS acaYear, s.uuid AS schoolUuid, s.name AS schoolName,
            g.id AS gradeId, g.name AS gradeName, sgs.uuid AS subjectUuid, sgs.subject_name AS subjectName, sgsc.uuid AS chapterUuid, sgsc.chapter_name AS chapterName,
            sgsct.uuid AS topicUuid, sgsct.topic_name AS topicName,
            IF((cu.is_active = 1 AND cu.is_verified IS NULL AND cu. is_published IS NULL 
                AND cu.is_rejected IS NULL ), 'Uploaded', 
                IF((cu.is_active = 1 AND cu.is_verified = 1 AND cu. is_published IS NULL AND cu.is_rejected IS NULL), 'Verified',
                IF((cu.is_active = 1 AND cu.is_verified = 1 AND cu. is_published = 1 AND cu.is_rejected IS NULL), 'Published',
                IF((cu.is_active = 0 AND cu.is_rejected = 1), 'Rejected', 'Not Known')) )) AS Status
            FROM curriculum_upload cu
            LEFT JOIN material_type mt ON mt.id = cu.material_type_id
            LEFT JOIN user uu ON uu.id = cu.uploaded_by_id
            LEFT JOIN user uv ON uv.id = cu.verified_by_id
            LEFT JOIN user up ON up.id = cu.published_by_id
            LEFT JOIN user ur ON ur.id = cu.rejected_by_id
            LEFT JOIN curriculum_master cm ON cm.id = cu.curriculum_id
            LEFT JOIN academic_year ay ON ay.id = cm.academic_year_id
            LEFT JOIN school s ON s.id = cm.school_id
            
            `;

            if(sectionIds.length > 0)
            {
                sql = sql + ` LEFT JOIN school_grade_section sgc ON sgc.school_id = s.id 
                `
            }

            sql = sql + ` LEFT JOIN grade g ON g.id = cm.grade_id
            LEFT JOIN syllabus_grade_subject sgs ON sgs.id = cm.subject_id
            LEFT JOIN syllabus_grade_subject_chapter sgsc ON sgsc.id = cm.chapter_id
            LEFT JOIN syllabus_grade_subject_chapter_topic sgsct ON sgsct.id = cm.topic_id
            WHERE ay.uuid = '${acaUuid}' AND s.uuid = '${schoolUuid}'  `
            
            if(parseInt(gradeId))
            {
                sql = sql + ` AND g.id = ${gradeId}`
            }

            if(subjectUuid.length > 1)
            {
                sql = sql + ` AND sgs.uuid = '${subjectUuid}'`
            }

            if(chapterUuid.length > 1)
            {
                sql = sql + ` AND sgsc.uuid = '${chapterUuid}'`
            }

            if(topicUuid.length > 1)
            {
                sql = sql + ` AND sgsct.uuid = '${topicUuid}'`
            }

            if(gradeIds.length > 0)
            {
                sql = sql + ` AND g.id IN (${gradeIds})`
            }

            if(subjectIds.length > 0)
            {
                sql = sql + ` AND sgs.id IN (${subjectIds})`
            }

            if(sectionIds.length > 0)
            {
                sql = sql + ` AND sgc.id IN (${sectionIds})`
            }

            sql = sql + ` ORDER BY cu.uploaded_on DESC;`

            //console.log(sql)
                
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
