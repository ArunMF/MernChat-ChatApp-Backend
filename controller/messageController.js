// import users collection
const users = require('../model/usersSchema')

// Send message
exports.sendMsg = async(req, res) => {
    const { fromEmail, toEmail, chatMsg } = req.body
    const msgBody = { from: fromEmail, to: toEmail, sentMsg: chatMsg }
    const msgBody1 = { from: fromEmail, to: toEmail, recieveMsg: chatMsg }
    try {
        const myAcc = await users.findOne({ id: fromEmail })
        const chatUser = await users.findOne({ id: toEmail })
        if (myAcc) {
            const checkChatUser = await myAcc.allContacts.find(contact=>contact.email == toEmail)
            if (checkChatUser) {
                myAcc.allChats.push(msgBody)
                myAcc.save()

                chatUser.allChats.push(msgBody1)
                chatUser.save()

                res.status(200).json({ message: "Message sent." })
            }
            else {
                res.status(404).json({ message: "Chat user not found." })
            }
        }
        else {
            res.status(404).json({ message: "Account does not exist." })
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// All messeges
exports.allMessages = async(req,res)=>{
    const id = req.params.id
    try{
        const user = await users.findOne({id})
            res.status(200).json(user.allChats)
    }
    catch(error){
        res.status(401).json(error)
    }
}
