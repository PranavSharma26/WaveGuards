import jwt from "jsonwebtoken";
import dbConnect from "../../config/db.js";
import { deleteUserFunction, generateOTP, getUser, getUserFromId, updateTokenExpiry } from "../../utils/function.js";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail.js";

export const resendEmail = async (req, res) => {
  const db = await dbConnect()
  try {
    const {email, role} = req.body
    const table = role==="user" ? "users" : "ngos"
    const user = await getUser(email, db, table);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }
    const newOtp = generateOTP()
    await updateTokenExpiry(email,newOtp,db,table)
    await sendVerificationEmail(email,newOtp)
    return res.status(200).json({success: true, message: "Verification email resent"}); 
  } catch (error) {
    console.log("Error resending Verification Email", error)
    return res.status(500).json({success: false, message: "Internal Server Error"});
  }
}

export const userLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Error logging out");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  const db = await dbConnect();
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authenticated" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let data;
    if (payload.role === "user") {
      data = await getUserFromId(payload.id, db, "users");
    } else {
      data = await getUserFromId(payload.id, db, "ngos");
    }
		if(!data){
			return res.status(400).json({success: false, message: "User Not Found"})
		}
    const {
      password,
      verifyToken,
      verifyTokenExpiry,
      forgotPasswordToken,
      forgotPasswordTokenExpiry,
      ...requiredData
    } = data;
    return res
      .status(200)
      .json({
        success: true,
        data:requiredData,
        role:payload.role,
        message: "Fetched User Successfully",
      });
  } catch (error) {
    console.log("Error getting user",error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const db = await dbConnect()
  try {
    const {id, role} = req.params
    if(!id) return res.status(400).json({success: false, message: "All fields are required"})
    const table = role==="user" ? "users" : "ngos"
    const user = await getUserFromId(id,db,table)
    if(!user){
      return res.status(404).json({success: false, message: "User Not Found"})
    }
    await deleteUserFunction(id,db,table)
    return res.status(200).json({success: true, message: "User Deleted Successfully"})
  } catch (error) {
    console.log("Error Deleting User", error)
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}