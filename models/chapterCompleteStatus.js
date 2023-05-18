// academic_year table columns name

// export class academicYear {
//     id?: number;
//     uuid?: string;
//      year?: string;
//      startDate: Date
//      endDate: Date
//      isCurrent: Date
//   }
  
  



class userChapterCompleteStatus {
    uuid
    academicYear
    grade
    section
    subject
    chapter
    topic
    completedOn
    isCompleted
    completedBy
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.academicYear   =   {
                                    "uuid" : data.acaUuid,
                                    "year" : data.year
                                }
        this.grade       =   {
            "id" : data.gradeId,
            "name" : data.gradeName.trim()
        }
        this.section        =   {
            "uuid" : data.sectionUuid,
            "name" : data.sectionName.trim()
        }
        this.subject      =    {
            "uuid" : data.subjectUuid,
            "name" : data.subjectName.trim()
        }
        this.chapter        =   {
            "uuid" : data.chapterUuid,
            "name" : data.chapterName.trim()
        }
        this.topic        =   {
            "uuid" : data.topicUuid,
            "name" : data.topicName.trim()
        }
        this.completedOn        =   data.completed_on
        this.isCompleted        =   data.is_completed
        this.completedBy        =    {
            "uuid" : data.userUuid,
            "name" : data.fullName.trim()
        }
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            academicYear : this.academicYear,
            grade : this.grade,
            section : this.section,
            subject : this.subject,
            chapter : this.chapter,
            topic   : this.topic,
            completedOn :   this.completedOn,
            isCompleted : this.isCompleted,
            completedBy : this.completedBy
        }
    }
}
module.exports = userChapterCompleteStatus