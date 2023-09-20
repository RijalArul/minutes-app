class PayloadRequestProductType {
  constructor () {}

  createPayload (type_name, description, status) {
    return {
      type_name: type_name,
      description: description,
      status: status
    }
  }

  updatePayload (type_name, description, status) {
    return {
      type_name: type_name,
      description: description,
      status: status
    }
  }

  updateStatusPayload (status) {
    return {
      status: status
    }
  }
}

class PayloadRequestBrand {
  createPayload (brand_name) {
    return {
      brand_name: brand_name
    }
  }
}

class PayloadRequestSupplier {
  createPayload (supplier_name) {
    return {
      supplier_name: supplier_name
    }
  }
}

module.exports = {
  PayloadRequestProductType,
  PayloadRequestBrand,
  PayloadRequestSupplier
}
