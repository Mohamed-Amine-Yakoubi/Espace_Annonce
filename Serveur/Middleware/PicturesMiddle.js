const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationPath = path.resolve(__dirname, "../Pictures");

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Use a simple date format for subdirectories (e.g., YYYY_MM_DD)
    const datePath = new Date().toISOString().split('T')[0].replace(/-/g, '_');
    const finalPath = path.join(destinationPath, datePath);

    // Create the subdirectory if it doesn't exist
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(finalPath, { recursive: true });
    }

    callback(null, finalPath);
  },
  filename: (req, file, callback) => {
    // Use a unique identifier for the filename
    const uniqueId = Date.now();
    const filename = `${uniqueId}_${file.originalname}`;
    callback(null, filename);
  },
});

module.exports = multer({ storage: storage });
