let pool = require('../../databaseConnection/createconnection');
const gradeCategory = require('../../models/gradeCategory');
let db = {};

db.getGradeSections = (academicId,schoolId,gradeId,gradeCategoryId,ele) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = '';
            if(gradeId > 0)
            {
                sql = `SELECT sgs.*, ay.uuid AS acaUuid, ay.year, s.name AS schoolName ,s.uuid AS schoolUuid,
                g.name AS gradeName, 
                gc.id AS gradeCategoryId, gc.name AS gradeCatName,
                (SELECT IF(COUNT(section_id)> 0,1,0) FROM user_teach_subject_section WHERE sgs.id = section_id) AS isExist
                FROM school_grade_section sgs 
                LEFT JOIN academic_year ay ON ay.id = sgs.academic_year_id
                LEFT JOIN school s ON s.id = sgs.school_id 
                LEFT JOIN grade g ON g.id = sgs.grade_id 
                LEFT JOIN grade_category gc ON gc.id = g.grade_category_id 
                WHERE sgs.academic_year_id = ? 
                AND sgs.school_id = ? 
                AND sgs.grade_id IN (SELECT id from grade where grade_category_id = ?) 
                AND sgs.grade_id = ?
                ORDER BY g.id, sgs.grade_id, sgs.id`;
            }
            else
            {
                sql = `SELECT sgs.*, ay.uuid AS acaUuid, ay.year, s.name AS schoolName ,s.uuid AS schoolUuid,
                g.name AS gradeName,
                (SELECT IF(COUNT(section_id)> 0,1,0) FROM user_teach_subject_section WHERE sgs.id = section_id) AS isExist
                FROM school_grade_section sgs 
                LEFT JOIN academic_year ay ON ay.id = sgs.academic_year_id
                LEFT JOIN school s ON s.id = sgs.school_id 
                LEFT JOIN grade g ON g.id = sgs.grade_id 
                WHERE  sgs.academic_year_id = ?  
                AND sgs.school_id = ? 
                AND sgs.grade_id IN (SELECT id from grade where grade_category_id = ?)
                ORDER BY g.id, sgs.grade_id, sgs.id`;
            }
                
            
            pool.query(sql,[academicId,schoolId,gradeCategoryId,gradeId],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                } 
                // if(ele){
                //     if(result.length == 0){
                //         result.push({"grade_id": ele.ele.id, 
                //         "gradeName" : ele.ele.name,
                //         'acaUuid' : ele.academic[0].uuid,
                //         "year" : ele.academic[0].year, 
                //         'schoolUuid' : ele.school[0].uuid,
                //         'schoolName' : ele.school[0].name,
                //         'gradeCategoryId' : ele.gradeCategory[0].id,
                //         'gradeCatName' : ele.gradeCategory[0].name,
                //          })
                //         return resolve(result);
                //     }   else{
                //         return resolve(result);
                //     } 
                // } 
                //   else {
                //     return resolve(result); 
                //   }
                // return resolve(result); 
                return resolve(result)
            });
        }
        catch(e){ console.log(e)}
        
    });
}

db.getSections = (academicId,schoolId,gradeId) => 
{
    return new Promise((resolve, reject)=>
    {
        try
        {
            let sql = `SELECT sgs.uuid, sgs.section, g.name AS gradeName, sgs.grade_id,
            (SELECT IF(COUNT(section_id)> 0,1,0) FROM user_teach_subject_section WHERE sgs.id = section_id) AS isExist
            FROM school_grade_section sgs 
            LEFT JOIN academic_year ay ON ay.id = sgs.academic_year_id
            LEFT JOIN school s ON s.id = sgs.school_id 
            LEFT JOIN grade g ON g.id = sgs.grade_id 
            WHERE sgs.academic_year_id = ? 
            AND sgs.school_id = ?
            AND sgs.grade_id = ?
            ORDER BY sgs.id`;
            pool.query(sql,[academicId,schoolId,gradeId],(error, result) => 
            {
                if(error)
                {
                    return reject(error);
                } 
                return resolve(result)
            });
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

db.getGradeSection = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT * from school_grade_section WHERE uuid = ? `,[uuid],(error, result) => 
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

db.getGradeId = (acaId, schoolId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT distinct grade_id from school_grade_section 
            WHERE academic_year_id = ? AND school_id = ?
            ORDER BY id `,[acaId, schoolId],(error, result) => 
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

db.getGradeNotIn = (acaId,schoolId,gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT g.id, g.name AS gradeName
            FROM grade g
            WHERE g.grade_category_id = ? AND g.id NOT IN (SELECT sgs.grade_id from school_grade_section sgs WHERE sgs.academic_year_id = ?  
                            AND sgs.school_id = ? 
                            AND sgs.grade_id IN (SELECT id from grade where grade_category_id = ?))
            ORDER BY g.id `,[gradeCategoryId,acaId,schoolId,gradeCategoryId],(error, result) => 
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

db.getGrade = (id,gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT * from grade WHERE id = ? AND grade_category_id = ? `,[id, gradeCategoryId],(error, result) => 
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

db.getAcademic = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT * from academic_year WHERE uuid = ? `,[uuid],(error, result) => 
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
            pool.query(`SELECT * from school WHERE uuid = ? `,[uuid],(error, result) => 
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

db.getAcademicId = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT id AS acaUuid, year from academic_year WHERE id = ? `,[id],(error, result) => 
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
db.getSchoolId = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid AS schoolUuid, name AS schoolName from school WHERE id = ? `,[id],(error, result) => 
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

db.getGradeCategory = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT * from grade_category WHERE id = ? 
            ORDER BY id`,[id],(error, result) => 
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

db.getGradeCategorySchool = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT sgc.*, gc.id AS gradeCategoryId, gc.name AS gradeCatName
             from school_grade_category sgc
             LEFT JOIN grade_category gc ON gc.id = sgc.grade_category_id
              WHERE school_id = ? ORDER BY grade_category_id `,[id],(error, result) => 
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

db.getGradeSectionId = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT id from school_grade_section WHERE grade_id = ? ORDER BY id  `,[id],(error, result) => 
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

db.insertGradeSection = (uuid,academicId,schoolId,gradeId,section) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO school_grade_section (uuid, academic_year_id, school_id, grade_id, section) VALUES (?, ?,?,?,?)", [uuid,academicId,schoolId,gradeId,section], (error, result) => 
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

db.findDuplicateSection = (academicId,schoolId,gradeId,section) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(section) AS Exist FROM school_grade_section WHERE academic_year_id = ? AND school_id = ? AND grade_id = ? AND UPPER(section) LIKE UPPER(?)`, [academicId,schoolId,gradeId,section], (error, result) => 
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

db.findSection = (academicId,userId,gradeId,id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(section_id) AS Exist FROM user_teach_subject_section WHERE academic_year_id = ? AND user_id = ? AND grade_id = ? AND section_id LIKE ?`, [academicId,userId,gradeId,id], (error, result) => 
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

db.findSectionId = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(section_id) AS Exist FROM user_teach_subject_section WHERE  section_id = ?`, [id], (error, result) => 
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

db.findLastSection = (academicId,schoolId,gradeId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`select ascii(section) AS section from school_grade_section 
            where id = (SELECT max(id)  FROM school_grade_section where school_id = ? AND academic_year_id = ? AND grade_id = ?);`, [schoolId,academicId,gradeId], (error, result) => 
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
db.deleteGradeSection = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM school_grade_section WHERE uuid = ?", [uuid], (error, result) => 
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

