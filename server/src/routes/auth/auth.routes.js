import express from 'express'
import { userLogin, userSignup, verifyOTP } from '../../controllers/auth/userAuth.controller.js'
import { deleteUser, getMe, resendEmail, userLogout } from '../../controllers/auth/commonAuth.controller.js'

const router = express.Router()

router.post('/user/signup',userSignup)
router.post('/verify-otp',verifyOTP)
router.post('/user/login',userLogin)
router.post('/user/logout',userLogout)
router.get('/me',getMe)
router.post('/resend-email',resendEmail)
router.delete('/delete-user/:id/:role',deleteUser)


export default router