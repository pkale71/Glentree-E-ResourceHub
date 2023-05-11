class assignedSection {
    uuid
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
            "assignedSection" : {
                "uuid" : data.sectionUuid,
                "name" : data.section
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
       this.grade = {
        "id"     :   data.gradeId,
        "name"   :   data.gradeName?.trim(),
        "userAssignedSections" : data.userAssignedSections
       } 
    }

    getGrade()
    {
        return this.grade
    }

    setData(data)
    {
        this.uuid     =   data.subjectUuid
        this.name   =   data.subjectName?.trim()
        this.grade  =   data.grade
    }

    getData()
    {
        return {
            uuid : this.uuid,
            name : this.name,
            grade : this.grade
        }
    }
}
module.exports = assignedSection