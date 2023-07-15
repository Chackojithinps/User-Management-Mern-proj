const User = require('../model/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const userSignup = async(req,res,next) =>{
    const {name,email,password} = req.body
    // console.log(req.body)
    let isExists;
    try {
         isExists = await User.findOne({email:email})
    } catch (error) {
        console.log(error.message)
    }
    if(isExists){
        return res.status(401).json({message:"user with this email already exits"})
    }
    const hashPassword =await bcrypt.hash(password.toString(),10);
    const user = new User ({
        name,
        email,
        password:hashPassword
    })
    try {
        await user.save()
    } catch (error) {
        console.log(error.message)
    }

    return res.status(200).json({message:user})
}

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    let isUserExists;
    try {
         isUserExists = await User.findOne({email:email})
         console.log(isUserExists)
    } catch (error) {
        console.log(error.message)
    }
    if(!isUserExists){
        return res.status(404).json({message:"user not found"})
    }

    const isPasswordCorrect = await bcrypt.compare(
        req.body.password.toString(),
        isUserExists.password
      );
    console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"Successfully loggedin"})
}

module.exports = {userSignup,userLogin}