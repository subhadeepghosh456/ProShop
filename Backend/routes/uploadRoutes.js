import path from "path";
import multer from "multer";
import express from "express";
import fs from "fs";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // const uploadDir = path.join(__dirname, "uploads"); // getting error __dirname not defined
    console.log(path.join(__dirname, "uploads/"));
    cb(null, "uploads/");
    // cb(null, path.join(__dirname, "uploads/"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file.path);
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
