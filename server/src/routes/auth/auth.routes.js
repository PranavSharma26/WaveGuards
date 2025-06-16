import express from 'express'
import { userLogin, userSignup, verifyOTP } from '../../controllers/auth/userAuth.controller.js'
import { changePassword, deleteUser, forgotPassword, getMe, resendEmail, userLogout, verifyForgotPasswordOTP } from '../../controllers/auth/commonAuth.controller.js'

const router = express.Router()

// USER
router.post('/user/signup',userSignup)
router.post('/verify-otp',verifyOTP)
router.post('/user/login',userLogin)

// COMMON
router.post('/user/logout',userLogout)
router.get('/me',getMe)
router.post('/resend-email',resendEmail)
router.delete('/delete-user/:id/:role',deleteUser)
router.patch('/forgot-password',forgotPassword)
router.post('/verify-forgot-password-otp',verifyForgotPasswordOTP)
router.patch('/change-password',changePassword)

// NGO

export default router