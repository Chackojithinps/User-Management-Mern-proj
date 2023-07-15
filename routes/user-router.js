const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()

router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)

module.exports = router