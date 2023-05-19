class assignedGrade {
    id
    name
    userSuperviseGrades


    constructor(){}

    setSuperviseGrade(data){
        this.userSuperviseGrades = {
            "uuid" : data.uuid,
            "user" : {
                "uuid" : data.userUuid,
                "name" : data.userName?.trim()
            },
            "assignedGrade" : {
                "id" : data.gradeId,
                "name" : data.gradeName?.trim()
            },
            "school" : {
                "uuid" : data.schoolUuid,
                "name" : data.schoolName?.trim()
            },
            "academicYear" : {
                "uuid" : data.acaUuid,
                "year" : data.year
            }
        }
    }

    getSuperviseGrade(){
        return this.userSuperviseGrades
    }
    
    setDataAll(data)
    {
        this.id     =   data.id
        this.name   =   data.name?.trim()
    }

    getDataAll()
    {
        return {
            id : this.id,
            name : this.name
        }
    }

    setData(data)
    {
        this.id     =   data.gradeCategoryId
        this.name   =   data.gradeCategoryName?.trim()
        this.userSuperviseGrades = data.userSuperviseGrades
    }

    getData()
    {
        return {
            id : this.id,
            name : this.name,
            userSuperviseGrades : this.userSuperviseGrades
        }
    }
}
module.exports = assignedGrade