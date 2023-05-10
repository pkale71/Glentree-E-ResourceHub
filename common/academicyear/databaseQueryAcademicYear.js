let pool = require('../../databaseConnection/createconnection');
const gradeCategory = require('../../models/gradeCategory');
let db = {};
 

// For dependent queries
// var pool = require('mysql').createPool(opts);

// pool.getConnection(function(err, conn) {
//     conn.query('select 1+1', function(err, res) {
//         conn.release();
//     });
// });



db.getAcademicYears = (uuid,id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            console.log(uuid,id,uuid?.length)
            let sql = ''
            if(uuid?.length > 0){
                sql = `SELECT ay.*,
                (select IF((select IF(count(sgs.id) > 0,1,0) from school_grade_section sgs
                where sgs.academic_year_id = ay.id) > 0, 1,
                (SELECT IF(count(utss.id) > 0,1,0) FROM user_teach_subject_section utss
                where utss.academic_year_id = ay.id))) AS isExist
                from academic_year ay WHERE ay.uuid = ?`;
            }
            else if(id){
                sql = `SELECT ay.uuid 
                from academic_year ay WHERE ay.id = ?`;
            }
            else{
                sql = `SELECT ay.*,
                (select IF((select IF(count(sgs.id) > 0,1,0) from school_grade_section sgs
                where sgs.academic_year_id = ay.id) > 0, 1, 
                (SELECT IF(count(utss.id) > 0,1,0) FROM user_teach_subject_section utss
                where utss.academic_year_id = ay.id))) AS isExist
                FROM academic_year ay  `;
            }
            let academic = uuid?.length > 0 ? uuid : id
            pool.query(sql,[academic],(error, result) => 
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


db.getCurrentAcademicYears = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            
            
            
              let  sql = `SELECT ay.*,
                (select IF((select IF(count(sgs.id) > 0,1,0) from school_grade_section sgs
                where sgs.academic_year_id = ay.id) > 0, 1,
                (SELECT IF(count(utss.id) > 0,1,0) FROM user_teach_subject_section utss
                where utss.academic_year_id = ay.id))) AS isExist
                from academic_year ay WHERE ay.is_current = 1`;
            
            
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

// db.getAcademicYear = (uuid) => {
//     return new Promise((resolve, reject)=>{
//         try
//         {
//             pool.query(`SELECT * from academic_year WHERE uuid = ? `,[uuid],(error, result) => 
//             {
//                 if(error)
//                 {
//                     return reject(error);
//                 }          
//                 return resolve(result);
//             });
//         }
//         catch(e){ console.log(e)}
        
//     });
// }

// db.getAcademicYearId = (id) => {
//     return new Promise((resolve, reject)=>{
//         try
//         {
//             pool.query(`SELECT uuid from academic_year WHERE id = ? `,[id],(error, result) => 
//             {
//                 if(error)
//                 {
//                     return reject(error);
//                 }          
//                 return resolve(result);
//             });
//         }
//         catch(e){ console.log(e)}
        
//     });
// }

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

db.checkAcademicYearUsed = (uuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT IF(count(utss.id) > 0,1,0) AS Exist FROM user_teach_subject_section utss
            where utss.academic_year_id = (select ay.id from academic_year ay where uuid = ?)`, [uuid], (error, result) => 
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

