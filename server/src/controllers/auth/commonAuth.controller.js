import jwt from "jsonwebtoken";
import dbConnect from "../../config/db.js";
import { getUserFromId } from "../../utils/function.js";

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
        message: "Fetched User Successfully",
      });
  } catch (error) {
    console.log("Error getting user",error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
