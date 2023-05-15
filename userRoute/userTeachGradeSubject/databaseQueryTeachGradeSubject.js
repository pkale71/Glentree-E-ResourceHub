let pool = require('../../databaseConnection/createconnection');
let db = {};
 
db.getGrades = (uuid) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            pool.query(`SELECT g.id, g.name
            from user_teach_subject_section utss 
            LEFT JOIN grade g ON g.id = utss.grade_id
            WHERE utss.user_id = (SELECT id FROM user WHERE uuid = ?)
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

module.exports = db

