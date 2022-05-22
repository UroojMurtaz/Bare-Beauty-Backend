const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    Title: {
        type: String,
        require: true,
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref: 'User'
        },
         
        ProductId: {
        type: Number,
        require: true
        },
         
        Img:{
        data : Buffer,
        contentType: String,
        },
         
        Quantity: {
        type: Number,
        require: true
        },
         
        Description: {
        type: String,
        require: true
        },

        Category: {
        type: String,
        require: true
        },

        Brand: {
            type: String,
            require: true
            },
        
        SkinColor: [{
        type: String,
        require: true
        }],
        
})

module.exports=mongoose.model('Product',productSchema)