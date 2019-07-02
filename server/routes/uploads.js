const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const uuidv4 = require("uuid");
const Image = require("../models/Image");
const Ad = require("../models/Ad");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

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
              .cover(350, 280)
              .quality(90)
              .write(`./uploads/${image}`);
            fs.unlinkSync(`./uploads/${req.file.filename}`);
            const savedImage = new Image({
              image,
              user: req.user.id
            });
            savedImage.save();
            res.send(savedImage);
          });
        }
      }
    });
  }
);

router.delete(
  "/:filename",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const image = await Image.findOne({
        image: req.params.filename,
        user: req.user.id
      });
      if (!image) {
        return res.status(404).send();
      }
      await image.remove();
      fs.unlinkSync(`./uploads/${req.params.filename}`);
      res.send(image);
    } catch (err) {
      res.send(err);
    }
  }
);

router.delete("/unused/delete", async (req, res) => {
  try {
    const adsImages = [];
    const ads = await Ad.find();
    ads.forEach((ad) => adsImages.push(...ad.images));
    const categoryImages = [];
    const categories = await Category.find();
    categories.forEach((category) => categoryImages.push(category.image));
    const subcategoriesImages = [];
    const subcategories = await SubCategory.find();
    subcategories.forEach((subcategory) =>
      subcategoriesImages.push(subcategory.image)
    );
    const usedImages = [
      ...adsImages,
      ...categoryImages,
      ...subcategoriesImages
    ];
    const images = [];
    const imagesObj = await Image.find();
    imagesObj.forEach((obj) => images.push(obj.image));
    const unusedImages = images.filter((image) => !usedImages.includes(image));
    await Image.deleteMany({ image: { $nin: usedImages } });
    unusedImages.forEach((image) => fs.unlinkSync(`./uploads/${image}`));
    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
