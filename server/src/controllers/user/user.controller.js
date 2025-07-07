import dbConnect from '../../config/db.js'
import { fetchNgoNameFromID, fetchNoOfVolunteers, fetchRating, fetchTotalLikes, fetchUserEvents, isRegistrationExist, isUserLiked } from '../../utils/function.js'

export const  getUserEventsController = async (req, res) => {
    const db = await dbConnect()
    try {
        const user_id = req.params.id
        const events = await fetchUserEvents(user_id,db)
        const addStatsToEvent = async (events) => {
            return await Promise.all( (events||[]).map(async (event) => {
              const like = await fetchTotalLikes(event.id,db)
              const rating = await fetchRating(event.id,db)
              const isLiked = await isUserLiked(user_id, event.id,db)
              const volunteers = await fetchNoOfVolunteers(event.id, db)
              const isJoined = await isRegistrationExist(user_id,event.id,db)
              const ngoName = await fetchNgoNameFromID(event.ngo_id,db)
              return {
                ...event,
                like: like || 0,
                rating: rating || 0,
                isLiked: isLiked,
                volunteers: volunteers,
                isJoined: isJoined,
                ngoName: ngoName
              };
            }));
          
          };
        const eventWithStats = await addStatsToEvent(events || [])
        return res.status(200).json({success: true, events: eventWithStats, message: "User Events Fetched Successfully"})
    } catch (error) {
        console.log("Error fetching user events", error)
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}