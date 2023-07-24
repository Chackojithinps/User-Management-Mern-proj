const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"../public/profileImages"),function(error,success){
        if(error){
            console.log(error);
        }
    })
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname,(err)=>{
        if(err){
          console.log(err.message)
        }
      })
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)
router.get('/user',userController.veryfyToken,userController.getUser)
router.get('/profile',userController.getProfile)
router.post('/profile-image',upload.single("image"),userController.getProfileImage)

module.exports = router