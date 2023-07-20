const User = require('../model/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyKey";

const userSignup = async(req,res,next) =>{
    console.log("entered")
    const {fname,lname,email,password} = req.body
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
        fname,
        lname,
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
    console.log("entered")
    const {email,password} = req.body;
    let isUserExists;
    try {
         isUserExists = await User.findOne({email:email})
         console.log("isuserExist",isUserExists)
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
    console.log("isPasswordCorrect :", isPasswordCorrect)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"incorrect password"})
    }

    const token = jwt.sign({id:isUserExists._id,userName:isUserExists.fname},JWT_SECRET_KEY,{expiresIn:"2hr"})

    // res.cookie(String(isUserExists._id),token,{
    //     path:'/',
    //     expiresIn:new Date(Date.now()+1000*30),
    //     httpOnly:true,
    //     sameSite:"lax"
    // })
    const obj = {
        userName:isUserExists.fname,
        token:token
    }
    
    res.cookie("jwt", obj ,{
        httpOnly: false,
        maxAge: 6000 * 1000,
        secure:false
    })
        
    return res.status(200).json({message:"Successfully loggedin",user:isUserExists,token})
}
const veryfyToken= async (req,res,next)=>{
    const cookies =req.headers.cookie.split('=').pop()
    console.log("cookies",cookies)
//     const tokensArray = cookies.split(" ");
//     const desiredTokenWithID = tokensArray[1];

// // Split the string using equal sign (=) as a delimiter, then get the second element (index 1).
//     const desiredToken = desiredTokenWithID.split("=")[1];
//     console.log("des: " ,desiredToken)
    if(!cookies){
        return res.status(400).json({message:"No token found"})
    }
    jwt.verify(String(cookies),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log("mg:",err.message)
            return res.status(401).json({message:"invalid token"})
        }
        req.id = user.id
    })
    next()

}

const getUser = async(req,res)=>{
   try {
     console.log("user entered")
      const userId = req.id;
      console.log("req.id", req.id)
      const user = await User.findById(userId,'-password')
      console.log("user:" ,user)
      if(!user){
        return res.status(404).json({message:"There is no User"})
      }
      return res.status(200).json({user})
   } catch (error) {
    console.log(error.message)
   }
}
module.exports = {userSignup,userLogin,veryfyToken,getUser}