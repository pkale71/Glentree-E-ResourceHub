class materialType {
    uuid
    name
    fileTypes
    createdOn
    createdById

    constructor(){}

    setFileType(data){
        this.fileTypes = {
            "id" : data.id,
           "name" : data.name,
           "mimeType" : data.mime_type
        }
    }

    getFileType(){
        return this.fileTypes
    }
    
    setDataAll(data)
    {
        this.uuid     =   data.id
        this.name   =   data.name?.trim()
        this.fileTypes = data.fileTypes
        this.createdOn = data.created_on
        this.createdById = data.created_by_id
    }

    getDataAll()
    {
        return {
            uuid : this.id,
            name : this.name,
            fileTypes : this.fileTypes,
            createdOn : this.createdOn,
            createdById : this.createdById
        }
    }
}
module.exports = materialType