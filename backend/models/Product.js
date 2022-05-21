const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    Title:{
        type:String,
        require:true,
    }
})

module.exports=mongoose.model('Product',productSchema)