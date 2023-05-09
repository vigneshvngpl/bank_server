//import express
//id from  package json:key is id
//require is import

const express=require("express")

//app creation

const app=express()

//port set
//port location must be different from front end port ie 3000,4000,8000

app.listen(3000,()=>{

    console.log("server started at port 3000");
})

//node mon is used other than node to auto recompile
//open terminal-npm i nodemon
//open node mon npx nodemon pagename