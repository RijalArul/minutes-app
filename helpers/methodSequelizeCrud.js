class MethodSequelizeCRUD {
  constructor (name, method) {
    this.name = name
    this.method = method
  }

  async findAllModels (page, limit) {
    let selectPage = null
    let pageSize = null
    let offset

    // let conditionSearch = {}

    // if(search) {
    //     conditionSearch = {
    //         ...conditionSearch,
    //     }
    // }

    if (page && limit) {
      selectPage = page
      pageSize = limit
      offset = (selectPage - 1) * pageSize
    }

    const models = await this.name[this.method]({
      page: offset,
      limit: limit
    })

    const countModels = await this.name['count']()

    const totalPages = Math.ceil(countModels / pageSize)

    const response = {
      data: models,
      pagination: {
        page: selectPage,
        pageSize: pageSize,
        totalItems: countModels,
        totalPages: totalPages
      }
    }
    return response
  }

  async createModels (payload) {
    const models = await this.name[this.method](payload)
    return models
  }

  async findOneModels (payload) {
    const models = await this.name[this.method]({
      where: payload
    })

    return models
  }
  async updateModels (params, payload) {
    const models = await this.name[this.method](payload, {
      where: params,
      returning: true
    })

    return models
  }
}

module.exports = {
  MethodSequelizeCRUD
}
