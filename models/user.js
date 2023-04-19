// user table columns name

// id
// uuid
// first_name
// last_name
// role_id
// user_type_id
// mobile
// email
// gender
// school_id
// password
// is_active
// created_on
// created_by_id
// deleted_on
// deleted_by_id
// last_login




class user {
    uuid 
    fullName
    role 
    userType
    email
    lastLogin
    accessToken

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
    }
    getData(){
       return {
        user    :   {
                        uuid           :   this.uuid,
                        fullName       :   this.fullName,
                        role           :   this.role,
                        userType       :   this.userType,
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