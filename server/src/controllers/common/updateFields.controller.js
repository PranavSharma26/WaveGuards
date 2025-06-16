import dbConnect from '../../config/db.js'
import { updateBio, updateName, updateNGOAddress, updatePhoneNumber, updateUserAddress } from '../../utils/function.js';

export const updateBioController = async (req, res) => {
  const db = await dbConnect()
	try {
		const {id, newBio, role} = req.body
		if(!id || !newBio || !role) return res.status(400).json({success: false, message: "All fields required"})
		const table = role === "user" ? "users" : "ngos"
		await updateBio(id,newBio,db,table)
		return res.status(200).json({success: true, message: "Bio Updated Successfully"})
  } catch (error) {
    console.log("Error updating bio", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateNameController = async (req, res) => {
  const db = await dbConnect()
	try {
		const {id, newName, role} = req.body
		if(!id || !newName || !role) return res.status(400).json({success: false, message: "All fields required"})
		const table = role === "user" ? "users" : "ngos"
		await updateName(id,newName,db,table)
		return res.status(200).json({success: true, message: "Name Updated Successfully"})
  } catch (error) {
    console.log("Error updating name", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updatePhoneNumberController = async (req, res) => {
  const db = await dbConnect()
	try {
		const {id, newPhoneNumber, role} = req.body
		if(!id || !newPhoneNumber || !role) return res.status(400).json({success: false, message: "All fields required"})
		const table = role === "user" ? "users" : "ngos"
		await updatePhoneNumber(id,newPhoneNumber,db,table)
		return res.status(200).json({success: true, message: "Phone Number Updated Successfully"})
  } catch (error) {
    console.log("Error updating phone number", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateAddressController = async (req, res) => {
  const db = await dbConnect()
	try {
		const {id, address, city, state, country, role} = req.body
		if(!id || !city || !state || !country || !role) return res.status(400).json({success: false, message: "All fields required"})
		const table = role === "user" ? "users" : "ngos"
		if(role==="user"){
			await updateUserAddress(id,city,state,country,db,table)
		}
		else{
			await updateNGOAddress(id,address,city,state,country,db,table)
		}
		return res.status(200).json({success: true, message: "Address Updated Successfully"})
  } catch (error) {
    console.log("Error updating address", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};