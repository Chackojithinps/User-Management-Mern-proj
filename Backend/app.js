const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-router')
const adminRouter = require('./routes/admin-router')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET','POST'],
    credentials:true
  }))
app.use(express.json())
app.use('/',userRouter)
// app.use('/admin',adminRouter)
mongoose.connect('mongodb+srv://jithinchackopayyanat:0UbEV9ZpyIYd96Ks@cluster0.jgzemu9.mongodb.net/User-management?retryWrites=true&w=majority').then((res)=>{
    app.listen(5000);
    console.log("db connected")
}).catch((err)=>{
    console.log(err.message)
})
