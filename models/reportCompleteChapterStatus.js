const commonFunction = require("../common/commonFunction")

class academicYear {
    id
    uuid
    chapter
    topic
    sections
    completedOn
    isCompleted
    userChapterCompleteStatuses
    constructor(){}

    setCompleteStatus(data)
    {
        this.userChapterCompleteStatuses = {
                                                "id" : data.id,
                                                "chapterId" : data.chapterId,
                                                "uuid"          :   data.uuid,
                                                "sections"      :   {
                                                                        "uuid" : data.sectionUuid,
                                                                        "name" : data.section
                                                                    },
                                                "completedOn"   :   commonFunction.changeDateToSqlDate(data.completed_on),
                                                "isCompleted"   :   data.is_completed,
                                                "completedBy"   :   {
                                                                        "uuid" : data.userUuid,
                                                                        "name" : data.fullName
                                                                    }
                                            }
    }

    getCompleteStatus()
    {
        return this.userChapterCompleteStatuses
    }
    
    setDataAll(data)
    {
        this.chapter        =   {
                                    "uuid" : data.chapterUuid,
                                    "name" : data.chapter_name
                                }
        this.topic          =   {
                                    "uuid" : data.topicUuid,
                                    "name" : data.topic_name,
                                    "userChapterCompleteStatuses" : data.completeStatuses
                                }
    }

    getDataAll()
    {
        return {
            chapter : this.chapter,
            topic : this.topic
        }
    }
}

module.exports = academicYear