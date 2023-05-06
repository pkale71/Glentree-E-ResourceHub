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
    isExist;
    schoolUserSetting

    // grade Category 
    schoolGradeCategoryId
    gradeCategories
    gradeCategoryId
    gradeCategoryName

    // school user setting 

    schoolUserSettingUuid
    userType
    schoolUserSettingUpload
    schoolUserSettingVerify
    schoolUserSettingPublish


    constructor(){}
    setSchoolGradeCategory(data){
        this.schoolGradeCategoryId = data.schoolGradeCategoryId
        this.gradeCategories = {
            "id" : data.gradeId,
            "name" : data.gradeName?.trim()
        }
            
    }

    getSchoolGradeCategory(){
        return {
            "id"     :   this.schoolGradeCategoryId,
            "gradeCategory"   :   this.gradeCategories
        }
        
    }
    setSchoolUserSetting(data){
        this.schoolUserSettingUuid = data.uuid
        this.userType = {
                                    "id" : data.user_type_id,
                                    "name" : data.userTypeName?.trim(),
                                    "code" : data.code
                        }
        this.schoolUserSettingUpload = data.can_upload
        this.schoolUserSettingVerify = data.can_verify
        this.schoolUserSettingPublish = data.can_publish
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
        this.name               =           data.name?.trim()
        this.location           =           data.location
        this.contact1           =           data.contact1
        this.contact2           =           data.contact2.length > 0 ?  data.contact2 : null
        this.email              =           data.email
        this.curriculumUpload   =           data.curriculumUpload
        this.syllabus           =           {
                                                "id"     :   data.syllabusId,
                                                "name"    :   data.syllabusName?.trim(),
                                            }
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName.trim()
                                            }
        this.active             =           data.is_active
        this.isExist            =           data.isExist
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
                        active              :   this.active,
                        isExist             :   this.isExist
        }
         
    }

     setData(data){
        this.uuid               =           data.uuid
        this.name               =           data.name?.trim()
        this.location           =           data.location
        this.contact1           =           data.contact1
        this.contact2           =           data.contact2 ? data.contact2 : null
        this.email              =           data.email
        this.curriculumUpload   =           data.curriculumUpload
        this.syllabus           =           {
                                                "id"     :   data.syllabusId,
                                                "name"    :   data.syllabusName?.trim(),
                                            }
        this.gradeCategory      =           data.gradeCategory
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName?.trim()
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
                        gradeCategories       :   this.gradeCategory,
                        createdOn           :   this.createdOn,
                        createdBy           :   this.createdBy,
                        active              :   this.active,
                        schoolUserSetting   :   this.schoolUserSetting
        }    
    }
}
module.exports = school