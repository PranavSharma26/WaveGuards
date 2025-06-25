import express from 'express'
import { deleteEventController, getEventsController, getOngoingEventController, getPastEventController, getUpcomingEventController, postEventController, updateEventController } from '../controllers/event/event.controller.js'

const router = express.Router()

router.post('/event/post',postEventController)
router.get('/event/get',getEventsController)
router.get('/event/get/upcoming',getUpcomingEventController)
router.get('/event/get/ongoing',getOngoingEventController)
router.get('/event/get/past',getPastEventController)
router.patch('/event/update',updateEventController)
router.delete('/event/delete/:id',deleteEventController)

export default router