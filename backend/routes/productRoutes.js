const express = require('express')
const router = express.Router()

const {getProduct,
       postProduct,
       updateProduct,
       deleteProduct
    } = require('../controllers/productController')

router.route('/').get(getProduct).post(postProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)
// router.get('/',getProduct)

// router.post('/',postProduct)

// router.put('/:id',updateProduct)

// router.delete('/:id',deleteProduct)



module.exports= router