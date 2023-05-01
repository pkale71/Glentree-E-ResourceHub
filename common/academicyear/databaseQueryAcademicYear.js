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

db.getAcademicYear = (uuid) => {
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

db.insertAcademicYear = (uuid,startDate,endDate,year,isCurrent) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO academic_year (uuid, start_date, end_date, year, is_current) VALUES (?, ?,?,?,?)", [uuid,startDate,endDate,year,isCurrent], (error, result) => 
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

db.deleteAcademicYear = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM academic_year WHERE uuid = ?", [uuid], (error, result) => 
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

