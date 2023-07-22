const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/B')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)
router.get('/user',userController.veryfyToken,userController.getUser)
router.get('/profile',userController.getProfile)
router.post('profile-image',userController.getProfileImage)

module.exports = router