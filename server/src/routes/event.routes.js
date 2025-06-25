import express from 'express'
import { deleteEventController, getEventController, postEventController, updateEventController } from '../controllers/event/event.controller.js'

const router = express.Router()

router.post('/event/post',postEventController)
router.get('/event/get/:id',getEventController)
router.patch('/event/update',updateEventController)
router.delete('/event/delete/:id',deleteEventController)

export default router