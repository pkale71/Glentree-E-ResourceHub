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
//     gradeCategory?: GradeCategory[];
//     createdOn?: Date;
//     createdBy?: User;
//     active?: boolean;
//     schoolUserSetting?: SchoolUserSetting;
//   }

class school {
    id
    uuid 
    name
    address
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

    setData(data){
        this.id = 
        this.uuid           =   data.uuid
        this.name       =   data.name
        this.role           =   {
                                    id     :   data.role_id,
                                    name   :   data.role_name
                                }
        this.userType       =   {
                                    id     :   data.user_type_id,
                                    name    :   data.user_type_name,
                                    code    :   data.user_type_code
                                }
        this.email          =   data.email
        this.lastLogin      =   data.last_login
        this.accessToken    =   data.access_token
        this.mobile         =   data.mobile
    }
    getData(){
       return {
        user    :   {
                        uuid           :   this.uuid,
                        fullName       :   this.fullName,
                        role           :   this.role,
                        userType       :   this.userType,
                        mobile         :   this.mobile,
                        email          :   this.email,
                        lastLogin      :   this.lastLogin,
                        accessToken    :   this.accessToken
                    },
        "status_code" : 200,
        "message" : "success",
        "status_name" : 'ok'
        }
        
    }

    setDataAll(data){
        this.uuid           =   data.uuid
        this.fullName       =   data.fullName
        this.role           =   {
                                    id     :   data.role_id,
                                    name   :   data.role_name
                                }
        this.userType       =   {
                                    id     :   data.user_type_id,
                                    name    :   data.user_type_name,
                                    code    :   data.user_type_code
                                }
        this.email          =   data.email
        this.lastLogin      =   data.last_login
        this.accessToken    =   data.access_token
        this.mobile         =   data.mobile
        this.active       =     data.isActive
        this.createdBy      =   data.createdById == null ? null : {
                                    'uuid'    :   data.createdbyUuid,
                                    'fullName' :  data.createdfullName
                                }

        this.deletedBy      =    data.deleted_by_id == null ? null : {
                                    'uuid'    :   data.deletedbyUuid,
                                    'fullName' :  data.deletedfullName
                                }
    }

    getDataAll(){
        return {
                         uuid           :   this.uuid,
                         fullName       :   this.fullName,
                         role           :   this.role,
                         userType       :   this.userType,
                         mobile         :   this.mobile,
                         email          :   this.email,
                         lastLogin      :   this.lastLogin,
                         accessToken    :   this.accessToken,
                         active         :   this.active,
                         createdBy      :   this.createdBy,
                         deletedBy      :   this.deletedBy

         }
         
     }
}
module.exports = school