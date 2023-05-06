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
        this.name               =   data.name?.trim()
        this.isExist            =   (data.isExist == 0 && data.Exist == 0) ? 0 : 1
        this.gradeCategory      =   {
                                        "id"    :   data.grade_category_id,
                                        "name"  :   data.gradeCategoryName?.trim()
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