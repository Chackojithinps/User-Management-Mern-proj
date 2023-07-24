const mongoose = require('mongoose') 

const Schema = mongoose.Schema

const userSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
       type:String,
       required:true
    },
    image:{
        type:String
    }
})
module.exports = mongoose.model('User',userSchema)