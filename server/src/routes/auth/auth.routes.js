import express from 'express'
import { userLogin, userSignup, verifyOTP } from '../../controllers/auth/userAuth.controller.js'
import { getMe, userLogout } from '../../controllers/auth/commonAuth.controller.js'

const router = express.Router()

router.post('/user/signup',userSignup)
router.post('/verify-otp',verifyOTP)
router.post('/user/login',userLogin)
router.post('/user/logout',userLogout)
router.get('/me',getMe)

export default router