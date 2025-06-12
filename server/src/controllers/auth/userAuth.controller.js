import dbConnect from "../../config/db.js";
import { insertUser, getUser, updateTokenExpiry } from "../../utils/function.js";
import bcrypt from 'bcrypt'

export const userSignup = async (req, res) => {
  const db = await dbConnect()
	try {
    const {name,email,password } = req.body;

		if(!name || !email || !password) return res.status(400).json({message:"All fields are required"})

		const user = await getUser(email,db,"users")
		if(user){
			const now = new Date()
			const expiryDate = new Date(user.verifyTokenExpiry)
			if(user.isVerified || expiryDate>now){
				return res.status(400).json({message:"User Exists"})
			}
			updateTokenExpiry(email,db,"users")
			return res.status(200).json({message:"Please Verify Email"})
		}
		else{
			const hashedPassword = await bcrypt.hash(password,10)
			await insertUser(name,email,hashedPassword,db)
			return res.status(201).json({message:"User Registration Successful"})
		}
  } catch (error) {
    console.log("Error user signing up", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
