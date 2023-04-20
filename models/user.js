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

    constructor(){}

    setData(data){
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
module.exports = user