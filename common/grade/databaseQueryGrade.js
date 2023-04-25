let pool = require('../../databaseConnection/createconnection');
const gradeCategory = require('../../models/gradeCategory');
let db = {};
 
db.getGrades = () => {
    return new Promise((resolve, reject)=>{
        try
        {
            pool.query(`SELECT g.id, g.name, g.grade_category_id, 
            gc.name AS gradeCategoryName 
            from grade g 
            LEFT JOIN grade_category gc ON g.grade_category_id = gc.id`,(error, result) => 
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
            gc.name AS gradeCategoryName 
            from grade g 
            LEFT JOIN grade_category gc ON g.grade_category_id = gc.id
            WHERE g.id = ?`,[id],(error, result) => 
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

db.selectUsedGrade = (id) => {
    return new Promise((resolve, reject)=>{
        try{pool.query(`SELECT COUNT(id) AS Exist  FROM syllabus_grade_subject WHERE id LIKE ?`, [id], (error, result)=>{
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

module.exports = db

