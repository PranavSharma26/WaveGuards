import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./src/config/db.js";
import authRoutes from './src/routes/auth/auth.routes.js'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use('/api',authRoutes)

app.listen(port, async ()=>{
    await dbConnect()
    console.log(`Listening on port ${port}`)
})