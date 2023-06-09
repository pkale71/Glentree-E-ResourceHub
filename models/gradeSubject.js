class gradeSubject {
    id
    uuid
    syllabus
    gradeSubject
    school
    grade
    gradeCategory
    isExist
    isActive
    constructor(){}

    setGradeSubject(data){
        this.gradeSubject   =   {
                                    "id"      : data.id,
                                    "uuid"    : data.uuid,
                                    "name"    : data.subject_name?.trim(),
                                    "isExist"   : data.isExist
                                }
    }

    getGradeSubject(){
        return  this.gradeSubject
        
    }


    setGrade(data){
        this.grade   =    {
                            "id"    : data.grade_id,
                            "name"  : data.gradeName?.trim(),
                            "subjects" : data.gradeSubject
                        }
                        // this.grade   = data?   {
                        //     "id"    : data.grade_id,
                        //     "name"  : data.gradeName,
                        //     "section" : data.sections
                        // }: {}
    }

    getGrade(){
       return this.grade  
    }


    setSchool(data){
        this.school         =   {
            "uuid"    :   data.schoolUuid,
            "name"  :   data.schoolName?.trim()
        }
    }

    getSchool(){
        return  this.school
    }
    
    setDataAll(data)
    {
        this.id     = data.id
        this.uuid    = data.uuid
        this.name   = data.subject_name?.trim(),
        this.isExist  = data.isExist
        this.isActive = data.is_active
        this.syllabus       =   {
                                    "id"    :   data.syllabus_id,
                                    "name"  :   data.syllabusName?.trim()
                                }
        this.grade         =   {
                                    "id"    :   data.grade_id,
                                    "name"  :   data.gradeName?.trim()
                                }
        this.gradeCategory         =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName?.trim(),
                                    "grade" :   {
                                                    "id"    :   data.grade_id,
                                                    "name"  :   data.gradeName?.trim()
                                                }
                                }
      //  this.isExist        =   data.isExist                     
      //  this.gradeSubject   =   data.gradeSubject
    }

    getDataAll()
    {
        return {
            id : this.id,
            uuid : this.uuid,
            name : this.name,
            isExist : this.isExist,
            active : this.isActive,
            syllabus : this.syllabus,
            // school : this.school,
            grade : this.grade,
           // gradeCategory : this.gradeCategory,
           // isExist : this.isExist,
           // subject : this.gradeSubject
        }
    }

    setData(data)
    {
        
        this.uuid    = data.uuid
        this.name   = data.subject_name?.trim()
        
    }

    getData()
    {
        return {
           
            uuid : this.uuid,
            name : this.name
        }
    }
}
module.exports = gradeSubject