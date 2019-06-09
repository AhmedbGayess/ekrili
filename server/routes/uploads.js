const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const uuidv4 = require("uuid");

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
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("image");

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
          Jimp.read(`./uploads/${req.file.filename}`, async (err, img) => {
            if (err) throw err;
            const image = `image-${uuidv4()}.jpeg`;
            img
              .resize(300, 300)
              .quality(90)
              .write(`./uploads/${image}`);
            fs.unlinkSync(`./uploads/${req.file.filename}`);
            res.send({ image });
          });
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
      res.json({ image: req.params.filename });
    } catch (err) {
      res.json(err);
    }
  }
);

module.exports = router;
