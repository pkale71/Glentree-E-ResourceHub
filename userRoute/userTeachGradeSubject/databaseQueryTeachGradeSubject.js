let pool = require('../../databaseConnection/createconnection');
let db = {};
 
db.getGrades = (uuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            pool.query(`SELECT distinct g.id, g.name
            from user_teach_subject_section utss 
            LEFT JOIN grade g ON g.id = utss.grade_id
            WHERE utss.user_id = (SELECT id FROM user WHERE uuid = ?) 
            AND utss.academic_year_id = (SELECT id FROM academic_year WHERE is_current = 1)
            ORDER BY  g.id`,[uuid] ,(error, result)=>
            {
                if(error)
                {
                    return reject(error);
                }          
                return resolve(result);
                });
        }
        catch(e)
        { 
            console.log(e)
        }   
    });
}; 


db.getGradeSubjectList = (userUuid,gradeId) => 
{
    return new Promise((resolve, reject)=>
    {
        try
        {

            pool.query(`SELECT distinct sgs.uuid, sgs.subject_name
            from user_teach_subject_section utss 
            LEFT JOIN syllabus_grade_subject sgs ON sgs.id = utss.subject_id
            WHERE utss.grade_id = ?
            AND utss.user_id = (SELECT id FROM user WHERE uuid = ?)
            AND utss.academic_year_id = (SELECT id FROM academic_year WHERE is_current = 1)
            ORDER BY  sgs.id`,[gradeId,userUuid],(error, result) => 
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


db.getGradeSection = (userUuid,gradeId,subjectUuid) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT distinct sgs.uuid, sgs.section
            from user_teach_subject_section utss 
            LEFT JOIN school_grade_section sgs ON sgs.id = utss.section_id
            WHERE utss.grade_id = ?
            AND utss.user_id = (SELECT id FROM user WHERE uuid = ?)
            AND utss.academic_year_id = (SELECT id FROM academic_year WHERE is_current = 1)
            AND utss.subject_id = (SELECT id FROM syllabus_grade_subject WHERE uuid = ?)
            ORDER BY  sgs.id `,[gradeId,userUuid,subjectUuid],(error, result) => 
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

