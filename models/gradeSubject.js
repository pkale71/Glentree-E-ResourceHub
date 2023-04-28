class gradeSubject {
    uuid
    syllabus
    gradeSubject
    school
    grade
    gradeCategory
    isExist
    constructor(){}

    setGradeSubject(data){
        this.gradeSubject   =   {
                                    "uuid"    : data.uuid,
                                    "name"    : data.subject_name,
                                    "isExist"   : data.isExist
                                }
    }

    getGradeSubject(){
        return  this.gradeSubject
        
    }


    setGrade(data){
        this.grade   =    {
                            "id"    : data.grade_id,
                            "name"  : data.gradeName,
                            "subject" : data.gradeSubject
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
            "name"  :   data.schoolName
        }
    }

    getSchool(){
        return  this.school
    }
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.syllabus       =   {
                                    "id"    :   data.syllabus_id,
                                    "name"  :   data.syllabusName
                                }
        this.grade         =   {
                                    "id"    :   data.grade_id,
                                    "name"  :   data.gradeName
                                }
        this.gradeCategory         =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName,
                                    "grade" :   data.grade
                                }
      //  this.isExist        =   data.isExist                     
      //  this.gradeSubject   =   data.gradeSubject
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            syllabus : this.syllabus,
            school : this.school,
          //  grade : this.grade,
            gradeCategory : this.gradeCategory,
           // isExist : this.isExist,
           // subject : this.gradeSubject
        }
    }
}
module.exports = gradeSubject