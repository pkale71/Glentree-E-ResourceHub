// export class SchoolGradeCategory {
//     id?: number;
//     school?: School;
//     gradeCategory : GradeCategory;
//   }
  
class schoolGradeCategory {
    school
    gradeCategory
    

    constructor(){}
    
    setDataAll(data)
    {
        this.school             =   {
                                        "uuid"    : data.schoolUuid,
                                        "name"  : data.schoolName
                                    }
        this.gradeCategory      =   {
                                        "id" : data.gradeId,
                                        "name" : data.gradeName
                                    }
    }

    getDataAll()
    {
        return {
            school          :   this.school,
            gradeCategory   :   this.gradeCategory
        }
    }
}

module.exports = schoolGradeCategory
