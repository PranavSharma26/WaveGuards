import express from 'express'
import { userLogin, userSignup, verifyOTP } from '../../controllers/auth/userAuth.controller.js'

const router = express.Router()

router.post('/user/signup',userSignup)
router.post('/verify-otp',verifyOTP)
router.post('/user/login',userLogin)

export default router