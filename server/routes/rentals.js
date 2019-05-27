const express = require("express");
const passport = require("passport");
const Rental = require("../models/Rental");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { product, quantity, totalCost, status, from, to } = req.body;
      const rental = new Rental({
        user: req.user.id,
        product,
        quantity,
        totalCost,
        status,
        from,
        to
      });
      await rental.save();
      res.status(201).send(rental);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("No user found");
      }
      await user.populate("rentals").execPopulate();
      res.send(user.rentals);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id);
      if (!rental || rental.user.toString() !== req.user.id) {
        return res.status(404).send("No item found");
      }
      res.send(rental);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/admin/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send("Unauthorized");
      }
      const skip = parseInt(req.query.skip) || 0;
      const rentals = await Rental.find()
        .limit(10)
        .skip(skip)
        .sort({ createdAt: -1 });
      if (!rentals) {
        return res.status(404).send("No rentals found");
      }
      res.send(rentals);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/admin/single/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        res.status(404).send("No rental found");
      }
      res.send(rental);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.patch(
  "/admin/single/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        res.status(404).send("No rental found");
      }
      rental.status = req.body.status;
      await rental.save();
      res.send(rental);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
