const express = require('express')
const router = express.Router()
const multer = require("multer")

const Product = require("../models/Product")



const { getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProduct)



// .post(postProduct)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g,'') + ' - ' + file.originalname); 
    
    }
})

const upload = multer({ storage:storage })

router.post("/", protect, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        Title: req.body.Title,
        price: req.body.price,
        // ProductId: req.body.ProductId,
        Quantity: req.body.Quantity,
        Description: req.body.Description,
        Category: req.body.Category,
        SkinColor: req.body.SkinColor,
        productImage: req.file.path,
        user: req.user.id
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            // console.log(req.file)
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    Title: result.Title,
                    price: result.price,
                    //   ProductId:result.ProductId,
                    Quantity: result.Quantity,
                    Description: result.Description,
                    Category: result.Category,
                    SkinColor: result.SkinColor,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/product/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct)















// router.get('/',getProduct)

// router.post('/',postProduct)

// router.put('/:id',updateProduct)

// router.delete('/:id',deleteProduct)



module.exports = router