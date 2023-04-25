let pool = require('../../databaseConnection/createconnection');
const gradeCategory = require('../../models/gradeCategory');
let db = {};
 
db.getAcademicYears = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT * from academic_year  `,(error, result) => 
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

db.getGradeSection = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT id from school_grade_section WHERE uuid = ? `,[uuid],(error, result) => 
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

db.getAcademicYearId = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT uuid from academic_year WHERE id = ? `,[id],(error, result) => 
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
            pool.query(`SELECT COUNT(section) AS Exist FROM school_grade_section WHERE academic_year_id = ? AND school_id = ? AND grade_id = ? AND section LIKE ?`, [academicId,schoolId,gradeId,section], (error, result) => 
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

db.findSection = (academicId,schoolId,gradeId,id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT COUNT(section_id) AS Exist FROM user_teach_subject_section WHERE academic_year_id = ? AND school_id = ? AND grade_id = ? AND section_id LIKE ?`, [academicId,schoolId,gradeId,id], (error, result) => 
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

module.exports = db

