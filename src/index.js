import express from "express"; 
const app = express(); 



import dotenv from "dotenv"

import connectDB from "./db/index.js"
dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log (`Server is running at ${process.env.PORT}`)
    } )
})
.catch((err)=>{
    console.log("MONGODB conncection failed", err)
})