import dbConnect from "../../config/db.js";
import jwt from "jsonwebtoken";
import {
  insertNGO,
  getUser,
  updateTokenExpiry,
  generateOTP,
} from "../../utils/function.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail.js";

export const ngoSignup = async (req, res) => {
  const db = await dbConnect();
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber
    )
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await getUser(email, db, "ngos");
    if (user) {
      const currentDate = new Date();
      const expiryDate = new Date(user.verifyTokenExpiry);
      if (
          user.isVerified ||
          expiryDate > currentDate
      ) {
        return res.status(400).json({ success: false, message: "Email Exists" });
      }
      const newOtp = generateOTP();
      await updateTokenExpiry(email, newOtp, db, "ngos");
      await sendVerificationEmail(email, newOtp);
      return res
        .status(200)
        .json({ success: true, message: "Please Verify Email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    await insertNGO(
      name,
      email,
      phoneNumber,
      hashedPassword,
      otp,
      db,
    );
    await sendVerificationEmail(email, otp);
    return res
      .status(201)
      .json({ success: true, message: "NGO Registration Successful" });
  } catch (error) {
    console.log("Error ngo signing up", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const ngoLogin = async (req, res) => {
  const db = await dbConnect();
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await getUser(email, db, "ngos");
    if (!user) {
      return res.status(400).json({ success: false, message: "No NGO exist" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "NGO is not verified" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        credential: user.email,
        role: "ngo",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800000,
    });
    res.status(200).json({ success: true, message: "Log In Successful" });
  } catch (error) {
    console.log("Error ngo logging in", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
