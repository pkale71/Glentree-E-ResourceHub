// user_type table columns name

// export class UserType {
//     id?: number;
//     name?: string;
//     role?: Role;
//   }
  


class userType {
    id
    name
    code
    role
    constructor(){}
    
    setData(data)
    {
        this.id     =   data.id
        this.name   =   data.name.trim()
        this.code   =   data.code
        
    }

    getData()
    {
        return {
            id      :      this.id,
            name    :      this.name.trim(),
            code    :      this.code
        }
    }

    setDataAll(data)
    {
        this.id     =   data.id
        this.name   =   data.name.trim()
        this.code   =   data.code
        this.role   =   {
                            id     :   data.role_id,
                            //name   :   data.role_name
                        }
    }

    getDataAll()
    {
        return {
            id      :      this.id,
            name    :      this.name,
            role    :      this.role,
            code    :      this.code
        }
    }
}
module.exports = userType