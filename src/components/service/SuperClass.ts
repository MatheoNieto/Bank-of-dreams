import moment from 'moment'

import DatabaseLib from '../../database/databaseLib'
class SuperClass {
  protected databaseLib: DatabaseLib

  constructor() {
    this.databaseLib = DatabaseLib.getInstance()
  }

  isEmptyObject(obj:any){
    return JSON.stringify(obj) == '{}';
  }

  async validDataExist(entity: any, data: any) {
    const dataExist = await this.databaseLib.getByQuery(entity, {
      where: {
        ...data,
        active: true
      }
    })
    return dataExist != undefined
  }

  private formatDate(date:string){
    return moment(date).format('YYYY-MM-DD')
  }

  filterDates(dateFilter:string, dateStart:string, dateEnd:string){
    dateFilter = this.formatDate(dateFilter)
    dateStart = this.formatDate(dateStart)
    dateEnd = this.formatDate(dateEnd)

    return moment(dateFilter).isBetween(dateStart, dateEnd, undefined, '[]');
  }
}

export default SuperClass
