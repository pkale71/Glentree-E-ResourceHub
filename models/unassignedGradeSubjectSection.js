class unassignedGradeSubject {
    uuid
    section
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid     =   data.uuid
        this.section   =   data.section?.trim()
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            section : this.section
        }
    }
}
module.exports = unassignedGradeSubject