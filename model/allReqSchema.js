// import mongoose
const mongoose = require('mongoose')

// Define schema for request collection to store chat requests
const requestSchema = new mongoose.Schema({
    toEmail:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
})

// create a model to store requests
const requests =  new mongoose.model('requests',requestSchema)

// Export requests
module.exports = requests