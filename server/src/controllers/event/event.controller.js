import dbConnect from "../../config/db.js";
import {
  deleteEvent,
  deleteRegistration,
  fetchImage,
  fetchNoOfVolunteers,
  fetchOngoingEvents,
  fetchPastEvents,
  fetchRating,
  fetchTotalLikes,
  fetchUpcomingEvents,
  insertEvent,
  insertRegistration,
  isEventExist,
  isRegistrationExist,
  isUserLiked,
  likeEvent,
  rateEvent,
  unlikeEvent,
  updateEvent,
} from "../../utils/function.js";

export const getImageController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    const result = await fetchImage(event_id,db)
    if(!result){
      return res.status(404).json({success: false, message: "Image Not Found"})
    }
    res.set('Content-Type', result.mimetype);
    return res.send(result.image);
  } catch (error) {
    console.log("Error fetching Image", error)
    return res.status(500).json({success: false, message: "Internal server error"})
  }
}

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
    const image = req.file?.buffer
    const mimetype = req.file?.mimetype
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

    if (await isEventExist(title, ngo_id, db)) {
      return res.status(400).json({ success: false, message: "Event Exists" });
    }
    await insertEvent(
      title,
      description,
      image,
      mimetype,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      ngo_id,
      db,
    );
    return res.status(201).json({ success: true, message: "Event Posted" });
  } catch (error) {
    console.log("Error Posting Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getEventsController = async (req, res) => {
  const db = await dbConnect();
  try {
    const user_id = req.user.id
    const upcomingEvents = await fetchUpcomingEvents(db);
    const ongoingEvents = await fetchOngoingEvents(db);
    const pastEvents = await fetchPastEvents(db);

    const addStatsToEvent = async (events) => {
      return await Promise.all( (events||[]).map(async (event) => {
        const like = await fetchTotalLikes(event.id,db)
        const rating = await fetchRating(event.id,db)
        const isLiked = await isUserLiked(user_id, event.id,db)
        const volunteers = await fetchNoOfVolunteers(event.id, db)
        return {
          ...event,
          like: like || 0,
          rating: rating || 0,
          isLiked: isLiked,
          volunteers: volunteers
        };
      }));
    
    };

    const upcomingWithStats = await addStatsToEvent(upcomingEvents || [])
    const ongoingWithStats = await addStatsToEvent(ongoingEvents || [])
    const pastWithStats = await addStatsToEvent(pastEvents || [])

    return res.status(200).json({
      success: true,
      data: {
        upcomingEvents: upcomingWithStats,
        ongoingEvents: ongoingWithStats,
        pastEvents: pastWithStats,
      },
      message: "Events Fetched Successfully",
    });
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUpcomingEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event = await fetchUpcomingEvents(db);
    return res
      .status(200)
      .json({ success: true, data: event, message: "Fetched Event" });
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Servel Error" });
  }
};

export const getOngoingEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event = await fetchOngoingEvents(db);
    return res
      .status(200)
      .json({ success: true, data: event, message: "Fetched Event" });
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Servel Error" });
  }
};

export const getPastEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event = await fetchPastEvents(db);
    return res
      .status(200)
      .json({ success: true, data: event, message: "Fetched Event" });
  } catch (error) {
    console.log("Error Fetching Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

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
      event_id,
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
      db,
    );
    return res
      .status(200)
      .json({ success: true, message: "Event Updated Successfully" });
  } catch (error) {
    console.log("Error Updating Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event_id = req.params.id;
    await deleteEvent(event_id, db);
    return res
      .status(200)
      .json({ success: true, message: "Event Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting Event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const likeEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const { user_id, event_id } = req.body;
    await likeEvent(user_id, event_id, db);
    return res.status(201).json({ success: true, message: "Event Liked" });
  } catch (error) {
    console.log("Error in liking event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const unlikeEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const user_id = req.params.user_id
    const event_id = req.params.event_id
    await unlikeEvent(user_id, event_id, db);
    return res.status(200).json({ success: true, message: "Event Unliked" });
  } catch (error) {
    console.log("Error in unliking event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTotalLikesController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event_id = req.params.id;
    const totalLikes = await fetchTotalLikes(event_id, db);
    return res
      .status(200)
      .json({
        success: true,
        totalLikes: totalLikes,
        message: "Successfully fetched total likes",
      });
  } catch (error) {
    console.log("Error in fetching total likes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const rateEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const { user_id, event_id, rating } = req.body;
    await rateEvent(user_id, event_id, rating, db);
    return res.status(201).json({ success: true, message: "Event Rated" });
  } catch (error) {
    console.log("Error in rating event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const fetchEventRatingController = async (req, res) => {
  const db = await dbConnect();
  try {
    const event_id = req.params.id;
    const rating = await fetchRating(event_id, db);
    return res
      .status(200)
      .json({
        success: true,
        rating: rating,
        message: "Fetch rating successfully",
      });
  } catch (error) {
    console.log("Error in fetching the rating", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const joinEventController = async (req, res) => {
  const db = await dbConnect();
  try {
    const {user_id, event_id} = req.body
    if(await isRegistrationExist(user_id, event_id, db)){
      return res.status(400).json({success: false, message: "Already Registered"})
    }
    await insertRegistration(user_id, event_id, db)
    return res.status(201).json({success: true, message: "Registered Successfully"})
  } catch (error) {
    console.log("Error in joining event", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export const fetchTotalVolunteersController = async (req, res) => {
  const db = await dbConnect()
  try {
    const event_id = req.params.id
    const count = await fetchNoOfVolunteers(event_id,db)
    return res.status(200).json({success: true, count ,message: "No. of volunteers fetched successfully"})
  } catch (error) {
    console.log("Error in fetching no. of volunteers", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export const unregisterEventController = async (req, res) => {
  const db = await dbConnect()
  try {
    const user_id = req.params.user_id
    const event_id = req.params.event_id
    await deleteRegistration(user_id,event_id,db)
    return res.status(200).json({success: true, message: "Event unregistered"})
  } catch (error) {
    console.log("Error in unregistering", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}