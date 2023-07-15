const User = require('../model/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyKey";
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
    const token = jwt.sign({id:isUserExists._id},JWT_SECRET_KEY,{expiresIn:"1hr"})
    return res.status(200).json({message:"Successfully loggedin",user:isUserExists,token})
}
const veryfyToken=async (req,res,next)=>{
    const headers = req.headers[`authorization`]
    const token = headers.split(" ")[1]
    if(!token){
        return res.status(400).json({message:"No token found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:"invalid token"})
        }
        req.id = user.id
    })
    next()

}

const getUser = async(req,res)=>{
   try {
      const userId = req.id;
      const user = await User.findById(userId,'-password')
      if(!user){
        return res.status(404).json({message:"There is no User"})
      }
      return res.status(200).json({user})
   } catch (error) {
    console.log(error.message)
   }
}
module.exports = {userSignup,userLogin,veryfyToken,getUser}