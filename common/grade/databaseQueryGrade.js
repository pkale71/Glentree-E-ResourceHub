let pool = require('../../databaseConnection/createconnection');
const gradeCategory = require('../../models/gradeCategory');
let db = {};
 
db.getGrades = (gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ``
            if(gradeCategoryId)
            {
                sql = `SELECT g.id, g.name, g.grade_category_id, 
                gc.name AS gradeCategoryName ,
                 (SELECT COUNT(sgs.grade_id)  FROM syllabus_grade_subject  sgs
                WHERE grade_id = g.id)  AS Exist, 
                (SELECT COUNT(sgc.grade_id)   FROM  school_grade_section sgc
                WHERE grade_id = g.id) AS isExist
                from grade g 
                LEFT JOIN grade_category gc ON g.grade_category_id = gc.id
                WHERE g.grade_category_id = ?
                ORDER BY  g.id`
            }
            else
            {
                sql = `SELECT g.id, g.name, g.grade_category_id, 
                gc.name AS gradeCategoryName ,
                 (SELECT COUNT(sgs.grade_id)  FROM syllabus_grade_subject  sgs
                WHERE grade_id = g.id)  AS Exist, (SELECT COUNT(sgc.grade_id)   FROM  school_grade_section sgc
                WHERE grade_id = g.id) AS isExist
                from grade g 
                LEFT JOIN grade_category gc ON g.grade_category_id = gc.id
                ORDER BY  g.id`
            }
            pool.query(sql,[gradeCategoryId],(error, result) => 
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

db.getGrade = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT g.id, g.name, g.grade_category_id, 
            gc.name AS gradeCategoryName,
            (SELECT COUNT(sgs.grade_id)  FROM syllabus_grade_subject  sgs
			WHERE grade_id = g.id)  AS Exist, (SELECT COUNT(sgc.grade_id)   FROM  school_grade_section sgc
			WHERE grade_id = g.id) AS isExist
            from grade g 
            LEFT JOIN grade_category gc ON g.grade_category_id = gc.id
            WHERE g.id = ?
            ORDER BY g.id`,[id],(error, result) => 
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

db.deleteGradeCategory = (id) => {
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

db.insertGrade = (name, gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("INSERT INTO grade (name, grade_category_id) VALUES (?, ?)", [name, gradeCategoryId], (error, result) => 
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

db.checkGradeUsed = (id) => {
    return new Promise((resolve, reject)=>{
        try{pool.query(`SELECT (SELECT COUNT(grade_id)  FROM syllabus_grade_subject 
        WHERE grade_id = ?)  AS Exist,  COUNT(grade_id) AS isExist  FROM  school_grade_section 
        WHERE grade_id = ?`, [id,id], (error, result)=>{
            if(error){
            return reject(error);
             }          
            return resolve(result);
            });
        }
        catch(e){ console.log(e)}
        
        });
}

db.updateGrade = (id,name, gradeCategoryId) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("UPDATE grade SET name = ?, grade_category_id = ? WHERE id = ?", [name, gradeCategoryId, id], (error, result) => 
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

db.deleteGrade = (id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query("DELETE FROM grade WHERE id = ?", [id], (error, result) => 
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

db.checkGradeExist = (name,gradeCategoryId,id) => {
    return new Promise((resolve, reject)=>{
        try
        {
            let sql = ``
            if(id)
            {
                sql = `SELECT COUNT(id) AS Exist FROM grade WHERE grade_category_id = ? AND UPPER(name) LIKE UPPER(?) AND id != ?`
            }
            else
            {
                sql = `SELECT COUNT(id) AS Exist FROM grade WHERE grade_category_id = ? AND UPPER(name) LIKE UPPER(?)`
            }
            pool.query(sql, [gradeCategoryId,name,id], (error, result) => 
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

