const commonFunction = require("../common/commonFunction")
class curriculumUpload {
    uuid
    curriculumMaster
    materialType
    fileName
    isActive
    uploadedOn
    uploadedBy
    publishedOn
    publishedBy
    rejectedOn
    rejectedBy
    verifiedOn
    verifiedBy
    isRejected
    isPublished
    isVerified
    isExist

    constructor(){}
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.curriculumMaster = {
                                    "uuid" : data.curriculumMasterUuid,
                                    "createdOn" : data.curriculumMasterCreatedOn,
                                    "createdBy" :   {
                                                        "uuid" : data.curriculumMasterCreatedBy,
                                                        "name" : data.curriculumMasterCreateName
                                                    },
                                    "academicYear" :   {
                                                        "uuid" : data.acaUuid,
                                                        "name" : data.acaName
                                                    },
                                    "school" :   {
                                                        "uuid" : data.schoolUuid,
                                                        "name" : data.schoolName
                                                    },
                                    "grade" :   {
                                                        "id" : data.gradeId,
                                                        "name" : data.gradeName
                                                    },
                                    "subject" :   {
                                                        "uuid" : data.subjectUuid,
                                                        "name" : data.subjectName
                                                    },
                                    "chapter" :   {
                                                        "uuid" : data.chapterUuid,
                                                        "name" : data.chapterName
                                                    },
                                    "topic" :   {
                                                        "uuid" : data.topicUuid,
                                                        "name" : data.topicName
                                                    }
                                }
        this.isExist        =   data.isExist
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            year : this.year,
            startDate : this.startDate,
            endDate : this.endDate,
            isCurrent : this.isCurrent,
            isExist : this.isExist
        }
    }
}
module.exports = curriculumUpload