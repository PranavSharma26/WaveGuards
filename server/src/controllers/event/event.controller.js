import dbConnect from "../../config/db.js";
import { deleteEvent, fetchOngoingEvents, fetchPastEvents, fetchRating, fetchTotalLikes, fetchUpcomingEvents, insertEvent, isEventExist, likeEvent, rateEvent, unlikeEvent, updateEvent } from "../../utils/function.js";

export const postEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const {
      title,
      description,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      ngo_id,
    } = req.body;
    if (
      !title ||
      !description ||
      !start_time ||
      !location ||
      !country ||
      !state ||
      !city ||
      !locationLink ||
      !ngo_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if(await isEventExist(title, ngo_id, db)){
      return res.status(400).json({success: false, message: "Event Exists"})
    }
    await insertEvent(
      title,
      description,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      ngo_id,
      db
    )
    return res.status(201).json({success: true, message: "Event Posted"})
    
  } catch (error) {
    console.log("Error Posting Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getEventsController = async (req, res) => {
  const db = await dbConnect()
  try {
    const upcomingEvents = await fetchUpcomingEvents(db)
    const ongoingEvents = await fetchOngoingEvents(db)
    const pastEvents = await fetchPastEvents(db)
    return res.status(200).json({success: true, data:{
      upcomingEvents : upcomingEvents,
      ongoingEvents: ongoingEvents,
      pastEvents: pastEvents
    }, message: "Events Fetched Successfully"})
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export const getUpcomingEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event = await fetchUpcomingEvents(db)
    return res.status(200).json({success: true, data:event, message:"Fetched Event"})
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Servel Error" });
  }
}

export const getOngoingEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event = await fetchOngoingEvents(db)
    return res.status(200).json({success: true, data:event, message:"Fetched Event"})
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Servel Error" });
  }
}

export const getPastEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event = await fetchPastEvents(db)
    return res.status(200).json({success: true, data:event, message:"Fetched Event"})
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export const updateEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const {
      title,
      description,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      event_id
    } = req.body;
    if (
      !title ||
      !description ||
      !start_time ||
      !location ||
      !country ||
      !state ||
      !city ||
      !locationLink || 
      !event_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    await updateEvent(
      title,
      description,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      event_id,
      db
    )
    return res.status(200).json({success: true, message: "Event Updated Successfully"})
    
  } catch (error) {
    console.log("Error Updating Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export const deleteEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    await deleteEvent(event_id,db)
    return res.status(200).json({success: true, message: "Event Deleted Successfully"})
  } catch (error) {
    console.log("Error Deleting Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export const likeEventController = async (req, res) => {
  const db = await dbConnect()
  try {
      const {user_id, event_id} = req.body
      await likeEvent(user_id, event_id, db)
      return res.status(201).json({success: true, message: "Event Liked"})
  } catch (error) {
      console.log("Error in liking event", error)
      return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const unlikeEventController = async (req, res) => {
  const db = await dbConnect()
  try {
      const {user_id, event_id} = req.body
      await unlikeEvent(user_id, event_id, db)
      return res.status(200).json({success: true, message: "Event Unliked"})
  } catch (error) {
      console.log("Error in unliking event", error)
      return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const getTotalLikesController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    const totalLikes = await fetchTotalLikes(event_id,db)
    return res.status(200).json({success: true, totalLikes: totalLikes, message: "Successfully fetched total likes"})
  } catch (error) {
    console.log("Error in fetching total likes", error)
    return res.status(500).json({success: false, message: "Internal server error"});
  }
} 

export const rateEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const {user_id, event_id, rating} = req.body
    await rateEvent(user_id, event_id, rating, db)
    return res.status(201).json({success: true, message: "Event Rated"})
  } catch (error) {
    console.log("Error in rating event", error)
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const fetchEventRatingController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    const rating = await fetchRating(event_id,db)
    return res.status(200).json({success: true, rating: rating , message: "Fetch rating successfully"})
  } catch (error) {
    console.log("Error in fetching the rating", error)
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}