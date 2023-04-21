// export class SchoolUserSetting {
//     id?: number;
//     uuid?: string;
//     userType?: UserType;
//     canUpload?: boolean;
//     canVerify?: boolean;
//     canUpblish?: boolean;
//   }
  
class schoolUserSetting {
    id
    uuid
    userType
    canUpload
    canVerify
    canPublish

    constructor(){}
    
    setDataAll(data)
    {
        this.id         =   data.id
        this.uuid       =   data.uuid
        this.canPublish =   data.can_publish
        this.canUpload  =   data.can_upload
        this.canVerify  =   data.can_verify
        this.userType   =   {
                                "id" : data.user_type_id,
                            }
    }

    getDataAll()
    {
        return {
            id          :   this.id,
            uuid        :   this.uuid,
            canUpload   :   this.canUpload,
            canVerify   :   this.canVerify,
            canPublish  :   this.canPublish,
            userType    :   this.userType
        }
    }
}

module.exports = schoolUserSetting