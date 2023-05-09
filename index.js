//import express
//id from  package json:key is id
//require is import

const express=require("express")

//import logic file

const logic=require("./service/logic")




//app creation

const app=express()

//to convert all incoming json data to js

app.use(express.json())

//request 

app.post("/register",(req,res)=>{
    // res.send("post method worked")
    logic.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })

})

// app.get("/getdata",(req,res)=>{

// console.log(req.body.acno);
//     // res.send("getmethod.........")
//     //json is used to convert variable to json and send
//     res.json(req.body.acno)
// })

//port set
//port location must be different from front end port ie 3000,4000,8000

app.listen(3000,()=>{

    console.log("server started at port 3000");
})

//node mon is used other than node to auto recompile
//open terminal-npm i nodemon
//open node mon npx nodemon pagename