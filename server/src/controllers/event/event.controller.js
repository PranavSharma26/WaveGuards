import dbConnect from "../../config/db.js";
import { deleteEvent, getEvent, insertEvent, isEventExist, updateEvent } from "../../utils/function.js";

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
      .json({ success: false, message: "Internal Servel Error" });
  }
};

export const getEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    const event = await getEvent(event_id,db)
    return res.status(200).json({success: true, data:event, message:"Fetched Event"})
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Servel Error" });
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
      .json({ success: false, message: "Internal Servel Error" });
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
      .json({ success: false, message: "Internal Servel Error" });
  }
}