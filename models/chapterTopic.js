class chapterTopic {
    id
    uuid
    syllabus
    gradeSubject
    subjectChapter
    school
    grade
    gradeCategory
    isExist
    isActive
    constructor(){}

    setDataAll(data)
    {
        this.uuid  = data.uuid
        this.name = data.topic_name.trim(),
        this.isActive = data.is_active,
        this.isExist = data.isExist
        this.subjectChapter = {
        "uuid"  : data.chapterUuid,
        "name" : data.chapter_name.trim(),
        "active" : data.chapterIsActive,
        "gradeSubject" : {
            "uuid"    : data.subUuid,
            "name"   : data.subject_name.trim(),
            "active" : data.subIsActive,
            "syllabus"      :   {
                                        "id"    :   data.syllabus_id,
                                        "name"  :   data.syllabusName.trim()
                                    },
            "grade"        :  {
                                        "id"    :   data.grade_id,
                                        "name"  :   data.gradeName.trim()
                                    }
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
            subjectChapter : this.subjectChapter
        }
    }
}
module.exports = chapterTopic