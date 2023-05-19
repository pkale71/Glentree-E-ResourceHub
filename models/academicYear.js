// academic_year table columns name

const commonFunction = require("../common/commonFunction")

// export class academicYear {
//     id?: number;
//     uuid?: string;
//      year?: string;
//      startDate: Date
//      endDate: Date
//      isCurrent: Date
//   }
  




class academicYear {
    id
    uuid
    year
    startDate
    endDate
    isCurrent
    isExist
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.year           =   data.year
        this.startDate      =   commonFunction.changeDateToSqlDate(data.start_date) 
        this.endDate        =   commonFunction.changeDateToSqlDate(data.end_date)
        this.isCurrent      =   data.is_current ? data.is_current : 0
        this.isExist        =   data.isExist
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            year : this.year,
            startDate : this.startDate,
            endDate : this.endDate,
            isCurrent : this.isCurrent,
            isExist : this.isExist
        }
    }
}
module.exports = academicYear