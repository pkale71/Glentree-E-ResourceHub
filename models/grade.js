// grade table columns name

// export class Grade {
//     id?: number;
//     name?: string;
//      gradeCategory?: gradeCategory;
//   }
  
  



class grade {
    id
    name
    gradeCategory
    isExist
    constructor(){}
    
    setDataAll(data)
    {
        this.id                 =   data.id
        this.name               =   data.name
        this.isExist            =   data.isExist
        this.gradeCategory      =   {
                                        "id"    :   data.grade_category_id,
                                        "name"  :   data.gradeCategoryName
                                    }
    }

    getDataAll()
    {
        return {
            id : this.id,
            name : this.name,
            isExist : this.isExist,
            gradeCategory : this.gradeCategory
        }
    }
}
module.exports = grade