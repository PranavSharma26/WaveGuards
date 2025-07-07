import express from 'express'
import { getNgoEventsController } from '../controllers/ngo/ngo.controller.js'

const router = express.Router()

router.get('/ngo/:id/my-events',getNgoEventsController)

export default router