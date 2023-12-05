// import mongoose
const mongoose = require('mongoose')

// Define schema for user collection to store users
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    allContacts: [],
    allChats:[]
})

// Create a model to store users
const users = new mongoose.model('users', userSchema)

// Export users
module.exports = users