let pool = require('../databaseConnection/createconnection')
let db = {};
 
db.getUserByEmail = (email) =>
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            pool.query(`SELECT u.uuid, TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name,''))) AS fullName, 
            u.role_id, TRIM(r.name) AS role_name, u.user_type_id, 
            ut.name AS user_type_name, ut.code AS user_type_code, 
            u.last_login, u.password, u.id, u.is_active
            FROM user u 
            LEFT JOIN role r ON u.role_id = r.id 
            LEFT JOIN user_type ut ON ut.id = u.user_type_id
            WHERE u.email = ? AND u.is_active =1`, [email], (error, users) => {
                if(error)
                {
                    return reject(error);
                }
                return resolve(users);
            });
        }
        catch(e)
        { 
            console.log(e)
        }
    });
};
 
db.getSchools = (email) => 
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            pool.query(`SELECT us.user_id, s.name, s.uuid, s.location, s.contact1, s.curriculum_complete, s.curriculum_upload, s.email,
            (SELECT IF(COUNT(cm.id)> 0,1,(SELECT IF(COUNT(usg.id)> 0,1,(SELECT IF(COUNT(usgs.id)> 0,1,(SELECT IF(COUNT(utss.id)> 0,1,0) 
            FROM user_teach_subject_section utss WHERE utss.school_id = us.school_id)) 
            FROM user_supervise_grade_subject usgs WHERE usgs.school_id = us.school_id)) 
            FROM user_supervise_grade usg WHERE usg.school_id = us.school_id)) 
            FROM curriculum_master cm 
            WHERE cm.id = us.school_id) AS isExist,
             sy.id, sy.name AS syllabusName
                        FROM user_school us 
                        LEFT JOIN school s ON us.school_id = s.id
                        LEFT JOIN syllabus sy ON sy.id = s.syllabus_id
                        WHERE us.user_id = (SELECT id FROM user WHERE email = ?)
                             AND s.is_active = 1`,[email] ,(error, result) =>
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

db.insertLastLogin = (userId, authTime) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            pool.query('UPDATE user SET last_login=? WHERE id = ?', [authTime,userId], (error, result) => 
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

db.insertToken = (authtoken, userId, authTime) =>
{
    return new Promise((resolve, reject)=>
    {
        try
        {
            pool.query('INSERT INTO auth_data (auth_token, user_id, auth_time) VALUES (?,  ?, ?)', [authtoken, userId, authTime], (error, result)=>{
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

db.deleteToken = (token) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            pool.query('DELETE FROM auth_data WHERE auth_token = ?', [token], (error, result) =>
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

db.selectToken = (userId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            pool.query('SELECT * FROM auth_data WHERE user_id = ?', [userId], (error, result) => 
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

db.updateUser = (userId,password) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            pool.query('UPDATE user SET password = ? WHERE id = ?', [password,userId], (error, result) => 
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