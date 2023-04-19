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
}
module.exports = user