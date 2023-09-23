const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})
var upload = multer({ storage: storage })

function imagePostValidation (req, res, next) {
  if (!req.file) {
    throw { name: 'EmptyImageFiles' }
  }
  if (
    req.file.size <= 255000 &&
    (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')
  ) {
    next()
  } else {
    throw {
      name: 'FileSizeMax255KBSupportedFilesJusTBetweenJpegAndPng'
    }
  }
}

function imagePutValidation (req, res, next) {
  if (!req.file) {
    next()
  } else if (
    req.file.size <= 255000 &&
    (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')
  ) {
    next()
  } else {
    throw {
      name: 'FileSizeMax255KBSupportedFilesJusTBetweenJpegAndPng'
    }
  }
}

const uploadSingle = upload.single('image')

module.exports = {
  uploadSingle,
  imagePostValidation,
  imagePutValidation
}
