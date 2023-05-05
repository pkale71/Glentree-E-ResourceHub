// role table columns name

// export class Role {
//     id?: number;
//     name?: string;
//   }
  


class role {
    id
    name
    constructor(){}
    
    setDataAll(data)
    {
        this.id     =   data.id
        this.name   =   data.name.trim()
    }

    getDataAll()
    {
        return {
            id : this.id,
            name : this.name.trim()
        }
    }
}
module.exports = role