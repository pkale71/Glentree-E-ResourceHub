let pool = require('../databaseConnection/createconnection')
let db = {};
 

db.insertUser = (userUuid,firstName,lastName,email,password,gender,userId,userTypeId,roleId,mobile,schoolId,createdOn) => {
    return new Promise((resolve, reject)=>{
        try{
            pool.query('INSERT INTO user (uuid,first_name,last_name, role_id, user_type_id,mobile,email,gender,school_id,password,is_active,created_on,created_by_id) VALUES (?,  ?, ?, ?,  ?,  ?,  ?,  ?,  ?,  ?  ,?  ,?  ,?  )', [userUuid,firstName,lastName,roleId,userTypeId,mobile,email,gender,schoolId,password,1,createdOn,userId], (error, result)=>{
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

db.deleteUser = (uuid,userId,deletedOn) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE user SET is_active=?, deleted_on=?, deleted_by_id=? WHERE uuid = ?', [0,deletedOn,userId,uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }
        catch(e){
            console.log(e)
        }
      
    });
};
 
 
db.updateUser = (uuid,firstName,lastName,gender,userTypeId,schoolId, email, mobile) =>{
    return new Promise((resolve, reject)=>{
        try{
            pool.query('UPDATE user SET first_name = ?,last_name = ?, user_type_id= ?, gender= ?, school_id=?, email = ?, mobile = ? WHERE uuid = ?', [firstName,lastName,userTypeId,gender,schoolId, email, mobile,uuid], (error, result)=>{
                if(error){
                    return reject(error);
                }
                 
                  return resolve(result);
            });
        }
        catch(e){ console.log(e)}
       
    });
};

db.getUsers = (roleId,userTypeId) =>{
    return new Promise((resolve, reject)=>{
        let sql = ``
        if(userTypeId && roleId){
            sql = `SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName, u.first_name,
            u.last_name, u.role_id, u.gender, r.name AS role_name, u.user_type_id, u.email, u.mobile, u.last_login,
            u.password, u.id, ut.name AS user_type_name, ut.code AS user_type_code, u.is_active AS isActive,
            u.created_by_id AS createdById, u.deleted_by_id, uc.uuid AS createdbyUuid, 
            CONCAT(uc.first_name,' ',IFNULL(uc.last_name,'')) AS createdfullName, ud.uuid AS deletedbyUuid,
            CONCAT(ud.first_name,' ',IFNULL(ud.last_name,'')) AS deletedfullName, s.uuid AS schoolUuid,
            s.name AS schoolName 
            FROM user u 
            LEFT JOIN role r ON u.role_id = r.id 
            LEFT JOIN user_type ut ON ut.id = u.user_type_id  
            LEFT JOIN user uc ON (u.created_by_id = uc.id) 
            LEFT JOIN user ud ON (u.deleted_by_id = ud.id) 
            LEFT JOIN school s ON (s.id = u.school_id) 
            WHERE u.id != 1 AND u.is_active = 1 AND u.role_id = ? AND u.user_type_id = ?
            ORDER BY u.id`
        }
        else if(roleId)
        {
            sql = `SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName, u.first_name,
            u.last_name, u.role_id, u.gender, r.name AS role_name, u.user_type_id, u.email, u.mobile, u.last_login,
            u.password, u.id, ut.name AS user_type_name, ut.code AS user_type_code, u.is_active AS isActive,
            u.created_by_id AS createdById, u.deleted_by_id, uc.uuid AS createdbyUuid, 
            CONCAT(uc.first_name,' ',IFNULL(uc.last_name,'')) AS createdfullName, ud.uuid AS deletedbyUuid,
            CONCAT(ud.first_name,' ',IFNULL(ud.last_name,'')) AS deletedfullName, s.uuid AS schoolUuid,
            s.name AS schoolName 
            FROM user u 
            LEFT JOIN role r ON u.role_id = r.id 
            LEFT JOIN user_type ut ON ut.id = u.user_type_id  
            LEFT JOIN user uc ON (u.created_by_id = uc.id) 
            LEFT JOIN user ud ON (u.deleted_by_id = ud.id) 
            LEFT JOIN school s ON (s.id = u.school_id) 
            WHERE u.id != 1 AND u.is_active = 1 AND u.role_id = ?
            ORDER BY u.id`
        }
        else{
            sql = `SELECT u.uuid,CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName, u.first_name,
            u.last_name, u.role_id, u.gender, r.name AS role_name, u.user_type_id, u.email, u.mobile, u.last_login,
            u.password, u.id, ut.name AS user_type_name, ut.code AS user_type_code, u.is_active AS isActive,
            u.created_by_id AS createdById, u.deleted_by_id, uc.uuid AS createdbyUuid, 
            CONCAT(uc.first_name,' ',IFNULL(uc.last_name,'')) AS createdfullName, ud.uuid AS deletedbyUuid,
            CONCAT(ud.first_name,' ',IFNULL(ud.last_name,'')) AS deletedfullName, s.uuid AS schoolUuid,
            s.name AS schoolName 
            FROM user u 
            LEFT JOIN role r ON u.role_id = r.id 
            LEFT JOIN user_type ut ON ut.id = u.user_type_id  
            LEFT JOIN user uc ON (u.created_by_id = uc.id) 
            LEFT JOIN user ud ON (u.deleted_by_id = ud.id) 
            LEFT JOIN school s ON (s.id = u.school_id) 
            WHERE u.id != 1 AND u.is_active = 1
            ORDER BY u.id`
        }
        try{pool.query(sql,[roleId, userTypeId], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
    };


db.getUser = (uuid) => {
        return new Promise((resolve, reject) => {
            try{
                pool.query(`SELECT u.uuid, CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS fullName, u.first_name, u.last_name,u.gender, u.role_id,r.name AS role_name, u.user_type_id,u.email,u.mobile,  u.last_login,u.password,u.id,ut.name AS user_type_name,ut.code AS user_type_code, u.is_active AS isActive, u.created_by_id AS createdById, u.deleted_by_id,uc.uuid AS createdbyUuid, CONCAT(uc.first_name,' ',IFNULL(uc.last_name,'')) AS createdfullName, ud.uuid AS deletedbyUuid, CONCAT(ud.first_name,' ',IFNULL(ud.last_name,'')) AS deletedfullName, s.uuid AS schoolUuid, s.name AS schoolName  
                FROM user u 
                LEFT JOIN role r ON u.role_id = r.id 
                LEFT JOIN user_type ut ON ut.id = u.user_type_id  
                LEFT JOIN user uc ON (u.created_by_id = uc.id) 
                LEFT JOIN user ud ON (u.deleted_by_id = ud.id) 
                LEFT JOIN school s ON (s.id = u.school_id) 
                WHERE u.id !=1 AND u.uuid = ?`,[uuid] ,(error, result)=>{
                if(error){
                return reject(error);
                 }          
                return resolve(result);
                });
            }
            catch(e){ console.log(e)}
            
        });
    }; 

    db.userStatusChange = (uuid) => {
        return new Promise((resolve, reject)=>{
            try{
                //console.log("p")
                pool.query('UPDATE user set is_active = IF(is_active = 1,0,1) WHERE uuid = ?', [uuid], (error, result)=>{
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

    db.selectSchool = (uuid) => {
        return new Promise((resolve, reject)=>{
            try
            {
                pool.query("SELECT id FROM school WHERE uuid = ?", [uuid], (error, result) => 
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


    db.getUserUuid = (id) => {
        return new Promise((resolve, reject)=>{
            try
            {
                pool.query("SELECT uuid FROM user WHERE id = ?", [id], (error, result) => 
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
    
                pool.query(`SELECT sgst.id
                            FROM syllabus_grade_subject sgst 
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

    db.getSubjectChapters = (uuid) => {
        return new Promise((resolve, reject)=>{
            try
            {
                
                  let  sql = `select sgsc.*, (SELECT IF(COUNT(sgsct.id)> 0,1,0) FROM syllabus_grade_subject_chapter_topic sgsct 
                  WHERE sgsct.syllabus_grade_subject_chapter_id = sgsc.id
                  AND sgsct.topic_name NOT LIKE 'All-Topics' ) AS isExist,
                  sgst.uuid AS subUuid,sgst.is_active AS subIsActive,
                  sgst.grade_id, sgst.syllabus_id, sgst.subject_name , 
                  sy.name AS syllabusName, 
                  g.name AS gradeName
                  from syllabus_grade_subject_chapter sgsc
                  LEFT JOIN syllabus_grade_subject sgst ON sgsc.syllabus_grade_subject_id = sgst.id
                  LEFT JOIN syllabus sy ON sy.id = sgst.syllabus_id
                  LEFT JOIN grade g ON g.id = sgst.grade_id 
                  LEFT JOIN grade_category gc ON gc.id = g.grade_category_id
                  where sgsc.syllabus_grade_subject_id = (SELECT sgst.id
                          FROM syllabus_grade_subject sgst 
                          WHERE sgst.uuid = ?
                          ORDER BY sgst.id)
                  AND sgsc.is_active = 1
                  ORDER BY sgsc.id`
                
                
                pool.query(sql,[uuid],(error, result) => 
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

    db.getChapterTopics = (uuid) => {
        return new Promise((resolve, reject)=>{
            try
            {
                let sql = `select sgsct.*, sgsc.uuid AS chapterUuid, sgsc.chapter_name, sgsc.is_active AS chapterIsActive,
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
            where sgsct.syllabus_grade_subject_chapter_id = (SELECT sgsc.id
                    FROM syllabus_grade_subject_chapter sgsc 
                    WHERE sgsc.uuid = ? )
            AND sgsct.is_active = 1  AND sgsct.topic_name NOT LIKE 'All-Topics'
            ORDER BY sgsct.id`
             
                pool.query(sql,[uuid],(error, result) => 
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