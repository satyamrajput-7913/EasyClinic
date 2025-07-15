import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password"); // exclude password
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    req.userId = user._id;  // for userId in appointment
    req.user = user;        // for userData in appointment

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid Token", error: error.message });
  }
};

export default authUser;
