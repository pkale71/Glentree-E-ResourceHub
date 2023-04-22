// school table columns name

// export class School {
//     id?: number;
//     uuid?: string;
//     name?: string;
//     location?: string;
//     contact1?: string;
//     contact2?: string;
//     email?: string;
//     curriculumUpload?: string;
//     syllabus?: Syllabus;
//     gradeCategory?: SchoolGradeCategory[];
//     createdOn?: Date;
//     createdBy?: User;
//     active?: boolean;
//     schoolUserSetting?: SchoolUserSetting[];
//   }

class school {
    uuid 
    name
    location
    contact1
    contact2
    email
    curriculumUpload
    syllabus
    gradeCategory
    createdOn
    createdBy
    active
    schoolUserSetting

    // grade Category 

    gradeCategoryId
    gradeCategoryName

    // school user setting 

    schoolUserSettingUuid
    userType
    schoolUserSettingUpload
    schoolUserSettingVerify
    canPublish


    constructor(){}
    setSchoolGradeCategory(data){
            this.gradeCategoryId = data.gradeCategoryId
            this.gradeCategoryName = data.gradeCategoryName
    }

    getSchoolGradeCategory(){
        return {
            "id"     :   this.gradeCategoryId,
            "name"   :   this.gradeCategoryName
        }
        
    }
    setSchoolUserSetting(data){
        this.schoolUserSettingUuid = data.schoolUserSettingUuid
        this.userType = {
                                    "id" : data.userTypeId,
                                    "name" : data.userTypeName
                        }
        this.schoolUserSettingUpload = data.schoolUserSettingUpload
        this.schoolUserSettingVerify = data.schoolUserSettingVerify
        this.schoolUserSettingPublish = data.schoolUserSettingPublish
    }
    
    getSchoolUserSetting(){
        return {
                    "uuid"          :  this.schoolUserSettingUuid,
                    "userType"      :  this.userType,
                    "canUpload"    :   this.schoolUserSettingUpload,
                    "canVerify"    :   this.schoolUserSettingVerify,
                    "canPublish"   :   this.schoolUserSettingPublish,
        }
    }
    setDataAll(data){
        this.uuid               =           data.uuid
        this.name               =           data.name
        this.location           =           data.location
        this.contact1           =           data.contact1
        this.contact2           =           data.contact2
        this.email              =           data.email
        this.curriculumUpload   =           data.curriculumUpload
        this.syllabus           =           {
                                                "id"     :   data.syllabusId,
                                                "name"    :   data.syllabusName,
                                            }
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName.trim()
                                            }
        this.active             =           data.is_active
    }
    getDataAll(){
        return {
                        uuid                :   this.uuid,
                        name                :   this.name,
                        location            :   this.location,
                        contact1            :   this.contact1,
                        contact2            :   this.contact2,
                        email               :   this.email,
                        curriculumUpload    :   this.curriculumUpload,
                        syllabus            :   this.syllabus,
                        createdOn           :   this.createdOn,
                        createdBy           :   this.createdBy,
                        active              :   this.active

        }
         
    }

     setData(data){
        this.uuid               =           data.uuid
        this.name               =           data.name
        this.location           =           data.location
        this.contact1           =           data.contact1
        this.contact2           =           data.contact2
        this.email              =           data.email
        this.curriculumUpload   =           data.curriculumUpload
        this.syllabus           =           {
                                                "id"     :   data.syllabusId,
                                                "name"    :   data.syllabusName,
                                            }
        this.gradeCategory      =           data.gradeCategory
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName.trim()
                                            }
        this.active             =           data.is_active
        this.schoolUserSetting  =           data.schoolUserSetting
    }
    getData(){
        return {
                        uuid                :   this.uuid,
                        name                :   this.name,
                        location            :   this.location,
                        contact1            :   this.contact1,
                        contact2            :   this.contact2,
                        email               :   this.email,
                        curriculumUpload    :   this.curriculumUpload,
                        syllabus            :   this.syllabus,
                        gradeCategory       :   this.gradeCategory,
                        createdOn           :   this.createdOn,
                        createdBy           :   this.createdBy,
                        active              :   this.active,
                        schoolUserSetting   :   this.schoolUserSetting
        }    
    }
}
module.exports = school