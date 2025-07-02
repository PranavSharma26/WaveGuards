import express from 'express'
import { deleteEventController, fetchEventRatingController, getEventsController, getOngoingEventController, getPastEventController, getTotalLikesController, getUpcomingEventController, postEventController, rateEventController, updateEventController, getImageController, joinEventController, fetchTotalVolunteersController, unregisterEventController } from '../controllers/event/event.controller.js'
import { likeEventController, unlikeEventController } from '../controllers/event/event.controller.js'
import {verifyUser} from '../middleware/auth.middleware.js'
import upload from '../utils/imageUpload.js'

const router = express.Router()

// POST
router.post('/event/post',upload.single('image'),postEventController)
router.post('/event/like',likeEventController)
router.post('/event/rate',rateEventController)
router.post('/event/join',joinEventController)

// GET
router.get('/event/image/:id', getImageController)
router.get('/event/get',verifyUser, getEventsController)
router.get('/event/get/upcoming',getUpcomingEventController)
router.get('/event/get/ongoing',getOngoingEventController)
router.get('/event/get/past',getPastEventController)
router.get('/event/totalLikes/:id',getTotalLikesController)
router.get('/event/fetchRating/:id',fetchEventRatingController)
router.get('/event/volunteers/:id', fetchTotalVolunteersController)

// PATCH
router.patch('/event/update',updateEventController)

// DELETE
router.delete('/event/delete/:id',deleteEventController)
router.delete('/event/unlike/:user_id/:event_id',unlikeEventController)
router.delete('/event/registration/delete/:user_id/:event_id',unregisterEventController)
export default router