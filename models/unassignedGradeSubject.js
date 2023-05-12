class unassignedGradeSubject {
    uuid
    name
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid     =   data.uuid
        this.name   =   data.name?.trim()
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