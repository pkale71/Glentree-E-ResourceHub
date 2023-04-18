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
        this.uuid = data.uuid
        this.fullName = data.fullName
        this.role = {id:data.role_id,name:data.role_name}
        this.userType = {id:data.user_type_id,name:data.user_type_name,code:data.user_type_code}
        this.email = data.email
        this.lastLogin = data.last_login
        this.accessToken = data.access_token
    }
    getData(){
       return {
        uuid            :   this.uuid,
        fullName        :   this.fullName,
        role            :   this.role,
        userType       :   this.userType,
        email           :   this.email,
        lastLogin      :   this.lastLogin,
        accessToken    :   this.accessToken
       }
        
    }
}
module.exports = user