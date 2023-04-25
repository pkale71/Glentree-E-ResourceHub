// grade_category table columns name

// export class GradeCategory {
//     id?: number;
//     name?: string;
//      gradeCategory?: gradeCategory;
//   }
  
  



class grade {
    id
    name
    gradeCategory
    constructor(){}
    
    setDataAll(data)
    {
        this.id                 =   data.id
        this.name               =   data.name
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
            gradeCategory : this.gradeCategory
        }
    }
}
module.exports = grade