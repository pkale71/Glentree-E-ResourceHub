// academic_year table columns name

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
    constructor(){}
    
    setDataAll(data)
    {
        this.uuid           =   data.uuid
        this.year           =   data.year
        this.startDate      =   data.start_date
        this.endDate        =   data.end_date
    }

    getDataAll()
    {
        return {
            uuid : this.uuid,
            year : this.year,
            startDate : this.startDate,
            endDate : this.endDate
        }
    }
}
module.exports = academicYear