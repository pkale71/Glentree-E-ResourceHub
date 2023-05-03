let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getAllSchools = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT distinct s.id,s.uuid , s.name, s.location , s.contact1, s.contact2, s.email,  s.curriculum_upload AS curriculumUpload, s.syllabus_id AS syllabusId,
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

db.getSchoolError = (uuid) => {
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

db.getSchool = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT s.id, s.uuid, s.name ,s.location, s.contact1, s.contact2, s.email ,s.syllabus_id AS syllabusId, s.created_on,s.created_by_id, s.curriculum_upload AS curriculumUpload, s.is_active, sy.name AS syllabusName,
            CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS createdByName FROM school s
            LEFT JOIN syllabus sy ON sy.id = s.syllabus_id 
            LEFT JOIN user u ON u.id = s.created_by_id
             WHERE s.uuid = ? ORDER BY s.id `, [uuid],(error, result) => 
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
db.getSchoolGradeCategory = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT sgc.id AS schoolGradeCategoryId, gc.name AS gradeName, gc.id AS gradeId from school_grade_category sgc LEFT JOIN grade_category gc ON gc.id = sgc.grade_category_id WHERE sgc.school_id = ? order by gc.id",[schoolId],(error, result) => 
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

db.getSchoolUserSetting = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT *, ut.name AS userTypeName, ut.code from school_user_setting su LEFT JOIN user_type ut ON ut.id = su.user_type_id WHERE su.school_id = ?",[schoolId],(error, result) => 
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

db.insertSchool = (schooUuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, isActive) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school (uuid, name, location, contact1, contact2, email, curriculum_upload, syllabus_id, created_on, created_by_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [schooUuid, name, location, contact1, contact2, email, curriculumUpload, syllabusId, createdOn, createdById, isActive], (error, result) => 
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

db.insertSchoolGradeCategory = (schoolId,gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school_grade_category (school_id, grade_category_id) VALUES (?, ?)", [schoolId,gradeCategoryId], (error, result) => 
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
db.insertSchoolUserSetting = (schoolUserSettingUuid,schoolId,userTypeId,canUpload,canVerify,canPublish) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school_user_setting (uuid,school_id,user_type_id , can_upload,can_verify,can_publish) VALUES (?, ?,?,?,?,?)", [schoolUserSettingUuid,schoolId,userTypeId,canUpload,canVerify,canPublish], (error, result) => 
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

db.selectSchool = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM school WHERE uuid = ?", [uuid], (error, result) => 
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
db.selectSchoolUid = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT uuid FROM school WHERE id = ?", [id], (error, result) => 
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

db.updateSchool = (schoolUuid, location, contact1, contact2, email, curriculumUpload, syllabusId) => {
    return new Promise((resolve, reject)=>{
        try{
            //console.log("p")
            pool.query('UPDATE school SET location = ?,contact1 = ?, contact2= ?, email= ?, curriculum_upload=?, syllabus_id = ? WHERE uuid = ?', [ location, contact1, contact2, email, curriculumUpload, syllabusId,schoolUuid], (error, result)=>{
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

db.updateSchoolUserSetting = (schoolUserSettingUuid,userTypeId,canUpload,canVerify,canPublish) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE school_user_setting SET user_type_id = ?,can_upload = ?, can_verify= ?, can_publish= ? WHERE uuid = ?', [ userTypeId,canUpload,canVerify,canPublish,schoolUserSettingUuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};
db.getSchoolGradeCategorySearch = (schoolId,searchString) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT  * from school_grade_category WHERE school_id = ? AND FIND_IN_SET(grade_category_id,?)= 0",[schoolId,searchString],(error, result) => 
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

db.getSchoolUserSettingUuid = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * from school_user_setting  WHERE school_id = ?",[schoolId],(error, result) => 
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

db.deleteSchoolUserSetting = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM school_user_setting WHERE uuid = ?", [uuid], (error, result) => 
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

db.deleteSchoolUserSettingId = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM school_user_setting WHERE school_id = ?", [schoolId], (error, result) => 
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

db.deleteSchoolGradeCategory = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM school_grade_category WHERE school_id = ?", [schoolId], (error, result) => 
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

db.getSchoolCurriculumSearch = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM curriculum_master  WHERE school_id IN (?);",[schoolId],(error, result) => 
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
db.getSchoolUserSearch = (schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("SELECT * FROM user  WHERE school_id IN (?)",[schoolId],(error, result) => 
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
db.schoolStatusChange = (id) => {
    return new Promise((resolve, reject)=>{
        try{
            //console.log("p")
            pool.query('UPDATE school set is_active = IF(is_active = 1,0,1) WHERE id = ?', [id], (error, result)=>{
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

db.insertSchoolUserSettingHistory = (schoolId,userTypeId, canUpload, canVerify, canPublish, action,createdOn, createdById) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school_user_setting_history (school_id, User_type_id, can_upload, can_verify, can_publish, action, created_on, created_by_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [schoolId,userTypeId, canUpload, canVerify, canPublish, action,createdOn, createdById], (error, result) => 
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

db.deleteSchool = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM school WHERE uuid = ?", [uuid], (error, result) => 
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
