const asyncHandler= require("express-async-handler")

// @desc Get Product
// @route GET /api/product
// @access Private

const getProduct=asyncHandler(async(req,res)=>{
        res.status(200).json({message: "Get"})
   
})
// @desc Post Product
// @route POST /api/product
// @access Private

const postProduct= asyncHandler(async(req,res)=>{
    if (!req.body.text){
        res.status(400)
        throw new Error("please add text")
    }
    res.status(200).json({message: "hello"})

})

// @desc Put Product
// @route PUT /api/product/:id
// @access Private

const updateProduct=asyncHandler(async(req,res)=>{
    res.status(200).json({message: `Update Product ${req.params.id}`})

})

// @desc Delete Product
// @route DELETE /api/product/:id
// @access Private

const deleteProduct=asyncHandler(async(req,res)=>{
    res.status(200).json({message: `Delete ${req.params.id}`})

})

module.exports = {
    getProduct,deleteProduct,updateProduct,postProduct
}