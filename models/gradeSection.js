class gradeSection {
    uuid
    academic
    school
    gradeSection
    grade
    gradeCategory
    constructor(){}

    setGradeSection(data){
        this.gradeSection   =  {
                                    "uuid"    : data.uuid,
                                    "name"  : data.section,
                                    "isExist"  : data.isExist
                                }
    }

    getGradeSection(){
        return  this.gradeSection
    }

    setGrade(data){
        this.grade   =    {
                            "id"    : data.grade_id,
                            "name"  : data.gradeName.trim(),
                            "sections" : data.sections
                        }
                        // this.grade   = data?   {
                        //     "id"    : data.grade_id,
                        //     "name"  : data.gradeName,
                        //     "section" : data.sections
                        // }: {}
    }

    getGrade(){
       return this.grade  
    }
    
    setData(data)
    {
        this.academic       =   {
                                    "uuid"    :   data.acaUuid,
                                    "year"  :   data.year
                                }
        this.school         =   {
                                    "uuid"    :   data.schoolUuid,
                                    "name"  :   data.schoolName.trim()
                                }
        this.gradeCategory      =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName.trim(),
                                    "grades" :   {
                                                    "id"         :   data.grade_id,
                                                    "name"       :   data.gradeName.trim(),
                                                    "sections"    :   data.gradeSection
                                                }
                                }
    }

    getData()
    {
        return {
            academic : this.academic,
            school : this.school,
            gradeCategories : this.gradeCategory,
        }
    }

    setDataAll(data)
    {
        this.academic       =   {
                                    "uuid"    :   data.acaUuid,
                                    "year"  :   data.year
                                }
        this.school         =   {
                                    "uuid"    :   data.schoolUuid,
                                    "name"  :   data.schoolName.trim()
                                }
        this.gradeCategory  =  {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName.trim(),
                                    "grades" :   data.grade
                                }
        //                         this.academic       =  data ? {
        //                             "uuid"    :   data.acaUuid,
        //                             "year"  :   data.year
        //                         }:{}
        // this.school         = data ?  {
        //                             "uuid"    :   data.schoolUuid,
        //                             "name"  :   data.schoolName
        //                         }:{}
        // this.gradeCategory  = data ?  {
        //                             "id"    :   data.gradeCategoryId,
        //                             "name"  :   data.gradeCatName,
        //                             "grade" :   data.grade
        //                         }:{}
    }
    getDataAll()
    {
        return {
            academic : this.academic,
            school : this.school,
            gradeCategory : this.gradeCategory
        }
    }

    setGradeCategory(data)
    {
       
        this.gradeCategory  =  {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName.trim(),
                                    "grade" :   data.grade
                                }
                                // this.gradeCategory  = data?  {
                                //     "id"    :   data.gradeCategoryId,
                                //     "name"  :   data.gradeCatName,
                                //     "grade" :   data.grade
                                // }:{}
    }

    // setGradeCategories(data)
    // {
       
    //     this.gradeCategory  =   data.gradeCategory
    // }


    getGradeCategory()
    {
        return  this.gradeCategory
        
    }
  
}
module.exports = gradeSection