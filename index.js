//import express
//id from  package json:key is id
//require is import

const express=require("express")

//import logic file

const logic=require("./service/logic")




//app creation

const app=express()

//integrate front end with server

const cors=require("cors")
app.use(cors({origin:"http://localhost:4200"}))

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


//login

app.post("/login",(req,res)=>{

logic.login(req.body.acno,req.body.psw).then(result=>{
res.status(result.statusCode).json(result)

})

})

//balance

app.get("/balance/:acno",(req,res)=>{
    logic.getBalance(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
})

//single user

app.get("/getUser/:acno",(req,res)=>{
    logic.getUser(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
})

//fund transfer
app.post("/transfer",(req,res)=>{

    logic.fundTransfer(
        req.body.toAcno,
        req.body.fromAcno,
        req.body.amount,
        req.body.psw,
        req.body.date,

    ).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
//transaction history

app.get("/transaction/:acno",(req,res)=>{
    logic.getTransaction(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})