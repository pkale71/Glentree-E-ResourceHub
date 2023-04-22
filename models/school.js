// school table columns name

// export class School {
//     id?: number;
//     uuid?: string;
//     name?: string;
//     address?: string;
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

    constructor(){}

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
        this.gradeCategory      =           {
                                                "id"     :   data.gradeCategoryId,
                                                "name"    :   data.gradeCategoryName,
                                            }
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName
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
                        gradeCategory       :   this.gradeCategory,
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
        this.gradeCategory      =           {
                                                "id"     :   data.gradeCategoryId,
                                                "name"    :   data.gradeCategoryName,
                                            }
        this.createdOn          =           data.created_on
        this.createdBy          =           {
                                                "id"     :   data.created_by_id,
                                                "name"    :   data.createdByName
                                            }
        this.active             =           data.is_active
        this.schoolUserSetting  =           {
                                                "uuid"    :   data.schoolUserSettingUuid,
                                                "userType":   {
                                                                "id" : data.userTypeId,
                                                                "name" : data.userTypeName
                                                            },
                                                "canUpload"    :   data.schoolUserSettingUpload,
                                                "canVerify"    :   data.schoolUserSettingVerify,
                                                "canPublish"    :   data.schoolUserSettingPublish,
                                            }
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