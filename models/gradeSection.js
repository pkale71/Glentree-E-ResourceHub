class gradeSection {
    uuid
    academic
    school
    gradeSection
    grade
    gradeCategory
    constructor(){}

    setGradeSection(data){
        this.gradeSection   =   {
                                    "id"    : data.id,
                                    "name"  : data.section
                                }
    }

    getGradeSection(){
        return  this.gradeSection
        
    }
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.academic       =   {
                                    "uuid"    :   data.acaUuid,
                                    "year"  :   data.year
                                }
        this.school         =   {
                                    "id"    :   data.school_id,
                                    "name"  :   data.schoolName
                                }
        this.grade         =   {
                                    "id"    :   data.grade_id,
                                    "name"  :   data.gradeName
                                }
        this.gradeCategory         =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName
                                }
        this.gradeSection   =   data.gradeSection
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            academic : this.academic,
            school : this.school,
            grade : this.grade,
            gradeCategory : this.gradeCategory,
            sections : this.gradeSection
        }
    }
}
module.exports = gradeSection