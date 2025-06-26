import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Not Authenticated" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decode
		next()
  } catch (error) {
    console.log("Error in Authentication", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
