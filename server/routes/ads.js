const express = require("express");
const passport = require("passport");
const fs = require("fs");
const Ad = require("../models/Ad");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const subcategory = await SubCategory.findById(req.body.subCategory);
      if (!subcategory) {
        return res.status(404).send("Subcategory doesn't exist");
      }
      const ad = new Ad({
        ...req.body,
        category: subcategory.category,
        name: req.user.name,
        phone: req.user.phone,
        user: req.user.id,
        weekPrice: Math.floor(req.body.price * 7),
        monthPrice: Math.floor(req.body.price * 30)
      });
      await ad.save();
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/subcategory/:id", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.governorate) {
    match.governorate = req.query.governorate;
  }

  if (req.query.delegation) {
    match.delegation = req.query.delegation;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).send("No ads found");
    }
    await subCategory
      .populate({
        path: "ads",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(subCategory.ads);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/category/:id", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.governorate) {
    match.governorate = req.query.governorate;
  }

  if (req.query.delegation) {
    match.delegation = req.query.delegation;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send("No ads found");
    }

    await category
      .populate({
        path: "ads",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(category.ads);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).send("No ad found");
    }
    res.send(ad);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get(
  "/my-ads",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const count = await Ad.find({
        user: req.user.id
      }).countDocuments();
      const user = await req.user
        .populate({
          path: "ads",
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort: { updatedAt: -1 }
          }
        })
        .execPopulate();
      res.send({ ads: user.ads, count });
    } catch (e) {
      res.status(500).send();
    }
  }
);

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user
      .populate({
        path: "ads",
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send({
      name: user.name,
      phone: user.phone,
      ads: user.ads
    });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  const title = req.query.title ? req.query.title.trim() : "";
  const match = {};
  const sort = {};

  if (req.query.governorate) {
    match.governorate = req.query.governorate;
  }

  if (req.query.delegation) {
    match.delegation = req.query.delegation;
  }

  if (req.query.category) {
    match.category = req.query.category;
  }

  if (req.query.subCategory) {
    match.subCategory = req.query.subCategory;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const ads = await Ad.find({
      title: new RegExp(`.*${title}.*`, "i"),
      ...match
    })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort);

    const count = await Ad.find({
      title: new RegExp(`.*${title}.*`, "i"),
      ...match
    }).countDocuments();
    if (!ads) {
      return res.status(404).send("No ads found");
    }
    res.send({ ads, count });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "description",
      "price",
      "images",
      "governorate",
      "delegation",
      "category",
      "subCategory"
    ];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates." });
    }

    try {
      const ad = await Ad.findOne({ _id: req.params.id, user: req.user.id });
      if (!ad) {
        return res.status(404).send("No ad found");
      }
      updates.forEach((update) => (ad[update] = req.body[update]));
      await ad.save();
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ad = await Ad.findOne({ _id: req.params.id, user: req.user.id });
      if (!ad) {
        res.status(404).send("No ad found");
      }
      const users = await User.find({
        favorites: { $elemMatch: { _id: ad._id } }
      });

      users.forEach(async (user) => {
        user.favorites = user.favorites.filter(
          (favorite) => favorite._id.toString() !== ad._id.toString()
        );
        await user.save();
      });
      ad.images.forEach((image) => {
        fs.unlinkSync(`./uploads/${image}`);
      });
      await ad.remove();
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(401).send();
    }
    try {
      const ad = await Ad.findById(req.params.id);
      if (!ad) {
        res.status(404).send("No ad found");
      }

      const users = await User.find({
        favorites: { $elemMatch: { _id: ad._id } }
      });

      users.forEach(async (user) => {
        user.favorites = user.favorites.filter(
          (favorite) => favorite._id.toString() !== ad._id.toString()
        );
        await user.save();
      });

      ad.images.forEach((image) => {
        fs.unlinkSync(`./uploads/${image}`);
      });
      await ad.remove();
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.post(
  "/favorite/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id);
      const exists = req.user.favorites.find(
        (favorite) => favorite._id.toString() === req.params.id.toString()
      );

      if (exists) {
        req.user.favorites.splice(ad._id, 1);
        req.user.save();
        res.send(false);
      } else {
        req.user.favorites.unshift(ad._id);
        req.user.save();
        res.send(true);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/favorite/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const exists = req.user.favorites.find(
        (favorite) => favorite._id.toString() === req.params.id.toString()
      );
      if (exists) {
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/favorites",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const favorites = await Ad.find({ _id: { $in: req.user.favorites } });
      const count = req.user.favorites.length;
      res.send({ favorites, count });
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.post(
  "/image/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id);

      if (!ad) {
        return res.status(404).send("No ad found");
      }
      if (ad.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      ad.images.push(req.body.image);
      await ad.save();
      res.send("success");
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/image/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id);

      if (!ad) {
        return res.status(404).send("No ad found");
      }
      if (ad.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      const images = ad.images.filter((image) => image !== req.query.image);

      ad.images = images;
      await ad.save();
      res.send("success");
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
