class assignedSection {
    id
    name
    grade
    userAssignedSections


    constructor(){}

    setAssignedSection(data){
        this.userAssignedSections = {
            "uuid" : data.uuid,
            "user" : {
                "uuid" : data.userUuid,
                "name" : data.userName.trim()
            },
            "assignedGrade" : {
                "id" : data.gradeId,
                "name" : data.gradeName
            },
            "school" : {
                "uuid" : data.schoolUuid,
                "name" : data.schoolName
            },
            "academicYear" : {
                "uuid" : data.acaUuid,
                "year" : data.year
            }
        }
    }

    getAssignedSection(){
        return this.userAssignedSections
    }
    
    setGrade(data)
    {
        this.id     =   data.id
        this.name   =   data.name?.trim()
        this.userAssignedSections = data.userAssignedSections
    }

    getGrade()
    {
        return {
            id : this.id,
            name : this.name,
            userAssignedSections: this.userAssignedSections
        }
    }

    setData(data)
    {
        this.id     =   data.gradeCategoryId
        this.name   =   data.gradeCategoryName?.trim()
        this.grade  =   data.grade
    }

    getData()
    {
        return {
            id : this.id,
            name : this.name,
            grade : this.grade
        }
    }
}
module.exports = assignedSection