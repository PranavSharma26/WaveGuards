import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./src/config/db.js";
import authRoutes from './src/routes/auth.routes.js'
import updateFieldRoutes from './src/routes/updateFields.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',updateFieldRoutes)

app.listen(port, async ()=>{
    await dbConnect()
    console.log(`Listening on port ${port}`)
})