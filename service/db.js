//import mongoose

const mongoose=require("mongoose")

//connection string

mongoose.connect("mongodb://127.0.0.1:27017/bankServer",{useNewUrlParser:true})


// model creation
//model name must be singular name of collection name
//fist letter should be capital 

const User=mongoose.model("user",
{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
}

)

//export 

module.exports={

    User
}