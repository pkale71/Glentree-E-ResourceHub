const commonFunction = require("../common/commonFunction")
class materialType {
    uuid
    name
    fileTypes
    isExist
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
        this.uuid     =   data.uuid
        this.name   =   data.name?.trim()
        this.fileTypes = data.fileTypes
        this.createdOn = commonFunction.changeDateToSqlDate(data.created_on)
        this.createdById = data.created_by_id
        this.isExist = data.isExist
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            name : this.name,
            fileTypes : this.fileTypes,
            createdOn : this.createdOn,
            isExist : this.isExist,
            createdById : this.createdById
        }
    }
}
module.exports = materialType