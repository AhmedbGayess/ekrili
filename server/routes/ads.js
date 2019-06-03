const express = require("express");
const passport = require("passport");
const Ad = require("../models/Ad");
const SubCategory = require("../models/SubCategory");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const ad = new Ad({
      ...req.body,
      user: req.user.id
    });
    try {
      await ad.save();
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).send("No ads found");
    }
    await subCategory.populate("ads").execPopulate();
    res.send(subCategory.ads);
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

router.get("/find/title", async (req, res) => {
  const title = req.query.title.trim();
  try {
    const ads = await Ad.find({
      title: new RegExp(`.*${title}.*`, "i")
    });
    if (!ads) {
      return res.status(404).send("No ads found");
    }
    res.send(ads);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "price", "images"];

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
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user.id });
    try {
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
      const ad = await Ad.findByIdAndDelete(req.params.id);
      if (!ad) {
        res.status(404).send("No ad found");
      }
      res.send(ad);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
