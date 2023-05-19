class assignedGrade {
    id
    name
    userAssignedSubjects


    constructor(){}

    setAssignedSubjects(data){
        this.userAssignedSubjects = {
            "uuid" : data.uuid,
            "user" : {
                "uuid" : data.userUuid,
                "name" : data.userName?.trim()
            },
            "assignedSubject" : {
                "uuid" : data.subjectUuid,
                "name" : data.subjectName?.trim()
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

    getAssignedSubjects(){
        return this.userAssignedSubjects
    }
    

    setData(data)
    {
        this.id     =   data.gradeId
        this.name   =   data.gradeName?.trim()
        this.userAssignedSubjects = data.userAssignedSubjects
    }

    getData()
    {
        return {
            id : this.id,
            name : this.name,
            userAssignedSubjects : this.userAssignedSubjects
        }
    }
}
module.exports = assignedGrade