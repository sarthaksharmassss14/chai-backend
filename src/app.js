import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import expressListRoutes from "express-list-routes";
const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API is working");
});

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register

expressListRoutes(app);


export {app}