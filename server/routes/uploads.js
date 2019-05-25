const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = new express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 30000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("images");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.json({ err: err });
      } else {
        if (req.file == undefined) {
          res.json({ msg: "Error: No File Selected!" });
        } else {
          res.json({ file: `${req.file.filename}` });
        }
      }
    });
  }
);

router.delete(
  "/:filename",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const path = "./uploads/" + req.params.filename;
      fs.unlinkSync(path);
      res.json({ success: "Image deleted" });
    } catch (err) {
      res.json(err);
    }
  }
);

module.exports = router;
