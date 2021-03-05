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
}

export default SuperClass
