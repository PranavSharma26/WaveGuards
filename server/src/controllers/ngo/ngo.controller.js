import dbConnect from "../../config/db.js";
import {
	fetchNgoEvents,
  fetchNgoNameFromID,
  fetchNoOfVolunteers,
  fetchRating,
  fetchTotalLikes,
} from "../../utils/function.js";

export const getNgoEventsController = async (req, res) => {
  const db = await dbConnect();
  try {
    const ngo_id = req.params.id;
    const events = await fetchNgoEvents(ngo_id, db);
    const addStatsToEvent = async (events) => {
      return await Promise.all(
        (events || []).map(async (event) => {
          const like = await fetchTotalLikes(event.id, db);
          const rating = await fetchRating(event.id, db);
          const volunteers = await fetchNoOfVolunteers(event.id, db);
          const ngoName = await fetchNgoNameFromID(event.ngo_id, db);
          return {
            ...event,
            like: like || 0,
            rating: rating || 0,
            volunteers: volunteers,
            ngoName: ngoName,
          };
        }),
      );
    };
    const eventWithStats = await addStatsToEvent(events || []);

    const ngoUpcomingEvents = eventWithStats.filter((e)=>e.status==="upcoming")
    const ngoOngoingEvents = eventWithStats.filter((e)=>e.status==="ongoing")
    const ngoPastEvents = eventWithStats.filter((e)=>e.status==="past")

    return res
      .status(200)
      .json({
        success: true,
        events: eventWithStats,
        upcomingEvents: ngoUpcomingEvents,
        ongoingEvents: ngoOngoingEvents,
        pastEvents: ngoPastEvents,
        message: "Ngo Events Fetched Successfully",
      });
  } catch (error) {
    console.log("Error fetching ngo events", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
