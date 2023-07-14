const express = require('express');

const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://jithinchackopayyanat:0UbEV9ZpyIYd96Ks@cluster0.jgzemu9.mongodb.net/User-management?retryWrites=true&w=majority').then((res)=>{
    app.listen(5000);
    console.log("db connected")
}).catch((err)=>{
    console.log(err.message)
})
