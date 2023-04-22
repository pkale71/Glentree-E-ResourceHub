let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getAllSchools = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT distinct s.id,s.uuid , s.name, s.location , s.contact1, s.contact2, s.email, s.curriculum_upload, s.syllabus_id AS syllabusId,
            sy.name AS syllabusName, s.created_on, s.created_by_id, 
            CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS createdByName, s.is_active
            FROM school s 
            LEFT JOIN syllabus sy ON sy.id = s.syllabus_id 
            LEFT JOIN user u ON u.id = s.created_by_id
            ORDER BY s.id`,(error, result) => 
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

db.getSchool = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT JSON_OBJECT('id',s.id,'uuid',s.uuid , 'name', s.name, 'location', s.location, 'contact1', s.contact1, 'contact2', s.contact2, 
            'email', s.email, 'curriculumUpload', s.curriculum_upload, 
            'syllabus', JSON_OBJECT('id', s.syllabus_id, 'name', sy.name), 
            'gradeCategory',( SELECT JSON_ARRAYAGG(JSON_OBJECT('id', sgc.grade_category_id, 'name', gc.name))), 
            'schoolUserSetting',( SELECT JSON_ARRAYAGG(JSON_OBJECT('uuid', su.uuid, 'userType', JSON_OBJECT('id',su.user_type_id,
            'name', ut.name , 'code',ut.code),'canUpload',su.can_upload,'canVerify',su.can_verify,'canPublish',su.can_publish))),
            'createdOn', s.created_on, 'createdBy', JSON_OBJECT('id',s.created_by_id,
            'fullName', CONCAT(u.first_name,' ',IFNULL(u.last_name,''))), 'active', s.is_active)
             FROM school s 
             LEFT JOIN syllabus sy ON sy.id = s.syllabus_id 
             LEFT JOIN user u ON u.id = s.created_by_id
             LEFT JOIN school_user_setting su ON su.school_id = s.id
             LEFT JOIN user_type ut ON ut.id = su.user_type_id
             LEFT JOIN school_grade_category sgc ON sgc.school_id = s.id
             LEFT JOIN grade_category gc ON sgc.grade_category_id = gc.id  WHERE s.uuid = ?
             ORDER BY s.id, sgc.id `, [uuid],(error, result) => 
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

db.deleteSchools = (id) => {
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

db.insertSchool = (uuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, isActive, gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school (uuid, name, location, contact1, contact2, email, curriculum_upload, syllabus_id, created_on, created_by_id, is_active, grade_category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, isActive, gradeCategoryId], (error, result) => 
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

db.selectSchool = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM school WHERE syllabus_id = ?", [id], (error, result) => 
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

