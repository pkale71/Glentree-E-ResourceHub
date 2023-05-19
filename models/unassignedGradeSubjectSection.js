class unassignedGradeSubject {
    uuid
    name
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid     =   data.uuid
        this.name   =   data.section
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            name : this.name
        }
    }
}
module.exports = unassignedGradeSubject