const asyncHandler= require("express-async-handler")
const Product = require("../models/Product")
const User = require("../models/User")



// @desc Get Product
// @route GET /api/product
// @access Private

const getProduct=asyncHandler(async(req,res)=>{
         const product=await Product.find({user:req.user.id})

        res.status(200).json(product)
   
})
// @desc Post Product
// @route POST /api/product
// @access Private

const postProduct= asyncHandler(async(req,res)=>{
    const product = await Product.create({
        Title: req.body.Title,
        ProductId: req.body.ProductId,
        Quantity:req.body.Quantity,
        Description:req.body.Description,
        Category:req.body.Category,
        SkinColor:req.body.SkinColor,
        user: req.user.id
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
    
    //check for user
    const user=await User.findById(req.user.id)
    if(user){
        res.status(401)
        throw new Error("user not found")
    }
    //make sure the looged in user match the Produt user
    if(productid.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not Authorized")
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
    
     //check for user
     const user=await User.findById(req.user.id)
     if(!user){
         res.status(401)
         throw new Error("user not found")
     }
     //make sure the looged in user match the Produt user
     if(productid.user.toString() !== user.id){
         res.status(401)
         throw new Error("user not Authorized")
     }
 
    await productid.remove()
    
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getProduct,deleteProduct,updateProduct,postProduct
}