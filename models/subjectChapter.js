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
        this.name = data.chapter_name,
        this.isActive = data.is_active,
        this.isExist = data.isExist
        this.gradeSubject = {
            "uuid"    : data.subUuid,
            "name"   : data.subject_name,
            // "isExist"  : data.subIsExist,
            "active" : data.subIsActive,
            "syllabus"      :   {
                                        "id"    :   data.syllabus_id,
                                        "name"  :   data.syllabusName
                                    },
            "grade"        :  {
                                        "id"    :   data.grade_id,
                                        "name"  :   data.gradeName
                                    }
            // this.gradeCategory         =   {
            //                             "id"    :   data.gradeCategoryId,
            //                             "name"  :   data.gradeCatName,
            //                             "grade" :   {
            //                                             "id"    :   data.grade_id,
            //                                             "name"  :   data.gradeName
            //                                         }
            //                         }
        }
       
      //  this.isExist        =   data.isExist                     
      //  this.gradeSubject   =   data.gradeSubject
    }

    getDataAll()
    {
        return {
            
            uuid : this.uuid,
            name : this.name,
            active : this.isActive,
            isExist : this.isExist,
            gradeSubject : this.gradeSubject
            // isExist : this.isExist,
            // active : this.isActive,
            // syllabus : this.syllabus,
            // // school : this.school,
            // grade : this.grade,
           // gradeCategory : this.gradeCategory,
           // isExist : this.isExist,
           // subject : this.gradeSubject
        }
    }
}
module.exports = subjectChapter