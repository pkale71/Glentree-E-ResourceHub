// user table columns name

// import { Role } from "./role";
// import { UserType } from "./userType";

// export class User {
//   id?: number;
//   uuid?: string;
//   firstName?: string;
//   lastName?: string;
//   fullName?: string;
//   role?: Role;
//   userType?: UserType;
//   mobile?: string;
//   email?: string;
//   gender?: string;
//   school?: string;
//   password?: string;
//   active?: boolean;
//   createdOn?: Date;
//   createdBy?: User;
//   deletedOn?: Date;
//   deletedBy?: User;
//   lastLogin?: Date;
//   accessToken?: string;
// }



class user {
    uuid 
    fullName
    role 
    userType
    email
    lastLogin
    accessToken
    mobile
    active
    createdBy
    deletedBy
    gender
    school
    firstName
    lastName
    userTypeExist

    constructor(){}

    setSchool(data){
        this.school         =   {
                                    "uuid" : data.uuid,
                                    "name" : data.name?.trim(),
                                    "email" : data.schoolEmail,
                                    "contact1" : data.contact1,
                                    "isExist"   : data.isExist,
                                    "curriculumUpload" : data.curriculum_upload,
                                    "curriculumComplete" : data.curriculum_complete,
                                    "syllabus"  :   {
                                                        "id" : data.id,
                                                        "name" : data.syllabusName
                                                    }
                                }
    }

    getSchool()
    {
        return this.school
    }

    setData(data){
        this.uuid           =   data.uuid
        this.fullName       =   data.fullName?.trim()
        this.role           =   {
                                    id     :   data.role_id,
                                    name   :   data.role_name?.trim()
                                }
        this.userType       =   {
                                    id     :   data.user_type_id,
                                    name    :   data.user_type_name?.trim(),
                                    code    :   data.user_type_code
                                }
        this.school         =   data.schools
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
                        schools        :   this.school,
                        accessToken    :   this.accessToken
                    },
        "status_code" : 200,
        "message" : "success",
        "status_name" : 'ok'
        }
        
    }

    setDataAll(data){
        this.uuid           =   data.uuid
        this.fullName       =   data.fullName?.trim()
        this.firstName      =   data.first_name?.trim()
        this.lastName       =   data.last_name?.trim()
        this.role           =   {
                                    id     :   data.role_id,
                                    name   :   data.role_name?.trim()
                                }
        this.userType       =   {
                                    id     :   data.user_type_id,
                                    name    :   data.user_type_name?.trim(),
                                    code    :   data.user_type_code
                                }
        this.email          =   data.email
        this.lastLogin      =   data.last_login
        this.accessToken    =   data.access_token
        this.mobile         =   data.mobile
        this.active       =     data.isActive
        this.createdBy      =   data.createdById == null ? null : {
                                    'uuid'    :   data.createdbyUuid,
                                    'fullName' :  data.createdfullName?.trim()
                                }

        this.deletedBy      =    data.deleted_by_id == null ? null : {
                                    'uuid'    :   data.deletedbyUuid,
                                    'fullName' :  data.deletedfullName?.trim()
                                }
        this.gender         =   data.gender,
        this.userTypeExist  =   data.userTypeExist
        this.school         =   data.schools
    }

    getDataAll(){
        return {
                         uuid           :   this.uuid,
                         fullName       :   this.fullName,
                         firstName      :   this.firstName,
                         lastName       :   this.lastName,
                         role           :   this.role,
                         userType       :   this.userType,
                         mobile         :   this.mobile,
                         email          :   this.email,
                         gender         :   this.gender,
                         lastLogin      :   this.lastLogin,
                         accessToken    :   this.accessToken,
                         active         :   this.active,
                         createdBy      :   this.createdBy,
                         deletedBy      :   this.deletedBy,
                         userTypeExist :   this.userTypeExist,
                         schools        :   this.school
         }
     }
}
module.exports = user