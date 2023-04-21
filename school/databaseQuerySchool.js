let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getAllSchools = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT s.id,s.uuid , s.name, s.location , s.contact1, s.contact2, s.email, s.curriculum_upload, s.syllabus_id AS syllabusId, sy.name AS syllabusName, s.grade_category_id AS gradeCategoryId, gc.name AS gradeCategoryName, s.created_on, s.created_by_id, CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS createdByName, s.is_active, su.uuid AS schoolUserSettingUuid, su.can_upload AS schoolUserSettingUpload, su.can_verify AS schoolUserSettingVerify, su.can_publish AS schoolUserSettingPublish, su.user_type_id AS userTypeId, ut.name AS userTypeName FROM school s LEFT JOIN syllabus sy  ON sy.id = s.syllabus_id LEFT JOIN grade_category gc ON gc.id = s.grade_category_id LEFT JOIN user u ON u.id = s.created_by_id LEFT JOIN school_user_setting su ON su.school_id = s.id LEFT JOIN user_type ut ON ut.id = su.user_type_id ",(error, result) => 
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

db.getSchools = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM school",(error, result) => 
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

