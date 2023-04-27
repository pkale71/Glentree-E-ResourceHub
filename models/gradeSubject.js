class gradeSubject {
    uuid
    syllabus
    gradeSubject
    school
    grade
    gradeCategory
    isExist
    constructor(){}

    setGradeSection(data){
        this.gradeSubject   =   {
                                    "uuid"    : data.uuid,
                                    "name"    : data.subject_name
                                }
    }

    getGradeSection(){
        return  this.gradeSubject
        
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
                                    "id"    :   data.syllabusId,
                                    "name"  :   data.syllabusName
                                }
        this.grade         =   {
                                    "id"    :   data.grade_id,
                                    "name"  :   data.gradeName
                                }
        this.gradeCategory         =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName
                                }
        this.gradeSubject   =   data.gradeSubject
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            syllabus : this.academic,
            school : this.school,
            grade : this.grade,
            gradeCategory : this.gradeCategory,
            subject : this.gradeSubject
        }
    }
}
module.exports = gradeSubject