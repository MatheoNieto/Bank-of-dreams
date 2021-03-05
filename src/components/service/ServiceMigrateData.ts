import SuperClass from './SuperClass'

class ServiceMigrateData extends SuperClass {
  private static instance: ServiceMigrateData

  public static getInstance(): ServiceMigrateData {
    if (!ServiceMigrateData.instance) {
      ServiceMigrateData.instance = new ServiceMigrateData()
    }
    return ServiceMigrateData.instance
  }

  public async createMultipleData(entity: any, data: any) {
    await this.databaseLib.multipleCreate(entity, data)
  }
}

export default ServiceMigrateData



