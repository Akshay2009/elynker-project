const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const FREELANCER_RESUME_PATH = path.join(process.env.FREELANCER_RESUME_PATH);

////////////////################FREE LANCER RESUME################////////////////////////
let freelancerResume = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(
      __dirname,
      "..",
      FREELANCER_RESUME_PATH
    );
    // Check if the destination directory exists
    fs.access(destinationPath, fs.constants.F_OK, (err) => {
      if (err) {
        // If directory doesn't exist, create it
        fs.mkdir(destinationPath, { recursive: true }, (err) => {
          if (err) {
            console.error("Error creating directory:", err);
            cb(err, null);
          } else {
            cb(null, destinationPath);
          }
        });
      } else {
        cb(null, destinationPath);
      }
    });
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${Date.now()}${Math.random().toString().slice(15)}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Resume uploda function
const fileFilterResume = function (req, file, cb) {
  try {
    const allowedFileTypes = /pdf|docx|doc|word/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    const error = new Error("Only PDF,DOC,DOCX And WORD files are allowed!");
    error.status = 400; // Set the status code for the error

    cb(error);
  } catch (err) {
    console.log("error in fileFilter function", err.message);
  }
};


module.exports.uploadfreelanceResume = multer({
  storage: freelancerResume,
  fileFilter: fileFilterResume,
  limits: {
    fileSize: 1024 * 1024 * 2, //2MB
  },
});

module.exports.handleMulterError = function (err, req, res, next) {
  if (err) {
    console.error("Multer error:", err.message);
    res.status(err.status || 500).json({ error: err.message });
  } else {
    next();
  }
};
////////////////////###################END#########################///////////////////

