const express = require('express')
const dotenv = require('dotenv').config()
const colors =require("colors")
// const connectDB=require("./config/db")
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const mongoose = require ("mongoose")
var dbURL=require("./properties").DB_URL;

mongoose.connect(dbURL);
mongoose.connection.on("connected",()=>{
    console.log("connected to database")
})



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/product',require('./routes/productRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/orders',require('./routes/orderRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))




