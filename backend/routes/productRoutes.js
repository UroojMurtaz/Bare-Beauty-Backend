const express = require('express')
const router = express.Router()

// const multer=require("multer")
// const upload=multer({dest:'/uploads/'})

const {getProduct,
       postProduct,
       updateProduct,
       deleteProduct
    } = require('../controllers/productController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect ,getProduct).post(protect,postProduct)
router.route('/:id').put(protect,updateProduct).delete(protect,deleteProduct)















// router.get('/',getProduct)

// router.post('/',postProduct)

// router.put('/:id',updateProduct)

// router.delete('/:id',deleteProduct)



module.exports= router