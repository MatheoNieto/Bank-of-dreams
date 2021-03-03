import SuperClass from './SuperClass'

class validateDataExist extends SuperClass {
  private static instance: validateDataExist;

  public static getInstance(): validateDataExist {

    if (!validateDataExist.instance) {
      validateDataExist.instance = new validateDataExist();
    }
    return validateDataExist.instance;
  }

  async valid(entity: any, data: any) {
    const dataExist = await this.databaseLib.getByQuery(entity, {
      where: {
        ...data,
        active: true
      }
    })

    return !this.isEmptyObject(dataExist)
  }

}

export default validateDataExist