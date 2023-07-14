const User = require('../model/user-model')
const bcrypt = require("bcryptjs")

 
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
    const hashPassword =await bcrypt.genSalt(password);
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

module.exports = {userSignup}