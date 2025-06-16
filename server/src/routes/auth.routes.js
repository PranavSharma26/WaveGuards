import express from 'express'
import { userLogin, userSignup } from '../controllers/auth/userAuth.controller.js'
import { changePassword, deleteUser, forgotPassword, getMe, resendEmail, userLogout, verifyForgotPasswordOTP, verifyOTP } from '../controllers/auth/commonAuth.controller.js'
import { ngoLogin, ngoSignup } from '../controllers/auth/ngoAuth.controller.js'

const router = express.Router()

// USER
router.post('/user/signup',userSignup)
router.post('/user/login',userLogin)

// COMMON
router.post('/verify-otp',verifyOTP)
router.post('/resend-email',resendEmail)
router.get('/me',getMe)
router.post('/logout',userLogout)
router.delete('/delete-user',deleteUser)
router.patch('/password/forgot',forgotPassword)
router.post('/password/verify-otp',verifyForgotPasswordOTP)
router.patch('/password/change',changePassword)

// NGO
router.post('/ngo/signup',ngoSignup)
router.post('/ngo/login',ngoLogin)

export default router