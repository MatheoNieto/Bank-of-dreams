import DatabaseLib from '../../database/databaseLib'

class SuperClass {
  protected databaseLib: DatabaseLib

  constructor() {
    this.databaseLib = DatabaseLib.getInstance()
  }

  isEmptyObject(obj:any){
    return JSON.stringify(obj) == '{}';
  }
}

export default SuperClass
