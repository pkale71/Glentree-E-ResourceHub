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
                                        "name"  : data.schoolName?.trim()
                                    }
        this.gradeCategory      =   {
                                        "id" : data.gradeId,
                                        "name" : data.gradeName?.trim()
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
