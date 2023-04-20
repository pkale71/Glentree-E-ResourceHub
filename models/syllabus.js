// syllabus table columns name

// export class Syllabus {
//     id?: number;
//     name?: string;
//   }
  



class syllabus {
    id
    name
    constructor(){}
    
    setDataAll(data)
    {
        this.id     =   data.id
        this.name   =   data.name
    }

    getDataAll()
    {
        return {
            id : this.id,
            name : this.name
        }
    }
}
module.exports = syllabus