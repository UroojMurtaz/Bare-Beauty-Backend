const asyncHandler= require("express-async-handler")
const Product = require("../models/Product")



// @desc Get Product
// @route GET /api/product
// @access Private

const getProduct=asyncHandler(async(req,res)=>{
         const product=await Product.find()

        res.status(200).json(product)
   
})
// @desc Post Product
// @route POST /api/product
// @access Private

const postProduct= asyncHandler(async(req,res)=>{
    const product = await Product.create({
        Title: req.body.Title
    })
    res.status(200).json(product)

})

// @desc Put Product
// @route PUT /api/product/:id
// @access Private

const updateProduct=asyncHandler(async(req,res)=>{

    const productid=await Product.findById(req.params.id)

    if(!productid){
        res.status(400)
        throw new Error("Product not found")
    }
    
    const updatedProduct= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updatedProduct)

})

// @desc Delete Product
// @route DELETE /api/product/:id
// @access Private

const deleteProduct=asyncHandler(async(req,res)=>{
    const productid=await Product.findById(req.params.id)

    if(!productid){
        res.status(400)
        throw new Error("Product not found")
    }
    
    await productid.remove()
    
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getProduct,deleteProduct,updateProduct,postProduct
}