// syllabus table columns name

// export class Syllabus {
//     id?: number;
//     name?: string;
//   }
  



class syllabus {
    id
    name
    isExist
    constructor(){}
    
    setDataAll(data)
    {
        this.id     =   data.id
        this.name   =   data.name
        this.isExist    = data.isExist
    }

    getDataAll()
    {
        return {
            id : this.id,
            name : this.name,
            isExist : this.isExist
        }
    }
}
module.exports = syllabus