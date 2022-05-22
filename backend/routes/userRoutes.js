const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getUser,getUserById
    } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUserById)
router.get('/',protect,getUser)




module.exports= router