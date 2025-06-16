import express from 'express'
import { updateAddressController, updateBioController, updateNameController, updatePhoneNumberController } from '../controllers/common/updateFields.controller.js'

const router = express.Router()

router.patch('/update/bio',updateBioController)
router.patch('/update/name',updateNameController)
router.patch('/update/phoneNumber',updatePhoneNumberController)
router.patch('/update/address',updateAddressController)

export default router