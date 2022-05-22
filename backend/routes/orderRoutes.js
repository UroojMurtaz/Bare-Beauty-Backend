const express = require('express')
const router = express.Router()

// const multer=require("multer")
// const upload=multer({dest:'/uploads/'})

const {getOrder,
    deleteOrder,
    updateOrder,
    postOrder
    } = require('../controllers/orderController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect ,getOrder).post(protect,postOrder)
router.route('/:id').put(protect,updateOrder).delete(protect,deleteOrder)


module.exports= router