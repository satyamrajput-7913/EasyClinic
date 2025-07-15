import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";


//doctor authentication middleware

const authDoctor = async (req, res, next) => {
  const { dtoken } = req.headers;
console.log("Received dtoken:", dtoken);

try {
  const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
  console.log("Decoded Doctor Token:", decoded);

  const doctor = await doctorModel.findById(decoded.id).select("-password");
  if (!doctor) {
    console.log("Doctor not found with ID:", decoded.id);
    return res.status(401).json({ success: false, message: "Doctor not found." });
  }

  req.docId = doctor._id;
  req.doctor = doctor;

  next();
} catch (error) {
  console.log("JWT verification failed:", error.message);
  res.status(401).json({ success: false, message: "Invalid Token", error: error.message });
}

};

export default authDoctor;
