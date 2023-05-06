class subjectChapter {
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

    setDataAll(data)
    {
        this.uuid  = data.uuid
        this.name = data.chapter_name?.trim(),
        this.isActive = data.is_active,
        this.isExist = data.isExist
        this.gradeSubject = {
            "uuid"    : data.subUuid,
            "name"   : data.subject_name?.trim(),
            "active" : data.subIsActive,
            "syllabus"      :   {
                                        "id"    :   data.syllabus_id,
                                        "name"  :   data.syllabusName?.trim()
                                    },
            "grade"        :  {
                                        "id"    :   data.grade_id,
                                        "name"  :   data.gradeName?.trim()
                                    }
        }
    }

    getDataAll()
    {
        return {
            
            uuid : this.uuid,
            name : this.name,
            active : this.isActive,
            isExist : this.isExist,
            gradeSubject : this.gradeSubject
        }
    }
}
module.exports = subjectChapter