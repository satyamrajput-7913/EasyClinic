import multer from "multer";

// Save files to "uploads/" directory
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/'); // ✅ Ensure this folder exists!
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname); // Prevent overwriting files
  }
});

const upload = multer({ storage });
export default upload;
