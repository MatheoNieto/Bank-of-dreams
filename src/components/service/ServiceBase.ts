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

  listData(entity: any, request: any, dataId?: string) {
    return new Promise(async (resolve, reject) => {
      const optionFilter = request.query
      let get_data

      if (!dataId) {
        get_data = await this.databaseLib.getAll(entity)
      } else {
        get_data = await this.databaseLib.getById(entity, dataId)
      }

      if (!get_data) {
        reject(boom.notFound('Data not found.'))
      }

      const filterData = await this.filterData(optionFilter, get_data)
      resolve(filterData)
    })
  }

  createData(entity: any, data: any, request?: any, ) {
    return new Promise(async (resolve, reject) => {
      const existData = await this.validDataExist(entity, data)

      if (existData) {
        reject(boom.badRequest('This information already exist.'))
      }

      const newData = await this.databaseLib.create(entity, data)
      resolve(newData)
    })
  }

  updateData(request: any, dataId: any, data: any) {

  }

  deleteData(request: any, dataId: any) {

  }

}

export default serviceBase