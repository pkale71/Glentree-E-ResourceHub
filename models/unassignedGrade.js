class unassignedGrade {
    id
    name
    constructor(){}
    
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
}
module.exports = unassignedGrade