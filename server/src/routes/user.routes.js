import express from 'express'
import { getUserEventsController } from '../controllers/user/user.controller.js'

const router = express.Router()

router.get('/user/:id/my-events',getUserEventsController)

export default router