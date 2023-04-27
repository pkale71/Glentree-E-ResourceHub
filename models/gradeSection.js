class gradeSection {
    uuid
    academic
    school
    gradeSection
    grade
    gradeCategory
    constructor(){}

    setGradeSection(data){
        this.gradeSection   =   {
                                    "uuid"    : data.uuid,
                                    "name"  : data.section
                                }
    }

    getGradeSection(){
        return  this.gradeSection
    }

    setGrade(data){
        this.grade   =   {
                            "id"    : data.grade_id,
                            "name"  : data.gradeName,
                            "section" : data.sections
                        }
    }

    getGrade(data){
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
                                    "name"  :   data.schoolName
                                }
        this.gradeCategory      =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName,
                                    "grade" :   {
                                                    "id"         :   data.grade_id,
                                                    "name"       :   data.gradeName,
                                                    "section"    :   data.gradeSection
                                                }
                                }
    }

    getData()
    {
        return {
            academic : this.academic,
            school : this.school,
            gradeCategory : this.gradeCategory,
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
                                    "name"  :   data.schoolName
                                }
        this.gradeCategory  =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName,
                                    "grade" :   data.grade
                                }
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
       
        this.gradeCategory  =   {
                                    "id"    :   data.gradeCategoryId,
                                    "name"  :   data.gradeCatName,
                                    "grade" :   data.grade
                                }
    }

    // setGradeCategories(data)
    // {
       
    //     this.gradeCategory  =   data.gradeCategory
    // }


    getGradeCategory()
    {
        return  this.gradeCategory
        
    }
    setDataAllSchool(data)
    {
        this.academic       =   {
                                    "uuid"    :   data.acaUuid,
                                    "year"  :   data.year
                                }
        this.school         =   {
                                    "uuid"    :   data.schoolUuid,
                                    "name"  :   data.schoolName
                                }
        this.gradeCategory  =   data.gradeCategory
    }
    getDataAllSchool()
    {
        return {
            academic : this.academic,
            school : this.school,
            gradeCategories : this.gradeCategory
        }
    }

}
module.exports = gradeSection