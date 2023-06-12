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
                                    "academicYear" :   {
                                                        "uuid" : data.acaUuid,
                                                        "year" : data.acaYear
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
                                },
        this.materialType   =   {
                                    uuid : data.materialUuid,
                                    name : data.materialName 
                                }
        this.isExist        =   data.isExist,
        this.fileName       =   data.fileName,
        this.uploadedOn     =   data.uploadedOn,
        this.uploadedBy     =   {
                                    uuid : data.uploadUuid,
                                    name : data.uploadName
                                }
        this.publishedOn     =   data.publishOn,
        this.publishedBy     =   {
                                    uuid : data.publishUuid,
                                    name : data.publishName
                                }
        this.rejectedOn     =   data.rejectOn,
        this.rejectedBy     =   {
                                    uuid : data.rejectUuid,
                                    name : data.rejectName
                                }
        this.verifiedOn     =   data.verifyOn,
        this.verifiedBy     =   {
                                    uuid : data.verifyUuid,
                                    name : data.verifyName
                                }
        this.isActive       =   data.is_active
        this.isPublished    =   data.is_published
        this.isVerified     =   data.is_verified,
        this.isRejected     =   data.is_rejected
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            curriculum : this.curriculumMaster,
            materialType : this.materialType,
            fileName : this.fileName,
            active: this.isActive,
            uploadedBy : this.uploadedBy,
            uploadedOn : this.uploadedOn,
            verifiedBy : this.verifiedBy,
            verifiedOn : this.verifiedOn,
            publishedBy : this.publishedBy,
            publishedOn : this.publishedOn,
            rejectedBy : this.rejectedBy,
            rejectedOn : this.rejectedOn,
            isExist : this.isExist,
            pubished: this.isPublished,
            verified : this.isVerified,
            rejected : this.isRejected
        }
    }
}
module.exports = curriculumUpload