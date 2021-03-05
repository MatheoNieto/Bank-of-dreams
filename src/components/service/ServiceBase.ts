import boom from '@hapi/boom'

import SuperClass from './SuperClass'

class serviceBase extends SuperClass {

  private filterData(filter: any, data: any) {
    if (this.isEmptyObject(filter)) {
      return data
    }

    for (let key in filter) {
      const getDataByFilter = filter[key] || ''

      if (getDataByFilter != '') {
        data = data.filter((item: any) => item[key] == getDataByFilter)
      }
    }

    return data
  }

  listData(entity: any, request?: any, dataId?: string) {
    return new Promise(async (resolve, reject) => {
      let optionFilter, get_data, client

      if (request) {
        optionFilter = request.query
        client = request.user
      }

      if (!dataId) {
        get_data = await this.databaseLib.getAll(entity)
      } else if (!client) {
        get_data = await this.databaseLib.getById(entity, dataId)
      } else {
        get_data = await this.databaseLib.getByClient(entity, client)
      }

      if (!get_data) {
        reject(boom.notFound('Data not found.'))
      }

      const filterData = await this.filterData(optionFilter, get_data)
      resolve(filterData)
    })
  }

  createData(entity: any, data: any, request?: any,) {
    return new Promise(async (resolve, reject) => {
      const existData = await this.validDataExist(entity, data)

      if (existData) {
        reject(boom.badRequest('This information already exist.'))
      }

      const newData = await this.databaseLib.create(entity, data)
      resolve(newData)
    })
  }

  updateData(entity: any, request: any, dataId: any, newdata: any) {
    return new Promise(async (resolve, reject) => {

      const dataUpdated = await this.databaseLib.update(entity, dataId, newdata)
      resolve(dataUpdated)
    })
  }

  deleteData(request: any, dataId: any) {

  }

}

export default serviceBase