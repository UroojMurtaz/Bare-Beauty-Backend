const asyncHandler= require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")




// @desc Get Order details
// @route GET /api/orders
// @access Private

const getOrder=asyncHandler(async(req,res)=>{
         const order=await Order.find({user:req.user.id})

        res.status(200).json(product)
   
})
// @desc Post order
// @route POST /api/orders
// @access Private

const postOrder= asyncHandler(async(req,res)=>{

    const {OrderStatus, OrderNumber,ShippingAddress,orderAmount}=req.body

    const Order = await Order.create({
        OrderNumber,
        OrderStatus,
        ShippingAddress,
        orderAmount,
        user: req.user.id
    })
    res.status(200).json(Order)

})

// @desc Put order
// @route PUT /api/orders/:id
// @access Private

const updateOrder=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id)

    if(!order){
        res.status(400)
        throw new Error("Order not found")
    }
    
    //check for user
    const user=await User.findById(req.user.id)
    if(user){
        res.status(401)
        throw new Error("user not found")
    }
    //make sure the looged in user match the Produt user
    if(order.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not Authorized")
    }

    const updatedOrder= await Order.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updatedOrder)

})

// @desc Delete order
// @route DELETE /api/product/:id
// @access Private

const deleteOrder=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)

    if(!order){
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
     if(order.user.toString() !== user.id){
         res.status(401)
         throw new Error("user not Authorized")
     }
 
    await order.remove()
    
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getOrder,deleteOrder,updateOrder,postOrder
}