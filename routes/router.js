// To define routes for client requests

// import express
const express = require('express');

// import controller
const userController = require('../controller/usersController')
const requestController = require('../controller/requestController')
const messageController = require('../controller/messageController')

// Using express create object for router class inorder to setup path
const router = new express.Router()

// Use router object to resolve client request

// Signup api request
router.post('/users/new-user',userController.signUp)

// SignIn api request
router.post('/users/user-login',userController.signIn)

// get all users
router.get('/users/all-users',userController.allUsers)

// View user
router.get('/users/view-user/:id',userController.viewUser)

// Sent chat request
router.post('/requests/sent-request',requestController.sentRequest)

// Get all requests
router.get('/requests/all-requests',requestController.allRequests)

// Accept chat request
router.post('/requests/accept-req/:id',requestController.acceptReq)

// Delete chat request
router.delete('/requests/delete-req/:id',requestController.deleteReq)

// Send message
router.post('/messages/send-msg',messageController.sendMsg)

// Get all chats
router.get('/messages/all-messages/:id',messageController.allMessages)

// Export routes
module.exports = router