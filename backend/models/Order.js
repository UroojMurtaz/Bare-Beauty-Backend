const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    OrderNumber: {
        type: Number,
        require: true,
    },
    OrderStatus: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    ShippingAddress: {
        type: String,
        require: true
    },
    orderAmount: {
        type: Number,
        require: true
    },
},
    {
        timestamps: true
    });



module.exports = mongoose.model('Order', orderSchema)