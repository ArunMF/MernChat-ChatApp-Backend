// import users collection
const requests = require('../model/allReqSchema')
const users = require('../model/usersSchema')

// Sent chat request
exports.sentRequest = async (req, res) => {
    const { toEmail, id, fullname, imageurl } = req.body
    const body = { toEmail, id, fullname, imageurl }
    try {
        const checkReq = await requests.findOne({ toEmail, id })   // check if req you are already sent
        const checkOppReq = await requests.findOne({ toEmail: id, id: toEmail })
        const user = await users.findOne({ id })  // finding requested user from users collection
        const checkCont = await user.allContacts.find(contact => contact.email == toEmail)  // check if the toEmail user is already exist in requested user's contact list

        if (checkCont) {
            res.status(404).json({ message: "User already exist in your chat list." })
            
            if (checkReq) {
                res.status(404).json({ message: "Chat request already sent." })
            }
            else if (checkOppReq) {
                res.status(404).json({ message: "Please check your Chat requests." })
            }
            else {
                const newReq = new requests(body)
                await newReq.save();
                res.status(200).json({ message: "Chat request sent." })
            }
        }
    }
    catch (error) {
            res.status(401).json(error)
        }
    }

// Get all requests
exports.allRequests = async (req, res) => {
        try {
            const allReq = await requests.find()
            res.status(200).json(allReq)
        }
        catch (error) {
            res.status(401).json(error)
        }
    }

    // Accept chat request
    exports.acceptReq = async (req, res) => {
        const { email, fullname, imageurl } = req.body

        const reqBody = { email, fullname, imageurl } // chat request body or requested user details from client

        const id = req.params.id    // id of the accepting user

        try {
            const accUser = await users.findOne({ id }) // finding the accepting user details on users collection by id

            let reqFullname = `${accUser.firstname} ${accUser.lastname}`
            const accBody = { email: accUser.id, fullname: reqFullname, imageurl: accUser.imageurl } // body(details) of accepting user

            const reqUser = await users.findOne({ id: email }) // finding the requested user on users collection by id

            if (accUser) {
                const checkContact = await accUser.allContacts.find(contact => contact.id == email) // checking if user already exist in allContacts of acceppting user
                if (checkContact) {
                    res.status(404).json({ message: "Already in chat list." })
                }
                else {
                    accUser.allContacts.push(reqBody)   // adding requested user details to accepting user's allContacts
                    accUser.save()

                    reqUser.allContacts.push(accBody)   // adding accepting user details to requested user's allContacts
                    reqUser.save()

                    res.status(200).json({ message: "Added to chat list." }) // response back to client
                }
            }
            else {
                res.status(404).json({ message: "User not found." })
            }
        }
        catch (error) {
            res.status(401).json(error)
        }
    }

    // Delete chat request
    exports.deleteReq = async (req, res) => {
        const id = req.params.id
        try {
            await requests.deleteOne({ id })
            res.status(200).json({ message: "Request deleted." })
        }
        catch (error) {
            res.status(401).json(error)
        }
    }