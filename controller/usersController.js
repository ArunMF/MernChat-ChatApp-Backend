// import users collection
const users = require('../model/usersSchema')

// Signup
exports.signUp = async(req,res)=>{
    const {id,firstname,lastname,password,imageurl} = req.body
    // console.log(id,firstname,lastname,password,imageurl);
    try{
        const checkUser = await users.findOne({id})
        if(checkUser){
            res.status(404).json({message:"User already exist."})
        }
        else{
            const newUser = new users({id,firstname,lastname,password,imageurl})
            await newUser.save();
            // Send response back to client
            res.status(200).json({message:"Account created successfully."})
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// Signin
exports.signIn = async(req,res)=>{
    const {id,password} = req.body
    try{
        const userCheck = await users.findOne({id})
        if(userCheck){
            if(password==userCheck.password){
                res.status(200).json({message:"Login successful."})
            }
            else{
                res.status(404).json({message:"Invalid password!"})
            }
        }
        else{
            res.status(404).json({message:"User does not exist!"})
        }
    }
    catch(error){
        json.status(401).json(error)
    }
}

// Get all users
exports.allUsers = async(req,res)=>{
    try{
        const allusers = await users.find()
        res.status(200).json(allusers)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// View user
exports.viewUser = async(req,res)=>{
    const id = req.params.id
    try{
        const user = await users.findOne({id})
        if (user) {
            res.status(200).json(user)
        }
        else{
            res.status(404).json({message:"User not found."})
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}
