import express from 'express'
import { deleteEventController, fetchEventRatingController, getEventsController, getOngoingEventController, getPastEventController, getTotalLikesController, getUpcomingEventController, postEventController, rateEventController, updateEventController } from '../controllers/event/event.controller.js'
import { likeEventController, unlikeEventController } from '../controllers/event/event.controller.js'


const router = express.Router()

router.post('/event/post',postEventController)
router.get('/event/get',getEventsController)
router.get('/event/get/upcoming',getUpcomingEventController)
router.get('/event/get/ongoing',getOngoingEventController)
router.get('/event/get/past',getPastEventController)
router.patch('/event/update',updateEventController)
router.delete('/event/delete/:id',deleteEventController)
router.post('/event/like',likeEventController)
router.delete('/event/unlike',unlikeEventController)
router.get('/event/totalLikes/:id',getTotalLikesController)
router.post('/event/rate',rateEventController)
router.get('/event/fetchRating/:id',fetchEventRatingController)

export default router