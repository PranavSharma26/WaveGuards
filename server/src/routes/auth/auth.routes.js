import express from 'express'
import { userSignup } from '../../controllers/auth/userAuth.controller.js'
import { sendVerificationEmail } from '../../utils/sendVerificationEmail.js'

const router = express.Router()

router.post('/user/signup',userSignup)
router.post('/send-verification-email',sendVerificationEmail)

export default router