import dbConnect from '../../config/db.js'
import { fetchUserEvents } from '../../utils/function.js'

export const  getUserEventsController = async (req, res) => {
    const db = await dbConnect()
    try {
        const user_id = req.params.id
        const events = await fetchUserEvents(user_id,db)
        return res.status(200).json({success: true, events, message: "User Events Fetched Successfully"})
    } catch (error) {
        console.log("Error fetching user events", error)
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}